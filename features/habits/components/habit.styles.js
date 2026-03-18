import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const categoryColorByLabel = {
  Health: "#86C8A5",
  Study: "#8EA6D8",
  Work: "#D4A0C2",
  General: colors.text.muted,
};

export const getHabitSectionStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.lg}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.lg,
  background: `linear-gradient(170deg, rgba(23, 28, 40, 0.94) 0%, rgba(15, 17, 23, 0.92) 100%)`,
  padding: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  boxShadow: "0 14px 28px rgba(8, 10, 15, 0.36)",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
});

export const getHabitHeadingStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.xl,
  fontWeight: typography.fontWeights.bold,
});

export const getHabitFormStyles = () => ({
  display: "flex",
  gap: `${spacing.md}px`,
  width: "100%",
  flexDirection: "column",
});

export const getHabitFormFieldRowStyles = () => ({
  display: "flex",
  gap: `${spacing.sm}px`,
  width: "100%",
  flexWrap: "wrap",
});

export const getHabitInputStyles = ({ isFocused = false }) => ({
  width: "100%",
  minWidth: `${spacing.xxl * 5}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: isFocused ? colors.surface : colors.background,
  color: colors.text.primary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  outline: "none",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  boxShadow: isFocused ? `0 0 0 ${spacing.xs}px ${colors.secondary}` : "none",
  transition:
    "border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
});

export const getHabitCategorySelectStyles = () => ({
  minWidth: `${spacing.xxl * 4}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: colors.background,
  color: colors.text.primary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  outline: "none",
});

export const getHabitAddButtonStyles = ({ isHovered = false, isPressed = false }) => ({
  border: `1px solid ${colors.primary}`,
  borderRadius: spacing.md,
  backgroundColor: isHovered ? colors.secondary : colors.primary,
  color: colors.background,
  padding: `${spacing.sm}px ${spacing.lg}px`,
  minWidth: `${spacing.xxl * 2}px`,
  cursor: "pointer",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  boxShadow: "0 10px 22px rgba(125, 184, 163, 0.24)",
  transform: isPressed ? "translateY(0) scale(0.98)" : isHovered ? "translateY(-1px) scale(1.02)" : "none",
  transition: "background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease",
});

export const getHabitListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
});

export const getHabitItemStyles = ({
  isHovered = false,
  completedToday = false,
  isMounted = true,
  isRemoving = false,
  isToggleAnimating = false,
}) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: `${spacing.md}px`,
  border: `1px solid ${completedToday ? colors.success : colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: isHovered ? "rgba(23, 28, 40, 0.96)" : "rgba(23, 28, 40, 0.82)",
  padding: `${spacing.sm}px ${spacing.md}px`,
  opacity: isRemoving ? 0 : isMounted ? 1 : 0,
  transform: isRemoving
    ? "translateX(10px) scale(0.98)"
    : isToggleAnimating
      ? "scale(1.01)"
      : isMounted
        ? "translateX(0)"
        : "translateX(-8px)",
  animation: isMounted && !isRemoving ? "lifeosFadeSlideUp 320ms ease" : "none",
  boxShadow:
    completedToday || isToggleAnimating
      ? "0 0 0 1px rgba(125, 184, 163, 0.45), 0 12px 22px rgba(8, 10, 15, 0.34)"
      : isHovered
        ? "0 12px 22px rgba(8, 10, 15, 0.34)"
        : "none",
  transition:
    "background-color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
});

export const getHabitLeftContentStyles = () => ({
  display: "flex",
  alignItems: "flex-start",
  gap: `${spacing.md}px`,
  minWidth: 0,
  flex: 1,
});

export const getHabitMetaTopRowStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
  flexWrap: "wrap",
});

export const getHabitTitleStyles = ({ completedToday = false }) => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  textDecoration: completedToday ? "line-through" : "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const getHabitCategoryTagStyles = ({ category = "General" }) => ({
  borderRadius: spacing.sm,
  border: `1px solid ${categoryColorByLabel[category] || categoryColorByLabel.General}`,
  backgroundColor: "rgba(15, 17, 23, 0.58)",
  color: categoryColorByLabel[category] || categoryColorByLabel.General,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
});

export const getStreakBadgeStyles = ({ streak = 0 }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
  borderRadius: spacing.md,
  border: `1px solid ${streak > 0 ? colors.warning : colors.border}`,
  backgroundColor: streak > 0 ? "rgba(199, 165, 124, 0.2)" : colors.background,
  color: streak > 0 ? colors.warning : colors.text.muted,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  transition: "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease",
});

export const getHabitProgressTextStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
});

export const getHabitProgressBarTrackStyles = () => ({
  width: "100%",
  height: `${spacing.xs}px`,
  borderRadius: spacing.sm,
  backgroundColor: "rgba(141, 151, 184, 0.2)",
  overflow: "hidden",
});

export const getHabitProgressBarFillStyles = ({ weeklyPercent = 0 }) => ({
  width: `${Math.max(0, Math.min(100, weeklyPercent))}%`,
  height: "100%",
  borderRadius: spacing.sm,
  background: "linear-gradient(90deg, #86C8A5 0%, #8EA6D8 100%)",
  transition: "width 0.28s ease",
});

export const getHabitWeeklyTrackStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
  flexWrap: "wrap",
});

export const getHabitWeeklyTrackDotStyles = ({ completed = false }) => ({
  width: `${spacing.sm + spacing.xs}px`,
  height: `${spacing.sm + spacing.xs}px`,
  borderRadius: "50%",
  border: `1px solid ${completed ? "#86C8A5" : colors.border}`,
  backgroundColor: completed ? "rgba(134, 200, 165, 0.45)" : "rgba(15, 17, 23, 0.55)",
  boxShadow: completed ? "0 0 10px rgba(134, 200, 165, 0.24)" : "none",
  transition: "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
});

export const getHabitActionsStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: `${spacing.sm}px`,
});

export const getHabitToggleButtonStyles = ({ completedToday = false, isHovered = false }) => ({
  border: `1px solid ${completedToday ? colors.success : colors.primary}`,
  borderRadius: spacing.sm,
  backgroundColor: completedToday
    ? isHovered
      ? colors.secondary
      : colors.success
    : isHovered
      ? colors.secondary
      : colors.primary,
  color: colors.background,
  padding: `${spacing.xs}px ${spacing.md}px`,
  cursor: "pointer",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  transform: isHovered ? "translateY(-1px)" : "none",
  transition: "background-color 0.25s ease, border-color 0.25s ease, transform 0.2s ease",
});

export const getHabitDeleteButtonStyles = ({ isHovered = false }) => ({
  border: `1px solid ${colors.error}`,
  borderRadius: spacing.sm,
  backgroundColor: isHovered ? colors.error : "transparent",
  color: isHovered ? colors.background : colors.error,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  cursor: "pointer",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  transform: isHovered ? "translateY(-1px)" : "none",
  transition: "background-color 0.25s ease, color 0.25s ease, transform 0.2s ease",
});

export const getHabitEmptyStateStyles = () => ({
  margin: 0,
  borderRadius: spacing.sm,
  border: `1px dashed ${colors.border}`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
  padding: `${spacing.lg}px`,
});
