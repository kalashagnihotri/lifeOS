import theme from "../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

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
  backgroundColor: colors.surface,
  borderRight: `1px solid ${colors.border}`,
  boxSizing: "border-box",
  overflowY: "auto",
  transition: "width 0.25s ease, min-width 0.25s ease, padding 0.25s ease",
});

export const getSidebarHeaderStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.xs}px`,
});

export const getSidebarBrandStyles = ({ showLabels = true }) => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: showLabels ? typography.fontSizes.xl : typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
  transition: "font-size 0.25s ease",
});

export const getSidebarToggleStyles = ({ isExpanded = false }) => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.xs,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  backgroundColor: isExpanded ? colors.background : colors.surface,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease",
});

export const getSidebarListStyles = ({ showLabels = true }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
  alignItems: showLabels ? "stretch" : "center",
});

export const getSidebarItemStyles = ({
  isActive = false,
  isHovered = false,
  showLabels = true,
}) => ({
  width: showLabels ? "100%" : `${spacing.xxl + spacing.md}px`,
  border: `1px solid ${isActive ? colors.primary : "transparent"}`,
  borderRadius: spacing.sm,
  backgroundColor: isActive
    ? colors.primary
    : isHovered
      ? colors.background
      : "transparent",
  color: isActive ? colors.surface : colors.text.secondary,
  padding: `${spacing.sm}px ${showLabels ? spacing.md : spacing.sm}px`,
  textAlign: showLabels ? "left" : "center",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: isActive ? typography.fontWeights.medium : typography.fontWeights.regular,
  cursor: "pointer",
  transform: isHovered && !isActive ? "translateY(-1px)" : "none",
  transition:
    "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease",
});
