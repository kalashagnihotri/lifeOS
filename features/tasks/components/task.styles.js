import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getTaskSectionStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.lg}px`,
  background: `linear-gradient(170deg, rgba(23, 28, 40, 0.94) 0%, rgba(15, 17, 23, 0.92) 100%)`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.lg,
  padding: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  boxShadow: "0 14px 28px rgba(8, 10, 15, 0.36)",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
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
  flexWrap: "wrap",
});

export const getTaskInputStyles = ({ isFocused = false }) => ({
  flex: 1,
  minWidth: `${spacing.xxl * 5}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: isFocused ? colors.surface : colors.background,
  color: colors.text.primary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  outline: "none",
  boxShadow: isFocused ? `0 0 0 ${spacing.xs}px ${colors.secondary}` : "none",
  transition:
    "border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
});

export const getTaskButtonStyles = ({ isHovered = false, isPressed = false }) => ({
  border: `1px solid ${colors.primary}`,
  borderRadius: spacing.md,
  backgroundColor: isHovered ? colors.secondary : colors.primary,
  color: colors.background,
  padding: `${spacing.sm}px ${spacing.lg}px`,
  minWidth: `${spacing.xxl * 2}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  boxShadow: "0 10px 22px rgba(167, 176, 255, 0.26)",
  transform: isPressed ? "translateY(0) scale(0.98)" : isHovered ? "translateY(-1px) scale(1.02)" : "none",
  transition: "background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease",
});

export const getTaskListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
});

export const getTaskItemStyles = ({
  isHovered = false,
  completed = false,
  isMounted = true,
  isRemoving = false,
}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.md}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  padding: `${spacing.sm}px ${spacing.md}px`,
  backgroundColor: isHovered ? "rgba(23, 28, 40, 0.96)" : "rgba(23, 28, 40, 0.82)",
  opacity: isRemoving ? 0 : completed ? 0.72 : isMounted ? 1 : 0,
  transform: isRemoving ? "translateX(10px) scale(0.98)" : isMounted ? "translateX(0)" : "translateX(-8px)",
  animation: isMounted && !isRemoving ? "lifeosFadeSlideUp 320ms ease" : "none",
  boxShadow: isHovered ? "0 12px 22px rgba(8, 10, 15, 0.34)" : "none",
  transition: "background-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
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
  borderRadius: spacing.md,
  backgroundColor: isHovered ? colors.error : "transparent",
  color: isHovered ? colors.background : colors.error,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  transition: "background-color 0.25s ease, color 0.25s ease, transform 0.2s ease",
  transform: isHovered ? "translateY(-1px)" : "none",
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
