import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getTaskSectionStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.lg}px`,
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  padding: `${spacing.xl}px`,
});

export const getTaskHeadingStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.xl,
  fontWeight: typography.fontWeights.bold,
});

export const getTaskFormStyles = () => ({
  display: "flex",
  gap: `${spacing.sm}px`,
  width: "100%",
});

export const getTaskInputStyles = () => ({
  flex: 1,
  minWidth: 0,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor: colors.background,
  color: colors.text.primary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  outline: "none",
  transition: "border-color 0.2s ease, background-color 0.2s ease",
});

export const getTaskButtonStyles = ({ isHovered = false }) => ({
  border: `1px solid ${colors.primary}`,
  borderRadius: spacing.sm,
  backgroundColor: isHovered ? colors.secondary : colors.primary,
  color: colors.background,
  padding: `${spacing.sm}px ${spacing.lg}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  transition: "background-color 0.2s ease",
});

export const getTaskListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
});

export const getTaskItemStyles = ({ isHovered = false, completed = false }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.md}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  padding: `${spacing.sm}px ${spacing.md}px`,
  backgroundColor: isHovered ? colors.background : colors.surface,
  opacity: completed ? 0.75 : 1,
  transition: "background-color 0.2s ease, opacity 0.2s ease",
});

export const getTaskMainStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: `${spacing.sm}px`,
  flex: 1,
  minWidth: 0,
});

export const getTaskCheckboxStyles = () => ({
  width: `${spacing.lg}px`,
  height: `${spacing.lg}px`,
  margin: 0,
  cursor: "pointer",
  accentColor: colors.primary,
});

export const getTaskTitleStyles = ({ completed = false }) => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textDecoration: completed ? "line-through" : "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const getTaskStatusStyles = ({ completed = false }) => ({
  margin: 0,
  color: completed ? colors.success : colors.warning,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "capitalize",
});

export const getTaskDeleteButtonStyles = ({ isHovered = false }) => ({
  border: `1px solid ${colors.error}`,
  borderRadius: spacing.sm,
  backgroundColor: isHovered ? colors.error : "transparent",
  color: isHovered ? colors.background : colors.error,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease",
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
});
