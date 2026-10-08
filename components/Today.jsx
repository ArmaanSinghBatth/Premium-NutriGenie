'use client';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import CountUp from './CountUp';

const RAD = [92, 76, 60, 44];
const CIRC = RAD.map((r) => 2 * Math.PI * r);
const COL = [['#f6dd95', '#d4a84b'], ['#ff6a78', '#e1293b'], ['#ffffff', '#cfc8ba'], ['#e3c06a', '#8f6a22']];
const TILES = [['steps', 'Steps', 'steps'], ['fire', 'Burned', 'kcal'], ['chef', 'Eaten', 'kcal'], ['drop', 'Water', 'glasses']];
const QUOTES = ['Small steps, taken daily, build golden habits.', 'Strong body, calm mind, steady fuel.', 'Discipline is the quiet engine of progress.', 'Show up today; future you will say thanks.', 'Fuel well, move often, rest deeply.', 'Progress beats perfection every single time.', 'Your only rival is yesterday’s you.'];
const keyOf = (i) => new Date(Date.now() - i * 864e5).toDateString();

export default function Today({ S, goals, setGoals, H, add, reset, go, sensor }) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 60); return () => clearTimeout(t); }, []);

  const P4 = [S.steps / Math.max(goals.steps, 1), S.burn / 500, S.cal / Math.max(goals.cal, 1), S.water / 8];
  const score = Math.round((P4.reduce((a, p) => a + Math.min(p, 1), 0) / 4) * 100);
  const now = new Date(), hr = now.getHours();
  const greet = hr < 12 ? 'Good morning,' : hr < 18 ? 'Good afternoon,' : 'Good evening,';
  const date = now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();
  const vals = [6, 5, 4, 3, 2, 1, 0].map((i) => (i ? H[keyOf(i)] || 0 : S.steps));
  const mx = Math.max(goals.steps, ...vals, 1);
  let n = S.steps > 0 ? 0 : 1;
  while (n < 60 && ((n ? H[keyOf(n)] : S.steps) || 0) > 0) n++;
  const streak = S.steps > 0 ? n : Math.max(n - 1, 0);
  const pct = Math.round(P4[0] * 100);
  const insight = P4[0] < 0.5 ? `You're at ${pct}% of your step goal. A brisk 20-minute walk would close much of the gap.`
    : P4[2] < 0.4 && hr > 12 ? 'Your meals are light today. Pick a balanced recipe in Chef to stay fuelled.'
    : P4[3] < 0.5 ? 'Hydration is lagging. Tap a droplet and have a glass of water.'
    : 'You are on track. Finish strong with a short workout.';
  const values = [S.steps, S.burn, S.cal, S.water];

  return (
    <section className="on">
      <div className="glass tdy">
        <div className="hh">
          <div><small>{date}</small><h3>{greet} <em>Champion</em></h3></div>
          <div className="streak"><b>{streak}</b><small>DAY STREAK</small></div>
        </div>
        <div className="conc">
          <svg viewBox="0 0 220 220">
            <defs>{COL.map((c, i) => <linearGradient key={i} id={`gr${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c[0]} /><stop offset="1" stopColor={c[1]} /></linearGradient>)}</defs>
            {RAD.map((r, i) => (
              <g key={i}>
                <circle className="tr" cx="110" cy="110" r={r} />
                <circle className="pg" cx="110" cy="110" r={r} stroke={`url(#gr${i})`} strokeDasharray={CIRC[i]} strokeDashoffset={CIRC[i] * (1 - (on ? Math.min(P4[i], 1) : 0))} transform="rotate(-90 110 110)" />
              </g>
            ))}
          </svg>
          <div className="mid"><small>DAILY SCORE</small><b className="big"><CountUp value={score} /></b></div>
        </div>
        <div className="legend">
          <span><i style={{ background: '#d4a84b' }} />Steps</span><span><i style={{ background: '#e1293b' }} />Burn</span>
          <span><i style={{ background: '#f5f2ec' }} />Eaten</span><span><i style={{ background: '#b8892f' }} />Water</span>
        </div>
      </div>

      <div className="tiles">
        {TILES.map((t, i) => (
          <div className="tile glass" key={t[1]}>
            <div className="ti"><span><Icon n={t[0]} /></span><small>{t[1]}</small></div>
            <b className="big"><CountUp value={values[i]} /></b>
            <small className="u">{t[2]}</small>
            {i === 3 && <div className="drops" onClick={() => add('water', 1)}>{Array.from({ length: 8 }, (_, k) => <span key={k} className={k < S.water ? 'f' : ''}><Icon n="drop" /></span>)}</div>}
            <div className="bar"><i style={{ width: (on ? Math.min(P4[i], 1) * 100 : 0) + '%' }} /></div>
          </div>
        ))}
      </div>

      <div className="glass card">
        <div className="wk"><h2>This week</h2><small>{vals.reduce((a, b) => a + b, 0).toLocaleString()} steps</small></div>
        <div className="bars">
          {[6, 5, 4, 3, 2, 1, 0].map((i, j) => (
            <div className="col" key={i}>
              <div className="tk"><i style={{ height: Math.max((on ? vals[j] / mx : 0) * 100, 4) + '%' }} /></div>
              <small className={i ? '' : 'now'}>{'SMTWTFS'[new Date(Date.now() - i * 864e5).getDay()]}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="glass card insight">
        <small className="badge">GENIE INSIGHT</small>
        <p>{insight}</p>
        <p className="qt">“{QUOTES[Math.floor(Date.now() / 864e5) % QUOTES.length]}”</p>
        <div className="row"><button className="btn" onClick={() => go('workout')}>Plan my workout</button><button className="btn g" onClick={() => go('chef')}>Find a meal</button></div>
      </div>

      <div className="glass card">
        <h2>Device sync</h2>
        <p className="s">
          {sensor.status === 'tracking' ? 'Carry your phone while walking. Counts update live.'
            : sensor.status === 'unavailable' ? 'Motion sensor unavailable here. Use manual sync below.'
            : "Connect your phone's motion sensor to count steps live. Browsers can't read Apple Health or Google Fit directly, so you can also sync manually."}
        </p>
        <div className="row">
          <button className="btn" onClick={sensor.start} disabled={sensor.status === 'tracking'}>{sensor.status === 'tracking' ? 'Tracking steps…' : 'Start step tracking'}</button>
          <button className="btn g" onClick={() => add('steps', 1000)}>+1,000 steps</button>
          <button className="btn g" onClick={() => add('water', 1)}>+1 water</button>
        </div>
      </div>

      <div className="glass card">
        <h2>Goals</h2>
        <label className="l">Daily steps</label>
        <input type="number" value={goals.steps} onChange={(e) => setGoals({ ...goals, steps: +e.target.value || 0 })} />
        <label className="l">Calories to eat</label>
        <input type="number" value={goals.cal} onChange={(e) => setGoals({ ...goals, cal: +e.target.value || 0 })} />
        <div className="row"><button className="btn g" onClick={reset}>Reset today</button></div>
      </div>
    </section>
  );
}
