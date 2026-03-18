import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const sidebarWidth = spacing.xxl * 7;
const compactSidebarWidth = spacing.xxl * 2 + spacing.md;

export const getSidebarStyles = ({ isCompact = false, isExpanded = false }) => ({
  width: `${isCompact && !isExpanded ? compactSidebarWidth : sidebarWidth}px`,
  minWidth: `${isCompact && !isExpanded ? compactSidebarWidth : spacing.xxl * 5}px`,
  maxWidth: `${isCompact && !isExpanded ? compactSidebarWidth : spacing.xxl * 7}px`,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.lg}px`,
  padding: `${spacing.xl}px ${isCompact && !isExpanded ? spacing.sm : spacing.lg}px`,
  background: `linear-gradient(180deg, ${hexToRgba(colors.surface, 0.98)} 0%, ${hexToRgba(colors.background, 0.94)} 100%)`,
  borderRight: `1px solid ${hexToRgba(colors.border, 0.9)}`,
  boxSizing: "border-box",
  overflowY: "auto",
  backdropFilter: "blur(14px)",
  boxShadow: `14px 0 34px ${hexToRgba(colors.background, 0.45)}`,
  transition: "width 0.25s ease, min-width 0.25s ease, padding 0.25s ease, border-color 0.25s ease",
});

export const getSidebarHeaderStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.xs}px`,
  marginBottom: `${spacing.xs}px`,
});

export const getSidebarBrandStyles = ({ showLabels = true }) => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: showLabels ? typography.fontSizes.xl : typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
  letterSpacing: "0.04em",
  transition: "font-size 0.25s ease, color 0.25s ease",
});

export const getSidebarToggleStyles = ({ isExpanded = false }) => ({
  border: `1px solid ${hexToRgba(colors.border, 0.95)}`,
  borderRadius: spacing.sm,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  backgroundColor: isExpanded ? hexToRgba(colors.primary, 0.16) : "transparent",
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
});

export const getSidebarSectionLabelStyles = () => ({
  margin: `0 0 ${spacing.sm}px ${spacing.xs}px`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});

export const getSidebarListStyles = ({ showLabels = true }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
  alignItems: showLabels ? "stretch" : "center",
});

export const getSidebarItemContentStyles = ({ showLabels = true }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: showLabels ? "flex-start" : "center",
  gap: `${spacing.sm}px`,
});

export const getSidebarIconWrapStyles = ({ isActive = false, isHovered = false }) => ({
  width: `${spacing.lg + spacing.xs}px`,
  height: `${spacing.lg + spacing.xs}px`,
  borderRadius: spacing.sm,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: isActive ? colors.primary : isHovered ? colors.text.primary : colors.text.secondary,
  backgroundColor: isActive ? hexToRgba(colors.primary, 0.16) : "transparent",
  transition: "background-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
  transform: isHovered && !isActive ? "scale(1.06)" : "none",
});

export const getSidebarLabelStyles = () => ({
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
});

export const getSidebarItemStyles = ({
  isActive = false,
  isHovered = false,
  isPressed = false,
  showLabels = true,
}) => ({
  width: showLabels ? "100%" : `${spacing.xxl + spacing.md}px`,
  border: `1px solid ${isActive ? hexToRgba(colors.primary, 0.55) : "transparent"}`,
  borderLeft: `${spacing.xs}px solid ${isActive ? colors.primary : "transparent"}`,
  borderRadius: spacing.sm,
  backgroundColor: isActive
    ? hexToRgba(colors.primary, 0.18)
    : isHovered
      ? hexToRgba(colors.surface, 0.85)
      : "transparent",
  color: colors.text.secondary,
  padding: `${spacing.sm}px ${showLabels ? spacing.md : spacing.sm}px`,
  textAlign: showLabels ? "left" : "center",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: isActive ? typography.fontWeights.medium : typography.fontWeights.regular,
  cursor: "pointer",
  boxShadow: isActive
    ? `0 12px 24px ${hexToRgba(colors.primary, 0.2)}`
    : isHovered
      ? `0 8px 18px ${hexToRgba(colors.background, 0.36)}`
      : "none",
  transform: isPressed
    ? "scale(0.985)"
    : isHovered && !isActive
      ? "translateY(-1px) scale(1.01)"
      : "none",
  animation: isPressed ? "lifeosClickMicro 160ms ease" : "none",
  transition:
    "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease",
});
