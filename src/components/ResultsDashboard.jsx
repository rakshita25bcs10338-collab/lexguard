import { CheckCircle, XCircle, AlertTriangle, FileText } from "lucide-react";
import ClauseCard from "./ClauseCard";
import ScoreGauge from "./ScoreGauge";

export default function ResultsDashboard({ result }) {
  return (
    <div>
      {/* Summary Card */}
      <div style={{
        background: result.safe_to_sign ? "rgba(67,160,71,0.15)" : "rgba(229,57,53,0.15)",
        border: `2px solid ${result.safe_to_sign ? "#43a047" : "#e53935"}`,
        borderRadius: 20, padding: 24, marginBottom: 24
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              {result.safe_to_sign
                ? <CheckCircle size={28} color="#43a047" />
                : <XCircle size={28} color="#e53935" />}
              <h2 style={{ margin: 0, color: "#fff", fontSize: 22, fontWeight: 900 }}>
                {result.safe_to_sign ? "Looks Okay to Sign" : "Be Careful Before Signing!"}
              </h2>
            </div>
            <p style={{ margin: 0, color: "#b0bec5", fontSize: 13 }}>📋 {result.document_type}</p>
          </div>
          <ScoreGauge score={result.risk_score} />
        </div>
        <p style={{ color: "#e0e0e0", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{result.summary}</p>
      </div>

      {/* Red & Green Flags */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {result.red_flags?.length > 0 && (
          <div style={{ background: "rgba(229,57,53,0.1)", border: "1px solid rgba(229,57,53,0.3)", borderRadius: 14, padding: 18 }}>
            <h3 style={{ margin: "0 0 12px", color: "#ff5252", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              <AlertTriangle size={18} /> Red Flags
            </h3>
            {result.red_flags.map((f, i) => (
              <div key={i} style={{ color: "#ffcdd2", fontSize: 13, marginBottom: 8, display: "flex", gap: 8 }}>
                <span style={{ flexShrink: 0 }}>🚩</span> {f}
              </div>
            ))}
          </div>
        )}
        {result.green_flags?.length > 0 && (
          <div style={{ background: "rgba(67,160,71,0.1)", border: "1px solid rgba(67,160,71,0.3)", borderRadius: 14, padding: 18 }}>
            <h3 style={{ margin: "0 0 12px", color: "#69f0ae", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={18} /> Green Flags
            </h3>
            {result.green_flags.map((f, i) => (
              <div key={i} style={{ color: "#c8e6c9", fontSize: 13, marginBottom: 8, display: "flex", gap: 8 }}>
                <span style={{ flexShrink: 0 }}>✅</span> {f}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clauses */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ color: "#90caf9", fontSize: 17, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <FileText size={20} /> Clause-by-Clause Breakdown
        </h3>
        {result.clauses?.map((c, i) => <ClauseCard key={i} clause={c} />)}
      </div>

      {/* Negotiation Tips */}
      {result.negotiation_tips?.length > 0 && (
        <div style={{ background: "rgba(124,77,255,0.15)", border: "1px solid rgba(124,77,255,0.4)", borderRadius: 16, padding: 20 }}>
          <h3 style={{ margin: "0 0 14px", color: "#ce93d8", fontSize: 16 }}>💬 Negotiation Tips</h3>
          {result.negotiation_tips.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, color: "#e1bee7", fontSize: 14, lineHeight: 1.6 }}>
              <span style={{ flexShrink: 0, fontWeight: 700, color: "#ce93d8" }}>{i + 1}.</span> {t}
            </div>
          ))}
        </div>
      )}

      <p style={{ textAlign: "center", color: "#546e7a", fontSize: 12, marginTop: 24 }}>
        ⚠️ LexGuard is not a lawyer. This is for awareness only — always consult a legal professional for binding decisions.
      </p>
    </div>
  );
}