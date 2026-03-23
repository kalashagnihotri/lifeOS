import Card from "../../../shared/components/Card/Card";
import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const getChartContainerStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
});

const getChartTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

const getChartPlaceholderStyles = () => ({
  minHeight: `${spacing.xxl * 6}px`,
  border: `1px dashed ${colors.border}`,
  borderRadius: spacing.sm,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.background,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  transition: "background-color 0.25s ease, border-color 0.25s ease",
});

const getChartBarsStyles = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  alignItems: "end",
  gap: `${spacing.sm}px`,
  minHeight: `${spacing.xxl * 6}px`,
});

const getChartBarWrapStyles = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${spacing.xs}px`,
});

const getChartBarStyles = ({ value, maxValue }) => {
  const safeMaxValue = maxValue > 0 ? maxValue : 1;
  const ratio = value / safeMaxValue;

  return {
    width: "100%",
    minHeight: `${spacing.sm}px`,
    height: `${Math.max(spacing.sm, ratio * spacing.xxl * 5)}px`,
    borderRadius: spacing.sm,
    background: value > 0 ? `linear-gradient(180deg, ${colors.secondary} 0%, ${colors.primary} 100%)` : colors.border,
    boxShadow: value > 0 ? "0 8px 16px rgba(189, 192, 200, 0.18)" : "none",
    transition: "height 0.25s ease, background-color 0.25s ease",
  };
};

const getChartLabelStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});

const getLast7DaysKeys = () => {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return date.toISOString().split("T")[0];
  });
};

const formatDayLabel = (dateKey) => {
  return new Date(dateKey).toLocaleDateString(undefined, { weekday: "short" });
};

const ProductivityChart = ({ sessions = [] }) => {
  const last7Days = getLast7DaysKeys();
  const sessionsByDay = sessions.reduce((accumulator, session) => {
    const dayKey = (session.completedAt || "").split("T")[0];

    if (!dayKey) {
      return accumulator;
    }

    return {
      ...accumulator,
      [dayKey]: (accumulator[dayKey] || 0) + (Number(session.duration) || 0),
    };
  }, {});

  const dataPoints = last7Days.map((dayKey) => ({
    dayKey,
    label: formatDayLabel(dayKey),
    value: sessionsByDay[dayKey] || 0,
  }));

  const maxValue = Math.max(...dataPoints.map((point) => point.value), 0);

  return (
    <Card padding="lg" elevation={1}>
      <div style={getChartContainerStyles()}>
        <h3 style={getChartTitleStyles()}>Productivity Chart</h3>
        {!sessions.length ? (
          <div style={getChartPlaceholderStyles()}>No focus sessions logged yet.</div>
        ) : (
          <div style={getChartBarsStyles()}>
            {dataPoints.map((point) => (
              <div key={point.dayKey} style={getChartBarWrapStyles()}>
                <div style={getChartBarStyles({ value: point.value, maxValue })} />
                <p style={getChartLabelStyles()}>{point.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductivityChart;
