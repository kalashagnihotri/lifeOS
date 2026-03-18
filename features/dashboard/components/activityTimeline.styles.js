import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getTimelineContainerStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
  minWidth: 0,
});

export const getTimelineTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

export const getTimelineScrollStyles = () => ({
  maxHeight: "430px",
  overflowY: "auto",
  paddingRight: `${spacing.xs}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
});

export const getTimelineDayGroupStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
});

export const getTimelineDayLabelStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
});

export const getTimelineListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
  position: "relative",
});

export const getTimelineItemStyles = () => ({
  display: "grid",
  gridTemplateColumns: `${spacing.xl}px 1fr`,
  gap: `${spacing.sm}px`,
  alignItems: "start",
});

export const getTimelineRailStyles = () => ({
  display: "flex",
  justifyContent: "center",
  position: "relative",
  minHeight: `${spacing.xxl}px`,
});

export const getTimelineLineStyles = () => ({
  position: "absolute",
  top: `${spacing.md}px`,
  bottom: `${spacing.xs * -1}px`,
  width: "2px",
  background: "linear-gradient(180deg, rgba(141, 151, 184, 0.58) 0%, rgba(141, 151, 184, 0.12) 100%)",
});

export const getTimelineIconWrapStyles = ({ tone = "default" }) => {
  const toneColorByType = {
    task: colors.success,
    habit: colors.secondary,
    focus: colors.primary,
    default: colors.text.muted,
  };

  const toneColor = toneColorByType[tone] || toneColorByType.default;

  return {
    width: `${spacing.lg}px`,
    height: `${spacing.lg}px`,
    borderRadius: "999px",
    border: `1px solid ${toneColor}`,
    backgroundColor: "rgba(15, 17, 23, 0.9)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: toneColor,
    zIndex: 1,
    boxShadow: `0 0 0 3px rgba(15, 17, 23, 0.95)`,
  };
};

export const getTimelineContentStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor: "rgba(15, 17, 23, 0.58)",
  padding: `${spacing.sm}px ${spacing.md}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
});

export const getTimelineMessageStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});

export const getTimelineTimestampStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
  whiteSpace: "nowrap",
});

export const getTimelineEmptyStyles = () => ({
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
