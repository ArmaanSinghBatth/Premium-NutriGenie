// ===== Genie assistant client =====
// To use YOUR OWN AI, do one of these:
//  1) Server side: set CUSTOM_AI_URL in .env (see app/api/assistant/route.js).
//  2) Client side: set window.NutriGenieAI = async (messages, context) => "reply text"
export const AI = { endpoint: '/api/assistant' };

export async function askAI(messages, context) {
  if (typeof window !== 'undefined' && window.NutriGenieAI) {
    return { reply: await window.NutriGenieAI(messages, context), mode: 'your AI' };
  }
  const x = await fetch(AI.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: messages.slice(-12), context }) });
  if (!x.ok) throw new Error('assistant unavailable');
  const j = await x.json();
  return { reply: j.reply, mode: 'your AI endpoint' };
}

// Small offline helper used when no AI is connected.
export function offlineReply(q, c) {
  q = q.toLowerCase();
  if (/water|hydrat/.test(q)) return `Aim for about 8 glasses a day. You've had ${c.waterGlasses} so far. Sip steadily and have one with every meal.`;
  if (/protein/.test(q)) return 'A good target is 1.6–2.2 g of protein per kg of body weight if you train. Spread it across meals: paneer, eggs, dal, tofu, chicken or Greek yogurt.';
  if (/track|progress|today/.test(q)) return `You're at ${c.steps.toLocaleString()} of ${c.stepGoal.toLocaleString()} steps and ${c.eatenKcal} of ${c.calorieGoal} kcal. ${c.steps < c.stepGoal / 2 ? 'A brisk walk would help most.' : 'Nice pace, keep going.'}`;
  if (/muscle|bulk|strength/.test(q)) return 'To build muscle: train each muscle twice a week, add load gradually, eat slightly above maintenance with enough protein, and sleep 7–9 hours.';
  if (/fat|weight|lose|cut/.test(q)) return 'For fat loss: a modest calorie deficit (about 300–500 kcal), high protein, daily walking and 3 strength sessions a week. Crash diets backfire.';
  if (/eat|meal|food|recipe|dinner|lunch|breakfast/.test(q)) return `Open the Chef tab and pick ${c.diet}, then your meal type. Aim for protein plus fibre on every plate.`;
  if (/workout|exercise|train/.test(q)) return `Open the Workout tab. With your goal (${c.goal}) and equipment (${c.equipment}), the coach will build a session in seconds.`;
  return "I'm in offline mode right now, so I can answer basics about water, protein, workouts, meals and your progress. Connect your AI to unlock full conversations.";
}
