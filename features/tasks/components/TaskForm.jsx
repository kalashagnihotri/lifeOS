import { useState } from "react";
import {
  getTaskButtonStyles,
  getTaskFormStyles,
  getTaskInputStyles,
} from "./task.styles";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (typeof onAddTask === "function") {
      onAddTask(title);
    }

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={getTaskFormStyles()}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new task"
        style={getTaskInputStyles()}
      />
      <button
        type="submit"
        style={getTaskButtonStyles({ isHovered: isButtonHovered })}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
