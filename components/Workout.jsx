'use client';
import { useMemo, useState } from 'react';
import ChipRow from './ChipRow';
import Figure from './Figure';
import { X } from '../lib/exercises';
import { PS } from '../lib/poses';
import { OPTIONS, PRESETS, exObj, generatePlan, presetPlan } from '../lib/workout';

function ExerciseCard({ x }) {
  const [open, setOpen] = useState(false);
  const pose = PS[x.pose] ? x.pose : 'squat';
  const prop = ['plate', 'db'].includes(x.prop) ? x.prop : 'none';
  return (
    <div className={'glass ex' + (open ? ' open' : '')} onClick={() => setOpen(!open)}>
      <div className="h">
        <Figure pose={pose} prop={prop} className="thumb" />
        <div><b>{x.name}</b><small>{x.sets} · {x.muscle}</small></div>
      </div>
      <div className="det">
        {open && <div className="stage"><Figure pose={pose} prop={prop} /></div>}
        <ol>{(x.steps || []).map((t, i) => <li key={i}>{t}</li>)}</ol>
        {x.tip ? <p className="tip">Tip · {x.tip}</p> : null}
      </div>
    </div>
  );
}

const MUSCLES = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Glutes', 'Core', 'Cardio', 'Mobility'];
const EQUIP = [['All', 'All'], ['n', 'Bodyweight'], ['d', 'Dumbbell'], ['b', 'Barbell'], ['m', 'Machine / cable']];

export default function Workout({ prefs, setPrefs, onDone }) {
  const [plan, setPlan] = useState(null);
  const [planId, setPlanId] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notes, setNotes] = useState('');
  const [lf, setLf] = useState({ q: '', mu: 'All', eq: 'All', n: 12 });
  const set = (k) => (v) => setPrefs({ ...prefs, [k]: v });

  async function generate() {
    setBusy(true); setPlan({ loading: true });
    const p = await generatePlan(prefs, notes);
    setPlan(p); setPlanId((i) => i + 1); setBusy(false);
  }
  function usePreset(name) {
    setPlan(presetPlan(name)); setPlanId((i) => i + 1);
    setTimeout(() => document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }
  const lib = useMemo(() => X.filter((x) => (lf.mu === 'All' || x[1] === lf.mu) && (lf.eq === 'All' || x[2] === lf.eq) && (!lf.q || x[0].toLowerCase().includes(lf.q))), [lf.mu, lf.eq, lf.q]);

  return (
    <section className="on">
      <div className="glass card">
        <h2>Quick machine days</h2>
        <p className="s">Ready-made sessions on gym machines and cables.</p>
        <div className="chips">{Object.keys(PRESETS).map((k) => <button key={k} className="chip" onClick={() => usePreset(k)}>{k}</button>)}</div>
      </div>

      <div className="glass card">
        <h2>Your AI personal trainer</h2>
        <p className="s">Tell the coach about you. It designs the session and shows every move.</p>
        <label className="l">Goal</label><ChipRow items={OPTIONS.goal} value={prefs.goal} onChange={set('goal')} />
        <label className="l">Focus</label><ChipRow items={OPTIONS.focus} value={prefs.focus} onChange={set('focus')} />
        <label className="l">Equipment</label><ChipRow items={OPTIONS.eq} value={prefs.eq} onChange={set('eq')} />
        <label className="l">Level</label><ChipRow items={OPTIONS.lvl} value={prefs.lvl} onChange={set('lvl')} />
        <label className="l">Time available</label><ChipRow items={OPTIONS.time} value={prefs.time} onChange={set('time')} />
        <label className="l">Injuries or preferences (optional)</label>
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. sensitive knees, no jumping" />
        <button className="btn" style={{ width: '100%', marginTop: 14 }} disabled={busy} onClick={generate}>{busy ? 'Your AI coach is designing…' : plan ? 'Ask AI coach again' : 'Ask AI coach'}</button>
      </div>

      <div id="plan">
        {plan?.loading && <div className="glass card hero"><p className="s">Analysing your goal, equipment and level…</p></div>}
        {plan && !plan.loading && (
          <>
            <div className="glass card hero">
              <small className="badge">{plan.badge}</small>
              <h2>{plan.title}</h2>
              <p className="s">{plan.intro} Rest 45–60 s between sets. About {+plan.kcal || 250} kcal.</p>
              <div className="row"><button className="btn" onClick={() => onDone(+plan.kcal || 250, parseInt(prefs.time))}>Mark workout done</button></div>
            </div>
            {plan.ex.map((x, i) => <ExerciseCard key={planId + '-' + i} x={x} />)}
          </>
        )}
      </div>

      <div className="glass card">
        <div className="wk"><h2>Exercise library</h2><small>{lib.length} exercises</small></div>
        <input type="text" value={lf.q} onChange={(e) => setLf({ ...lf, q: e.target.value.toLowerCase(), n: 12 })} placeholder="Search: fly, lat pulldown, triceps…" />
        <ChipRow items={MUSCLES} value={lf.mu} onChange={(v) => setLf({ ...lf, mu: v, n: 12 })} />
        <ChipRow items={EQUIP} value={lf.eq} onChange={(v) => setLf({ ...lf, eq: v, n: 12 })} />
        {lib.slice(0, lf.n).map((x) => <ExerciseCard key={x[0]} x={exObj(x)} />)}
        {lib.length > lf.n && <button className="btn g" style={{ width: '100%' }} onClick={() => setLf({ ...lf, n: lf.n + 12 })}>Show more ({lib.length - lf.n})</button>}
      </div>
    </section>
  );
}
