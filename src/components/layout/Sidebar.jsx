import { useState } from "react";
import { T } from "../../constants/theme.js";
import { NAV_ITEMS } from "../../constants/navigation.jsx";

export function Sidebar({ active, onNavigate, collapsed, onToggle }) {
  const [hovItem, setHovItem] = useState(null);

  return (
    <div
      style={{
        width: collapsed ? 60 : 216,
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.22s cubic-bezier(.4,0,.2,1)",
        flexShrink: 0,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          height: 56,
          padding: collapsed ? "0" : "0 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: `1px solid ${T.border}`,
          justifyContent: collapsed ? "center" : "flex-start",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: T.purple,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        {!collapsed && (
          <span style={{ fontSize: 14, fontWeight: 600, color: T.text, letterSpacing: "-0.03em", fontFamily: "'Inter',sans-serif" }}>
            LeadBot
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          const isHov = hovItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHovItem(item.id)}
              onMouseLeave={() => setHovItem(null)}
              title={collapsed ? item.label : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                height: 36,
                padding: collapsed ? "0" : "0 10px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                background: isActive ? "rgba(124,58,237,0.14)" : isHov ? "rgba(255,255,255,0.04)" : "transparent",
                color: isActive ? T.purpleLight : isHov ? T.text : T.textSub,
                fontWeight: isActive ? 500 : 400,
                fontSize: 13.5,
                letterSpacing: "-0.01em",
                fontFamily: "'Inter',sans-serif",
                transition: "background 0.12s ease, color 0.12s ease",
                width: "100%",
                position: "relative",
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 18,
                    background: T.purple,
                    borderRadius: "0 2px 2px 0",
                  }}
                />
              )}
              <span style={{ color: "inherit", flexShrink: 0, display: "flex" }}>{item.svg}</span>
              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "6px 6px 8px", borderTop: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 1 }}>
        <button
          onClick={onToggle}
          title={collapsed ? "Expand" : "Collapse"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            height: 34,
            padding: collapsed ? "0" : "0 10px",
            justifyContent: collapsed ? "center" : "flex-start",
            borderRadius: 7,
            border: "none",
            cursor: "pointer",
            background: "transparent",
            color: T.textHint,
            fontSize: 13,
            fontFamily: "'Inter',sans-serif",
            width: "100%",
            transition: "color 0.12s",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {collapsed ? <polyline points="9 18 15 12 9 6" /> : <polyline points="15 18 9 12 15 6" />}
          </svg>
          {!collapsed && <span style={{ fontSize: 12.5 }}>Collapse</span>}
        </button>

        <button
          onClick={() => onNavigate("auth")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            height: 34,
            padding: collapsed ? "0" : "0 10px",
            justifyContent: collapsed ? "center" : "flex-start",
            borderRadius: 7,
            border: "none",
            cursor: "pointer",
            background: "transparent",
            color: T.textHint,
            fontSize: 13,
            fontFamily: "'Inter',sans-serif",
            width: "100%",
            transition: "color 0.12s",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!collapsed && <span style={{ fontSize: 12.5 }}>Sign out</span>}
        </button>
      </div>
    </div>
  );
}
