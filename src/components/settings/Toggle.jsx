import { T } from "../../constants/theme.js";

export function Toggle({ on, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 38,
        height: 22,
        borderRadius: 11,
        cursor: "pointer",
        position: "relative",
        background: on ? T.purple : "rgba(255,255,255,0.08)",
        border: `1px solid ${on ? T.purple : T.border}`,
        transition: "all 0.18s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 3,
          left: on ? 19 : 3,
          transition: "left 0.18s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}
