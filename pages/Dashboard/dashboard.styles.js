import theme from "../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

export const getDashboardPageStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xl}px`,
  minWidth: 0,
});

export const getDashboardSectionStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
  minWidth: 0,
});

export const getDashboardTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.xl,
  fontWeight: typography.fontWeights.bold,
});

export const getStatGridStyles = () => ({
  display: "grid",
  gap: `${spacing.md}px`,
  gridTemplateColumns: `repeat(auto-fit, minmax(${spacing.xxl * 6}px, 1fr))`,
});
