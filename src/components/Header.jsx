import { Shield } from "lucide-react";

export default function Header() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      padding: "18px 24px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
        borderRadius: 12,
        padding: 10,
        display: "flex",
        boxShadow: "0 4px 15px rgba(124,77,255,0.4)",
      }}>
        <Shield size={28} color="#fff" />
      </div>
      <div>
        <h1 style={{ margin: 0, color: "#fff", fontSize: 26, fontWeight: 900, letterSpacing: -1 }}>
          LexGuard
        </h1>
        <p style={{ margin: 0, color: "#90caf9", fontSize: 13 }}>
          AI Contract Intelligence • Plain English • No Legal Degree Needed
        </p>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          background: "rgba(79,195,247,0.15)",
          border: "1px solid rgba(79,195,247,0.3)",
          color: "#4fc3f7",
          fontSize: 12,
          padding: "4px 12px",
          borderRadius: 20,
          fontWeight: 600,
        }}>
          🟢 Powered by Groq
        </span>
      </div>
    </div>
  );
}