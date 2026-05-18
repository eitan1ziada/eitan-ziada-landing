"use client";
import { useState, useEffect } from "react";

const he = {
  dir: "rtl",
  nav: ["מי אני", "כישורים", "שירותים", "עבודות", "חוות דעת", "צור קשר"],
  name: "איתן ציאדה",
  role: "מפתח Full Stack | בן 20",
  tagline: "בונה אתרים, אפליקציות ודפי נחיתה מקצועיים",
  sub: "הופך את הרעיון שלך למוצר דיגיטלי מהיר, יפה ועם תוצאות אמיתיות.",
  cta1: "דברו איתי",
  cta2: "עבודות",
  aboutTitle: "אודות",
  aboutText1: "אני איתן, מפתח Full Stack בן 20 עם תשוקה אמיתית לעולם הדיגיטל. מאז גיל צעיר הייתי מוקסם מהיכולת ליצור משהו מאפס — אתר, אפליקציה, מוצר — ולהביא אותו לחיים על המסך.",
  aboutText2: "הגישה שלי פשוטה: כל פרויקט מקבל ממני 100%. אני לא מסתפק בפחות מהכי טוב — עיצוב שנראה מקצועי, קוד שעובד מהיר, ותוצאות שמדברות בעד עצמן.",
  techTitle: "טכנולוגיות",
  stats: [
    { n: "20+", l: "פרויקטים" },
    { n: "100%", l: "מסירות" },
    { n: "24/6", l: "זמינות" },
  ],
  servicesTitle: "שירותים",
  services: [
    { e: "🌐", t: "בניית אתרים", d: "אתרים מהירים, רספונסיביים ומותאמים אישית" },
    { e: "📱", t: "אפליקציות", d: "Web ו-Mobile מ-A עד Z" },
    { e: "🚀", t: "דפי נחיתה", d: "דפים שממירים גולשים ללקוחות משלמים" },
    { e: "🎨", t: "עיצוב UI/UX", d: "נקי, אינטואיטיבי ומרשים" },
    { e: "⚡", t: "אופטימיזציה", d: "מהירות, SEO וביצועים גבוהים" },
    { e: "🔧", t: "תחזוקה", d: "תמיכה ועדכונים שוטפים" },
  ],
  worksTitle: "עבודות",
  works: [
    { t: "חנות אונליין", tag: "E-Commerce" },
    { t: "אפליקציית SaaS", tag: "Web App" },
    { t: "דף נחיתה", tag: "Landing Page" },
  ],
  testiTitle: "חוות דעת",
  testimonials: [
    { name: "דוד לוי", role: "בעל מסעדה", text: "איתן בנה לנו אתר תוך שבוע. תוצאה מרהיבה ולקוחות חדשים כבר מגיעים דרכו." },
    { name: "שירה כהן", role: "מנהלת שיווק", text: "דף הנחיתה שבנה לנו העלה את ה-conversion ב-40%. מקצועי לגמרי." },
    { name: "יוסי מזרחי", role: "יזם", text: "עבדתי עם כמה מפתחים לפני איתן — אף אחד לא הגיע לרמה שלו." },
    { name: "מיכל אברהם", role: "עצמאית", text: "כל הלקוחות שואלים אותי איפה עשיתי את האתר. ממליצה בחום!" },
    { name: "רון שפירא", role: "מנכ\"ל", text: "מספק עבודה ברמת סוכנות במחיר הגון. הבין אותנו מהדקה הראשונה." },
    { name: "נועה גולן", role: "בלוגרית", text: "האתר שלי השתנה מקצה לקצה. איתן הוא כישרון אמיתי." },
  ],
  contactTitle: "צור קשר",
  contactSub: "יש לך פרויקט? בוא נדבר.",
  namePh: "שמך",
  phonePh: "מספר טלפון",
  emailPh: "כתובת מייל",
  msgPh: "ספר לי על הפרויקט...",
  send: "שלח",
  ok: "תודה! אחזור אליך בקרוב.",
  rights: "כל הזכויות שמורות",
};

