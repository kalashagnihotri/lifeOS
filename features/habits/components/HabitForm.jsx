import { useState } from "react";
import {
  getHabitAddButtonStyles,
  getHabitFormStyles,
  getHabitInputStyles,
} from "./habit.styles";

const HabitForm = ({ onAddHabit }) => {
  const [title, setTitle] = useState("");
  const [isAddHovered, setIsAddHovered] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (typeof onAddHabit === "function") {
      onAddHabit(title);
    }

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={getHabitFormStyles()}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new habit"
        style={getHabitInputStyles()}
      />
      <button
        type="submit"
        style={getHabitAddButtonStyles({ isHovered: isAddHovered })}
        onMouseEnter={() => setIsAddHovered(true)}
        onMouseLeave={() => setIsAddHovered(false)}
      >
        Add
      </button>
    </form>
  );
};

export default HabitForm;
