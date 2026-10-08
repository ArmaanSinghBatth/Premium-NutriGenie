export async function POST(req){
  const{prompt}=await req.json().catch(()=>({}));
  const key=process.env.ANTHROPIC_API_KEY;
  if(!key||!prompt||prompt.length>4000)return Response.json({error:'unavailable'},{status:503});
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',
    headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},
    body:JSON.stringify({model:process.env.ANTHROPIC_MODEL||'claude-sonnet-5-5',max_tokens:2000,messages:[{role:'user',content:prompt}]})});
  if(!r.ok)return Response.json({error:'upstream'},{status:502});
  const d=await r.json();
  const t=(d.content||[]).map(c=>c.text||'').join('').replace(/```json|```/g,'').trim();
  try{return Response.json(JSON.parse(t))}catch{return Response.json({error:'parse'},{status:502})}
}
