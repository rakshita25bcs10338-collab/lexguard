import { useRef } from "react";
import { Upload } from "lucide-react";

export default function ContractUpload({ text, setText }) {
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const t = await file.text();
    setText(t);
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      border: "1px solid rgba(255,255,255,0.15)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <label style={{ color: "#90caf9", fontSize: 13, fontWeight: 700 }}>
          📄 Your Contract
        </label>
        <button
          onClick={() => fileRef.current.click()}
          style={{
            background: "rgba(79,195,247,0.15)",
            border: "1px solid #4fc3f7",
            borderRadius: 10,
            padding: "8px 16px",
            color: "#4fc3f7",
            cursor: "pointer",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <Upload size={14} /> Upload File
        </button>
      </div>
      <input ref={fileRef} type="file" accept=".txt,.md" onChange={handleFile} style={{ display: "none" }} />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste your contract here... (employment agreement, privacy policy, rental contract, anything!)"
        style={{
          width: "100%",
          minHeight: 180,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 10,
          padding: 14,
          color: "#e0e0e0",
          fontSize: 13,
          resize: "vertical",
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "monospace"
        }}
      />
      {text && (
        <p style={{ color: "#4caf50", fontSize: 12, margin: "6px 0 0" }}>
          ✓ {text.length.toLocaleString()} characters loaded
        </p>
      )}
    </div>
  );
}