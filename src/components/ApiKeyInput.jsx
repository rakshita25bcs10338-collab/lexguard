import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ApiKeyInput({ apiKey, setApiKey }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{
      background: "rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      border: "1px solid rgba(255,255,255,0.15)",
    }}>
      <label style={{ color: "#90caf9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 8 }}>
        🔑 Groq API Key <span style={{ color: "#4caf50", fontWeight: 400 }}>(Free — No Credit Card)</span>
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="gsk_..."
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.1)",
            border: apiKey ? "1px solid #4fc3f7" : "1px solid rgba(255,255,255,0.2)",
            borderRadius: 10,
            padding: "10px 40px 10px 14px",
            color: "#fff",
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
            transition: "border 0.2s",
          }}
        />
        <button
          onClick={() => setShow(!show)}
          style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer", color: "#90caf9", padding: 0,
          }}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <p style={{ color: "#546e7a", fontSize: 12, margin: "8px 0 0" }}>
        Get your free key at{" "}
        <a href="https://console.groq.com" target="_blank" rel="noreferrer" style={{ color: "#90caf9" }}>
          console.groq.com
        </a>
        {" "}→ API Keys → Create API Key. Your key never leaves your browser.
      </p>
    </div>
  );
}