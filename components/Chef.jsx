'use client';
import { useMemo, useState } from 'react';
import ChipRow from './ChipRow';
import { R } from '../lib/recipes';
import { art } from '../lib/foodArt';

function RecipeCard({ r, onLog }) {
  const [open, setOpen] = useState(false);
  const svg = useMemo(() => art(r[0]), [r]);
  return (
    <div className={'glass rc' + (open ? ' open' : '')} onClick={() => setOpen(!open)}>
      <div className="pic"><span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg }} /><i>{r[4]} kcal · {r[8]}</i></div>
      <div className="in">
        <b>{r[0]}</b>
        <div className="mac"><span>Protein {r[5]} g</span><span>Carbs {r[6]} g</span><span>Fat {r[7]} g</span></div>
        <div className="det">
          <b>Ingredients</b><ul>{r[9].map((x) => <li key={x}>{x}</li>)}</ul>
          <b>Method</b><ol>{r[10].map((x) => <li key={x}>{x}</li>)}</ol>
          <div className="row"><button className="btn" onClick={(e) => { e.stopPropagation(); onLog(r[4]); }}>Log {r[4]} kcal</button></div>
        </div>
      </div>
    </div>
  );
}

export default function Chef({ prefs, setPrefs, onLog }) {
  const [shown, setShown] = useState(false);
  const list = useMemo(() => {
    const ok = (r) => (prefs.diet === 'Vegan' ? r[2] === 'v' : prefs.diet === 'Veg' ? r[2] !== 'n' : r[2] === 'n');
    return R.filter((r) => ok(r) && r[3].includes(prefs.meal));
  }, [prefs.diet, prefs.meal]);
  return (
    <section className="on">
      <div className="glass card">
        <h2>What are we eating?</h2>
        <label className="l">Diet</label>
        <ChipRow items={['Veg', 'Non-veg', 'Vegan']} value={prefs.diet} onChange={(v) => { setPrefs({ ...prefs, diet: v }); setShown(true); }} />
        <label className="l">Meal</label>
        <ChipRow items={['Breakfast', 'Lunch', 'Dinner', 'Snack']} value={prefs.meal} onChange={(v) => { setPrefs({ ...prefs, meal: v }); setShown(true); }} />
        <button className="btn" style={{ width: '100%' }} onClick={() => setShown(true)}>Show recipes</button>
      </div>
      {shown && (list.length ? list.map((r) => <RecipeCard key={r[0] + prefs.diet + prefs.meal} r={r} onLog={onLog} />) : <div className="glass card">No recipes for that combination yet. Try another meal.</div>)}
    </section>
  );
}
