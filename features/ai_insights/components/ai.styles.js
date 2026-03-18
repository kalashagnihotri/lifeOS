import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const accentByType = {
  positive: colors.success,
  warning: colors.warning,
  suggestion: colors.primary,
};

export const getInsightListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${spacing.xxl * 9}px, 1fr))`,
  gap: `${spacing.md}px`,
});

export const getInsightCardShellStyles = ({ type }) => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
  borderLeft: `${spacing.xs}px solid ${accentByType[type] || colors.primary}`,
  transition: "transform 0.2s ease, border-color 0.2s ease",
});

export const getInsightTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

export const getInsightDescriptionStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  lineHeight: 1.5,
});

export const getInsightTypeStyles = ({ type }) => ({
  margin: 0,
  color: accentByType[type] || colors.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "capitalize",
});

export const getEmptyStateStyles = () => ({
  margin: 0,
  border: `1px dashed ${colors.border}`,
  borderRadius: spacing.sm,
  padding: `${spacing.lg}px`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
  backgroundColor: colors.surface,
});
