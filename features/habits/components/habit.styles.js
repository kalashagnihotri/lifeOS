import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getHabitSectionStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.lg}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: colors.surface,
  padding: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
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
  gap: `${spacing.sm}px`,
  width: "100%",
  flexWrap: "wrap",
});

export const getHabitInputStyles = ({ isFocused = false }) => ({
  flex: 1,
  minWidth: `${spacing.xxl * 5}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
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

export const getHabitAddButtonStyles = ({ isHovered = false, isPressed = false }) => ({
  border: `1px solid ${colors.primary}`,
  borderRadius: spacing.sm,
  backgroundColor: isHovered ? colors.secondary : colors.primary,
  color: colors.background,
  padding: `${spacing.sm}px ${spacing.lg}px`,
  minWidth: `${spacing.xxl * 2}px`,
  cursor: "pointer",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  transform: isPressed ? "scale(0.98)" : isHovered ? "translateY(-1px)" : "none",
  transition: "background-color 0.25s ease, transform 0.2s ease",
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
}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.md}px`,
  border: `1px solid ${completedToday ? colors.success : colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor: isHovered ? colors.background : colors.surface,
  padding: `${spacing.sm}px ${spacing.md}px`,
  opacity: isRemoving ? 0 : isMounted ? 1 : 0,
  transform: isRemoving ? "translateX(10px) scale(0.98)" : isMounted ? "translateX(0)" : "translateX(-8px)",
  transition:
    "background-color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease",
});

export const getHabitLeftContentStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: `${spacing.md}px`,
  minWidth: 0,
  flex: 1,
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

export const getStreakBadgeStyles = ({ streak = 0 }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
  borderRadius: spacing.sm,
  border: `1px solid ${streak > 0 ? colors.warning : colors.border}`,
  backgroundColor: streak > 0 ? colors.warning : colors.background,
  color: streak > 0 ? colors.background : colors.text.muted,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  transition: "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease",
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
