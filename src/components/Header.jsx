import React from "react";

function Header() {
  return (
    <header className="header-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "rgba(30, 41, 59, 0.5)", borderBottom: "1px solid #334155" }}>
      <div>
        <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold", letterSpacing: "1px", color: "#f8fafc" }}>
          🛡️ LexGuard
        </h1>
        <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#94a3b8" }}>
          AI Contract Intelligence • Plain English • No Legal Degree Needed
        </p>
      </div>
      
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "0.85rem",
        fontWeight: "600",
        background: "linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)",
        color: "#ffffff",
        boxShadow: "0 2px 10px rgba(66, 133, 244, 0.3)"
      }}>
        <span style={{ marginRight: "6px" }}>⚡</span> Powered by Google Gemini
      </div>
    </header>
  );
}

export default Header;