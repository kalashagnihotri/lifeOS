import { useEffect, useRef, useState } from "react";
import {
  getTaskButtonStyles,
  getTaskFormStyles,
  getTaskInputStyles,
} from "./task.styles";

const OPEN_TASK_COMPOSER_EVENT = "lifeos:open-task-composer";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOpenComposer = () => {
      inputRef.current?.focus();
    };

    window.addEventListener(OPEN_TASK_COMPOSER_EVENT, handleOpenComposer);

    return () => {
      window.removeEventListener(OPEN_TASK_COMPOSER_EVENT, handleOpenComposer);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let didAddSucceed = false;

    if (typeof onAddTask === "function") {
      didAddSucceed = await onAddTask(title);
    }

    if (didAddSucceed) {
      setTitle("");
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
    </form>
  );
};

export default TaskForm;
