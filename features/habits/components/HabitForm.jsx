import { useState } from "react";
import {
  getHabitAddButtonStyles,
  getHabitFormStyles,
  getHabitInputStyles,
} from "./habit.styles";

const HabitForm = ({ onAddHabit }) => {
  const [title, setTitle] = useState("");
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isAddPressed, setIsAddPressed] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let didAddSucceed = false;

    if (typeof onAddHabit === "function") {
      didAddSucceed = await onAddHabit(title);
    }

    if (didAddSucceed) {
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={getHabitFormStyles()}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new habit"
        style={getHabitInputStyles({ isFocused: isInputFocused })}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      <button
        type="submit"
        style={getHabitAddButtonStyles({ isHovered: isAddHovered, isPressed: isAddPressed })}
        onMouseEnter={() => setIsAddHovered(true)}
        onMouseLeave={() => setIsAddHovered(false)}
        onMouseDown={() => setIsAddPressed(true)}
        onMouseUp={() => setIsAddPressed(false)}
        onBlur={() => setIsAddPressed(false)}
      >
        Add
      </button>
    </form>
  );
};

export default HabitForm;
