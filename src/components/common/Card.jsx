import { useState } from "react";
import { T } from "../../constants/theme.js";

export function Card({ children, style, onClick, nohover }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => !nohover && setHov(true)}
      onMouseLeave={() => !nohover && setHov(false)}
      style={{
        background: T.card,
        border: `1px solid ${hov && !nohover ? T.borderMed : T.border}`,
        borderRadius: 12,
        transition: "border-color 0.15s ease, background 0.15s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeading({ children, action }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, color: T.text, letterSpacing: "-0.01em" }}>
        {children}
      </span>
      {action}
    </div>
  );
}
