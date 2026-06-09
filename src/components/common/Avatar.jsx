export function Avatar({ member, size = 28 }) {
  if (!member) return null;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: member.color + "1A",
        border: `1.5px solid ${member.color}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: Math.round(size * 0.34),
        fontWeight: 600,
        color: member.color,
        flexShrink: 0,
        letterSpacing: "-0.01em",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      {member.initials}
    </div>
  );
}
