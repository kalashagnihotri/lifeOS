import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getDesktopRootStyles = () => ({
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
  background: "transparent",
});

export const getDesktopSurfaceStyles = () => ({
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(118, 119, 124, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(118, 119, 124, 0.05) 1px, transparent 1px)",
  backgroundSize: "34px 34px",
  opacity: 0.3,
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

export const getAppIconButtonStyles = ({
  isHovered = false,
  isPressed = false,
  isFocused = false,
} = {}) => ({
  width: "92px",
  minHeight: "84px",
  border: `1px solid ${isFocused ? "rgba(71, 71, 71, 0.2)" : isHovered ? "rgba(71, 71, 71, 0.16)" : "rgba(71, 71, 71, 0.12)"}`,
  borderRadius: spacing.md,
  backgroundColor: isHovered || isFocused ? "rgba(31, 31, 31, 0.66)" : "rgba(27, 27, 27, 0.58)",
  padding: `${spacing.sm}px ${spacing.xs}px`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: `${spacing.xs}px`,
  cursor: "pointer",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow: isFocused
    ? "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 0 3px rgba(71, 71, 71, 0.2), 0 22px 44px rgba(0, 0, 0, 0.44)"
    : isHovered
      ? "inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.42), 0 0 20px rgba(230, 230, 232, 0.08)"
      : "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 14px 30px rgba(0, 0, 0, 0.32)",
  filter: isHovered || isFocused ? "brightness(1.08)" : "brightness(1)",
  transform: isPressed
    ? "translateY(-1px) scale(0.97)"
    : isHovered
      ? "translateY(-4px) scale(1.08)"
      : "translateY(0) scale(1)",
  transition: "background-color 240ms ease, border-color 240ms ease, box-shadow 260ms ease, transform 220ms ease, filter 240ms ease",
  outline: "none",
});

export const getAppIconGlyphStyles = ({ isHovered = false, isFocused = false } = {}) => ({
  width: `${spacing.xxl}px`,
  height: `${spacing.xxl}px`,
  borderRadius: spacing.sm,
  border: `1px solid ${isFocused ? "rgba(71, 71, 71, 0.22)" : isHovered ? "rgba(71, 71, 71, 0.16)" : "rgba(71, 71, 71, 0.12)"}`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: isHovered || isFocused ? colors.text.primary : colors.text.secondary,
  backgroundColor: "rgba(22, 22, 22, 0.66)",
  boxShadow: isFocused ? "inset 0 0 0 1px rgba(231, 231, 233, 0.22)" : "none",
  transition: "border-color 240ms ease, color 240ms ease, box-shadow 240ms ease",
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
  border: "1px solid rgba(71, 71, 71, 0.14)",
  borderRadius: spacing.md,
  backgroundColor: "rgba(31, 31, 31, 0.54)",
  backdropFilter: "blur(32px)",
  WebkitBackdropFilter: "blur(32px)",
  boxShadow: "0 24px 50px rgba(0, 0, 0, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.11)",
  zIndex: 9999,
});

export const getDesktopDockItemStyles = ({ isHovered = false }) => ({
  border: `1px solid ${isHovered ? "rgba(71, 71, 71, 0.18)" : "rgba(71, 71, 71, 0.12)"}`,
  borderRadius: spacing.sm,
  backgroundColor: isHovered ? "rgba(42, 42, 42, 0.6)" : "rgba(27, 27, 27, 0.52)",
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
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
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
  backgroundColor: isActive ? "rgba(218, 220, 226, 0.9)" : "rgba(132, 136, 146, 0.38)",
  boxShadow: isActive ? "0 0 10px rgba(218, 220, 226, 0.55)" : "none",
});

export const getDesktopDockContextMenuStyles = ({ x = 0, y = 0 }) => ({
  position: "fixed",
  left: `${x}px`,
  top: `${y}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
  minWidth: "130px",
  border: "1px solid rgba(71, 71, 71, 0.14)",
  borderRadius: spacing.sm,
  backgroundColor: "rgba(31, 31, 31, 0.62)",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  boxShadow: "0 20px 46px rgba(0, 0, 0, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
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
