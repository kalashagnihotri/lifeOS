import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getInsightsPageStyles = () => ({
  minHeight: "100%",
  width: "100%",
  backgroundColor: colors.background,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xl}px`,
  padding: `${spacing.xl}px`,
  boxSizing: "border-box",
});

export const getInsightsHeaderStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.heading,
  fontWeight: typography.fontWeights.bold,
});

export const getInsightsSubHeaderStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});
