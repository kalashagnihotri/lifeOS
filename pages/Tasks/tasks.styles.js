import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getTasksPageStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xl}px`,
  minHeight: "100%",
  minWidth: 0,
  padding: `${spacing.xl}px`,
  backgroundColor: colors.background,
});

export const getTasksHeaderStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.heading,
  fontWeight: typography.fontWeights.bold,
});

export const getTasksSubHeaderStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});
