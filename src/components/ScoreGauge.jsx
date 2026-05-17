export default function ScoreGauge({ score }) {
  const color =
    score < 30 ? "#43a047" :
    score < 60 ? "#fb8c00" :
    score < 80 ? "#e53935" : "#b71c1c";

  const rotation = (score / 100) * 180 - 90;
  const needleX = 80 + 52 * Math.cos((rotation - 90) * Math.PI / 180);
  const needleY = 85 + 52 * Math.sin((rotation - 90) * Math.PI / 180);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="160" height="100" viewBox="0 0 160 100">
        {/* Track */}
        <path d="M 12 85 A 68 68 0 0 1 148 85" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="14" strokeLinecap="round" />
        {/* Fill */}
        <path
          d="M 12 85 A 68 68 0 0 1 148 85"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 214} 214`}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        {/* Needle */}
        <line x1="80" y1="85" x2={needleX} y2={needleY} stroke={color} strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="85" r="5" fill={color} />
        {/* Score text */}
        <text x="80" y="72" textAnchor="middle" fontSize="22" fontWeight="bold" fill={color}>{score}</text>
      </svg>
      <div style={{ fontSize: 11, color: "#78909c", marginTop: -8 }}>Risk Score (0 = Safe, 100 = Danger)</div>
    </div>
  );
}