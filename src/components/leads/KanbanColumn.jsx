import { useState } from "react";
import { T, STATUS_META } from "../../constants/theme.js";
import { LeadCard } from "./LeadCard.jsx";

export function KanbanColumn({ status, leads, team, onDragStart, onDrop, onEdit }) {
  const meta = STATUS_META[status];
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={() => { onDrop(status); setDragOver(false); }}
      style={{
        flex: 1,
        minWidth: 240,
        maxWidth: 310,
        background: dragOver ? meta.dim : "rgba(255,255,255,0.02)",
        border: `1px solid ${dragOver ? meta.border : T.border}`,
        borderRadius: 12,
        padding: "14px 12px",
        transition: "all 0.15s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Column header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          paddingBottom: 12,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: meta.color, flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: T.text, fontFamily: "'Inter',sans-serif" }}>
            {meta.label}
          </span>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: T.textHint,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${T.border}`,
            padding: "1px 7px",
            borderRadius: 4,
            fontFamily: "'Inter',sans-serif",
          }}
        >
          {leads.length}
        </span>
      </div>

      {/* Cards */}
      <div style={{ flex: 1, overflowY: "auto", maxHeight: "calc(100vh - 290px)" }}>
        {leads.map((l) => (
          <LeadCard key={l.id} lead={l} team={team} onDragStart={onDragStart} onEdit={onEdit} />
        ))}
        {leads.length === 0 && (
          <div
            style={{
              border: `1px dashed ${T.border}`,
              borderRadius: 8,
              padding: "24px 0",
              textAlign: "center",
              color: T.textHint,
              fontSize: 12,
              fontFamily: "'Inter',sans-serif",
            }}
          >
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}
