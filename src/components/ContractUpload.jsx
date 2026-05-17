import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { DEMO_CONTRACT } from "../constants/prompts";

// Read text from TXT / MD files
function readAsText(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = e => res(e.target.result);
    reader.onerror = () => rej(new Error("Could not read file"));
    reader.readAsText(file);
  });
}

// Extract text from PDF using pdf.js CDN
async function readPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(" ") + "\n";
  }
  return text;
}

export default function ContractUpload({ text, setText, compareText, setCompareText, compareMode, setCompareMode }) {
  const fileRef = useRef();
  const compareFileRef = useRef();
  const [fileName, setFileName] = useState("");
  const [compareFileName, setCompareFileName] = useState("");
  const [fileError, setFileError] = useState("");

  const handleFile = async (e, isCompare = false) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileError("");

    try {
      let content = "";
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        content = await readPDF(file);
      } else {
        content = await readAsText(file);
      }

      if (isCompare) {
        setCompareText(content);
        setCompareFileName(file.name);
      } else {
        setText(content);
        setFileName(file.name);
      }
    } catch (err) {
      setFileError("Could not read file. Try pasting text instead.");
    }
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    border: "1px solid rgba(255,255,255,0.15)",
  };

  const textareaStyle = {
    width: "100%",
    minHeight: 160,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10,
    padding: 14,
    color: "#e0e0e0",
    fontSize: 13,
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "monospace",
  };

  return (
    <div>
      {/* Compare mode toggle */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
        <button
          onClick={() => setCompareMode(false)}
          style={{
            padding: "7px 18px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: !compareMode ? "linear-gradient(135deg,#4fc3f7,#7c4dff)" : "rgba(255,255,255,0.1)",
            color: "#fff",
          }}
        >
          📄 Single Contract
        </button>
        <button
          onClick={() => setCompareMode(true)}
          style={{
            padding: "7px 18px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: compareMode ? "linear-gradient(135deg,#4fc3f7,#7c4dff)" : "rgba(255,255,255,0.1)",
            color: "#fff",
          }}
        >
          ⚖️ Compare Two Contracts
        </button>
      </div>

      {/* Contract 1 */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <label style={{ color: "#90caf9", fontSize: 13, fontWeight: 700 }}>
            {compareMode ? "📄 Contract A" : "📄 Your Contract"}
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => { setText(DEMO_CONTRACT); setFileName("demo_contract.txt"); }}
              style={{
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8, padding: "6px 12px", color: "#ccc", cursor: "pointer", fontSize: 12,
              }}
            >
              Load Demo
            </button>
            <button
              onClick={() => fileRef.current.click()}
              style={{
                background: "rgba(79,195,247,0.15)", border: "1px solid #4fc3f7",
                borderRadius: 8, padding: "6px 12px", color: "#4fc3f7", cursor: "pointer", fontSize: 12,
                display: "flex", alignItems: "center", gap: 4,
              }}
            >
              <Upload size={12} /> Upload PDF/TXT
            </button>
          </div>
        </div>
        <input ref={fileRef} type="file" accept=".txt,.md,.pdf" onChange={e => handleFile(e, false)} style={{ display: "none" }} />
        <textarea
          value={text}
          onChange={e => { setText(e.target.value); setFileName(""); }}
          placeholder="Paste your contract here... or upload a PDF/TXT file above"
          style={textareaStyle}
        />
        {fileName && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
            <FileText size={13} color="#4fc3f7" />
            <span style={{ color: "#4fc3f7", fontSize: 12 }}>{fileName}</span>
            <button onClick={() => { setText(""); setFileName(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef5350", padding: 0, marginLeft: 4 }}>
              <X size={13} />
            </button>
          </div>
        )}
        {text && !fileName && (
          <p style={{ color: "#4caf50", fontSize: 12, margin: "6px 0 0" }}>
            ✓ {text.length.toLocaleString()} characters loaded
          </p>
        )}
        {fileError && <p style={{ color: "#ef5350", fontSize: 12, margin: "6px 0 0" }}>⚠️ {fileError}</p>}
      </div>

      {/* Contract 2 (compare mode only) */}
      {compareMode && (
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <label style={{ color: "#ce93d8", fontSize: 13, fontWeight: 700 }}>📄 Contract B</label>
            <button
              onClick={() => compareFileRef.current.click()}
              style={{
                background: "rgba(206,147,216,0.15)", border: "1px solid #ce93d8",
                borderRadius: 8, padding: "6px 12px", color: "#ce93d8", cursor: "pointer", fontSize: 12,
                display: "flex", alignItems: "center", gap: 4,
              }}
            >
              <Upload size={12} /> Upload PDF/TXT
            </button>
          </div>
          <input ref={compareFileRef} type="file" accept=".txt,.md,.pdf" onChange={e => handleFile(e, true)} style={{ display: "none" }} />
          <textarea
            value={compareText}
            onChange={e => { setCompareText(e.target.value); setCompareFileName(""); }}
            placeholder="Paste second contract here to compare..."
            style={{ ...textareaStyle, borderColor: "rgba(206,147,216,0.3)" }}
          />
          {compareFileName && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <FileText size={13} color="#ce93d8" />
              <span style={{ color: "#ce93d8", fontSize: 12 }}>{compareFileName}</span>
              <button onClick={() => { setCompareText(""); setCompareFileName(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef5350", padding: 0, marginLeft: 4 }}>
                <X size={13} />
              </button>
            </div>
          )}
          {compareText && !compareFileName && (
            <p style={{ color: "#4caf50", fontSize: 12, margin: "6px 0 0" }}>
              ✓ {compareText.length.toLocaleString()} characters loaded
            </p>
          )}
        </div>
      )}
    </div>
  );
}