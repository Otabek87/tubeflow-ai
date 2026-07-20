import Link from "next/link";

const features = [
  ["01", "AI strategiya", "Nisha, auditoriya va maqsad asosida kontent g‘oyalari yarating."],
  ["02", "Ssenariy studiyasi", "Hook, asosiy bloklar, CTA va vizual ko‘rsatmalar bilan tayyor ssenariy oling."],
  ["03", "Kontent kutubxonasi", "Yaratilgan materiallarni saqlang, qidiring va keyingi ishlab chiqarishga tayyorlang."]
];

export default function Home() {
  return (
    <main>
      <header className="topbar shell">
        <Link className="brand" href="/"><span>▶</span> TubeFlow <b>AI</b></Link>
        <nav><a href="#imkoniyatlar">Imkoniyatlar</a><a href="#jarayon">Jarayon</a><a href="#tarif">Tariflar</a></nav>
        <Link className="btn small" href="/dashboard">Dashboardga kirish →</Link>
      </header>

      <section className="hero shell">
        <div className="heroCopy">
          <div className="pill">● YOUTUBE KELAJAGI — AVTOMATLASHTIRILGAN</div>
          <h1>Kontentni emas,<br/><em>tizimni boshqaring.</em></h1>
          <p>TubeFlow AI g‘oyadan ssenariygacha bo‘lgan jarayonni bitta professional ish maydoniga birlashtiradi.</p>
          <div className="actions"><Link className="btn" href="/dashboard">Bepul boshlash ↗</Link><a className="link" href="#jarayon">Jarayonni ko‘rish</a></div>
          <div className="metrics"><div><b>10×</b><span>tezroq ishlab chiqarish</span></div><div><b>80%</b><span>vaqt tejalishi</span></div><div><b>24/7</b><span>kontent tizimi</span></div></div>
        </div>
        <div className="preview glass">
          <div className="previewTop"><span>AI CONTENT ENGINE</span><i>● LIVE</i></div>
          <div className="previewTitle"><small>BUGUNGI NATIJA</small><h3>Kontent oqimi</h3></div>
          <div className="miniStats"><div><span>G‘oyalar</span><b>48</b></div><div><span>Ssenariylar</span><b>16</b></div><div><span>Tayyor</span><b>8</b></div></div>
          <div className="chart"><svg viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M0 135 C55 122 75 129 120 103 S190 113 238 76 S315 95 365 52 S445 59 500 15" fill="none" stroke="url(#line)" strokeWidth="5"/><defs><linearGradient id="line"><stop stopColor="#7858ff"/><stop offset="1" stopColor="#35dcff"/></linearGradient></defs></svg></div>
          <div className="activity"><span>✦</span><div><b>Yangi ssenariy tayyor</b><small>“AI kelajagi: 10 ta fakt”</small></div><em>Hozir</em></div>
        </div>
      </section>

      <section id="imkoniyatlar" className="section shell"><div className="sectionHead"><div><label>IMKONIYATLAR</label><h2>Bitta tizim. Cheksiz kontent.</h2></div><p>Kontent yaratishning eng muhim bosqichlarini aniq va boshqariladigan jarayonga aylantiring.</p></div><div className="featureGrid">{features.map(([n,t,d])=><article className="feature glass" key={n}><small>{n}</small><span>✦</span><h3>{t}</h3><p>{d}</p><Link href="/dashboard">Boshlash →</Link></article>)}</div></section>

      <section id="jarayon" className="process"><div className="shell section"><div className="center"><label>QANDAY ISHLAYDI?</label><h2>G‘oyadan tayyor ssenariygacha</h2></div><div className="stepGrid">{[["1","Loyiha","Kanal va auditoriyani kiriting"],["2","Sozlamalar","Format, ohang va davomiylikni tanlang"],["3","AI generatsiya","Mavzu yoki ssenariy yarating"],["4","Saqlash","Natijani kutubxonaga qo‘shing"]].map(x=><div className="step" key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></div></section>

      <section id="tarif" className="section shell"><div className="cta glass"><label>BIRINCHI QADAM</label><h2>Kontent tizimingizni bugun ishga tushiring.</h2><p>Dashboard ochiq. API kaliti ulanmaguncha demo rejimda xavfsiz sinab ko‘rishingiz mumkin.</p><Link className="btn" href="/dashboard">Studiyani ochish ↗</Link></div></section>
      <footer className="shell"><Link className="brand" href="/"><span>▶</span> TubeFlow <b>AI</b></Link><p>© 2026 TubeFlow AI</p></footer>
    </main>
  );
}
