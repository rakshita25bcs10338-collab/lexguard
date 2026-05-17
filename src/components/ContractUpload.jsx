import React, { useState } from "react";

function ContractUpload({ onSubmit, isLoading, statusText }) {
  const [contractText, setContractText] = useState("");
  const [activeTab, setActiveTab] = useState("single"); // For handling future tab tracking cleanly

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(contractText);
  };

  const handleLoadDemo = () => {
    const demoContract = `Section 5. Exclusivity and Intellectual Property Assignment
5.1 Exclusivity: The Creator agrees that during the term of this Agreement and for a period of twenty-four (24) months following its termination, the Creator shall not create, post, or publish any content for, or endorse, any brand, product, or service operating within the beauty, wellness, lifestyle, or consumer goods sectors globally.
5.2 Rights Granted: The Creator hereby grants the Brand a perpetual, irrevocable, sublicensable, royalty-free, worldwide license to use, edit, modify, alter, and monetize the Creator's name, image, likeness, voice, and uploaded content across any media channel currently existing or developed in the future, without any requirement for further compensation or approval.`;
    setContractText(demoContract);
  };

  return (
    <div className="upload-section-wrapper" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Tab Selectors */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "0.5rem" }}>
        <button
          type="button"
          onClick={() => setActiveTab("single")}
          style={{
            padding: "10px 20px",
            background: activeTab === "single" ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "#1e293b",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          📄 Single Contract
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("compare")}
          style={{
            padding: "10px 20px",
            background: activeTab === "compare" ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "#1e293b",
            color: "#94a3b8",
            border: "1px solid #334155",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "not-allowed"
          }}
          disabled
        >
          ⚖️ Compare Two Contracts
        </button>
      </div>

      {/* Core Form Card Container */}
      <form onSubmit={handleSubmit} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ color: "#f8fafc", fontWeight: "600", fontSize: "0.95rem" }}>
            📝 Your Contract Text
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={handleLoadDemo}
              style={{ padding: "6px 12px", background: "#334155", color: "#e2e8f0", border: "none", borderRadius: "6px", fontSize: "0.85rem", cursor: "pointer", fontWeight: "500" }}
            >
              Load Demo
            </button>
            <button
              type="button"
              style={{ padding: "6px 12px", background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", border: "1px solid #38bdf8", borderRadius: "6px", fontSize: "0.85rem", cursor: "not-allowed" }}
              disabled
            >
              📤 Upload PDF/TXT
            </button>
          </div>
        </div>

        {/* 🔒 TEXTAREA BUGFIX: Height boundary configuration locks scroll layout internally */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <textarea
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Paste your contract text lines here... or click 'Load Demo' above to populate instantly."
            style={{
              width: "100%",
              height: "220px",           // Fixed explicit baseline height
              maxHeight: "220px",        // Absolute limit barrier configuration
              overflowY: "auto",         // Encapsulates scrolling internally
              resize: "none",            // Disables drag adjustments from altering viewport
              background: "#0f172a",
              color: "#f8fafc",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #475569",
              fontSize: "0.95rem",
              lineHeight: "1.5",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          {contractText && (
            <div style={{ position: "absolute", bottom: "10px", left: "12px", fontSize: "0.8rem", color: "#4ade80", fontWeight: "500" }}>
              ✓ {contractText.length.toLocaleString()} characters staged
            </div>
          )}
        </div>

        {/* Action Dispatch Button Wrapper */}
        <button
          type="submit"
          disabled={isLoading || !contractText.trim()}
          style={{
            width: "100%",
            padding: "14px",
            background: isLoading 
              ? "#334155" 
              : !contractText.trim() 
                ? "rgba(99, 102, 241, 0.4)" 
                : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            color: isLoading ? "#94a3b8" : "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: isLoading || !contractText.trim() ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            boxShadow: !contractText.trim() ? "none" : "0 4px 12px rgba(79, 70, 229, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
          }}
        >
          {isLoading ? (
            <>
              <span className="spinner" style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid #94a3b8", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }}></span>
              <span>{statusText || "Processing pipeline details..."}</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>Analyze with LexGuard</span>
            </>
          )}
        </button>
      </form>
      
      {/* Spinning Keyframe Rule Injection Injection directly to support native component lifecycle */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ContractUpload;