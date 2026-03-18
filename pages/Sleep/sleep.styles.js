import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getSleepPageStyles = () => ({
  minHeight: "100%",
  width: "100%",
  background:
    "radial-gradient(circle at 70% 4%, rgba(167, 176, 255, 0.12) 0%, rgba(15, 17, 23, 0) 44%), #0f1117",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${spacing.md}px`,
  padding: `${spacing.lg}px`,
  boxSizing: "border-box",
});

export const getSleepTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.heading,
  fontWeight: typography.fontWeights.bold,
  textAlign: "center",
});

export const getSleepSubTitleStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
  maxWidth: "680px",
});

export const getSleepCardStyles = () => ({
  width: "min(760px, 100%)",
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.lg,
  backgroundColor: "rgba(20, 20, 30, 0.8)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: "0 16px 30px rgba(8, 10, 15, 0.3)",
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
  padding: `${spacing.md}px`,
});

export const getSleepInputRowStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: `${spacing.sm}px`,
  flexWrap: "wrap",
});

export const getSleepInputLabelStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
});

export const getSleepInputStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor: "rgba(15, 17, 23, 0.84)",
  color: colors.text.primary,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  outline: "none",
});

export const getSleepSummaryStyles = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: `${spacing.sm}px`,
});

export const getSleepMetricStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: "rgba(15, 17, 23, 0.85)",
  padding: `${spacing.sm}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getSleepMetricLabelStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});

export const getSleepMetricValueStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

export const getSleepListStyles = () => ({
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getSleepListItemStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  backgroundColor: "rgba(15, 17, 23, 0.78)",
});
