import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getSleepPageStyles = () => ({
  minHeight: "100%",
  width: "100%",
  background:
    "radial-gradient(circle at 8% 10%, rgba(196, 198, 205, 0.12) 0%, rgba(15, 17, 23, 0) 36%), radial-gradient(circle at 92% 2%, rgba(122, 124, 132, 0.1) 0%, rgba(15, 17, 23, 0) 44%), #070708",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${spacing.lg}px`,
  padding: `${spacing.lg}px`,
  boxSizing: "border-box",
});

export const getSleepHeroStyles = () => ({
  width: "min(920px, 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${spacing.sm}px`,
});

export const getSleepTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)",
  fontWeight: typography.fontWeights.bold,
  textAlign: "center",
  letterSpacing: "0.02em",
  textTransform: "uppercase",
});

export const getSleepSubTitleStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
  maxWidth: "720px",
  lineHeight: 1.5,
});

export const getSleepHeroMetaStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: `${spacing.sm}px`,
});

export const getSleepHeroClockStyles = () => ({
  margin: 0,
  border: `1px solid rgba(194, 197, 205, 0.32)`,
  borderRadius: spacing.md,
  background: "rgba(9, 18, 24, 0.75)",
  color: "#d8d9de",
  padding: `${spacing.xs}px ${spacing.md}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.bold,
  letterSpacing: "0.06em",
});

export const getSleepPlanCardStyles = () => ({
  width: "min(920px, 100%)",
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.lg,
  backgroundColor: "rgba(20, 20, 30, 0.76)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: "0 20px 40px rgba(8, 10, 15, 0.35)",
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
  padding: `${spacing.lg}px`,
});

export const getSleepPlanHeaderStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
  flexWrap: "wrap",
});

export const getSleepInputGridStyles = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: `${spacing.md}px`,
});

export const getSleepInputFieldStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
});

export const getSleepInputLabelStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const getSleepInputStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor: "rgba(15, 17, 23, 0.84)",
  color: colors.text.primary,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  outline: "none",
  minHeight: "44px",
});

export const getSleepInsightStyles = () => ({
  width: "min(920px, 100%)",
  borderRadius: spacing.lg,
  border: "1px solid rgba(186, 189, 198, 0.24)",
  background:
    "linear-gradient(120deg, rgba(18, 18, 22, 0.9) 0%, rgba(14, 15, 19, 0.92) 58%, rgba(23, 22, 20, 0.88) 100%)",
  padding: `${spacing.lg}px`,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getSleepInsightTitleStyles = () => ({
  margin: 0,
  color: "rgba(201, 204, 212, 0.82)",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const getSleepInsightValueStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: "clamp(1.3rem, 2.4vw, 1.8rem)",
  fontWeight: typography.fontWeights.bold,
});

export const getSleepInsightMetaStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  lineHeight: 1.45,
});

export const getSleepTimelineStyles = () => ({
  width: "min(920px, 100%)",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: `${spacing.sm}px`,
});

export const getSleepTimelineItemStyles = (isRecommended = false) => ({
  border: isRecommended
    ? "1px solid rgba(255, 189, 89, 0.75)"
    : `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: isRecommended ? "rgba(52, 38, 14, 0.62)" : "rgba(13, 15, 22, 0.8)",
  padding: `${spacing.sm}px ${spacing.md}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
  boxShadow: isRecommended ? "0 8px 24px rgba(255, 189, 89, 0.2)" : "none",
});

export const getSleepTimelineCycleStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const getSleepTimelineTimeStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

export const getSleepTimelineDeltaStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
  lineHeight: 1.35,
});

export const getSleepBreakdownPanelStyles = () => ({
  width: "min(920px, 100%)",
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: "rgba(15, 17, 23, 0.68)",
  padding: `${spacing.sm}px ${spacing.md}px`,
  boxSizing: "border-box",
});

export const getSleepBreakdownSummaryStyles = () => ({
  cursor: "pointer",
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  listStyle: "none",
});

export const getSleepBreakdownGridStyles = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: `${spacing.md}px`,
  marginTop: `${spacing.md}px`,
});

export const getSleepBreakdownLabelStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const getSleepBreakdownValueStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.bold,
  marginTop: `${spacing.xs}px`,
});
