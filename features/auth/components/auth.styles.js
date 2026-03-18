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
  backgroundColor: colors.background,
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
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
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
  border: "1px solid rgba(255, 255, 255, 0.16)",
  borderRadius: spacing.sm,
  backgroundColor: "rgba(20, 20, 30, 0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 14px 28px rgba(8, 10, 15, 0.3)",
});
