// Design tokens — calibrated to Linear / Attio / Vercel aesthetic
export const T = {
  // Backgrounds
  bg:         "#0F172A",
  surface:    "#111827",
  card:       "#1E293B",
  cardHover:  "#243044",
  input:      "#162032",
  inputHover: "#1a2740",

  // Text
  text:     "#F8FAFC",
  textSub:  "#94A3B8",
  textHint: "#475569",

  // Borders
  border:      "rgba(255,255,255,0.07)",
  borderMed:   "rgba(255,255,255,0.11)",
  borderFocus: "rgba(124,58,237,0.55)",

  // Accents
  purple:      "#7C3AED",
  purpleHov:   "#6D28D9",
  purpleLight: "#A78BFA",
  purpleDim:   "rgba(124,58,237,0.12)",

  cyan:     "#22D3EE",
  cyanDim:  "rgba(34,211,238,0.10)",

  green:    "#22C55E",
  greenDim: "rgba(34,197,94,0.10)",

  amber:    "#F59E0B",
  amberDim: "rgba(245,158,11,0.10)",

  red:    "#EF4444",
  redDim: "rgba(239,68,68,0.10)",

  pink:    "#EC4899",
  pinkDim: "rgba(236,72,153,0.10)",
};

export const STATUS_META = {
  new:        { label: "New",         color: T.cyan,   dim: T.cyanDim,   border: "rgba(34,211,238,0.25)"  },
  contacted:  { label: "Contacted",   color: T.purple, dim: T.purpleDim, border: "rgba(124,58,237,0.25)"  },
  inprogress: { label: "In Progress", color: T.amber,  dim: T.amberDim,  border: "rgba(245,158,11,0.25)"  },
  closed:     { label: "Closed",      color: T.green,  dim: T.greenDim,  border: "rgba(34,197,94,0.25)"   },
};

export const PRIORITY_META = {
  High:   { color: T.red,     bg: T.redDim },
  Medium: { color: T.amber,   bg: T.amberDim },
  Low:    { color: T.textHint, bg: "rgba(71,85,105,0.18)" },
};
