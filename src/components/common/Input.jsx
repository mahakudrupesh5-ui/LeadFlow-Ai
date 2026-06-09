import { useState } from "react";
import { T } from "../../constants/theme.js";

export function Input({ type = "text", value, onChange, placeholder, style: sx, icon }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <span
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: T.textHint,
            fontSize: 13,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          background: focus ? T.inputHover : T.input,
          border: `1px solid ${focus ? T.borderFocus : T.border}`,
          borderRadius: 8,
          padding: icon ? "9px 12px 9px 36px" : "9px 12px",
          color: T.text,
          fontSize: 13,
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "'Inter',sans-serif",
          transition: "border-color 0.15s ease, background 0.15s ease",
          ...sx,
        }}
      />
    </div>
  );
}

export function Select({ value, onChange, options, style: sx }) {
  const [focus, setFocus] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: "100%",
        background: focus ? T.inputHover : T.input,
        border: `1px solid ${focus ? T.borderFocus : T.border}`,
        borderRadius: 8,
        padding: "9px 12px",
        color: T.text,
        fontSize: 13,
        outline: "none",
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif",
        transition: "border-color 0.15s ease, background 0.15s ease",
        ...sx,
      }}
    >
      {options.map((o) => (
        <option key={o.value || o} value={o.value || o}>
          {o.label || o}
        </option>
      ))}
    </select>
  );
}

export function FieldLabel({ children }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 12,
        fontWeight: 500,
        color: T.textSub,
        marginBottom: 6,
        letterSpacing: "0.01em",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      {children}
    </label>
  );
}
