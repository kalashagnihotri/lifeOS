import { useMemo } from "react";
import Card from "../../../shared/components/Card/Card";
import theme from "../../../core/theme";
import { calculateScore } from "../utils/scoreUtils";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const getContainerStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
});

const getTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

const getScoreRowStyles = () => ({
  display: "flex",
  alignItems: "baseline",
  gap: `${spacing.sm}px`,
});

const getScoreStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.xxl}px, 4vw, 52px)`,
  fontWeight: typography.fontWeights.bold,
  lineHeight: 1,
  transition: "color 0.25s ease, transform 0.25s ease",
});

const getLabelStyles = ({ score }) => ({
  margin: 0,
  color: score >= 75 ? colors.success : colors.warning,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
});

const getProgressTrackStyles = () => ({
  width: "100%",
  height: `${spacing.sm}px`,
  borderRadius: spacing.sm,
  backgroundColor: "rgba(141, 151, 184, 0.2)",
  overflow: "hidden",
});

const getProgressFillStyles = ({ score }) => ({
  width: `${Math.max(0, Math.min(100, score))}%`,
  height: "100%",
  borderRadius: spacing.sm,
  background: score >= 75
    ? "linear-gradient(90deg, rgba(143, 185, 164, 0.8) 0%, rgba(143, 185, 164, 1) 100%)"
    : "linear-gradient(90deg, rgba(244, 180, 133, 0.8) 0%, rgba(244, 180, 133, 1) 100%)",
  transition: "width 0.35s ease",
});

const getMetaStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});

const DailyScoreCard = ({ tasks = [], habits = [], sessions = [] }) => {
  const scoreData = useMemo(() => calculateScore(tasks, habits, sessions), [tasks, habits, sessions]);

  return (
    <Card padding="lg" elevation={1}>
      <div style={getContainerStyles()}>
        <h3 style={getTitleStyles()}>Daily Productivity Score</h3>
        <div style={getScoreRowStyles()}>
          <p style={getScoreStyles()}>{scoreData.score}</p>
          <p style={getLabelStyles({ score: scoreData.score })}>{scoreData.label}</p>
        </div>
        <div style={getProgressTrackStyles()}>
          <div style={getProgressFillStyles({ score: scoreData.score })} />
        </div>
        <p style={getMetaStyles()}>
          Today: {scoreData.raw.completedTasksToday} tasks, {scoreData.raw.completedHabitsToday} habits, {scoreData.raw.focusMinutesToday} focus minutes
        </p>
      </div>
    </Card>
  );
};

export default DailyScoreCard;
