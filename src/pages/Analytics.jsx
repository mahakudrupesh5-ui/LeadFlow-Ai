import { T, STATUS_META, PRIORITY_META } from "../constants/theme.js";
import { Card, CardHeading } from "../components/common/Card.jsx";
import { StatCard } from "../components/dashboard/StatsGrid.jsx";

export function Analytics({ leads }) {
  const bySource   = leads.reduce((acc, l) => { acc[l.source] = (acc[l.source] || 0) + 1; return acc; }, {});
  const byStatus   = Object.entries(STATUS_META).map(([k, m]) => ({ label: m.label, count: leads.filter((l) => l.status === k).length, color: m.color }));
  const byPriority = ["High", "Medium", "Low"].map((p) => ({ label: p, count: leads.filter((l) => l.priority === p).length, color: PRIORITY_META[p].color }));

  const sourceColors = [T.purple, T.cyan, T.amber, T.pink, T.green, T.red];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        <StatCard label="Total Leads"  value={leads.length} />
        <StatCard label="Avg Budget"   value="$18.4K" accentColor={T.green} />
        <StatCard label="Win Rate"     value="22%"    sub="↑ 4% MoM" accentColor={T.cyan} />
        <StatCard label="Lead Sources" value={Object.keys(bySource).length} accentColor={T.pink} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card nohover style={{ padding: "20px 22px" }}>
          <CardHeading>By status</CardHeading>
          {byStatus.map(({ label, count, color }) => {
            const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
            return (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: T.textSub, fontFamily: "'Inter',sans-serif" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color, fontFamily: "'Inter',sans-serif" }}>{count} · {pct}%</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.5s" }} />
                </div>
              </div>
            );
          })}
        </Card>

        <Card nohover style={{ padding: "20px 22px" }}>
          <CardHeading>By source</CardHeading>
          {Object.entries(bySource).map(([source, count], i) => {
            const color = sourceColors[i % sourceColors.length];
            const pct   = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
            return (
              <div key={source} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 13, color: T.textSub, fontFamily: "'Inter',sans-serif" }}>{source}</span>
                <span style={{ fontSize: 12, color: T.textHint, fontFamily: "'Inter',sans-serif" }}>{count}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color, minWidth: 34, textAlign: "right", fontFamily: "'Inter',sans-serif" }}>{pct}%</span>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Priority */}
      <Card nohover style={{ padding: "20px 22px" }}>
        <CardHeading>Priority breakdown</CardHeading>
        <div style={{ display: "flex", gap: 12 }}>
          {byPriority.map(({ label, count, color }) => {
            const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
            return (
              <div
                key={label}
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  padding: "18px 12px",
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 600, color, letterSpacing: "-0.04em", fontFamily: "'Inter',sans-serif" }}>{count}</div>
                <div style={{ fontSize: 12, color: T.textSub, marginTop: 6, fontFamily: "'Inter',sans-serif" }}>{label}</div>
                <div style={{ fontSize: 11, color: T.textHint, marginTop: 2, fontFamily: "'Inter',sans-serif" }}>{pct}% of total</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
