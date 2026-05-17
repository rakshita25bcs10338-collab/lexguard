export function exportToPDF(result) {
  const riskColor = {
    LOW: "#2e7d32",
    MEDIUM: "#e65100",
    HIGH: "#c62828",
    CRITICAL: "#b71c1c",
  };

  const clauseHTML = result.clauses.map((c) => `
    <div style="border:1.5px solid #ddd; border-left: 5px solid ${riskColor[c.risk_level] || "#999"}; border-radius:8px; padding:16px; margin-bottom:16px; page-break-inside:avoid;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <strong style="font-size:15px; color:#1a1a2e;">${c.title}</strong>
        <span style="background:${riskColor[c.risk_level]}; color:#fff; padding:3px 12px; border-radius:20px; font-size:12px; font-weight:700;">${c.risk_level}</span>
      </div>
      <p style="font-style:italic; color:#555; font-size:13px; background:#f5f5f5; padding:8px 12px; border-radius:6px; margin:0 0 10px;">"${c.original}"</p>
      <p style="margin:0 0 6px; font-size:14px;"><strong>🗣️ Plain English:</strong> ${c.plain_english}</p>
      <p style="margin:0 0 6px; font-size:14px;"><strong>⚠️ Why it matters:</strong> ${c.why_it_matters}</p>
      <p style="margin:0; font-size:13px; color:#0d47a1; background:#e3f2fd; padding:8px 12px; border-radius:6px;">💡 ${c.what_to_do}</p>
    </div>
  `).join("");

  const redFlags = result.red_flags?.map(f => `<li style="margin-bottom:6px; color:#c62828;">${f}</li>`).join("") || "";
  const greenFlags = result.green_flags?.map(f => `<li style="margin-bottom:6px; color:#2e7d32;">${f}</li>`).join("") || "";
  const tips = result.negotiation_tips?.map((t, i) => `<li style="margin-bottom:8px;"><strong>${i+1}.</strong> ${t}</li>`).join("") || "";

  const scoreColor = riskColor[result.overall_risk] || "#999";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>LexGuard Report — ${result.document_type || "Contract"}</title>
      <style>
        body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 40px 32px; color: #1a1a1a; }
        h1 { font-size: 28px; margin: 0; }
        h2 { font-size: 18px; margin: 24px 0 12px; border-bottom: 2px solid #eee; padding-bottom: 6px; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:8px;">
        <div style="font-size:36px;">🛡️</div>
        <div>
          <h1>LexGuard Report</h1>
          <p style="margin:4px 0 0; color:#666; font-size:14px;">AI Contract Intelligence — Generated ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <hr style="border:none; border-top:2px solid #1a1a2e; margin-bottom:24px;">

      <div style="background:#f9f9f9; border:2px solid ${scoreColor}; border-radius:12px; padding:20px; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <p style="margin:0 0 4px; font-size:13px; color:#666; text-transform:uppercase; letter-spacing:0.05em;">Document Type</p>
            <p style="margin:0; font-size:16px; font-weight:700;">${result.document_type || "Contract"}</p>
          </div>
          <div style="text-align:center; background:${scoreColor}; color:#fff; padding:12px 24px; border-radius:10px;">
            <div style="font-size:32px; font-weight:900; line-height:1;">${result.risk_score}</div>
            <div style="font-size:13px; font-weight:700;">${result.overall_risk} RISK</div>
          </div>
        </div>
        <p style="margin:16px 0 0; font-size:15px; line-height:1.7; color:#333;">${result.summary}</p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
        ${redFlags ? `<div style="background:#fff5f5; border:1px solid #ffcdd2; border-radius:10px; padding:16px;">
          <h3 style="margin:0 0 10px; color:#c62828; font-size:15px;">🚩 Red Flags</h3>
          <ul style="margin:0; padding-left:18px;">${redFlags}</ul>
        </div>` : ""}
        ${greenFlags ? `<div style="background:#f1f8e9; border:1px solid #c5e1a5; border-radius:10px; padding:16px;">
          <h3 style="margin:0 0 10px; color:#2e7d32; font-size:15px;">✅ Green Flags</h3>
          <ul style="margin:0; padding-left:18px;">${greenFlags}</ul>
        </div>` : ""}
      </div>

      <h2>🔍 Clause-by-Clause Breakdown</h2>
      ${clauseHTML}

      ${tips ? `<h2>💬 Negotiation Tips</h2>
      <ol style="padding-left:20px; line-height:1.8; font-size:14px;">${tips}</ol>` : ""}

      <p style="text-align:center; color:#999; font-size:12px; margin-top:40px; border-top:1px solid #eee; padding-top:16px;">
        ⚠️ LexGuard is not a lawyer. This report is for awareness only — always consult a legal professional for binding decisions.
      </p>
    </body>
    </html>
  `;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 500);
}