import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getTimerCardStyles = ({ isRunning = false }) => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.xxl,
  background: "linear-gradient(180deg, rgba(23, 28, 40, 0.96) 0%, rgba(15, 17, 23, 0.92) 100%)",
  padding: `${spacing.xxl + spacing.md}px ${spacing.xxl}px`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${spacing.lg}px`,
  transform: isRunning ? "scale(1.01)" : "none",
  boxShadow: isRunning
    ? "0 0 0 1px rgba(167, 176, 255, 0.48), 0 18px 34px rgba(8, 10, 15, 0.5)"
    : "0 14px 28px rgba(8, 10, 15, 0.42)",
  animation: isRunning ? "lifeosPulseSoft 1.8s infinite" : "none",
  transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
});

export const getTimerLabelStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const getTimerDisplayStyles = ({ isRunning = false }) => ({
  margin: 0,
  color: isRunning ? colors.primary : colors.text.primary,
  fontFamily: "'Space Grotesk', 'Manrope', sans-serif",
  fontSize: `clamp(${typography.fontSizes.heading + 4}px, 10vw, ${spacing.xxl * 3}px)`,
  fontWeight: typography.fontWeights.bold,
  lineHeight: 1,
  letterSpacing: "0.06em",
  textShadow: isRunning ? "0 0 24px rgba(167, 176, 255, 0.3)" : "none",
  transition: "color 0.25s ease, transform 0.25s ease",
});

export const getTimerControlsStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: `${spacing.sm}px`,
  flexWrap: "wrap",
});

export const getSessionSectionStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.lg,
  background: "linear-gradient(170deg, rgba(23, 28, 40, 0.94) 0%, rgba(15, 17, 23, 0.9) 100%)",
  padding: `${spacing.lg}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
  boxShadow: "0 12px 24px rgba(8, 10, 15, 0.35)",
  transition: "border-color 0.25s ease",
});

export const getSessionTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

export const getSessionListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
});

export const getSessionItemStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.md}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  padding: `${spacing.sm}px ${spacing.md}px`,
  backgroundColor: "rgba(15, 17, 23, 0.9)",
  animation: "lifeosFadeSlideUp 320ms ease",
  transition: "background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease",
});

export const getSessionDurationStyles = () => ({
  margin: 0,
  color: colors.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
});

export const getSessionCompletedAtStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});

export const getEmptySessionStyles = () => ({
  margin: 0,
  borderRadius: spacing.sm,
  border: `1px dashed ${colors.border}`,
  padding: `${spacing.lg}px`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
});
