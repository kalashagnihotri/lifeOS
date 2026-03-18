import Card from "../../../shared/components/Card/Card";
import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const getTaskSummaryContainerStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
});

const getTaskSummaryTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

const getTaskListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
});

const getTaskItemStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.md}px`,
  padding: `${spacing.sm}px ${spacing.md}px`,
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor: colors.background,
  boxShadow: "0 8px 18px rgba(8, 10, 15, 0.3)",
  transition: "transform 0.2s ease, border-color 0.25s ease, background-color 0.25s ease",
});

const getTaskTitleStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  transition: "color 0.25s ease",
});

const getTaskStatusStyles = ({ isCompleted }) => ({
  margin: 0,
  color: isCompleted ? colors.success : colors.warning,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "capitalize",
  letterSpacing: "0.02em",
});

const getEmptyStyles = () => ({
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

const TaskSummary = ({ tasks = [] }) => {
  const recentTasks = tasks.slice(0, 5);

  return (
    <Card padding="lg" elevation={1}>
      <div style={getTaskSummaryContainerStyles()}>
        <h3 style={getTaskSummaryTitleStyles()}>Task Summary</h3>
        {!recentTasks.length ? (
          <p style={getEmptyStyles()}>No tasks available yet.</p>
        ) : (
          <ul style={getTaskListStyles()}>
            {recentTasks.map((task) => {
              const isCompleted = Boolean(task.completed);

              return (
                <li key={task.id} style={getTaskItemStyles()}>
                  <p
                    style={{
                      ...getTaskTitleStyles(),
                      textDecoration: isCompleted ? "line-through" : "none",
                      opacity: isCompleted ? 0.72 : 1,
                    }}
                  >
                    {task.title}
                  </p>
                  <p style={getTaskStatusStyles({ isCompleted })}>
                    {isCompleted ? "completed" : "pending"}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default TaskSummary;
