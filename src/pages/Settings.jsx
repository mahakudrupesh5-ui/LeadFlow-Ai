import { useState } from "react";
import { T } from "../constants/theme.js";
import { Card } from "../components/common/Card.jsx";
import { Avatar } from "../components/common/Avatar.jsx";
import { Input, FieldLabel } from "../components/common/Input.jsx";
import { PrimaryBtn, GhostBtn } from "../components/common/Button.jsx";
import { Toggle } from "../components/settings/Toggle.jsx";

const PREFS_CONFIG = [
  ["Email notifications", "Receive updates via email",          "emailNotif"],
  ["Push alerts",         "Browser push notifications",         "pushAlerts"],
  ["Weekly report",       "Summary email every Monday",         "weeklyReport"],
  ["Dark mode",           "Use dark theme across the app",      "darkMode"],
];

const PROFILE_FIELDS = (user) => [
  ["Display name", user.name],
  ["Email",        "aman@leadbot.io"],
  ["Role",         user.role],
  ["Team",         "Sales"],
];

export function Settings({ user }) {
  const [prefs, setPrefs] = useState({ emailNotif: true, pushAlerts: true, weeklyReport: false, darkMode: true });
  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div style={{ maxWidth: 580, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Profile card */}
      <Card nohover style={{ padding: "24px 24px" }}>
        {/* Profile header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingBottom: 20,
            marginBottom: 20,
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <div style={{ position: "relative" }}>
            <Avatar member={user} size={56} />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: T.purple,
                border: `2px solid ${T.card}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: T.text, letterSpacing: "-0.02em", fontFamily: "'Inter',sans-serif" }}>
              {user.name}
            </div>
            <div style={{ fontSize: 13, color: T.textSub, marginTop: 3, fontFamily: "'Inter',sans-serif" }}>
              {user.role} · aman@leadbot.io
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <GhostBtn>Edit photo</GhostBtn>
          </div>
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: T.textHint,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 14,
            fontFamily: "'Inter',sans-serif",
          }}
        >
          Profile
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          {PROFILE_FIELDS(user).map(([l, v]) => (
            <div key={l} style={{ marginBottom: 16 }}>
              <FieldLabel>{l}</FieldLabel>
              <Input value={v} onChange={() => {}} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
          <GhostBtn>Discard</GhostBtn>
          <PrimaryBtn>Save changes</PrimaryBtn>
        </div>
      </Card>

      {/* Notifications card */}
      <Card nohover style={{ padding: "24px 24px" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: T.textHint,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "'Inter',sans-serif",
          }}
        >
          Notifications
        </div>

        {PREFS_CONFIG.map(([label, desc, key]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 0",
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: T.text, fontFamily: "'Inter',sans-serif" }}>{label}</div>
              <div style={{ fontSize: 12, color: T.textHint, marginTop: 2, fontFamily: "'Inter',sans-serif" }}>{desc}</div>
            </div>
            <Toggle on={prefs[key]} onChange={() => toggle(key)} />
          </div>
        ))}
      </Card>

      {/* Danger zone */}
      <Card nohover style={{ padding: "20px 24px", borderColor: "rgba(239,68,68,0.18)" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: T.red,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 14,
            fontFamily: "'Inter',sans-serif",
          }}
        >
          Danger zone
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: T.text, fontFamily: "'Inter',sans-serif" }}>Delete account</div>
            <div style={{ fontSize: 12, color: T.textHint, marginTop: 2, fontFamily: "'Inter',sans-serif" }}>
              Permanently remove your account and all data
            </div>
          </div>
          <GhostBtn danger>Delete account</GhostBtn>
        </div>
      </Card>
    </div>
  );
}