const en = {
  dir: "ltr",
  nav: ["About Me", "Skills", "Services", "Works", "Reviews", "Contact"],
  name: "EITAN ZIADA",
  role: "Full Stack Developer | 20 y/o",
  tagline: "Building professional websites, apps and landing pages",
  sub: "Turning your idea into a fast, beautiful digital product with real results.",
  cta1: "Let's Talk",
  cta2: "My Work",
  aboutTitle: "About",
  aboutText1: "I'm Eitan, a 20-year-old Full Stack developer with a real passion for the digital world. Since a young age I was fascinated by the ability to create something from scratch and bring it to life on screen.",
  aboutText2: "My approach is simple: every project gets 100% from me. Professional design, fast code, and results that speak for themselves.",
  techTitle: "Tech Stack",
  stats: [
    { n: "20+", l: "Projects" },
    { n: "100%", l: "Dedication" },
    { n: "24/6", l: "Availability" },
  ],
  servicesTitle: "Services",
  services: [
    { e: "🌐", t: "Web Development", d: "Fast, responsive, custom websites" },
    { e: "📱", t: "Applications", d: "Web & Mobile apps A to Z" },
    { e: "🚀", t: "Landing Pages", d: "Pages that convert visitors" },
    { e: "🎨", t: "UI/UX Design", d: "Clean, intuitive and impressive" },
    { e: "⚡", t: "Optimization", d: "Speed, SEO and performance" },
    { e: "🔧", t: "Maintenance", d: "Ongoing support and updates" },
  ],
  worksTitle: "Works",
  works: [
    { t: "Online Store", tag: "E-Commerce" },
    { t: "SaaS App", tag: "Web App" },
    { t: "Landing Page", tag: "Landing Page" },
  ],
  testiTitle: "Reviews",
  testimonials: [
    { name: "David Levi", role: "Restaurant Owner", text: "Eitan built our website in a week. Stunning result and new customers are already coming through it." },
    { name: "Shira Cohen", role: "Marketing Manager", text: "The landing page he built raised our conversion by 40%. Totally professional." },
    { name: "Yossi Mizrahi", role: "Entrepreneur", text: "I worked with several developers before Eitan — none reached his level." },
    { name: "Michal Abraham", role: "Freelancer", text: "All my clients ask where I made my website. Highly recommend!" },
    { name: "Ron Shapira", role: "CEO", text: "Agency-level work at a fair price. He understood us from the first minute." },
    { name: "Noa Golan", role: "Blogger", text: "My website changed completely. Eitan is a real talent." },
  ],
  contactTitle: "Contact",
  contactSub: "Got a project? Let's talk.",
  namePh: "Your name",
  phonePh: "Phone number",
  emailPh: "Email address",
  msgPh: "Tell me about your project...",
  send: "Send",
  ok: "Thanks! I'll get back to you soon.",
  rights: "All rights reserved",
};

const techs = ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB"];

const bg      = "#020917";
const bgAlt   = "#0a1628";
const card    = "#0d1b2e";
const border  = "#1a3050";
const accent  = "#3b82f6";
const accentL = "#60a5fa";
const txt     = "#f1f5f9";
const txtMid  = "#94a3b8";

