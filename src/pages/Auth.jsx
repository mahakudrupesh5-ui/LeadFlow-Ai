import { useState } from "react";
import { T } from "../constants/theme.js";
import { Input, FieldLabel } from "../components/common/Input.jsx";
import { PrimaryBtn } from "../components/common/Button.jsx";

export function AuthPage({ onLogin }) {
  const [mode,     setMode]     = useState("login");
  const [showPass, setShowPass] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: "fixed", top: "10%", left: "20%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "10%", right: "15%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(34,211,238,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div
        style={{
          background: T.card,
          border: `1px solid ${T.borderMed}`,
          borderRadius: 16,
          padding: "36px 36px",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: T.purple, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text, letterSpacing: "-0.03em" }}>LeadBot CRM</div>
            <div style={{ fontSize: 11.5, color: T.textHint, marginTop: 1 }}>Smart lead management</div>
          </div>
        </div>

        <div style={{ fontSize: 20, fontWeight: 600, color: T.text, letterSpacing: "-0.03em", marginBottom: 4 }}>
          {mode === "login" ? "Sign in" : "Create account"}
        </div>
        <div style={{ fontSize: 13, color: T.textSub, marginBottom: 24 }}>
          {mode === "login" ? "Welcome back" : "Start your free trial"}
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 9, padding: 3, marginBottom: 22, border: `1px solid ${T.border}` }}>
          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: "7px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                background: mode === m ? T.card : "transparent",
                color: mode === m ? T.text : T.textSub,
                fontSize: 13,
                fontWeight: mode === m ? 500 : 400,
                boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.25)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              {m === "login" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        {mode === "signup" && (
          <div style={{ marginBottom: 14 }}>
            <FieldLabel>Full name</FieldLabel>
            <Input placeholder="Aman Singh" />
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <FieldLabel>Work email</FieldLabel>
          <Input type="email" placeholder="you@company.com" />
        </div>

        <div style={{ marginBottom: mode === "login" ? 14 : 22 }}>
          <FieldLabel>Password</FieldLabel>
          <div style={{ position: "relative" }}>
            <Input type={showPass ? "text" : "password"} placeholder="••••••••" style={{ paddingRight: 40 }} />
            <button
              onClick={() => setShowPass((v) => !v)}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: T.textHint,
                cursor: "pointer",
                display: "flex",
                padding: 2,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {showPass ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mode === "login" && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: T.purple, width: 13, height: 13 }} />
              <span style={{ fontSize: 12.5, color: T.textSub }}>Remember me</span>
            </label>
            <span style={{ fontSize: 12.5, color: T.purple, cursor: "pointer" }}>Forgot password?</span>
          </div>
        )}

        <PrimaryBtn
          onClick={onLogin}
          style={{ width: "100%", justifyContent: "center", height: 40, fontSize: 14, borderRadius: 9, marginBottom: 14 }}
        >
          {mode === "login" ? "Sign in" : "Create account"}
        </PrimaryBtn>

        <div style={{ textAlign: "center", fontSize: 12.5, color: T.textHint }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <span
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            style={{ color: T.purpleLight, cursor: "pointer" }}
          >
            {mode === "login" ? "Sign up free" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}
