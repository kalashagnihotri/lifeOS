import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const priorityColorByLevel = {
  low: "#8FB9A4",
  medium: "#8FA8D8",
  high: "#D5A0AC",
};

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
  gap: `${spacing.md}px`,
  width: "100%",
  flexDirection: "column",
});

export const getTaskFormFieldRowStyles = () => ({
  display: "flex",
  gap: `${spacing.sm}px`,
  flexWrap: "wrap",
});

export const getTaskInputStyles = ({ isFocused = false }) => ({
  width: "100%",
  minWidth: `${spacing.xxl * 6}px`,
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
  transition: "border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
});

export const getTaskSelectStyles = () => ({
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

export const getTaskDateInputStyles = () => ({
  minWidth: `${spacing.xxl * 4}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: colors.background,
  color: colors.text.secondary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  outline: "none",
});

export const getTaskToolbarStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.md}px`,
  flexWrap: "wrap",
  padding: `${spacing.sm}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: "rgba(15, 17, 23, 0.55)",
});

export const getTaskFilterGroupStyles = () => ({
  display: "inline-flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
  padding: `${spacing.xs}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: "rgba(15, 17, 23, 0.6)",
});

export const getTaskFilterButtonStyles = ({ isActive = false }) => ({
  border: `1px solid ${isActive ? colors.primary : "transparent"}`,
  borderRadius: spacing.sm,
  backgroundColor: isActive ? "rgba(167, 176, 255, 0.2)" : "transparent",
  color: isActive ? colors.text.primary : colors.text.secondary,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
});

export const getTaskSearchInputStyles = () => ({
  width: `min(100%, ${spacing.xxl * 8}px)`,
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

export const getTaskGroupShellStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.lg}px`,
});

export const getTaskGroupHeaderStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
  marginBottom: `${spacing.sm}px`,
});

export const getTaskGroupTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

export const getTaskGroupCountStyles = () => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: `${spacing.xl}px`,
  borderRadius: spacing.sm,
  border: `1px solid ${colors.border}`,
  padding: `0 ${spacing.xs}px`,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
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

export const getTaskDropZoneStyles = ({ isDragActive = false, isReceivingDrop = false }) => ({
  border: `1px solid ${isReceivingDrop ? "rgba(167, 176, 255, 0.7)" : colors.border}`,
  borderRadius: spacing.md,
  padding: `${spacing.sm}px`,
  background: isReceivingDrop
    ? "linear-gradient(165deg, rgba(26, 35, 56, 0.94) 0%, rgba(17, 24, 39, 0.88) 100%)"
    : isDragActive
      ? "linear-gradient(165deg, rgba(18, 25, 38, 0.84) 0%, rgba(13, 19, 32, 0.82) 100%)"
      : "transparent",
  boxShadow: isReceivingDrop
    ? "0 0 0 1px rgba(167, 176, 255, 0.32), 0 14px 26px rgba(8, 10, 15, 0.34)"
    : "none",
  transition: "border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease",
});

export const getTaskItemStyles = ({
  isHovered = false,
  completed = false,
  isMounted = true,
  isRemoving = false,
  isDragging = false,
  dragTransform = undefined,
  dragTransition = undefined,
}) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: `${spacing.md}px`,
  border: `1px solid ${completed ? "rgba(143, 185, 164, 0.45)" : colors.border}`,
  borderRadius: spacing.md,
  padding: `${spacing.sm}px ${spacing.md}px`,
  backgroundColor: isHovered ? "rgba(23, 28, 40, 0.96)" : "rgba(23, 28, 40, 0.82)",
  opacity: isRemoving ? 0 : completed ? 0.72 : isMounted ? 1 : 0,
  transform: isRemoving
    ? "translateX(10px) scale(0.98)"
    : completed
      ? "scale(0.99)"
      : isMounted
        ? "translateX(0)"
        : "translateX(-8px)",
  animation: isMounted && !isRemoving ? "lifeosFadeSlideUp 320ms ease" : "none",
  boxShadow: isDragging
    ? "0 22px 30px rgba(8, 10, 15, 0.5)"
    : isHovered
      ? "0 12px 22px rgba(8, 10, 15, 0.34)"
      : "none",
  cursor: isDragging ? "grabbing" : "default",
  zIndex: isDragging ? 10 : "auto",
  position: "relative",
  transition: dragTransition
    ? `${dragTransition}, background-color 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease`
    : "background-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
  transformOrigin: "center",
  ...(dragTransform ? { transform: dragTransform } : {}),
});

export const getTaskDragHandleStyles = ({ isDragging = false, isHovered = false }) => ({
  border: `1px solid ${isHovered || isDragging ? "rgba(167, 176, 255, 0.75)" : colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor:
    isDragging || isHovered ? "rgba(167, 176, 255, 0.24)" : "rgba(15, 17, 23, 0.5)",
  color: isDragging || isHovered ? colors.text.primary : colors.text.muted,
  width: `${spacing.xl}px`,
  height: `${spacing.xl}px`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: isDragging ? "grabbing" : "grab",
  flexShrink: 0,
  marginTop: `${spacing.xs}px`,
  transform: isDragging ? "scale(1.07)" : isHovered ? "scale(1.03)" : "scale(1)",
  boxShadow: isDragging ? "0 0 0 1px rgba(167, 176, 255, 0.35), 0 8px 14px rgba(8, 10, 15, 0.34)" : "none",
  transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease",
});

export const getTaskDragOverlayStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: `${spacing.sm}px`,
  maxWidth: "min(90vw, 680px)",
  borderRadius: spacing.md,
  border: "1px solid rgba(167, 176, 255, 0.78)",
  padding: `${spacing.sm}px ${spacing.md}px`,
  background: "linear-gradient(165deg, rgba(31, 41, 66, 0.98) 0%, rgba(20, 27, 41, 0.96) 100%)",
  boxShadow: "0 28px 40px rgba(8, 10, 15, 0.56), 0 0 0 1px rgba(167, 176, 255, 0.24)",
  transform: "rotate(-0.75deg) scale(1.01)",
  color: colors.text.primary,
});

