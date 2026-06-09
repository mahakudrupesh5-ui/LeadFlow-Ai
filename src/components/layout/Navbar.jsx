import { useState } from "react";
import { T } from "../../constants/theme.js";
import { Avatar } from "../common/Avatar.jsx";
import { IconBtn } from "../common/Button.jsx";
import { Input } from "../common/Input.jsx";

const NOTIF_ICON = {
  user:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  arrow: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  bell:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  plus:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>,
};

function NotifDropdown({ notifs, onMarkAll }) {
  const unread = notifs.filter((n) => !n.read).length;
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        background: T.card,
        border: `1px solid ${T.borderMed}`,
        borderRadius: 12,
        width: 340,
        zIndex: 1000,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 16px 12px",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: "'Inter',sans-serif" }}>
            Notifications
          </span>
          {unread > 0 && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                background: T.purple,
                color: "#fff",
                padding: "1px 6px",
                borderRadius: 10,
                fontFamily: "'Inter',sans-serif",
              }}
            >
              {unread} new
            </span>
          )}
        </div>
        <button
          onClick={onMarkAll}
          style={{
            background: "none",
            border: "none",
            color: T.textSub,
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "'Inter',sans-serif",
          }}
        >
          Mark all read
        </button>
      </div>
      <div style={{ maxHeight: 304, overflowY: "auto" }}>
        {notifs.map((n) => (
          <div
            key={n.id}
            style={{
              padding: "11px 16px",
              borderBottom: `1px solid ${T.border}`,
              background: n.read ? "transparent" : "rgba(124,58,237,0.06)",
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                flexShrink: 0,
                marginTop: 1,
                background: n.read ? "rgba(255,255,255,0.05)" : T.purpleDim,
                color: n.read ? T.textHint : T.purpleLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {NOTIF_ICON[n.icon]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: n.read ? T.textSub : T.text, lineHeight: 1.45, fontFamily: "'Inter',sans-serif" }}>
                {n.text}
              </div>
              <div style={{ fontSize: 11, color: T.textHint, marginTop: 3, fontFamily: "'Inter',sans-serif" }}>
                {n.time}
              </div>
            </div>
            {!n.read && (
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.purple, marginTop: 6, flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Navbar({ search, setSearch, notifs, onMarkAll, user }) {
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifs.filter((n) => !n.read).length;

  return (
    <div
      style={{
        height: 56,
        background: T.surface,
        borderBottom: `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 12,
        flexShrink: 0,
      }}
    >
      <div style={{ flex: 1, maxWidth: 340 }}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads…"
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          }
        />
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ position: "relative" }}>
          <IconBtn onClick={() => setShowNotif((v) => !v)} badge={unread}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </IconBtn>
          {showNotif && <NotifDropdown notifs={notifs} onMarkAll={onMarkAll} />}
        </div>

        <div style={{ width: 1, height: 20, background: T.border }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 10px 0 6px",
            height: 36,
            borderRadius: 8,
            border: `1px solid ${T.border}`,
            cursor: "pointer",
            transition: "border-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.borderMed)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
        >
          <Avatar member={user} size={24} />
          <span style={{ fontSize: 13, fontWeight: 500, color: T.text, fontFamily: "'Inter',sans-serif" }}>
            {user.name.split(" ")[0]}
          </span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.textHint} strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
}