export default function Home() {
  const [lang, setLang] = useState<"he" | "en">("he");
  const [sent, setSent] = useState(false);
  const t = lang === "he" ? he : en;

  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { html.style.scrollBehavior = ''; });
  }, []);

  const ids = ["about", "skills", "services", "works", "reviews", "contact"];

  return (
    <div dir={t.dir as "rtl" | "ltr"} style={{ background: bg, color: txt, fontFamily: "system-ui, sans-serif" }}>

      {/* ── INTRO ── */}
      <div
        className="intro-overlay"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#020917",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          pointerEvents: "none", overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div className="intro-ambient" style={{
          position: "absolute", width: 800, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 68%)",
          pointerEvents: "none",
        }} />

        {/* Floating particles */}
        {([
          { x: -230, y:  70, delay: 0.5, size: 5, dx: -35 },
          { x: -180, y: -70, delay: 0.9, size: 3, dx:  22 },
          { x: -110, y: 130, delay: 1.2, size: 6, dx: -18 },
          { x:  230, y:  55, delay: 0.7, size: 4, dx:  28 },
          { x:  185, y: -85, delay: 1.1, size: 3, dx: -24 },
          { x:  130, y: 140, delay: 0.4, size: 5, dx:  12 },
          { x:  -55, y:-150, delay: 0.8, size: 3, dx: -28 },
          { x:   65, y:-160, delay: 1.4, size: 4, dx:  32 },
        ] as Array<{x:number;y:number;delay:number;size:number;dx:number}>).map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`,
            width: p.size, height: p.size, borderRadius: "50%",
            background: "#3b82f6", boxShadow: `0 0 ${p.size * 2}px #3b82f6`,
            animation: `floatParticle 2.2s ease ${p.delay}s infinite`,
            ["--dx" as string]: `${p.dx}px`,
          }} />
        ))}

        {/* Floating code symbols */}
        {([
          { x: -310, y:  10, text: "</>",  delay: 0.4 },
          { x:  310, y:  25, text: "{ }",  delay: 0.9 },
          { x: -330, y: -90, text: "fn()", delay: 1.2 },
          { x:  320, y: -70, text: "=>",   delay: 0.6 },
          { x:  -80, y:-180, text: "[ ]",  delay: 1.5 },
          { x:   90, y: 175, text: "&&",   delay: 1.0 },
        ] as Array<{x:number;y:number;text:string;delay:number}>).map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${c.x}px)`, top: `calc(50% + ${c.y}px)`,
            fontSize: 13, fontWeight: 700, fontFamily: "monospace",
            color: "rgba(59,130,246,0.45)",
            animation: `floatParticle 3s ease ${c.delay}s infinite`,
            ["--dx" as string]: `${(i % 2 === 0 ? -1 : 1) * 22}px`,
          }}>{c.text}</div>
        ))}

        {/* Phones wrapper */}
        <div className="intro-phones-wrap" style={{ display: "flex", gap: 44, alignItems: "center", position: "relative" }}>

          {/* ── טלפון שמאל — App Splash ── */}
          <div style={{ position: "relative" }}>
            <div style={{ position:"absolute", inset:-22, borderRadius:46, border:"1px solid rgba(59,130,246,0.22)", animation:"glowRingPulse 2.2s ease 1.1s infinite", pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:-44, borderRadius:58, border:"1px solid rgba(59,130,246,0.10)", animation:"glowRingPulse 2.2s ease 1.5s infinite", pointerEvents:"none" }} />
            <div className="intro-phone-left" style={{
              width: 188, height: 392, borderRadius: 38,
              border: "2px solid rgba(59,130,246,0.7)",
              background: "linear-gradient(165deg,#0c1c32 0%,#060f1e 100%)",
              boxShadow: "0 0 70px rgba(59,130,246,0.38), 0 32px 90px rgba(0,0,0,0.75), inset 0 0 30px rgba(59,130,246,0.06)",
              overflow: "hidden", position: "relative",
            }}>
              {/* Dynamic island */}
              <div style={{ width: 82, height: 13, background: "#020917", borderRadius: 10, margin: "11px auto 0" }} />
              <div className="intro-screen-content" style={{ padding: "14px 14px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
                {/* Scan line */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,rgba(59,130,246,0.7),transparent)", animation:"scanLine 1.6s ease 0.95s 2" }} />
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", textAlign: "right", marginBottom: 32 }}>9:41</p>
                {/* App icon */}
                <div className="intro-app-icon" style={{
                  width: 84, height: 84, borderRadius: 22,
                  background: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)",
                  margin: "0 auto 14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, fontWeight: 900, color: "#fff",
                  boxShadow: "0 16px 36px rgba(59,130,246,0.65), 0 0 0 10px rgba(59,130,246,0.1)",
                }}>EZ</div>
                <p style={{ fontSize: 14, color: "#fff", fontWeight: 800, marginBottom: 3 }}>Eitan Ziada</p>
                <p style={{ fontSize: 11, color: "rgba(96,165,250,0.9)", marginBottom: 5 }}>Full Stack Developer</p>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "monospace" }}>Initializing...</p>
                {/* Loading bar */}
                <div style={{ margin: "18px 16px 0", height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div className="intro-load-bar" style={{ height: "100%", background: "linear-gradient(90deg,#1d4ed8,#3b82f6,#60a5fa,#93c5fd)", borderRadius: 99, width: 0, boxShadow: "0 0 10px rgba(59,130,246,0.9)" }} />
                </div>
                {/* Stats */}
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: 90, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {[["20+","פרויקטים"],["100%","מסירות"],["24/6","זמין"]].map(([n,l],i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 12, fontWeight: 900, color: "#3b82f6" }}>{n}</div>
                      <div style={{ fontSize: 7, color: "rgba(255,255,255,0.28)" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── טלפון ימין — Website Preview ── */}
          <div style={{ position: "relative" }}>
            <div style={{ position:"absolute", inset:-22, borderRadius:46, border:"1px solid rgba(59,130,246,0.22)", animation:"glowRingPulse 2.2s ease 1.3s infinite", pointerEvents:"none" }} />
            <div className="intro-phone-right" style={{
              width: 188, height: 392, borderRadius: 38,
              border: "2px solid rgba(59,130,246,0.7)",
              background: "linear-gradient(165deg,#0c1c32 0%,#060f1e 100%)",
              boxShadow: "0 0 70px rgba(59,130,246,0.38), 0 32px 90px rgba(0,0,0,0.75), inset 0 0 30px rgba(59,130,246,0.06)",
              overflow: "hidden", position: "relative",
            }}>
              {/* Dynamic island */}
              <div style={{ width: 82, height: 13, background: "#020917", borderRadius: 10, margin: "11px auto 0" }} />
              <div className="intro-screen-content" style={{ padding: "8px 11px", position: "relative", overflow: "hidden" }}>
                {/* Scan line */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,rgba(59,130,246,0.7),transparent)", animation:"scanLine 1.6s ease 1.15s 2" }} />
                {/* Nav */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8, padding:"2px 2px" }}>
                  <span style={{ fontSize:12, color:"#3b82f6", fontWeight:900 }}>EZ.</span>
                  <div style={{ display:"flex", gap:4 }}>
                    {[1,2,3].map(i => <div key={i} style={{ width:16, height:4, background:"rgba(255,255,255,0.15)", borderRadius:2 }} />)}
                  </div>
                </div>
                {/* Hero */}
                <div style={{ textAlign:"center", padding:"10px 0 10px", borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:8 }}>
                  <div style={{ fontSize:18, fontWeight:900, color:"#fff", letterSpacing:"-1px", lineHeight:1.15 }}>EITAN<br/>ZIADA</div>
                  <div style={{ width:38, height:2, background:"linear-gradient(90deg,#3b82f6,#60a5fa)", borderRadius:99, margin:"5px auto" }} />
                  <div style={{ fontSize:7, color:"rgba(255,255,255,0.32)", marginBottom:7 }}>Full Stack Developer</div>
                  <div style={{ display:"flex", gap:5, justifyContent:"center" }}>
                    <div style={{ background:"#3b82f6", borderRadius:4, padding:"3px 10px", fontSize:7, color:"#fff", fontWeight:700 }}>צור קשר</div>
                    <div style={{ border:"1px solid rgba(255,255,255,0.2)", borderRadius:4, padding:"3px 10px", fontSize:7, color:"rgba(255,255,255,0.7)" }}>עבודות</div>
                  </div>
                </div>
                {/* Service cards */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5, marginBottom:8 }}>
                  {[["🌐","Web Dev"],["📱","Apps"],["🚀","Landing"],["🎨","UI/UX"]].map(([ic,lb],i) => (
                    <div key={i} style={{ background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:6, padding:"6px 4px", textAlign:"center" }}>
                      <div style={{ fontSize:14 }}>{ic}</div>
                      <div style={{ fontSize:7, color:"rgba(255,255,255,0.45)", marginTop:2 }}>{lb}</div>
                    </div>
                  ))}
                </div>
                {/* Tech pills */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:3, marginBottom:10 }}>
                  {["React","Next.js","Node.js"].map(t => (
                    <span key={t} style={{ fontSize:6, padding:"2px 7px", borderRadius:99, background:"rgba(59,130,246,0.12)", color:"#60a5fa", border:"1px solid rgba(59,130,246,0.22)" }}>{t}</span>
                  ))}
                </div>
                {/* Bottom nav */}
                <div style={{ display:"flex", justifyContent:"space-around", paddingTop:8, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  {[["🏠","בית"],["💼","עבודות"],["✉️","קשר"]].map(([ic,lb],i) => (
                    <div key={i} style={{ textAlign:"center", opacity:i===0?1:0.38 }}>
                      <div style={{ fontSize:13 }}>{ic}</div>
                      <div style={{ fontSize:6, color:"rgba(255,255,255,0.38)", marginTop:1 }}>{lb}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Label */}
        <p className="intro-label" style={{
          marginTop: 40, fontSize: 11, fontWeight: 600,
          color: "rgba(96,165,250,0.65)", fontFamily: "monospace",
          textTransform: "uppercase",
        }}>{"< Loading your experience />"}</p>

      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: bg, borderBottom: `1px solid ${border}`,
        padding: "0 32px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontWeight: 900, fontSize: 20, color: accent }}>EZ.</span>
        <div style={{ display: "flex", gap: 28 }}>
          {t.nav.map((n, i) => (
            <a key={i} href={`#${ids[i]}`}
              style={{ fontSize: 14, color: txtMid, textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = accent)}
              onMouseLeave={e => (e.currentTarget.style.color = txtMid)}>
              {n}
            </a>
          ))}
        </div>
        <button onClick={() => setLang(l => l === "he" ? "en" : "he")}
          style={{ fontSize: 13, fontWeight: 700, color: accent, border: `1px solid ${border}`, background: "transparent", padding: "5px 14px", borderRadius: 6, cursor: "pointer" }}>
          {lang === "he" ? "EN" : "עב"}
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", background: bg, color: txt, textAlign: "center", padding: "120px 24px 100px", borderBottom: `1px solid ${border}` }}>
        <div className="hero-grid" />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 16, color: txtMid, marginBottom: 12 }}>{t.role}</p>
          <h1 style={{ fontSize: "clamp(40px,8vw,80px)", fontWeight: 900, letterSpacing: "-2px", marginBottom: 16, color: txt }}>
            {t.name}
          </h1>
          <p style={{ fontSize: 20, color: accentL, marginBottom: 10, fontWeight: 600 }}>{t.tagline}</p>
          <p style={{ fontSize: 16, color: txtMid, maxWidth: 460, margin: "0 auto 44px" }}>{t.sub}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact"
              style={{ padding: "14px 34px", borderRadius: 10, fontWeight: 700, fontSize: 15,
                background: accent, color: "#fff", textDecoration: "none",
                boxShadow: "0 6px 0 #1d4ed8, 0 10px 30px rgba(59,130,246,0.35)",
                transform: "translateY(0)", transition: "transform 0.12s, box-shadow 0.12s", display: "inline-block" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 3px 0 #1d4ed8, 0 5px 15px rgba(59,130,246,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 0 #1d4ed8, 0 10px 30px rgba(59,130,246,0.35)"; }}>
              {t.cta1}
            </a>
            <a href="#works"
              style={{ padding: "14px 34px", borderRadius: 10, fontWeight: 700, fontSize: 15,
                background: "transparent", color: txt, textDecoration: "none",
                border: `2px solid ${border}`,
                boxShadow: "0 6px 0 rgba(26,48,80,0.8), 0 10px 20px rgba(0,0,0,0.3)",
                transform: "translateY(0)", transition: "transform 0.12s, box-shadow 0.12s", display: "inline-block" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 3px 0 rgba(26,48,80,0.8), 0 5px 10px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 0 rgba(26,48,80,0.8), 0 10px 20px rgba(0,0,0,0.3)"; }}>
              {t.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "110px 24px", background: bg }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 16 }}>
            {lang === "he" ? "מי אני" : "Who I Am"}
          </p>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: txt, lineHeight: 1.2, marginBottom: 28 }}>
            {lang === "he" ? "מפתח שחושב כמו יזם" : "A Developer Who Thinks Like an Entrepreneur"}
          </h2>
          <div style={{ width: 48, height: 3, borderRadius: 99, background: accent, margin: "0 auto 36px" }} />
          <p style={{ color: txtMid, lineHeight: 2, fontSize: 17, marginBottom: 20 }}>{t.aboutText1}</p>
          <p style={{ color: txtMid, lineHeight: 2, fontSize: 17 }}>{t.aboutText2}</p>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background: bgAlt, padding: "96px 24px", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>
              {lang === "he" ? "מה אני יודע לעשות" : "What I Know"}
            </p>
            <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: txt, lineHeight: 1.2 }}>
              {lang === "he" ? "כישורים וטכנולוגיות" : "Skills & Technologies"}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { name: "React / Next.js", pct: 92 },
              { name: "TypeScript",      pct: 85 },
              { name: "Node.js",         pct: 80 },
              { name: "Tailwind CSS",    pct: 95 },
              { name: "MongoDB",         pct: 75 },
            ].map(s => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: txt }}>{s.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: accentL }}>{s.pct}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: border }}>
                  <div style={{ height: 8, borderRadius: 99, background: `linear-gradient(90deg, ${accent}, ${accentL})`, width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Git", "Figma", "Vercel", "REST API", "PostgreSQL", "Docker"].map(tag => (
              <span key={tag} style={{
                fontSize: 13, padding: "6px 16px", borderRadius: 99,
                background: card, color: txt, fontWeight: 600,
                border: `1px solid ${border}`,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Label text={t.servicesTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            {t.services.map((s, i) => (
              <div key={i} style={{ background: card, borderRadius: 12, padding: 22, border: `1px solid ${border}`, transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(59,130,246,0.15)`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{s.e}</span>
                <p style={{ fontWeight: 700, color: txt, marginBottom: 5 }}>{s.t}</p>
                <p style={{ fontSize: 13, color: txtMid, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKS ── */}
      <section id="works" style={{ background: bgAlt, padding: "80px 24px", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Label text={t.worksTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            {t.works.map((w, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, background: card }}>
                <div style={{ height: 140, background: `linear-gradient(135deg, ${accent}22, ${accentL}11)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: 40, opacity: 0.2 }}>🖥</span>
                  <span style={{ position: "absolute", bottom: 10, left: 12, fontSize: 11, fontWeight: 700, background: accent, color: "#fff", padding: "3px 10px", borderRadius: 5 }}>
                    {w.tag}
                  </span>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontWeight: 700, color: txt }}>{w.t}</p>
                  <p style={{ fontSize: 12, color: txtMid, marginTop: 3 }}>{lang === "he" ? "בקרוב" : "Coming soon"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" style={{ background: bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Label text={t.testiTitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            {t.testimonials.map((r, i) => (
              <div key={i} style={{ background: card, borderRadius: 12, padding: 22, border: `1px solid ${border}` }}>
                <p style={{ color: "#f59e0b", fontSize: 15, marginBottom: 10 }}>★★★★★</p>
                <p style={{ fontSize: 14, color: txtMid, lineHeight: 1.7, marginBottom: 16 }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: txt }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: txtMid }}>{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: bgAlt, padding: "36px 24px", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, textAlign: "center" }}>
          {t.stats.map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: 32, fontWeight: 900, color: accent }}>{s.n}</p>
              <p style={{ fontSize: 13, color: txtMid }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: bgAlt, padding: "80px 24px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Label text={t.contactTitle} />
          <p style={{ color: txtMid, marginTop: 8, marginBottom: 32 }}>{t.contactSub}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          <div style={{ background: card, borderRadius: 16, padding: 28, border: `1px solid ${border}` }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>👨‍💻</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: txt, marginBottom: 8 }}>{lang === "he" ? "איתן ציאדה" : "Eitan Ziada"}</h3>
            <p style={{ fontSize: 14, color: txtMid }}>Full Stack Developer</p>
            <div style={{ marginTop: 20, borderTop: `1px solid ${border}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <Row icon="📍" text={lang === "he" ? "ישראל" : "Israel"} />
              <Row icon="💼" text="Freelance" />
              <a href="tel:0546939291" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", fontSize: 14, color: accentL, fontWeight: 700 }}>
                <span>📞</span><span>054-693-9291</span>
              </a>
              <a href="https://wa.me/972546939291" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", fontSize: 14, color: "#4ade80", fontWeight: 700 }}>
                <span>💬</span><span>WhatsApp</span>
              </a>
            </div>
          </div>
          <div>
          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>✅</p>
              <p style={{ fontWeight: 700, fontSize: 16, color: txt }}>{t.ok}</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input required type="text" placeholder={t.namePh}
                style={{ padding: "12px 14px", borderRadius: 8, border: `1px solid ${border}`, background: card,
                  fontSize: 14, outline: "none", color: txt }}
                onFocus={e => (e.currentTarget.style.borderColor = accent)}
                onBlur={e => (e.currentTarget.style.borderColor = border)} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input required type="tel" placeholder={t.phonePh}
                  style={{ padding: "12px 14px", borderRadius: 8, border: `1px solid ${border}`, background: card,
                    fontSize: 14, outline: "none", color: txt }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = border)} />
                <input required type="email" placeholder={t.emailPh}
                  style={{ padding: "12px 14px", borderRadius: 8, border: `1px solid ${border}`, background: card,
                    fontSize: 14, outline: "none", color: txt }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = border)} />
              </div>
              <textarea required rows={4} placeholder={t.msgPh}
                style={{ padding: "12px 14px", borderRadius: 8, border: `1px solid ${border}`, background: card,
                  fontSize: 14, outline: "none", resize: "none", color: txt }}
                onFocus={e => (e.currentTarget.style.borderColor = accent)}
                onBlur={e => (e.currentTarget.style.borderColor = border)} />
              <button type="submit"
                style={{ padding: "13px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: accent, color: "#fff", fontWeight: 700, fontSize: 15 }}>
                {t.send}
              </button>
            </form>
          )}
          </div>
          </div>
        </div>
      </section>

      <footer style={{ background: card, color: txtMid, textAlign: "center", padding: "20px 24px", fontSize: 13, borderTop: `1px solid ${border}` }}>
        © 2025 {lang === "he" ? "איתן ציאדה" : "Eitan Ziada"} · {t.rights}
      </footer>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
      <div style={{ width: 4, height: 28, borderRadius: 2, background: "#3b82f6" }} />
      <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, color: "#f1f5f9" }}>{text}</h2>
    </div>
  );
}

function Row({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#94a3b8" }}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

// no HeroCanvas component — background handled via CSS classes in globals.css
