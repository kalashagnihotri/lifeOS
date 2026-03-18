import theme from "../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

export const getDashboardPageStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  minWidth: 0,
  width: "100%",
});

export const getDashboardSectionStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
  minWidth: 0,
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  padding: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  boxSizing: "border-box",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
});

export const getDashboardTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.large}px, 2vw, ${typography.fontSizes.xl}px)`,
  fontWeight: typography.fontWeights.bold,
});

export const getStatGridStyles = () => ({
  display: "grid",
  gap: `${spacing.md}px`,
  gridTemplateColumns: `repeat(auto-fit, minmax(${spacing.xxl * 7}px, 1fr))`,
  alignItems: "stretch",
});
