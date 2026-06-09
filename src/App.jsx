import { useState } from "react";
import { PAGE_META } from "./constants/navigation.jsx";
import { TEAM } from "./data/notifications.js";
import { useLeads } from "./hooks/useLeads.js";
import { useNotifications } from "./hooks/useNotifications.js";

import { AuthPage }         from "./pages/Auth.jsx";
import { Dashboard }        from "./pages/Dashboard.jsx";
import { Leads }            from "./pages/Leads.jsx";
import { Team }             from "./pages/Team.jsx";
import { Analytics }        from "./pages/Analytics.jsx";
import { Settings }         from "./pages/Settings.jsx";
import { DashboardLayout }  from "./components/layout/DashboardLayout.jsx";
import { AddLeadModal }     from "./components/leads/AddLeadModal.jsx";

export default function App() {
  const [authed,      setAuthed]      = useState(false);
  const [page,        setPage]        = useState("dashboard");
  const [collapsed,   setCollapsed]   = useState(false);
  const [search,      setSearch]      = useState("");
  const [showAddLead, setShowAddLead] = useState(false);

  const { notifs, setNotifs, activity, setActivity, markAllRead } = useNotifications();
  const { leads, addLead, updateLead, moveLead } = useLeads(setActivity, setNotifs);

  const currentUser = TEAM[0];

  const handleAddLead = async (form) => {
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          source: form.source,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send lead notification');
      }

      addLead(form);
      setShowAddLead(false);
      alert('Lead added and email notification sent to your Gmail account.');
    } catch (error) {
      console.error('Lead submission error:', error);
      alert(error.message || 'Unable to submit lead. Please check your backend and Gmail setup.');
    }
  };

  const handleNavigate = (target) => {
    if (target === "auth") { setAuthed(false); setPage("dashboard"); return; }
    setPage(target);
  };

  if (!authed) return <AuthPage onLogin={() => setAuthed(true)} />;

  const pm = PAGE_META[page] || PAGE_META.dashboard;
  const showAddBtn = page === "dashboard" || page === "leads";

  return (
    <>
      <DashboardLayout
        page={page}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        onNavigate={handleNavigate}
        search={search}
        setSearch={setSearch}
        notifs={notifs}
        onMarkAll={markAllRead}
        user={currentUser}
        pageTitle={pm.title}
        pageSub={pm.sub(leads, TEAM)}
        showAddBtn={showAddBtn}
        onAddLead={() => setShowAddLead(true)}
      >
        {page === "dashboard" && <Dashboard leads={leads} team={TEAM} activity={activity} />}
        {page === "leads"     && (
          <Leads
            leads={leads}
            moveLead={moveLead}
            updateLead={updateLead}
            addLead={addLead}
            team={TEAM}
            search={search}
            onAddLead={() => setShowAddLead(true)}
          />
        )}
        {page === "team"      && <Team team={TEAM} leads={leads} />}
        {page === "analytics" && <Analytics leads={leads} />}
        {page === "settings"  && <Settings user={currentUser} />}
      </DashboardLayout>

      {showAddLead && (
        <AddLeadModal
          lead={null}
          team={TEAM}
          onClose={() => setShowAddLead(false)}
          onSave={handleAddLead}
        />
      )}
    </>
  );
}
