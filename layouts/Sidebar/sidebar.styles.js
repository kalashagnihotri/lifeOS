import theme from "../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

const sidebarWidth = spacing.xxl * 7;

export const getSidebarStyles = () => ({
  width: `${sidebarWidth}px`,
  minWidth: `${spacing.xxl * 5}px`,
  maxWidth: `${spacing.xxl * 7}px`,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.lg}px`,
  padding: `${spacing.xl}px ${spacing.lg}px`,
  backgroundColor: colors.surface,
  borderRight: `1px solid ${colors.border}`,
  boxSizing: "border-box",
  overflowY: "auto",
});

export const getSidebarTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.xl,
  fontWeight: typography.fontWeights.bold,
});

export const getSidebarListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getSidebarItemStyles = ({ isActive = false, isHovered = false }) => ({
  width: "100%",
  border: `1px solid ${isActive ? colors.primary : "transparent"}`,
  borderRadius: spacing.sm,
  backgroundColor: isActive
    ? colors.primary
    : isHovered
      ? colors.background
      : "transparent",
  color: isActive ? colors.surface : colors.text.secondary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  textAlign: "left",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: isActive ? typography.fontWeights.medium : typography.fontWeights.regular,
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
});
