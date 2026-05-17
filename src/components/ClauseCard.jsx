import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const riskColor = {
  LOW: { bg: "#e8f5e9", text: "#2e7d32", border: "#a5d6a7", badge: "#43a047" },
  MEDIUM: { bg: "#fff8e1", text: "#e65100", border: "#ffe082", badge: "#fb8c00" },
  HIGH: { bg: "#fce4ec", text: "#b71c1c", border: "#f48fb1", badge: "#e53935" },
  CRITICAL: { bg: "#3d0000", text: "#ff8a80", border: "#b71c1c", badge: "#d50000" },
};

const impactIcons = {
  Privacy: "🔒", Money: "💰", Employment: "💼",
  "IP Rights": "💡", Legal: "⚖️", Data: "📊", Other: "📋",
};

function RiskBadge({ level }) {
  const c = riskColor[level] || riskColor.LOW;
  return (
    <span style={{
      background: c.badge, color: "#fff", borderRadius: 20,
      padding: "2px 12px", fontSize: 12, fontWeight: 700,
      letterSpacing: 1, textTransform: "uppercase",
    }}>{level}</span>
  );
}

export default function ClauseCard({ clause }) {
  const [open, setOpen] = useState(false);
  const c = riskColor[clause.risk_level] || riskColor.LOW;

  return (
    <div style={{
      border: `1.5px solid ${c.border}`, borderRadius: 14,
      marginBottom: 14, overflow: "hidden", background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "14px 18px",
          background: c.bg, border: "none", cursor: "pointer",
          textAlign: "left", gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>{impactIcons[clause.impact_area] || "📋"}</span>
          <div>
            <div style={{ fontWeight: 700, color: c.text, fontSize: 15 }}>{clause.title}</div>
            <div style={{ fontSize: 12, color: c.text, opacity: 0.8 }}>{clause.impact_area}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <RiskBadge level={clause.risk_level} />
          {open ? <ChevronUp size={18} color={c.text} /> : <ChevronDown size={18} color={c.text} />}
        </div>
      </button>

      {open && (
        <div style={{ padding: "16px 18px", background: "#fff" }}>
          <div style={{
            background: "#f5f5f5", borderRadius: 8, padding: "10px 14px",
            marginBottom: 12, fontStyle: "italic", fontSize: 13,
            color: "#555", borderLeft: `4px solid ${c.border}`
          }}>
            "{clause.original}"
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: "#333", fontSize: 13 }}>🗣️ In plain English: </span>
            <span style={{ fontSize: 14, color: "#333" }}>{clause.plain_english}</span>
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: "#333", fontSize: 13 }}>⚠️ Why it matters: </span>
            <span style={{ fontSize: 14, color: "#333" }}>{clause.why_it_matters}</span>
          </div>
          <div style={{
            background: "#e3f2fd", borderRadius: 8, padding: "10px 14px",
            display: "flex", gap: 8, alignItems: "flex-start"
          }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <span style={{ fontSize: 13, color: "#0d47a1", fontWeight: 600 }}>{clause.what_to_do}</span>
          </div>
        </div>
      )}
    </div>
  );
}