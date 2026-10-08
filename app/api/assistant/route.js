// Chat assistant endpoint. The app POSTs { messages:[{role,content}], context:{...} } and expects { reply: "..." }.
//
// TO USE YOUR OWN AI: set CUSTOM_AI_URL (and optionally CUSTOM_AI_KEY) in your environment.
// Your server must accept the same JSON body and return { reply: "..." }.
// Otherwise this route calls Claude using ANTHROPIC_API_KEY.
const SYS='You are Genie, the assistant inside the NutriGenie fitness app. Be warm, concise (max 110 words), practical and evidence-based. Use the user context. Plain text, no markdown. Never diagnose; suggest a doctor for medical concerns.';
export async function POST(req){
  const body=await req.json().catch(()=>null);
  const messages=(body?.messages||[]).slice(-12).map(m=>({role:m.role==='user'?'user':'assistant',content:String(m.content||'').slice(0,2000)}));
  if(!messages.length)return Response.json({error:'bad request'},{status:400});
  const context=body.context||{};
  if(process.env.CUSTOM_AI_URL){
    const r=await fetch(process.env.CUSTOM_AI_URL,{method:'POST',headers:{'content-type':'application/json',...(process.env.CUSTOM_AI_KEY?{authorization:'Bearer '+process.env.CUSTOM_AI_KEY}:{})},body:JSON.stringify({messages,context})});
    if(!r.ok)return Response.json({error:'upstream'},{status:502});
    return Response.json(await r.json());
  }
  const key=process.env.ANTHROPIC_API_KEY;
  if(!key)return Response.json({error:'unavailable'},{status:503});
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',
    headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},
    body:JSON.stringify({model:process.env.ANTHROPIC_MODEL||'claude-sonnet-5-5',max_tokens:400,system:SYS+'\nUser context: '+JSON.stringify(context),messages})});
  if(!r.ok)return Response.json({error:'upstream'},{status:502});
  const d=await r.json();
  return Response.json({reply:(d.content||[]).map(c=>c.text||'').join('').trim()});
}
