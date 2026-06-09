import { useState } from "react";
import { T, STATUS_META } from "../constants/theme.js";
import { KanbanColumn } from "../components/leads/KanbanColumn.jsx";
import { AddLeadModal } from "../components/leads/AddLeadModal.jsx";
import { PrimaryBtn } from "../components/common/Button.jsx";

const filterSelectStyle = {
  background: T.input,
  border: `1px solid ${T.border}`,
  borderRadius: 7,
  padding: "0 10px",
  height: 34,
  color: T.textSub,
  fontSize: 12.5,
  cursor: "pointer",
  fontFamily: "'Inter',sans-serif",
  outline: "none",
};

export function Leads({ leads, moveLead, updateLead, addLead, team, search, onAddLead }) {
  const [filterStatus,   setFilterStatus]   = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterMember,   setFilterMember]   = useState("all");
  const [dragging,       setDragging]       = useState(null);
  const [editLead,       setEditLead]       = useState(null);

  const filtered = leads.filter((l) => {
    if (search && !(l.name + l.company + l.email).toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus   !== "all" && l.status     !== filterStatus)   return false;
    if (filterPriority !== "all" && l.priority   !== filterPriority) return false;
    if (filterMember   !== "all" && l.assignedTo !== filterMember)   return false;
    return true;
  });

  const handleDrop = (newStatus) => {
    if (!dragging) return;
    moveLead(dragging, newStatus);
    setDragging(null);
  };

  const handleSave = (form) => {
    if (form.id) {
      updateLead(form);
    } else {
      addLead(form);
    }
    setEditLead(null);
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={filterSelectStyle}>
          <option value="all">All status</option>
          {Object.entries(STATUS_META).map(([v, m]) => (
            <option key={v} value={v}>{m.label}</option>
          ))}
        </select>

        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={filterSelectStyle}>
          <option value="all">All priority</option>
          {["High", "Medium", "Low"].map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        <select value={filterMember} onChange={(e) => setFilterMember(e.target.value)} style={filterSelectStyle}>
          <option value="all">All members</option>
          {team.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>

        <div style={{ marginLeft: "auto" }}>
          <PrimaryBtn onClick={onAddLead}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add lead
          </PrimaryBtn>
        </div>
      </div>

      {/* Board */}
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12 }}>
        {Object.keys(STATUS_META).map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            leads={filtered.filter((l) => l.status === status)}
            team={team}
            onDragStart={setDragging}
            onDrop={handleDrop}
            onEdit={setEditLead}
          />
        ))}
      </div>

      {editLead !== null && (
        <AddLeadModal lead={editLead} team={team} onClose={() => setEditLead(null)} onSave={handleSave} />
      )}
    </div>
  );
}
