export const lightTheme = {
  body: "#ffffff",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  cardBg: "#f8fafc",
  cardBorder: "rgba(0, 0, 0, 0.1)",
  innerBg: "#f1f5f9",
  divider: "rgba(0, 0, 0, 0.05)",
  accent: "#8b5cf6",
  headerBg: "#ffffff",
};

export const darkTheme: typeof lightTheme = {
  body: "black",
  textPrimary: "white",
  textSecondary: "white",
  cardBg: "#0f0f10",
  cardBorder: "rgba(255, 255, 255, 0.05)",
  innerBg: "#1a1a1a",
  divider: "rgba(255, 255, 255, 0.05)",
  accent: "#8b5cf6",
  headerBg: "black",
};

export type AppTheme = typeof lightTheme;
