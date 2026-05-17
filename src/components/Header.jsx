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
      gap: 14
    }}>
      <div style={{
        background: "linear-gradient(135deg, #4fc3f7, #7c4dff)",
        borderRadius: 12,
        padding: 10,
        display: "flex"
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
    </div>
  );
}