import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getTimerCardStyles = ({ isRunning = false }) => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.lg,
  backgroundColor: colors.surface,
  padding: `${spacing.xxl}px ${spacing.xl}px`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${spacing.lg}px`,
  transform: isRunning ? "scale(1.01)" : "none",
  boxShadow: isRunning ? `0 0 0 ${spacing.xs}px ${colors.primary}` : "none",
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
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.heading}px, 8vw, ${spacing.xxl * 2}px)`,
  fontWeight: typography.fontWeights.bold,
  lineHeight: 1,
  letterSpacing: "0.04em",
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
  borderRadius: spacing.md,
  backgroundColor: colors.surface,
  padding: `${spacing.lg}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
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
  borderRadius: spacing.sm,
  padding: `${spacing.sm}px ${spacing.md}px`,
  backgroundColor: colors.background,
  transition: "background-color 0.25s ease, transform 0.2s ease",
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
