import { useState } from "react";
import { Zap, Download } from "lucide-react";
import Header from "./components/Header";
import ApiKeyInput from "./components/ApiKeyInput";
import ContractUpload from "./components/ContractUpload";
import ResultsDashboard from "./components/ResultsDashboard";
import { SYSTEM_PROMPT } from "./constants/prompts";
import { exportToPDF } from "./utils/exportPDF";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [text, setText] = useState("");
  const [compareText, setCompareText] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [result, setResult] = useState(null);
  const [compareResult, setCompareResult] = useState(null);
  const [error, setError] = useState("");

  const callGroq = async (contractText, label) => {
    setStatusMsg(`Analyzing ${label}...`);
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analyze this contract:\n\n${contractText.slice(0, 15000)}` }
        ],
        temperature: 0.2,
        max_tokens: 3000,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error?.message || "API error");

    const raw = data.choices[0].message.content
      .trim().replace(/```json|```/g, "").trim();
    return JSON.parse(raw);
  };

  const analyze = async () => {
    if (!apiKey.trim()) { setError("Please enter your Groq API key first!"); return; }
    if (!text.trim()) { setError("Please paste or upload a contract first!"); return; }
    if (compareMode && !compareText.trim()) { setError("Please add Contract B to compare!"); return; }

    setError("");
    setLoading(true);
    setResult(null);
    setCompareResult(null);

    try {
      const r1 = await callGroq(text, compareMode ? "Contract A" : "your contract");
      setResult(r1);

      if (compareMode) {
        const r2 = await callGroq(compareText, "Contract B");
        setCompareResult(r2);
      }
    } catch (err) {
      setError("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
      setStatusMsg("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 50%, #0d1b2a 100%)",
      fontFamily: "'Georgia', serif"
    }}>
      <Header />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px" }}>
        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />

        <ContractUpload
          text={text}
          setText={setText}
          compareText={compareText}
          setCompareText={setCompareText}
          compareMode={compareMode}
          setCompareMode={setCompareMode}
        />

        {error && (
          <div style={{
            background: "#3d0000", border: "1px solid #e53935",
            borderRadius: 12, padding: "12px 18px",
            color: "#ff8a80", marginBottom: 16, fontSize: 14
          }}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={analyze}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#1e1e3a" : "linear-gradient(135deg, #4fc3f7, #7c4dff)",
            border: loading ? "1px solid rgba(255,255,255,0.1)" : "none",
            borderRadius: 14, padding: "16px",
            color: "#fff", fontSize: 18, fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, marginBottom: 32, letterSpacing: 0.5,
            transition: "all 0.2s",
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: 20, height: 20,
                border: "3px solid rgba(255,255,255,0.2)",
                borderTop: "3px solid #fff",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }} />
              {statusMsg || "Analyzing..."}
            </>
          ) : (
            <><Zap size={22} /> {compareMode ? "Compare Both Contracts" : "Analyze with LexGuard"}</>
          )}
        </button>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        {/* Single contract result */}
        {result && !compareMode && (
          <>
            <ResultsDashboard result={result} />
            <button
              onClick={() => exportToPDF(result)}
              style={{
                width: "100%", marginTop: 16,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 12, padding: "12px",
                color: "#90caf9", fontSize: 15, fontWeight: 700,
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 8
              }}
            >
              <Download size={18} /> Export as PDF Report
            </button>
          </>
        )}

        {/* Compare mode: side by side */}
        {compareMode && result && compareResult && (
          <div>
            {/* Summary comparison banner */}
            <div style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 16, padding: 20, marginBottom: 24,
              display: "flex", gap: 16, flexWrap: "wrap",
            }}>
              <div style={{ flex: 1, minWidth: 200, textAlign: "center" }}>
                <div style={{ color: "#90caf9", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>CONTRACT A</div>
                <div style={{
                  fontSize: 36, fontWeight: 900,
                  color: result.risk_score >= 70 ? "#e53935" : result.risk_score >= 40 ? "#fb8c00" : "#43a047"
                }}>{result.risk_score}</div>
                <div style={{ color: "#90caf9", fontSize: 12 }}>Risk Score</div>
                <div style={{ marginTop: 8, padding: "4px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 20, color: "#fff", fontSize: 13, display: "inline-block" }}>
                  {result.overall_risk} RISK
                </div>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 200, textAlign: "center" }}>
                <div style={{ color: "#ce93d8", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>CONTRACT B</div>
                <div style={{
                  fontSize: 36, fontWeight: 900,
                  color: compareResult.risk_score >= 70 ? "#e53935" : compareResult.risk_score >= 40 ? "#fb8c00" : "#43a047"
                }}>{compareResult.risk_score}</div>
                <div style={{ color: "#ce93d8", fontSize: 12 }}>Risk Score</div>
                <div style={{ marginTop: 8, padding: "4px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 20, color: "#fff", fontSize: 13, display: "inline-block" }}>
                  {compareResult.overall_risk} RISK
                </div>
              </div>
            </div>

            {/* Winner banner */}
            <div style={{
              background: result.risk_score <= compareResult.risk_score
                ? "rgba(67,160,71,0.15)" : "rgba(206,147,216,0.15)",
              border: `1px solid ${result.risk_score <= compareResult.risk_score ? "#43a047" : "#ce93d8"}`,
              borderRadius: 12, padding: "14px 20px", marginBottom: 24,
              color: "#fff", fontSize: 15, fontWeight: 700, textAlign: "center"
            }}>
              {result.risk_score === compareResult.risk_score
                ? "⚖️ Both contracts have equal risk"
                : result.risk_score < compareResult.risk_score
                  ? "✅ Contract A is safer to sign"
                  : "✅ Contract B is safer to sign"}
            </div>

            {/* Side by side results */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ color: "#90caf9", fontWeight: 700, fontSize: 13, marginBottom: 12, textAlign: "center" }}>
                  📄 Contract A
                </div>
                <ResultsDashboard result={result} />
                <button
                  onClick={() => exportToPDF(result)}
                  style={{
                    width: "100%", marginTop: 12,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 10, padding: "10px",
                    color: "#90caf9", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center", gap: 6
                  }}
                >
                  <Download size={14} /> Export A as PDF
                </button>
              </div>
              <div>
                <div style={{ color: "#ce93d8", fontWeight: 700, fontSize: 13, marginBottom: 12, textAlign: "center" }}>
                  📄 Contract B
                </div>
                <ResultsDashboard result={compareResult} />
                <button
                  onClick={() => exportToPDF(compareResult)}
                  style={{
                    width: "100%", marginTop: 12,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 10, padding: "10px",
                    color: "#ce93d8", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center", gap: 6
                  }}
                >
                  <Download size={14} /> Export B as PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}