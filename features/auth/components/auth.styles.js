import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getLoginScreenStyles = () => ({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${spacing.xl}px`,
  backgroundColor: "transparent",
});

export const getLoginCardStyles = () => ({
  width: "100%",
  maxWidth: `${spacing.xxl * 14}px`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${spacing.md}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.lg,
  backgroundColor: colors.surface,
  padding: `${spacing.xxl}px ${spacing.xl}px`,
  boxShadow: `0 12px 24px rgba(0, 0, 0, 0.28)`,
});

export const getLoginTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.heading,
  fontWeight: typography.fontWeights.bold,
  textAlign: "center",
});

export const getLoginSubtitleStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
});

export const getUserBadgeStyles = () => ({
  margin: 0,
  color: "rgba(231, 231, 234, 0.9)",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  letterSpacing: "0.02em",
  textShadow: "0 1px 8px rgba(203, 205, 212, 0.18)",
});

export const getTopBarStyles = () => ({
  position: "fixed",
  top: `${spacing.sm}px`,
  right: `${spacing.sm}px`,
  zIndex: 90,
  display: "flex",
  alignItems: "center",
  gap: `${spacing.sm}px`,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  border: "1px solid rgba(216, 218, 224, 0.24)",
  borderRadius: spacing.md,
  background:
    "linear-gradient(130deg, rgba(28, 28, 32, 0.42) 0%, rgba(12, 12, 14, 0.62) 100%)",
  backdropFilter: "blur(18px) saturate(1.24)",
  WebkitBackdropFilter: "blur(18px) saturate(1.24)",
  boxShadow: "0 14px 28px rgba(8, 10, 15, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
});
