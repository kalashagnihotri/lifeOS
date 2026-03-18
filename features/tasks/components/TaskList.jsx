import TaskItem from "./TaskItem";
import {
  getEmptyStateStyles,
  getTaskGroupCountStyles,
  getTaskGroupHeaderStyles,
  getTaskGroupShellStyles,
  getTaskGroupTitleStyles,
  getTaskListStyles,
} from "./task.styles";

const groups = [
  { id: "today", label: "Today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
];

const TaskList = ({ groupedTasks, onToggle, onDelete }) => {
  const totalTasks = groups.reduce((sum, group) => {
    return sum + (groupedTasks[group.id]?.length || 0);
  }, 0);

  if (!totalTasks) {
    return <p style={getEmptyStateStyles()}>No tasks yet. Add something meaningful ✨</p>;
  }

  return (
    <div style={getTaskGroupShellStyles()}>
      {groups.map((group) => {
        const tasks = groupedTasks[group.id] || [];

        if (!tasks.length) {
          return null;
        }

        return (
          <section key={group.id}>
            <header style={getTaskGroupHeaderStyles()}>
              <h3 style={getTaskGroupTitleStyles()}>{group.label}</h3>
              <span style={getTaskGroupCountStyles()}>{tasks.length}</span>
            </header>

            <ul style={getTaskListStyles()}>
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

export default TaskList;
