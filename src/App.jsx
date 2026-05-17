import { useState } from "react";
import { Zap } from "lucide-react";
import Header from "./components/Header";
import ApiKeyInput from "./components/ApiKeyInput";
import ContractUpload from "./components/ContractUpload";
import ResultsDashboard from "./components/ResultsDashboard";
import { SYSTEM_PROMPT } from "./constants/prompts";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!apiKey.trim()) { setError("Please enter your Gemini API key first!"); return; }
    if (!text.trim()) { setError("Please paste or upload a contract first!"); return; }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0ç-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${SYSTEM_PROMPT}\n\nAnalyze this contract:\n\n${text.slice(0, 15000)}`
              }]
            }]
          }),
        }
      );

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error?.message || "API error");

      const raw = data.candidates[0].content.parts[0].text
        .trim().replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(raw);
      setResult(parsed);
    } catch (err) {
      setError("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 50%, #0d1b2a 100%)", fontFamily: "'Georgia', serif" }}>
      <Header />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
        <ContractUpload text={text} setText={setText} />

        {error && (
          <div style={{ background: "#3d0000", border: "1px solid #e53935", borderRadius: 12, padding: "12px 18px", color: "#ff8a80", marginBottom: 16, fontSize: 14 }}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={analyze}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#333" : "linear-gradient(135deg, #4fc3f7, #7c4dff)",
            border: "none", borderRadius: 14, padding: "16px",
            color: "#fff", fontSize: 18, fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, marginBottom: 32, letterSpacing: 0.5,
          }}
        >
          {loading ? (
            <>
              <div style={{ width: 20, height: 20, border: "3px solid #fff3", borderTop: "3px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              Analyzing your contract...
            </>
          ) : (
            <><Zap size={22} /> Analyze with LexGuard</>
          )}
        </button>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        {result && <ResultsDashboard result={result} />}
      </div>
    </div>
  );
}