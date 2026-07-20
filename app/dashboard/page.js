"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const starterProjects = [{ id: 1, name: "Mega Facts", niche: "Ilm-fan va qiziqarli faktlar", status: "Faol" }];

export default function Dashboard() {
  const [tab,setTab]=useState("studio");
  const [projects,setProjects]=useState(starterProjects);
  const [library,setLibrary]=useState([]);
  const [busy,setBusy]=useState(false);
  const [notice,setNotice]=useState("");
  const [result,setResult]=useState("");
  const [form,setForm]=useState({topic:"Sun’iy intellekt haqida odamlar bilmaydigan 10 ta fakt",niche:"Ilm-fan va texnologiya",audience:"18–44 yosh, qiziquvchan tomoshabinlar",language:"O‘zbekcha",format:"16–20 daqiqalik YouTube video",tone:"Qiziqarli va ishonchli",type:"script"});

  useEffect(()=>{try{setProjects(JSON.parse(localStorage.getItem("tf-projects"))||starterProjects);setLibrary(JSON.parse(localStorage.getItem("tf-library"))||[])}catch{}},[]);
  const saveProjects=p=>{setProjects(p);localStorage.setItem("tf-projects",JSON.stringify(p))};
  const saveLibrary=l=>{setLibrary(l);localStorage.setItem("tf-library",JSON.stringify(l))};
  const words=useMemo(()=>result.trim()?result.trim().split(/\s+/).length:0,[result]);

  async function generate(e){e.preventDefault();setBusy(true);setNotice("");setResult("");try{const response=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const data=await response.json();if(!response.ok)throw new Error(data.error||"Generatsiya xatosi");setResult(data.content);setNotice(data.demo?"Demo rejim: Vercel’da OPENAI_API_KEY qo‘shilsa real AI ishlaydi.":`Real AI natijasi · ${data.model}`)}catch(err){setNotice(err.message)}finally{setBusy(false)}}
  function addProject(e){e.preventDefault();const fd=new FormData(e.currentTarget);const name=fd.get("name")?.trim();if(!name)return;saveProjects([...projects,{id:Date.now(),name,niche:fd.get("niche")||"Umumiy",status:"Faol"}]);e.currentTarget.reset()}
  function storeResult(){if(!result)return;saveLibrary([{id:Date.now(),title:form.topic,type:form.type,content:result,date:new Date().toLocaleDateString("uz-UZ")},...library]);setNotice("Natija kutubxonaga saqlandi.")}

  return <main className="appShell">
    <aside className="sidebar"><Link className="brand" href="/"><span>▶</span> TubeFlow <b>AI</b></Link><div className="workspace"><small>ISH MAYDONI</small><b>Otabek Studio</b></div><nav>{[["studio","✦","AI studiya"],["projects","▦","Loyihalar"],["library","▤","Kutubxona"],["calendar","◫","Kontent reja"]].map(([id,icon,name])=><button className={tab===id?"active":""} onClick={()=>setTab(id)} key={id}><i>{icon}</i>{name}</button>)}</nav><div className="sideBottom"><div className="apiDot"><i></i><span><b>AI holati</b><small>Demo yoki OpenAI</small></span></div><Link href="/">← Bosh sahifa</Link></div></aside>
    <section className="workspaceMain">
      <header className="dashHeader"><div><small>TUBEFLOW WORKSPACE</small><h1>{tab==="studio"?"AI kontent studiyasi":tab==="projects"?"Loyihalar":tab==="library"?"Kontent kutubxonasi":"Kontent rejasi"}</h1></div><div className="avatar">OG</div></header>

      {tab==="studio"&&<div className="studioGrid"><form className="generator glass" onSubmit={generate}><div className="panelTitle"><span>✦</span><div><h2>Yangi kontent yarating</h2><p>Kanal ma’lumotlari asosida professional natija oling.</p></div></div><label>Mavzu yoki vazifa<textarea value={form.topic} onChange={e=>setForm({...form,topic:e.target.value})} required rows="4"/></label><div className="formGrid"><label>Nisha<input value={form.niche} onChange={e=>setForm({...form,niche:e.target.value})}/></label><label>Auditoriya<input value={form.audience} onChange={e=>setForm({...form,audience:e.target.value})}/></label><label>Format<select value={form.format} onChange={e=>setForm({...form,format:e.target.value})}><option>16–20 daqiqalik YouTube video</option><option>8–10 daqiqalik YouTube video</option><option>60 soniyalik Shorts</option></select></label><label>Ohang<select value={form.tone} onChange={e=>setForm({...form,tone:e.target.value})}><option>Qiziqarli va ishonchli</option><option>Hujjatli va jiddiy</option><option>Sodda va do‘stona</option><option>Energetik va viral</option></select></label><label>Til<select value={form.language} onChange={e=>setForm({...form,language:e.target.value})}><option>O‘zbekcha</option><option>Inglizcha</option><option>Ruscha</option></select></label><label>Natija turi<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="script">To‘liq ssenariy</option><option value="ideas">10 ta video g‘oyasi</option><option value="titles">Sarlavha va thumbnail</option><option value="outline">Video rejasi</option></select></label></div><button className="btn generate" disabled={busy}>{busy?<><i className="spinner"></i> AI ishlamoqda...</>:"✦ AI bilan yaratish"}</button>{notice&&<div className="notice">{notice}</div>}</form>
      <section className="output glass"><div className="outputTop"><div><small>NATIJA</small><h2>{result?form.topic:"Natija shu yerda chiqadi"}</h2></div>{result&&<span>{words} so‘z</span>}</div>{result?<><pre>{result}</pre><div className="outputActions"><button onClick={()=>navigator.clipboard.writeText(result)}>Nusxalash</button><button onClick={storeResult}>Kutubxonaga saqlash</button></div></>:<div className="empty"><span>✦</span><p>Sozlamalarni kiriting va “AI bilan yaratish” tugmasini bosing.</p></div>}</section></div>}

      {tab==="projects"&&<div className="twoCol"><form className="glass compactForm" onSubmit={addProject}><h2>Yangi loyiha</h2><label>Kanal nomi<input name="name" required placeholder="Masalan: Mega Facts"/></label><label>Nisha<input name="niche" placeholder="Masalan: Ilm-fan"/></label><button className="btn">Loyiha qo‘shish</button></form><div className="projectList">{projects.map(p=><article className="glass project" key={p.id}><span>{p.name.slice(0,2).toUpperCase()}</span><div><h3>{p.name}</h3><p>{p.niche}</p></div><i>{p.status}</i><button onClick={()=>saveProjects(projects.filter(x=>x.id!==p.id))}>×</button></article>)}</div></div>}
      {tab==="library"&&<div className="libraryGrid">{library.length?library.map(x=><article className="glass libraryCard" key={x.id}><small>{x.type} · {x.date}</small><h3>{x.title}</h3><p>{x.content.slice(0,180)}…</p><button onClick={()=>{setResult(x.content);setForm({...form,topic:x.title,type:x.type});setTab("studio")}}>Ochish →</button></article>):<div className="glass empty large"><span>▤</span><h2>Kutubxona hozircha bo‘sh</h2><p>AI studiyada natija yarating va saqlang.</p></div>}</div>}
      {tab==="calendar"&&<Calendar library={library}/>} 
    </section>
  </main>
}

function Calendar({library}){const days=["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba","Yakshanba"];return <div className="calendar">{days.map((d,i)=><div className="glass day" key={d}><b>{d}</b><small>{20+i} iyul</small>{library[i]&&<article><span>{library[i].type}</span><p>{library[i].title}</p></article>}</div>)}</div>}
