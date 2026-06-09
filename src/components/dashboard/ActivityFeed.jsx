import { T } from "../../constants/theme.js";
import { Card, CardHeading } from "../common/Card.jsx";

export function ActivityFeed({ activity }) {
  return (
    <Card nohover style={{ padding: "18px 20px" }}>
      <CardHeading>Activity</CardHeading>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {activity.map((a, i) => (
          <div
            key={a.id}
            style={{
              display: "flex",
              gap: 12,
              paddingBottom: i < activity.length - 1 ? 16 : 0,
              position: "relative",
            }}
          >
            {i < activity.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 6,
                  top: 14,
                  bottom: 0,
                  width: 1,
                  background: T.border,
                }}
              />
            )}
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                flexShrink: 0,
                marginTop: 3,
                background: a.color + "18",
                border: `1.5px solid ${a.color}50`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, color: T.textSub, lineHeight: 1.5, fontFamily: "'Inter',sans-serif" }}>
                {a.text}
              </div>
              <div style={{ fontSize: 11, color: T.textHint, marginTop: 2, fontFamily: "'Inter',sans-serif" }}>
                {a.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
