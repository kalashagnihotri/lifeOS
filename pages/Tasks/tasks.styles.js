import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getTasksPageStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  minHeight: "100%",
  minWidth: 0,
  padding: `clamp(${spacing.md}px, 3vw, ${spacing.xl}px)`,
  backgroundColor: colors.background,
  animation: "lifeosPageFade 320ms ease",
});

export const getTasksHeaderStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.xl}px, 3vw, ${typography.fontSizes.heading}px)`,
  fontWeight: typography.fontWeights.bold,
});

export const getTasksSubHeaderStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});
