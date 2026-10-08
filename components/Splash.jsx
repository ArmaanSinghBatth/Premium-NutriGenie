'use client';
import { useEffect, useState } from 'react';
import Logo from './Logo';

// Intro screen: "Batth Production presents" -> NutriGenie logo + wordmark.
// Shows once per browser session. Set ALWAYS = true to show on every load.
const ALWAYS = false;
const KEY = 'ng_splash_seen';

export default function Splash() {
  const [phase, setPhase] = useState('show'); // show -> leaving -> gone

  useEffect(() => {
    let seen = false;
    try { seen = !ALWAYS && sessionStorage.getItem(KEY) === '1'; } catch (e) {}
    if (seen) { setPhase('gone'); return; }
    const quick = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = setTimeout(() => setPhase('leaving'), quick ? 900 : 4300);
    const t2 = setTimeout(() => { setPhase('gone'); try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }, quick ? 1500 : 4900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'gone') return null;
  const skip = () => { setPhase('leaving'); setTimeout(() => setPhase('gone'), 600); };
  const letters = (txt, base) => txt.split('').map((c, i) => <span key={i} className="l" style={{ animationDelay: `${base + i * 0.07}s` }}>{c}</span>);

  return (
    <div className={'splash' + (phase === 'leaving' ? ' out' : '')} onClick={skip} role="presentation">
      <div className="sp-a">
        <span className="sp-co">BATTH PRODUCTION</span>
        <i className="sp-line" />
        <span className="sp-pr">presents</span>
      </div>
      <div className="sp-b">
        <div className="sp-logo"><Logo size={96} /></div>
        <h2 className="sp-word"><span className="w1">{letters('NUTRI', 2.0)}</span><span className="w2">{letters('GENIE', 2.35)}</span></h2>
        <p className="sp-tag">TRAIN · EAT · GLOW</p>
      </div>
      <div className="sp-bar"><i /></div>
    </div>
  );
}
