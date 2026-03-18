import { useState } from "react";
import {
  getTaskCheckboxStyles,
  getTaskDeleteButtonStyles,
  getTaskItemStyles,
  getTaskMainStyles,
  getTaskStatusStyles,
  getTaskTitleStyles,
} from "./task.styles";

const TaskItem = ({ task, onToggle, onDelete }) => {
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  return (
    <li
      style={getTaskItemStyles({
        isHovered: isItemHovered,
        completed: task.completed,
      })}
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
    >
      <div style={getTaskMainStyles()}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          style={getTaskCheckboxStyles()}
        />
        <p style={getTaskTitleStyles({ completed: task.completed })}>{task.title}</p>
      </div>

      <p style={getTaskStatusStyles({ completed: task.completed })}>
        {task.completed ? "completed" : "pending"}
      </p>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        style={getTaskDeleteButtonStyles({ isHovered: isDeleteHovered })}
        onMouseEnter={() => setIsDeleteHovered(true)}
        onMouseLeave={() => setIsDeleteHovered(false)}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
