export default function ScoreGauge({ score }) {
  const color = score < 30 ? "#43a047" : score < 60 ? "#fb8c00" : score < 80 ? "#e53935" : "#b71c1c";
  const rotation = (score / 100) * 180 - 90;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="160" height="90" viewBox="0 0 160 90">
        <path d="M 10 85 A 70 70 0 0 1 150 85" fill="none" stroke="#e0e0e0" strokeWidth="14" strokeLinecap="round" />
        <path
          d="M 10 85 A 70 70 0 0 1 150 85"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 220} 220`}
        />
        <line
          x1="80" y1="85"
          x2={80 + 55 * Math.cos((rotation - 90) * Math.PI / 180)}
          y2={85 + 55 * Math.sin((rotation - 90) * Math.PI / 180)}
          stroke={color} strokeWidth="3" strokeLinecap="round"
        />
        <circle cx="80" cy="85" r="5" fill={color} />
        <text x="80" y="75" textAnchor="middle" fontSize="22" fontWeight="bold" fill={color}>{score}</text>
      </svg>
      <div style={{ fontSize: 12, color: "#888", marginTop: -8 }}>Risk Score (0 = Safe, 100 = Danger)</div>
    </div>
  );
}