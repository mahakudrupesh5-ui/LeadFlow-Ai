import { T, STATUS_META, PRIORITY_META } from "../constants/theme.js";
import { Card, CardHeading } from "../components/common/Card.jsx";
import { Avatar } from "../components/common/Avatar.jsx";
import { Badge } from "../components/common/Badge.jsx";
import { StatCard, MiniChart } from "../components/dashboard/StatsGrid.jsx";
import { ActivityFeed } from "../components/dashboard/ActivityFeed.jsx";

export function Dashboard({ leads, team, activity }) {
  const total  = leads.length;
  const active = leads.filter((l) => l.status !== "closed").length;
  const closed = leads.filter((l) => l.status === "closed").length;
  const rate   = total > 0 ? Math.round((closed / total) * 100) : 0;

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* Main column */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          <StatCard label="Total Leads"     value={total}        sub="+3 this week" />
          <StatCard label="Active"          value={active}       sub="In pipeline"  accentColor={T.cyan} />
          <StatCard label="Conversion Rate" value={`${rate}%`}   sub="↑ from 18%"  accentColor={T.green} />
          <StatCard label="Closed"          value={closed}       sub="This month"   accentColor={T.amber} />
        </div>

        {/* Pipeline breakdown */}
        <Card nohover style={{ padding: "20px 22px" }}>
          <CardHeading>Pipeline</CardHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {Object.entries(STATUS_META).map(([key, meta]) => {
              const count = leads.filter((l) => l.status === key).length;
              const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11.5, color: T.textSub, fontFamily: "'Inter',sans-serif" }}>{meta.label}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: meta.color, fontFamily: "'Inter',sans-serif" }}>{count}</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: meta.color, borderRadius: 2, transition: "width 0.5s ease" }} />
                  </div>
                  <div style={{ fontSize: 10.5, color: T.textHint, marginTop: 4, fontFamily: "'Inter',sans-serif" }}>{pct}%</div>
                  <MiniChart data={[2, 3, 1, 4, count, 2, count + 1]} color={meta.color} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent leads */}
        <Card nohover style={{ padding: "20px 22px" }}>
          <CardHeading>Recent leads</CardHeading>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Name", "Company", "Budget", "Priority", "Status", "Assigned"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      fontSize: 11,
                      color: T.textHint,
                      fontWeight: 500,
                      padding: "0 0 12px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((l) => {
                const member = team.find((t) => t.id === l.assignedTo);
                const sm = STATUS_META[l.status];
                const pm = PRIORITY_META[l.priority] || PRIORITY_META.Medium;
                return (
                  <tr key={l.id} style={{ borderTop: `1px solid ${T.border}` }}>
                    <td style={{ padding: "11px 0 11px", fontSize: 13, color: T.text, fontWeight: 500, fontFamily: "'Inter',sans-serif" }}>{l.name}</td>
                    <td style={{ padding: "11px 12px 11px 0", fontSize: 13, color: T.textSub, fontFamily: "'Inter',sans-serif" }}>{l.company}</td>
                    <td style={{ padding: "11px 12px 11px 0", fontSize: 13, fontWeight: 600, color: sm.color, fontFamily: "'Inter',sans-serif" }}>{l.budget}</td>
                    <td style={{ padding: "11px 12px 11px 0" }}><Badge label={l.priority} color={pm.color} bg={pm.bg} /></td>
                    <td style={{ padding: "11px 12px 11px 0" }}><Badge label={sm.label} color={sm.color} bg={sm.dim} dot /></td>
                    <td style={{ padding: "11px 0" }}><Avatar member={member} size={24} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Activity sidebar */}
      <div style={{ width: 264, flexShrink: 0 }}>
        <ActivityFeed activity={activity} />
      </div>
    </div>
  );
}
