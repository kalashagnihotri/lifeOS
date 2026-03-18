import { useEffect, useRef, useState } from "react";
import {
  getTaskButtonStyles,
  getTaskDateInputStyles,
  getTaskFormFieldRowStyles,
  getTaskFormStyles,
  getTaskInputStyles,
  getTaskSelectStyles,
} from "./task.styles";

const OPEN_TASK_COMPOSER_EVENT = "lifeos:open-task-composer";
const OPEN_TASK_COMPOSER_FLAG = "lifeos.pendingOpenTaskComposer";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOpenComposer = () => {
      inputRef.current?.focus();

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(OPEN_TASK_COMPOSER_FLAG);
      }
    };

    const shouldOpenOnMount =
      typeof window !== "undefined" && window.sessionStorage.getItem(OPEN_TASK_COMPOSER_FLAG);

    if (shouldOpenOnMount) {
      window.requestAnimationFrame(() => {
        handleOpenComposer();
      });
    }

    window.addEventListener(OPEN_TASK_COMPOSER_EVENT, handleOpenComposer);

    return () => {
      window.removeEventListener(OPEN_TASK_COMPOSER_EVENT, handleOpenComposer);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let didAddSucceed = false;

    if (typeof onAddTask === "function") {
      didAddSucceed = await onAddTask({
        title,
        priority,
        dueDate: dueDate || null,
      });
    }

    if (didAddSucceed) {
      setTitle("");
      setPriority("medium");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={getTaskFormStyles()}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new task"
        style={getTaskInputStyles({ isFocused: isInputFocused })}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />

      <div style={getTaskFormFieldRowStyles()}>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          style={getTaskSelectStyles()}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          style={getTaskDateInputStyles()}
        />

        <button
          type="submit"
          style={getTaskButtonStyles({
            isHovered: isButtonHovered,
            isPressed: isButtonPressed,
          })}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onMouseDown={() => setIsButtonPressed(true)}
          onMouseUp={() => setIsButtonPressed(false)}
          onBlur={() => setIsButtonPressed(false)}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
