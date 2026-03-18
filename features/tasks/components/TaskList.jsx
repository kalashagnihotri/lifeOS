import TaskItem from "./TaskItem";
import { getEmptyStateStyles, getTaskListStyles } from "./task.styles";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (!tasks.length) {
    return <p style={getEmptyStateStyles()}>No tasks yet. Add your first task above.</p>;
  }

  return (
    <ul style={getTaskListStyles()}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
