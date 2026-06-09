import { useState } from "react";
import { T, PRIORITY_META, STATUS_META } from "../../constants/theme.js";
import { Avatar } from "../common/Avatar.jsx";
import { Badge } from "../common/Badge.jsx";

export function LeadCard({ lead, team, onDragStart, onEdit }) {
  const [hov, setHov] = useState(false);
  const member = team.find((t) => t.id === lead.assignedTo);
  const pm = PRIORITY_META[lead.priority] || PRIORITY_META.Medium;
  const sm = STATUS_META[lead.status];

  return (
    <div
      draggable
      onDragStart={() => onDragStart(lead.id)}
      onClick={() => onEdit(lead)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? T.cardHover : T.card,
        border: `1px solid ${hov ? T.borderMed : T.border}`,
        borderRadius: 10,
        padding: "14px 14px",
        cursor: "grab",
        marginBottom: 6,
        userSelect: "none",
        transition: "background 0.15s ease, border-color 0.15s ease",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
          <div
            style={{
              fontSize: 13.5,
              fontWeight: 500,
              color: T.text,
              marginBottom: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "'Inter',sans-serif",
            }}
          >
            {lead.name}
          </div>
          <div style={{ fontSize: 12, color: T.textSub, fontFamily: "'Inter',sans-serif" }}>{lead.company}</div>
        </div>
        <Badge label={lead.priority} color={pm.color} bg={pm.bg} />
      </div>

      {/* Budget */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: sm.color,
          marginBottom: 10,
          fontFamily: "'Inter',sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {lead.budget}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
        {[lead.contact, lead.source].map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              color: T.textHint,
              background: "rgba(255,255,255,0.04)",
              padding: "2px 7px",
              borderRadius: 4,
              border: `1px solid ${T.border}`,
              fontFamily: "'Inter',sans-serif",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 10,
          borderTop: `1px solid ${T.border}`,
        }}
      >
        <Avatar member={member} size={24} />
        <span style={{ fontSize: 11, color: T.textHint, fontFamily: "'Inter',sans-serif" }}>
          {lead.lastActivity}
        </span>
      </div>
    </div>
  );
}
