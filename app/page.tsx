"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";

const translations = {
  he: {
    nav: ["אודות", "שירותים", "עבודות", "צור קשר"],
    hero_greeting: "היי, אני",
    hero_name: "איתן זיאדה",
    hero_age: "בן 20 | מפתח Full Stack",
    hero_sub: "אני הופך רעיונות לאתרים מדהימים, אפליקציות חכמות ודפי נחיתה שמוכרים.",
    hero_cta: "בואו נדבר",
    hero_cta2: "ראה עבודות",
    about_title: "אודות",
    about_heading: "מי אני?",
    about_text: "מפתח צעיר ונלהב עם תשוקה ליצירת חוויות דיגיטליות מרהיבות. אני מתמחה בבניית אתרים, אפליקציות ודפי נחיתה שמשלבים עיצוב מדהים עם ביצועים גבוהים.",
    services_title: "שירותים",
    services: [
      { icon: "🌐", title: "בניית אתרים", desc: "אתרים מותאמים אישית, מהירים ורספונסיביים" },
      { icon: "📱", title: "אפליקציות", desc: "אפליקציות מובייל ווב חכמות וחדשניות" },
      { icon: "🚀", title: "דפי נחיתה", desc: "דפי נחיתה שממירים גולשים ללקוחות" },
      { icon: "🎨", title: "עיצוב UI/UX", desc: "עיצוב ממשק משתמש יפה ואינטואיטיבי" },
      { icon: "⚡", title: "אופטימיזציה", desc: "שיפור מהירות וביצועים לאתרים קיימים" },
      { icon: "🔧", title: "תחזוקה", desc: "תמיכה ותחזוקה שוטפת לאתר שלך" },
    ],
    works_title: "עבודות אחרונות",
    works: [
      { title: "חנות אונליין", tag: "E-Commerce", color: "#6366f1" },
      { title: "אפליקציית SaaS", tag: "Web App", color: "#a855f7" },
      { title: "דף נחיתה", tag: "Landing Page", color: "#06b6d4" },
    ],
    contact_title: "צור קשר",
    contact_sub: "מוכן להתחיל? בואו נדבר על הפרויקט שלך",
    phone: "טלפון",
    send: "שלח הודעה",
    name_ph: "השם שלך",
    msg_ph: "ספר לי על הפרויקט שלך...",
    rights: "כל הזכויות שמורות",
    available: "זמין לפרויקטים חדשים",
    building: "בונה",
    stats: [
      { num: "20+", label: "פרויקטים" },
      { num: "100%", label: "שביעות רצון" },
      { num: "24/7", label: "זמינות" },
    ],
    success: "ההודעה נשלחה! אחזור אליך בקרוב.",
    whatsapp_label: "שלח הודעה",
  },
  en: {
    nav: ["About", "Services", "Works", "Contact"],
    hero_greeting: "Hey, I'm",
    hero_name: "Eitan Ziada",
    hero_age: "20 y/o | Full Stack Developer",
    hero_sub: "I turn ideas into stunning websites, smart apps, and high-converting landing pages.",
    hero_cta: "Let's Talk",
    hero_cta2: "See Work",
    about_title: "About",
    about_heading: "Who Am I?",
    about_text: "A young and passionate developer with a love for creating breathtaking digital experiences. I specialize in building websites, apps, and landing pages that combine stunning design with high performance.",
    services_title: "Services",
    services: [
      { icon: "🌐", title: "Web Development", desc: "Custom, fast and responsive websites" },
      { icon: "📱", title: "Applications", desc: "Smart and innovative mobile & web apps" },
      { icon: "🚀", title: "Landing Pages", desc: "Landing pages that convert visitors to customers" },
      { icon: "🎨", title: "UI/UX Design", desc: "Beautiful and intuitive user interface design" },
      { icon: "⚡", title: "Optimization", desc: "Speed and performance improvements" },
      { icon: "🔧", title: "Maintenance", desc: "Ongoing support and maintenance" },
    ],
    works_title: "Recent Works",
    works: [
      { title: "Online Store", tag: "E-Commerce", color: "#6366f1" },
      { title: "SaaS App", tag: "Web App", color: "#a855f7" },
      { title: "Landing Page", tag: "Landing Page", color: "#06b6d4" },
    ],
    contact_title: "Contact",
    contact_sub: "Ready to start? Let's talk about your project",
    phone: "Phone",
    send: "Send Message",
    name_ph: "Your name",
    msg_ph: "Tell me about your project...",
    rights: "All rights reserved",
    available: "Available for new projects",
    building: "Building",
    stats: [
      { num: "20+", label: "Projects" },
      { num: "100%", label: "Satisfaction" },
      { num: "24/7", label: "Availability" },
    ],
    success: "Message sent! I'll get back to you soon.",
    whatsapp_label: "Send Message",
  },
};

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-indigo-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<"he" | "en">("he");
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [scrolled, setScrolled] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [sent, setSent] = useState(false);

  const words = lang === "he"
    ? ["אתרים", "אפליקציות", "דפי נחיתה", "חוויות"]
    : ["Websites", "Applications", "Landing Pages", "Experiences"];

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const worksRef = useRef(null);
  const contactRef = useRef(null);

  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const worksInView = useInView(worksRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  const sections = ["about", "services", "works", "contact"];

  return (
    <main className="min-h-screen bg-[#030712] text-white" dir={lang === "he" ? "rtl" : "ltr"}>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 z-[100]"
        style={{ width: progressWidth }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass py-3 shadow-lg" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <motion.span className="text-xl font-bold gradient-text" whileHover={{ scale: 1.05 }}>
            EZ
          </motion.span>
          <div className="hidden md:flex items-center gap-8">
            {t.nav.map((item, i) => (
              <motion.a
                key={i}
                href={`#${sections[i]}`}
                className="text-sm text-slate-400 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          <motion.button
            onClick={() => setLang(lang === "he" ? "en" : "he")}
            className="glass px-4 py-2 rounded-full text-sm text-slate-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {lang === "he" ? "EN" : "HE"}
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
        <ParticleField />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-indigo-300"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {t.available}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-2"
          >
            {t.hero_greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-black mb-4 glow"
          >
            <span className="gradient-text">{t.hero_name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 mb-4 text-lg"
          >
            {t.hero_age}
          </motion.p>

          <div className="text-2xl md:text-3xl font-bold text-white mb-6 h-10 flex items-center justify-center gap-3">
            <span className="text-slate-400">{t.building}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="gradient-text"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-lg max-w-xl mx-auto mb-10"
          >
            {t.hero_sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold pulse-glow transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero_cta}
            </motion.a>
            <motion.a
              href="#works"
              className="px-8 py-4 glass hover:bg-white/10 text-white rounded-full font-semibold transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero_cta2}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-6" ref={aboutRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{t.about_title}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">{t.about_heading}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 float">
                  👨‍💻
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Eitan Ziada</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{t.about_text}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Next.js", "React", "TypeScript", "Node.js", "Tailwind"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-indigo-950/50 border border-indigo-800/50 text-indigo-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 gap-6"
            >
              {t.stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-2xl p-6 flex items-center gap-6"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-4xl font-black gradient-text">{s.num}</span>
                  <span className="text-slate-300 text-lg">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 relative" ref={servicesRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{t.services_title}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">{t.services_title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 group hover:border-indigo-500/30 transition-all duration-300 cursor-default"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400">{service.desc}</p>
                <div className="mt-4 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="py-32 px-6" ref={worksRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={worksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{t.works_title}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">{t.works_title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.works.map((work, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={worksInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer"
                whileHover={{ y: -8 }}
              >
                <div
                  className="h-48 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${work.color}20, ${work.color}05)` }}
                >
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, ${work.color}, transparent)` }}
                  />
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${work.color}30`, color: work.color, border: `1px solid ${work.color}50` }}
                    >
                      {work.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{work.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">Coming soon...</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6" ref={contactRef}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">{t.contact_title}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">{t.contact_title}</h2>
            <p className="text-slate-400 mt-4 text-lg">{t.contact_sub}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-6 p-4 bg-indigo-950/30 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-xl">📞</div>
              <div>
                <p className="text-slate-400 text-sm">{t.phone}</p>
                <a href="tel:0546939291" className="text-white font-bold text-xl hover:text-indigo-300 transition-colors">
                  054-693-9291
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-10 p-4 bg-indigo-950/30 rounded-2xl">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-xl">💬</div>
              <div>
                <p className="text-slate-400 text-sm">WhatsApp</p>
                <a
                  href="https://wa.me/972546939291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold text-xl hover:text-green-300 transition-colors"
                >
                  {t.whatsapp_label}
                </a>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <p className="text-white font-bold text-xl">{t.success}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder={t.name_ph}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <textarea
                    rows={4}
                    placeholder={t.msg_ph}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors pulse-glow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t.send}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5">
        <p>© 2024 Eitan Ziada. {t.rights}.</p>
      </footer>
    </main>
  );
}
