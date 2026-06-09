import { T } from "../constants/theme.js";
import { Card } from "../components/common/Card.jsx";
import { Avatar } from "../components/common/Avatar.jsx";

export function Team({ team, leads }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
      {team.map((member) => {
        const memberLeads = leads.filter((l) => l.assignedTo === member.id);
        const closed = memberLeads.filter((l) => l.status === "closed").length;
        const rate   = memberLeads.length > 0 ? Math.round((closed / memberLeads.length) * 100) : 0;

        return (
          <Card key={member.id} style={{ padding: "20px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <Avatar member={member} size={44} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: "'Inter',sans-serif" }}>{member.name}</div>
                <div style={{ fontSize: 12, color: T.textSub, marginTop: 1, fontFamily: "'Inter',sans-serif" }}>{member.role}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[["Leads", memberLeads.length, T.cyan], ["Closed", closed, T.green], ["Rate", `${rate}%`, T.purple]].map(([l, v, c]) => (
                <div
                  key={l}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    padding: "10px 6px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 600, color: c, fontFamily: "'Inter',sans-serif" }}>{v}</div>
                  <div style={{ fontSize: 10.5, color: T.textHint, marginTop: 3, fontFamily: "'Inter',sans-serif" }}>{l}</div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: T.textHint, fontFamily: "'Inter',sans-serif" }}>Win rate</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: member.color, fontFamily: "'Inter',sans-serif" }}>{rate}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${rate}%`, background: member.color, borderRadius: 2, transition: "width 0.5s ease" }} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
