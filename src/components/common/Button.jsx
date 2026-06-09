import { useState } from "react";
import { T } from "../../constants/theme.js";

export function PrimaryBtn({ children, onClick, style: sx }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "0 16px",
        height: 36,
        background: hov ? T.purpleHov : T.purple,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif",
        transition: "background 0.15s ease",
        letterSpacing: "-0.01em",
        ...sx,
      }}
    >
      {children}
    </button>
  );
}

export function GhostBtn({ children, onClick, style: sx, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "0 14px",
        height: 36,
        background: hov ? (danger ? T.redDim : "rgba(255,255,255,0.05)") : "transparent",
        color: danger ? T.red : T.textSub,
        border: `1px solid ${hov ? T.borderMed : T.border}`,
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 400,
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif",
        transition: "all 0.15s ease",
        letterSpacing: "-0.01em",
        ...sx,
      }}
    >
      {children}
    </button>
  );
}

export function IconBtn({ children, onClick, badge }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: 8,
        background: hov ? "rgba(255,255,255,0.06)" : "transparent",
        border: `1px solid ${hov ? T.borderMed : T.border}`,
        color: T.textSub,
        cursor: "pointer",
        fontSize: 15,
        transition: "all 0.15s ease",
      }}
    >
      {children}
      {badge > 0 && (
        <span
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: T.red,
            border: `1.5px solid ${T.surface}`,
          }}
        />
      )}
    </button>
  );
}
