import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getInsightsPageStyles = () => ({
  minHeight: "100%",
  width: "100%",
  backgroundColor: colors.background,
  display: "flex",
  flexDirection: "column",
  gap: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  padding: `clamp(${spacing.md}px, 3vw, ${spacing.xl}px)`,
  boxSizing: "border-box",
  animation: "lifeosPageFade 320ms ease",
});

export const getInsightsHeaderStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.xl}px, 3vw, ${typography.fontSizes.heading}px)`,
  fontWeight: typography.fontWeights.bold,
});

export const getInsightsSubHeaderStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});
