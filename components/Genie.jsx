'use client';
import { useEffect, useRef, useState } from 'react';
import { usePersisted } from '../lib/store';
import { askAI, offlineReply } from '../lib/ai';

const QUICK = ['Am I on track today?', 'What should I eat now?', 'Tips to build muscle', 'How much protein do I need?'];

export default function Genie({ ctx }) {
  const [msgs, setMsgs] = usePersisted('ng_chat', []);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState('Ready');
  const [text, setText] = useState('');
  const box = useRef(null);
  useEffect(() => { if (box.current) box.current.scrollTop = 1e6; }, [msgs, busy]);

  async function send(t) {
    t = (t ?? text).trim();
    if (!t || busy) return;
    setText('');
    const next = [...msgs, { role: 'user', content: t }];
    setMsgs(next); setBusy(true);
    let rep = null;
    try { const r = await askAI(next, ctx); rep = r.reply; setMode('Connected · ' + r.mode); } catch (e) {}
    if (!rep) { rep = offlineReply(t, ctx); setMode('Offline mode · AI not connected'); }
    setMsgs((m) => [...m, { role: 'assistant', content: String(rep) }].slice(-30));
    setBusy(false);
  }
  const list = msgs.length ? msgs : [{ role: 'assistant', content: "Hi, I'm Genie. Ask me about workouts, meals, goals or how your day is going." }];

  return (
    <section className="on">
      <div className="glass card">
        <div className="wk">
          <div><h2>Genie Assistant</h2><small id="aiMode">{mode}</small></div>
          <button className="btn g" style={{ minHeight: 36, padding: '8px 14px' }} onClick={() => setMsgs([])}>Clear</button>
        </div>
      </div>
      <div className="glass chat" ref={box}>
        {list.map((m, i) => <div key={i} className={'b ' + (m.role === 'user' ? 'u' : 'a')}>{m.content}</div>)}
        {busy && <div className="b a typing"><i /><i /><i /></div>}
      </div>
      <div className="chips qs">{QUICK.map((q) => <button key={q} className="chip" onClick={() => send(q)}>{q}</button>)}</div>
      <div className="glass composer">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Ask about workouts, meals, goals…" />
        <button className="btn" onClick={() => send()}>Send</button>
      </div>
    </section>
  );
}
