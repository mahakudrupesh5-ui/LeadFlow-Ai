import { T } from "../../constants/theme.js";
import { Card } from "../common/Card.jsx";

function MiniChart({ data, color }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 32, marginTop: 8 }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderRadius: 2,
            height: `${Math.max((v / max) * 100, 8)}%`,
            background: i === data.length - 1 ? color : color + "40",
            transition: "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

export function StatCard({ label, value, sub, accentColor }) {
  return (
    <Card nohover style={{ padding: "20px 22px", flex: 1, minWidth: 150 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: T.textHint,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: 12,
          fontFamily: "'Inter',sans-serif",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: T.text,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontFamily: "'Inter',sans-serif",
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 12,
            color: accentColor || T.green,
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "'Inter',sans-serif",
          }}
        >
          <span>{sub}</span>
        </div>
      )}
    </Card>
  );
}

export { MiniChart };
