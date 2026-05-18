"use client";
import { useState, useEffect } from "react";

const SESSION_KEY = "admin_session";
const SESSION_TTL = 15 * 60 * 1000; // 15 minutes

type Review  = { id: string; name: string; role: string; text: string; rating: number; approved: boolean; created_at: string };
type Contact = { id: string; name: string; email: string; phone: string; message: string; created_at: string };

const bg    = "#020917";
const card  = "#0d1b2e";
const border = "#1a3050";
const accent = "#3b82f6";
const txt   = "#f1f5f9";
const mid   = "#94a3b8";
const dim   = "#475569";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed]     = useState(false);
  const [reviews, setReviews]   = useState<Review[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tab, setTab]           = useState<"contacts" | "reviews">("contacts");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  // restore session from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return;
    const { pwd, loginAt } = JSON.parse(saved);
    if (Date.now() - loginAt < SESSION_TTL) {
      fetchData(pwd);
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const fetchData = async (pwd: string) => {
    const [rRes, cRes] = await Promise.all([
      fetch("/api/admin/reviews",  { headers: { "x-admin-password": pwd } }),
      fetch("/api/contacts",       { headers: { "x-admin-password": pwd } }),
    ]);
    if (rRes.ok && cRes.ok) {
      setReviews(await rRes.json());
      setContacts(await cRes.json());
      setPassword(pwd);
      setAuthed(true);
    }
  };

  const login = async () => {
    setLoading(true);
    setError("");
    const [rRes, cRes] = await Promise.all([
      fetch("/api/admin/reviews",  { headers: { "x-admin-password": password } }),
      fetch("/api/contacts",       { headers: { "x-admin-password": password } }),
    ]);
    if (rRes.ok && cRes.ok) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ pwd: password, loginAt: Date.now() }));
      setReviews(await rRes.json());
      setContacts(await cRes.json());
      setAuthed(true);
    } else {
      setError("סיסמה שגויה");
    }
    setLoading(false);
  };

  const approveReview = async (id: string, approved: boolean) => {
    await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ approved }),
    });
    setReviews(r => r.map(x => x.id === id ? { ...x, approved } : x));
  };

  const deleteReview = async (id: string) => {
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE", headers: { "x-admin-password": password } });
    setReviews(r => r.filter(x => x.id !== id));
  };

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: "44px 52px", width: 360, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(59,130,246,0.15)", border: `1px solid rgba(59,130,246,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 20px" }}>🔐</div>
        <h1 style={{ color: txt, fontSize: 22, fontWeight: 900, marginBottom: 6 }}>דשבורד ניהול</h1>
        <p style={{ color: mid, fontSize: 13, marginBottom: 28 }}>הכנס סיסמה להמשך</p>
        <input type="password" placeholder="סיסמה" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ width: "100%", padding: "12px 14px", borderRadius: 9, border: `1px solid ${border}`, background: "#060f1e", color: txt, fontSize: 15, outline: "none", boxSizing: "border-box", direction: "ltr", marginBottom: 10 }} />
        {error && <p style={{ color: "#f87171", fontSize: 13, marginBottom: 10 }}>{error}</p>}
        <button onClick={login} disabled={loading}
          style={{ width: "100%", padding: "13px", borderRadius: 9, background: accent, color: "#fff", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer" }}>
          {loading ? "..." : "כניסה"}
        </button>
      </div>
    </div>
  );

  const pending  = reviews.filter(r => !r.approved);
  const approved = reviews.filter(r => r.approved);

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "system-ui", direction: "rtl" }}>

      {/* Top bar */}
      <div style={{ background: card, borderBottom: `1px solid ${border}`, padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 900, fontSize: 20, color: accent }}>EZ.</span>
          <span style={{ color: mid, fontSize: 14 }}>דשבורד ניהול</span>
        </div>
        <a href="/" style={{ color: mid, fontSize: 13, textDecoration: "none" }}>← חזרה לאתר</a>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
          <StatCard icon="📩" label="סה״כ פניות" value={contacts.length} color="#3b82f6" />
          <StatCard icon="⏳" label="ביקורות ממתינות" value={pending.length} color="#f59e0b" />
          <StatCard icon="✅" label="ביקורות מאושרות" value={approved.length} color="#4ade80" />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 4, width: "fit-content" }}>
          {([["contacts","📩 פניות"],["reviews","⭐ ביקורות"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ padding: "9px 22px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
                background: tab === key ? accent : "transparent",
                color: tab === key ? "#fff" : mid,
                transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Contacts tab */}
        {tab === "contacts" && (
          <div>
            <h2 style={{ color: txt, fontSize: 18, fontWeight: 800, marginBottom: 16 }}>פניות ({contacts.length})</h2>
            {contacts.length === 0
              ? <Empty text="אין פניות עדיין" />
              : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {contacts.map(c => (
                    <div key={c.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "20px 24px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(59,130,246,0.15)", border: `1px solid rgba(59,130,246,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: accent, fontSize: 16 }}>
                              {c.name[0]}
                            </div>
                            <div>
                              <p style={{ fontWeight: 800, color: txt, fontSize: 15 }}>{c.name}</p>
                              <div style={{ display: "flex", gap: 12, marginTop: 2 }}>
                                {c.email && <a href={`mailto:${c.email}`} style={{ fontSize: 12, color: accent, textDecoration: "none" }}>✉️ {c.email}</a>}
                                {c.phone && <a href={`tel:${c.phone}`} style={{ fontSize: 12, color: "#4ade80", textDecoration: "none" }}>📞 {c.phone}</a>}
                              </div>
                            </div>
                            <span style={{ fontSize: 11, color: dim, marginRight: "auto" }}>{new Date(c.created_at).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                          {c.message && (
                            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "12px 14px", border: `1px solid rgba(255,255,255,0.06)` }}>
                              <p style={{ color: mid, fontSize: 14, lineHeight: 1.7 }}>{c.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}

        {/* Reviews tab */}
        {tab === "reviews" && (
          <div>
            <Section title={`ממתינות לאישור (${pending.length})`} color="#f59e0b">
              {pending.length === 0
                ? <Empty text="אין ביקורות חדשות" />
                : pending.map(r => <ReviewCard key={r.id} r={r} onApprove={() => approveReview(r.id, true)} onDelete={() => deleteReview(r.id)} />)}
            </Section>
            <Section title={`מאושרות (${approved.length})`} color="#4ade80">
              {approved.length === 0
                ? <Empty text="אין ביקורות מאושרות עדיין" />
                : approved.map(r => <ReviewCard key={r.id} r={r} approved onUnapprove={() => approveReview(r.id, false)} onDelete={() => deleteReview(r.id)} />)}
            </Section>
          </div>
        )}

      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
      <div>
        <p style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{value}</p>
        <p style={{ fontSize: 13, color: mid, marginTop: 3 }}>{label}</p>
      </div>
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 4, height: 22, borderRadius: 2, background: color }} />
        <h2 style={{ color: txt, fontSize: 17, fontWeight: 800 }}>{title}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p style={{ color: dim, fontSize: 14, padding: "12px 0" }}>{text}</p>;
}

function ReviewCard({ r, approved, onApprove, onUnapprove, onDelete }: {
  r: Review; approved?: boolean;
  onApprove?: () => void; onUnapprove?: () => void; onDelete: () => void;
}) {
  return (
    <div style={{ background: card, border: `1px solid ${approved ? "rgba(74,222,128,0.2)" : border}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ color: "#f59e0b", fontSize: 14 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            <span style={{ fontWeight: 800, color: txt, fontSize: 14 }}>{r.name}</span>
            {r.role && <span style={{ fontSize: 12, color: dim }}>{r.role}</span>}
            <span style={{ fontSize: 11, color: dim, marginRight: "auto" }}>{new Date(r.created_at).toLocaleDateString("he-IL")}</span>
          </div>
          <p style={{ color: mid, fontSize: 14, lineHeight: 1.6 }}>"{r.text}"</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {!approved && onApprove && (
            <button onClick={onApprove} style={{ padding: "7px 14px", borderRadius: 7, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✓ אשר</button>
          )}
          {approved && onUnapprove && (
            <button onClick={onUnapprove} style={{ padding: "7px 14px", borderRadius: 7, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>הסר</button>
          )}
          <button onClick={onDelete} style={{ padding: "7px 14px", borderRadius: 7, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✕</button>
        </div>
      </div>
    </div>
  );
}
