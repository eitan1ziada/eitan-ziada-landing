"use client";
import { useState } from "react";

type Review = { id: string; name: string; role: string; text: string; approved: boolean; created_at: string };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed]     = useState(false);
  const [reviews, setReviews]   = useState<Review[]>([]);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const login = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/reviews", { headers: { "x-admin-password": password } });
    if (res.ok) {
      setReviews(await res.json());
      setAuthed(true);
    } else {
      setError("סיסמה שגויה");
    }
    setLoading(false);
  };

  const approve = async (id: string, approved: boolean) => {
    await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ approved }),
    });
    setReviews(r => r.map(x => x.id === id ? { ...x, approved } : x));
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE", headers: { "x-admin-password": password } });
    setReviews(r => r.filter(x => x.id !== id));
  };

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#020917", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
      <div style={{ background: "#0d1b2e", border: "1px solid #1a3050", borderRadius: 16, padding: "40px 48px", width: 340, textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
        <h1 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 800, marginBottom: 24 }}>פאנל ניהול ביקורות</h1>
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #1a3050", background: "#060f1e", color: "#f1f5f9", fontSize: 15, marginBottom: 12, outline: "none", boxSizing: "border-box", direction: "ltr" }}
        />
        {error && <p style={{ color: "#f87171", fontSize: 13, marginBottom: 10 }}>{error}</p>}
        <button onClick={login} disabled={loading} style={{ width: "100%", padding: "12px", borderRadius: 8, background: "#3b82f6", color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
          {loading ? "..." : "כניסה"}
        </button>
      </div>
    </div>
  );

  const pending  = reviews.filter(r => !r.approved);
  const approved = reviews.filter(r => r.approved);

  return (
    <div style={{ minHeight: "100vh", background: "#020917", fontFamily: "system-ui", padding: "40px 24px", direction: "rtl" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <h1 style={{ color: "#f1f5f9", fontSize: 26, fontWeight: 900 }}>פאנל ניהול ביקורות</h1>
          <a href="/" style={{ color: "#60a5fa", fontSize: 14, textDecoration: "none" }}>← חזרה לאתר</a>
        </div>

        <Section title={`ממתינות לאישור (${pending.length})`} color="#f59e0b">
          {pending.length === 0
            ? <Empty text="אין ביקורות חדשות" />
            : pending.map(r => <Card key={r.id} r={r} onApprove={() => approve(r.id, true)} onDelete={() => remove(r.id)} />)}
        </Section>

        <Section title={`מאושרות (${approved.length})`} color="#4ade80">
          {approved.length === 0
            ? <Empty text="אין ביקורות מאושרות עדיין" />
            : approved.map(r => <Card key={r.id} r={r} approved onUnapprove={() => approve(r.id, false)} onDelete={() => remove(r.id)} />)}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 4, height: 24, borderRadius: 2, background: color }} />
        <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 800 }}>{title}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p style={{ color: "#475569", fontSize: 14, padding: "16px 0" }}>{text}</p>;
}

function Card({ r, approved, onApprove, onUnapprove, onDelete }: {
  r: Review; approved?: boolean;
  onApprove?: () => void; onUnapprove?: () => void; onDelete: () => void;
}) {
  return (
    <div style={{ background: "#0d1b2e", border: `1px solid ${approved ? "rgba(74,222,128,0.2)" : "#1a3050"}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontWeight: 800, color: "#f1f5f9", fontSize: 15 }}>{r.name}</span>
            {r.role && <span style={{ fontSize: 12, color: "#64748b" }}>{r.role}</span>}
            <span style={{ fontSize: 11, color: "#334155", marginRight: "auto" }}>{new Date(r.created_at).toLocaleDateString("he-IL")}</span>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>"{r.text}"</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {!approved && onApprove && (
            <button onClick={onApprove} style={{ padding: "7px 14px", borderRadius: 7, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✓ אשר</button>
          )}
          {approved && onUnapprove && (
            <button onClick={onUnapprove} style={{ padding: "7px 14px", borderRadius: 7, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>הסר אישור</button>
          )}
          <button onClick={onDelete} style={{ padding: "7px 14px", borderRadius: 7, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✕ מחק</button>
        </div>
      </div>
    </div>
  );
}
