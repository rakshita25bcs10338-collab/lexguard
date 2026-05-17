export default function ApiKeyInput({ apiKey, setApiKey }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      border: "1px solid rgba(255,255,255,0.15)"
    }}>
      <label style={{ color: "#90caf9", fontSize: 13, fontWeight: 700, display: "block", marginBottom: 8 }}>
        🔑 Claude API Key
      </label>
      <input
        type="password"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="sk-ant-..."
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 10,
          padding: "10px 14px",
          color: "#fff",
          fontSize: 14,
          outline: "none",
          boxSizing: "border-box"
        }}
      />
      <p style={{ color: "#546e7a", fontSize: 12, margin: "8px 0 0" }}>
        Your key stays in your browser. Never sent anywhere except Anthropic.
      </p>
    </div>
  );
}