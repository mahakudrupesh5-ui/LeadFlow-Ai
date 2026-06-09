import { T } from "../../constants/theme.js";
import { Sidebar } from "./Sidebar.jsx";
import { Navbar } from "./Navbar.jsx";
import { PrimaryBtn } from "../common/Button.jsx";

export function DashboardLayout({
  page,
  collapsed,
  onToggleCollapse,
  onNavigate,
  search,
  setSearch,
  notifs,
  onMarkAll,
  user,
  pageTitle,
  pageSub,
  showAddBtn,
  onAddLead,
  children,
}) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: T.bg,
        overflow: "hidden",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      <Sidebar
        active={page}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onToggle={onToggleCollapse}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar
          search={search}
          setSearch={setSearch}
          notifs={notifs}
          onMarkAll={onMarkAll}
          user={user}
        />

        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px" }}>
          {/* Page header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 24,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: T.text,
                  margin: 0,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                {pageTitle}
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: T.textHint,
                  margin: "6px 0 0",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                {pageSub}
              </p>
            </div>
            {showAddBtn && (
              <PrimaryBtn onClick={onAddLead}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New lead
              </PrimaryBtn>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
