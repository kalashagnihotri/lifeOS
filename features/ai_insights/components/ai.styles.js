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
  gridTemplateColumns: `repeat(auto-fit, minmax(${spacing.xxl * 8}px, 1fr))`,
  gap: `${spacing.md}px`,
  alignItems: "stretch",
});

export const getInsightCardShellStyles = ({ type, isHovered = false }) => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
  borderLeft: `${spacing.xs}px solid ${accentByType[type] || colors.primary}`,
  paddingLeft: `${spacing.sm}px`,
  transform: isHovered ? "translateY(-2px)" : "none",
  transition: "transform 0.25s ease, border-color 0.25s ease",
});

export const getInsightTopRowStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
});

export const getInsightTypeBadgeStyles = ({ type }) => ({
  margin: 0,
  color: accentByType[type] || colors.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "capitalize",
  borderRadius: spacing.sm,
  border: `1px solid ${accentByType[type] || colors.primary}`,
  backgroundColor: "rgba(141, 151, 184, 0.08)",
  padding: `${spacing.xs}px ${spacing.sm}px`,
});

export const getInsightIconStyles = ({ type }) => ({
  color: accentByType[type] || colors.primary,
  opacity: 0.9,
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
  lineHeight: 1.65,
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
