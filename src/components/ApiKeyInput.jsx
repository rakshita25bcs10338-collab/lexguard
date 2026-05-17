import React, { useState } from "react";

function ApiKeyInput({ apiKey, onKeyChange }) {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="api-key-container" style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
      <label style={{ display: "block", color: "#f8fafc", fontWeight: "600", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
        🔑 Google Gemini API Key
      </label>
      
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          type={showKey ? "text" : "password"}
          value={apiKey}
          onChange={(e) => onKeyChange(e.target.value)}
          placeholder="AIzaSy..."
          style={{
            width: "100%",
            padding: "12px 45px 12px 16px",
            background: "#0f172a",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "0.95rem",
            outline: "none"
          }}
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          style={{
            position: "absolute",
            right: "12px",
            background: "none",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: "1.1rem"
          }}
        >
          {showKey ? "👁️" : "🙈"}
        </button>
      </div>
      
      <p style={{ margin: "8px 0 0 0", fontSize: "0.85rem", color: "#94a3b8" }}>
        Get your native API key from the{" "}
        <a 
          href="https://aistudio.google.com/" 
          target="_blank" 
          rel="noreferrer"
          style={{ color: "#38bdf8", textDecoration: "underline", fontWeight: "500" }}
        >
          Google AI Studio Console
        </a>. Your key strictly processes inside your browser workspace.
      </p>
    </div>
  );
}

export default ApiKeyInput;