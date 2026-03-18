import { useState } from "react";
import {
  getHabitAddButtonStyles,
  getHabitCategorySelectStyles,
  getHabitFormFieldRowStyles,
  getHabitFormStyles,
  getHabitInputStyles,
} from "./habit.styles";

const HabitForm = ({ onAddHabit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isAddPressed, setIsAddPressed] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let didAddSucceed = false;

    if (typeof onAddHabit === "function") {
      didAddSucceed = await onAddHabit({
        title,
        category,
      });
    }

    if (didAddSucceed) {
      setTitle("");
      setCategory("General");
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

      <div style={getHabitFormFieldRowStyles()}>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          style={getHabitCategorySelectStyles()}
        >
          <option value="General">General</option>
          <option value="Health">Health</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
        </select>

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
      </div>
    </form>
  );
};

export default HabitForm;
