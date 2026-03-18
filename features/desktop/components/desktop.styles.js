import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getDesktopRootStyles = () => ({
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
  background:
    "radial-gradient(circle at 14% 18%, rgba(120, 148, 255, 0.24) 0%, rgba(120, 148, 255, 0) 32%), radial-gradient(circle at 82% 76%, rgba(141, 210, 255, 0.22) 0%, rgba(141, 210, 255, 0) 38%), linear-gradient(165deg, rgba(14, 18, 29, 1) 0%, rgba(9, 12, 19, 1) 100%)",
});

export const getDesktopSurfaceStyles = () => ({
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(141, 151, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(141, 151, 184, 0.08) 1px, transparent 1px)",
  backgroundSize: "34px 34px",
  opacity: 0.35,
  pointerEvents: "none",
});

export const getDesktopIconGridStyles = () => ({
  position: "absolute",
  inset: 0,
  zIndex: 15,
});

export const getAppIconPositionStyles = ({ x = 0, y = 0, isDragging = false }) => ({
  position: "absolute",
  left: `${x}px`,
  top: `${y}px`,
  zIndex: isDragging ? 24 : 16,
  touchAction: "none",
});

export const getAppIconButtonStyles = ({ isHovered = false }) => ({
  width: "92px",
  minHeight: "84px",
  border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.26)" : "rgba(255, 255, 255, 0.14)"}`,
  borderRadius: spacing.md,
  backgroundColor: isHovered ? "rgba(20, 20, 30, 0.78)" : "rgba(20, 20, 30, 0.66)",
  padding: `${spacing.sm}px ${spacing.xs}px`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: `${spacing.xs}px`,
  cursor: "pointer",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: isHovered ? "0 14px 24px rgba(8, 10, 15, 0.34)" : "0 10px 18px rgba(8, 10, 15, 0.22)",
  filter: isHovered ? "brightness(1.08)" : "brightness(1)",
  transform: isHovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
  transition: "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, filter 0.2s ease",
});

export const getAppIconGlyphStyles = ({ isHovered = false }) => ({
  width: `${spacing.xxl}px`,
  height: `${spacing.xxl}px`,
  borderRadius: spacing.sm,
  border: `1px solid ${isHovered ? "rgba(167, 176, 255, 0.6)" : "rgba(141, 151, 184, 0.42)"}`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: isHovered ? colors.text.primary : colors.text.secondary,
  backgroundColor: "rgba(15, 17, 23, 0.75)",
  transition: "border-color 0.2s ease, color 0.2s ease",
});

export const getAppIconLabelStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  letterSpacing: "0.02em",
});

export const getDesktopDockStyles = () => ({
  position: "absolute",
  left: "50%",
  bottom: `${spacing.md}px`,
  transform: "translateX(-50%)",
  display: "inline-flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
  padding: `${spacing.xs}px`,
  border: "1px solid rgba(255, 255, 255, 0.14)",
  borderRadius: spacing.md,
  backgroundColor: "rgba(20, 20, 30, 0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 16px 30px rgba(8, 10, 15, 0.32)",
  zIndex: 9999,
});

export const getDesktopDockItemStyles = ({ isHovered = false }) => ({
  border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.08)"}`,
  borderRadius: spacing.sm,
  backgroundColor: isHovered ? "rgba(20, 20, 30, 0.78)" : "rgba(20, 20, 30, 0.62)",
  color: colors.text.secondary,
  minWidth: `${spacing.xxl * 2}px`,
  maxWidth: `${spacing.xxl * 4}px`,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: `${spacing.xs}px`,
  cursor: "pointer",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  filter: isHovered ? "brightness(1.07)" : "brightness(1)",
  transition: "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, filter 0.2s ease",
  transform: isHovered ? "translateY(-1px)" : "translateY(0)",
});

export const getDesktopDockItemInnerStyles = () => ({
  display: "inline-flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const getDesktopDockIndicatorStyles = ({ isActive = false }) => ({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  backgroundColor: isActive ? "rgba(167, 176, 255, 0.95)" : "rgba(141, 151, 184, 0.4)",
  boxShadow: isActive ? "0 0 10px rgba(167, 176, 255, 0.85)" : "none",
});

export const getDesktopDockContextMenuStyles = ({ x = 0, y = 0 }) => ({
  position: "fixed",
  left: `${x}px`,
  top: `${y}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
  minWidth: "130px",
  border: "1px solid rgba(255, 255, 255, 0.14)",
  borderRadius: spacing.sm,
  backgroundColor: "rgba(20, 20, 30, 0.78)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 16px 30px rgba(8, 10, 15, 0.34)",
  padding: `${spacing.xs}px`,
  zIndex: 10010,
});

export const getDesktopDockContextActionStyles = ({ isDanger = false }) => ({
  border: "none",
  borderRadius: spacing.xs,
  backgroundColor: "transparent",
  color: isDanger ? colors.error : colors.text.secondary,
  textAlign: "left",
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
});

export const getDesktopDockCloseAllStyles = ({ isHovered = false }) => ({
  border: `1px solid ${isHovered ? "rgba(255, 95, 87, 0.9)" : "rgba(255, 95, 87, 0.58)"}`,
  borderRadius: spacing.sm,
  backgroundColor: isHovered ? "rgba(255, 95, 87, 0.18)" : "rgba(255, 95, 87, 0.06)",
  color: colors.error,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  transition: "border-color 0.2s ease, background-color 0.2s ease",
});
