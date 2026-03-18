import Card from "../../../shared/components/Card/Card";
import theme from "../../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

const tasks = [
  { id: 1, title: "Plan top priorities", status: "completed" },
  { id: 2, title: "Review habit progress", status: "pending" },
  { id: 3, title: "Prepare focus session", status: "completed" },
  { id: 4, title: "Write quick reflection", status: "pending" },
  { id: 5, title: "Organize notes", status: "pending" },
];

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
});

const getTaskTitleStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});

const getTaskStatusStyles = ({ isCompleted }) => ({
  margin: 0,
  color: isCompleted ? colors.success : colors.warning,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "capitalize",
});

const TaskSummary = () => {
  return (
    <Card padding="lg" elevation={1}>
      <div style={getTaskSummaryContainerStyles()}>
        <h3 style={getTaskSummaryTitleStyles()}>Task Summary</h3>
        <ul style={getTaskListStyles()}>
          {tasks.map((task) => {
            const isCompleted = task.status === "completed";

            return (
              <li key={task.id} style={getTaskItemStyles()}>
                <p style={getTaskTitleStyles()}>{task.title}</p>
                <p style={getTaskStatusStyles({ isCompleted })}>{task.status}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default TaskSummary;