export const getTaskDragOverlayTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const getTaskDragOverlayBadgeStyles = ({ priority = "medium" }) => ({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: spacing.sm,
  border: `1px solid ${priorityColorByLevel[priority] || priorityColorByLevel.medium}`,
  backgroundColor: "rgba(15, 17, 23, 0.5)",
  color: priorityColorByLevel[priority] || priorityColorByLevel.medium,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "capitalize",
});

export const getTaskMainStyles = () => ({
  display: "flex",
  alignItems: "flex-start",
  gap: `${spacing.sm}px`,
  flex: 1,
  minWidth: 0,
});

export const getTaskTitleBlockStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
  minWidth: 0,
  flex: 1,
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
  textDecorationColor: "rgba(141, 151, 184, 0.75)",
  textDecorationThickness: "2px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  transform: completed ? "scale(0.99)" : "none",
  transition: "text-decoration-color 0.25s ease, transform 0.25s ease, opacity 0.25s ease",
});

export const getTaskMetaRowStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: `${spacing.sm}px`,
  flexWrap: "wrap",
});

export const getTaskPriorityBadgeStyles = ({ priority = "medium" }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
  borderRadius: spacing.sm,
  border: `1px solid ${priorityColorByLevel[priority] || priorityColorByLevel.medium}`,
  backgroundColor: "rgba(15, 17, 23, 0.58)",
  color: priorityColorByLevel[priority] || priorityColorByLevel.medium,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "capitalize",
});

export const getTaskDueDateStyles = ({ isOverdue = false, completed = false }) => ({
  margin: 0,
  color: completed ? colors.text.muted : isOverdue ? "#D5A0AC" : colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});

export const getTaskDeleteButtonStyles = ({ isHovered = false, isVisible = false }) => ({
  border: `1px solid ${colors.error}`,
  borderRadius: spacing.md,
  backgroundColor: isHovered ? colors.error : "transparent",
  color: isHovered ? colors.background : colors.error,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  opacity: isVisible ? 1 : 0,
  pointerEvents: isVisible ? "auto" : "none",
  transition: "background-color 0.25s ease, color 0.25s ease, transform 0.2s ease, opacity 0.2s ease",
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
