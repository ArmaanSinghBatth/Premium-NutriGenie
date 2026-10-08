import { X, STEPS, TN } from './exercises';
import { PS } from './poses';

export const OPTIONS = {
  goal: ['Lose fat', 'Gain muscle', 'Both'],
  focus: ['Full body', 'Upper', 'Lower', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Glutes', 'Core'],
  eq: ['No equipment', 'Dumbbells', 'Gym machines', 'Full gym'],
  lvl: ['Beginner', 'Intermediate', 'Advanced'],
  time: ['10 min', '15 min', '20 min', '30 min', '45 min', '60 min', '75 min', '90 min'],
};
export const exObj = (x) => ({ name: x[0], sets: x[5], muscle: x[1], pose: x[6], prop: x[7] || 'none', steps: STEPS[x[6]], tip: x[8] || '' });

const sh = (a) => a.slice().sort(() => Math.random() - 0.5);
function pick(arr, n) {
  const g = {};
  sh(arr).forEach((x) => (g[x[1]] = g[x[1]] || []).push(x));
  const ks = sh(Object.keys(g)), o = [];
  while (o.length < n && ks.some((k) => g[k].length)) for (const k of ks) if (o.length < n && g[k].length) o.push(g[k].shift());
  return o;
}

// Built-in coach: builds a balanced plan from the library.
export function localPlan(P) {
  const N = TN[P.time];
  const G = { Upper: ['Chest', 'Back', 'Shoulders', 'Arms'], Lower: ['Legs', 'Glutes'], Legs: ['Legs', 'Glutes'] };
  const eq = (x) => P.eq === 'Full gym' || (P.eq === 'No equipment' && x[2] === 'n') || (P.eq === 'Dumbbells' && 'nd'.includes(x[2])) || (P.eq === 'Gym machines' && x[2] === 'm');
  const inF = (x) => P.focus === 'Full body' || (G[P.focus] ? G[P.focus].includes(x[1]) : x[1] === P.focus);
  const base = X.filter(eq);
  let S = base.filter((x) => x[4] === 's' && inF(x)), C = base.filter((x) => x[4] === 'c'), note = '';
  if (P.lvl === 'Beginner') {
    const s2 = S.filter((x) => !x[3]); if (s2.length >= Math.min(N / 2, 4)) S = s2;
    const c2 = C.filter((x) => !x[3]); if (c2.length) C = c2;
  }
  if (S.length < 2) { S = base.filter((x) => x[4] === 's'); note = ' Limited options for that focus, so muscle groups are mixed.'; }
  const nc = P.goal === 'Lose fat' ? Math.ceil(N * 0.4) : P.goal === 'Both' ? Math.ceil(N * 0.25) : N >= 10 ? 1 : 0;
  const cs = pick(C, Math.min(nc, C.length)), ss = pick(S, Math.min(N - 1 - cs.length, S.length));
  const l = ss.concat(cs).concat(sh(X.filter((x) => x[4] === 'f')).slice(0, N >= 8 ? 2 : 1));
  return {
    title: `${P.goal} · ${P.time}`,
    intro: `${l.length} exercises: ${P.focus.toLowerCase()}, ${P.eq.toLowerCase()}.${note}`,
    kcal: Math.round(N * (P.goal === 'Lose fat' ? 60 : P.goal === 'Both' ? 52 : 42)),
    ex: l.map(exObj),
  };
}

export const PRESETS = {
  'Chest day': ['Pec Deck Fly (Chest Fly Machine)', 'Chest Press Machine', 'Incline Chest Press Machine (upper chest)', 'Decline Chest Press Machine (lower chest)', 'Cable Fly Low-to-High (upper chest)', 'Cable Fly High-to-Low (lower chest)', 'Triceps Rope Pushdown'],
  'Back & lats': ['Wide-grip Lat Pulldown', 'Close-grip Pulldown', 'Reverse-grip Lat Pulldown', 'Seated Cable Row', 'Straight-arm Pulldown', 'Assisted Pull-up Machine', 'Reverse Pec Deck (Rear Delt)', 'Back Extension'],
  'Triceps & biceps': ['Triceps Rope Pushdown', 'Overhead Cable Triceps Extension', 'Machine Triceps Extension', 'Triceps Dip Machine', 'Cable Bicep Curl', 'Preacher Curl Machine', 'Rope Hammer Curl'],
  'Leg day': ['Leg Press', 'Hack Squat Machine', 'Leg Extension Machine', 'Seated Leg Curl Machine', 'Hip Abductor Machine', 'Hip Adductor Machine', 'Standing Calf Raise Machine'],
  Shoulders: ['Shoulder Press Machine', 'Lateral Raise Machine', 'Cable Lateral Raise', 'Reverse Pec Deck (Rear Delt)', 'Cable Face Pull'],
};
export function presetPlan(name) {
  const l = PRESETS[name].map((n) => X.find((x) => x[0] === n)).filter(Boolean).concat(X.filter((x) => x[0] === 'Forward Fold Reach'));
  return { title: name + ' · machines', intro: l.length + ' exercises on machines and cables.', kcal: l.length * 38, ex: l.map(exObj), badge: 'Machine day' };
}

function prompt(P, notes) {
  const N = TN[P.time];
  return `You are an elite strength & conditioning coach. Design a ${P.time} workout of exactly ${N} exercises.
Goal: ${P.goal === 'Both' ? 'lose fat AND gain muscle (strength work plus a fat-burning finisher)' : P.goal}. Focus: ${P.focus}. Equipment available: ${P.eq}. Level: ${P.lvl}. Notes/limits: ${notes || 'none'}.
Equipment meaning: No equipment=bodyweight only; Dumbbells=bodyweight plus dumbbells; Gym machines=selectorised machines, cables and cardio machines (name the specific machine); Full gym=any machine, barbell, dumbbell, cable or cardio machine. Only use what the equipment option allows. Vary the exercises, cover different muscle groups, never repeat a movement pattern, and finish with a short stretch.
Return ONLY JSON: {"title":str,"intro":str (max 25 words),"kcal":int,"ex":[{"name":str,"sets":"e.g. 3 × 10","muscle":str,"pose":one of ${Object.keys(PS).join('|')} (best matches the movement),"prop":"none|plate|db","steps":[3-5 short form cues],"tip":str (max 12 words)}]}`;
}

// Asks your server (/api/coach -> Claude). Falls back to the built-in coach.
export async function generatePlan(P, notes) {
  try {
    const r = await fetch('/api/coach', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: prompt(P, notes) }) });
    if (!r.ok) throw 0;
    const j = await r.json();
    if (!j.ex || !j.ex.length) throw 0;
    return { ...j, badge: 'Designed by AI coach' };
  } catch (e) {
    return { ...localPlan(P), badge: 'Built-in coach' };
  }
}
