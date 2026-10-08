'use client';
import { useCallback, useEffect, useState } from 'react';
import Icon from './Icon';
import Logo from './Logo';
import Today from './Today';
import Workout from './Workout';
import Chef from './Chef';
import Genie from './Genie';
import Splash from './Splash';
import { usePersisted, todayKey, ZERO } from '../lib/store';
import { useStepSensor } from '../lib/useStepSensor';

const TABS = [['today', 'Today', 'home'], ['workout', 'Workout', 'dumb'], ['chef', 'Chef', 'chef'], ['ai', 'Genie', 'chat']];
const DEFAULT_PREFS = { goal: 'Both', focus: 'Full body', eq: 'No equipment', lvl: 'Beginner', time: '30 min', diet: 'Veg', meal: 'Breakfast' };

export default function App() {
  const [tab, setTab] = useState('today');
  const [daily, setDaily, ready] = usePersisted('ng', { day: todayKey(), S: ZERO });
  const [H, setH] = usePersisted('ng_h', {});
  const [goals, setGoals] = usePersisted('ng_goals', { steps: 8000, cal: 2000 });
  const [prefs, setPrefs] = usePersisted('ng_prefs', DEFAULT_PREFS);
  const [toast, setToast] = useState('');

  // Today's totals reset automatically when the date changes.
  const S = daily.day === todayKey() ? daily.S : ZERO;
  const update = useCallback((fn) => setDaily((d) => ({ day: todayKey(), S: fn(d.day === todayKey() ? d.S : ZERO) })), [setDaily]);
  const say = (m) => { setToast(m); setTimeout(() => setToast(''), 2000); };

  const add = (k, n) => {
    update((s) => ({ ...s, [k]: s[k] + n, burn: k === 'steps' ? s.burn + n * 0.04 : s.burn }));
    say('Synced');
  };
  const sensor = useStepSensor(() => update((s) => ({ ...s, steps: s.steps + 1, burn: s.burn + 0.04 })));

  useEffect(() => {
    if (ready) setH((h) => (h[todayKey()] === S.steps ? h : { ...h, [todayKey()]: S.steps }));
  }, [S.steps, ready, setH]);

  const ctx = { steps: S.steps, stepGoal: goals.steps, burnedKcal: Math.round(S.burn), eatenKcal: S.cal, calorieGoal: goals.cal, waterGlasses: S.water, diet: prefs.diet, goal: prefs.goal, equipment: prefs.eq, level: prefs.lvl };

  return (
    <>
      <Splash />
      {ready && <>
      <div className={'toast glass' + (toast ? ' on' : '')}>{toast}</div>
      <main>
        <header>
          <div className="brand">
            <div className="logo"><Logo /></div>
            <div><h1 className="wm">NUTRI<span>GENIE</span></h1><p className="s tag">TRAIN · EAT · GLOW</p></div>
          </div>
        </header>

        {tab === 'today' && <Today S={S} goals={goals} setGoals={setGoals} H={H} add={add} go={setTab} sensor={sensor} reset={() => update(() => ZERO)} />}
        {tab === 'workout' && <Workout prefs={prefs} setPrefs={setPrefs} onDone={(kcal, min) => { update((s) => ({ ...s, burn: s.burn + kcal, min: s.min + min })); say(`Logged ${kcal} kcal burned`); }} />}
        {tab === 'chef' && <Chef prefs={prefs} setPrefs={setPrefs} onLog={(k) => { update((s) => ({ ...s, cal: s.cal + k })); say('Meal logged'); }} />}
        {tab === 'ai' && <Genie ctx={ctx} />}
      </main>
      <nav className="glass">
        {TABS.map(([id, label, icon]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => { setTab(id); window.scrollTo(0, 0); }}>
            <em><Icon n={icon} /></em>{label}
          </button>
        ))}
      </nav>
      </>}
    </>
  );
}
