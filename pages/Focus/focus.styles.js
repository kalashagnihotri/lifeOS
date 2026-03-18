import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getFocusPageStyles = () => ({
  minHeight: "100%",
  width: "100%",
  background:
    "radial-gradient(circle at 50% 10%, rgba(167, 176, 255, 0.12) 0%, rgba(15, 17, 23, 0) 42%), #0f1117",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  padding: `clamp(${spacing.md}px, 3vw, ${spacing.xl}px)`,
  boxSizing: "border-box",
  animation: "lifeosPageFade 320ms ease",
});

export const getFocusHeaderStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.xl}px, 3vw, ${typography.fontSizes.heading}px)`,
  fontWeight: typography.fontWeights.bold,
  textAlign: "center",
});

export const getFocusSubHeaderStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
});

export const getFocusTimerShellStyles = () => ({
  width: "100%",
  maxWidth: `${spacing.xxl * 16}px`,
  display: "flex",
  flexDirection: "column",
  gap: `clamp(${spacing.sm}px, 2vw, ${spacing.md}px)`,
});

export const getFocusActionRowStyles = () => ({
  width: "100%",
  maxWidth: `${spacing.xxl * 16}px`,
  display: "flex",
  justifyContent: "flex-end",
});

export const getZenModePageStyles = () => ({
  position: "fixed",
  inset: 0,
  minHeight: "100vh",
  width: "100vw",
  background: "#000",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "stretch",
  padding: 0,
  boxSizing: "border-box",
  overflow: "hidden",
  zIndex: 14000,
});

export const getZenModeSceneStyles = () => ({
  width: "100%",
  maxWidth: "780px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: `clamp(${spacing.md}px, 2.8vh, ${spacing.xl}px)`,
});

export const getZenModeLayerStyles = () => ({
  position: "relative",
  width: "100%",
  height: "100%",
});

export const getZenDraggableItemStyles = ({ x = 0, y = 0, isDragging = false, zIndex = 1 }) => ({
  position: "absolute",
  left: `${x}px`,
  top: `${y}px`,
  cursor: isDragging ? "grabbing" : "grab",
  userSelect: "none",
  touchAction: "none",
  zIndex,
});
