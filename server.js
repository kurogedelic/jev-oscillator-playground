import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir=path.dirname(fileURLToPath(import.meta.url));
const PORT=Number(process.env.PORT||3000);
const API_KEY=process.env.TYPESAFE_API_KEY;

const server=http.createServer(async(req,res)=>{
  if(req.method==="GET"&&(req.url==="/"||req.url==="/index.html")){
    res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
    return res.end(await readFile(path.join(dir,"index.html")));
  }
  if(req.method==="POST"&&req.url==="/api/generate"){
    if(!API_KEY){res.writeHead(500,{"content-type":"application/json"});return res.end(JSON.stringify({error:"TYPESAFE_API_KEY is not set"}))}
    let body=""; for await(const chunk of req) body+=chunk;
    try{
      const input=JSON.parse(body||"{}");
      const criteria={}; for(let i=0;i<16;i++) criteria[String(i)]=null;
      const questions={}; for(let i=0;i<32;i++) questions["s"+i]={type:"choice",instructions:`Choose amplitude 0-15 for sample ${i} of 32 at phase ${i}/32 of one coherent periodic oscillator waveform. 0 is minimum and 15 maximum.`,criteria};
      const upstream=await fetch("https://api.typesafe.ai/v1/systemone",{method:"POST",headers:{Authorization:"Bearer "+API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model:"jev-latest",state:{task:"Design one coherent 32-sample 4-bit periodic oscillator wavetable.",description:String(input.description||"")},questions})});
      const text=await upstream.text(); res.writeHead(upstream.status,{"content-type":"application/json"}); return res.end(text);
    }catch(e){res.writeHead(500,{"content-type":"application/json"});return res.end(JSON.stringify({error:e.message}))}
  }
  res.writeHead(404);res.end("Not found");
});
server.listen(PORT,()=>console.log(`Jev Oscillator Playground: http://localhost:${PORT}`));