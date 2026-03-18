import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getStatCardContainerStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
  minHeight: `${spacing.xxl * 3}px`,
  justifyContent: "space-between",
});

export const getStatCardTitleStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
});

export const getStatCardValueStyles = () => ({
  margin: 0,
  color: colors.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.xl}px, 3.5vw, ${typography.fontSizes.heading}px)`,
  fontWeight: typography.fontWeights.bold,
  lineHeight: 1,
  letterSpacing: "0.01em",
  textShadow: "0 0 18px rgba(167, 176, 255, 0.22)",
});

export const getStatCardDescriptionStyles = () => ({
  margin: `${spacing.xs}px 0 0`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});
