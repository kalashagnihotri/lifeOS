import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getFocusPageStyles = () => ({
  minHeight: "100%",
  width: "100%",
  backgroundColor: colors.background,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  padding: `clamp(${spacing.md}px, 3vw, ${spacing.xl}px)`,
  boxSizing: "border-box",
});

export const getFocusHeaderStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.xl}px, 3vw, ${typography.fontSizes.heading}px)`,
  fontWeight: typography.fontWeights.bold,
  textAlign: "center",
});

export const getFocusSubHeaderStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
});

export const getFocusTimerShellStyles = () => ({
  width: "100%",
  maxWidth: `${spacing.xxl * 16}px`,
  display: "flex",
  flexDirection: "column",
  gap: `clamp(${spacing.sm}px, 2vw, ${spacing.md}px)`,
});
