import theme from "../../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

export const getStatCardContainerStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
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
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.heading,
  fontWeight: typography.fontWeights.bold,
  lineHeight: 1,
});

export const getStatCardDescriptionStyles = () => ({
  margin: `${spacing.xs}px 0 0`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});
