import { useEffect, useRef, useState } from "react";
import { calculateStreak, isCompletedToday } from "../utils/habitUtils";
import {
  getHabitActionsStyles,
  getHabitDeleteButtonStyles,
  getHabitItemStyles,
  getHabitLeftContentStyles,
  getHabitTitleStyles,
  getHabitToggleButtonStyles,
  getStreakBadgeStyles,
} from "./habit.styles";

const HabitItem = ({ habit, onToggle, onDelete }) => {
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const removeTimeoutRef = useRef(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => {
      cancelAnimationFrame(frameId);

      if (removeTimeoutRef.current) {
        window.clearTimeout(removeTimeoutRef.current);
      }
    };
  }, []);

  const completedToday = isCompletedToday(habit);
  const streak = calculateStreak(habit);

  const handleDelete = () => {
    setIsRemoving(true);
    removeTimeoutRef.current = window.setTimeout(() => {
      onDelete(habit.id);
    }, 220);
  };

  return (
    <li
      style={getHabitItemStyles({
        isHovered: isItemHovered,
        completedToday,
        isMounted,
        isRemoving,
      })}
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
    >
      <div style={getHabitLeftContentStyles()}>
        <p style={getHabitTitleStyles({ completedToday })}>{habit.title}</p>
        <span style={getStreakBadgeStyles({ streak })}>🔥 {streak} day streak</span>
      </div>

      <div style={getHabitActionsStyles()}>
        <button
          type="button"
          onClick={() => onToggle(habit.id)}
          style={getHabitToggleButtonStyles({ completedToday, isHovered: isToggleHovered })}
          onMouseEnter={() => setIsToggleHovered(true)}
          onMouseLeave={() => setIsToggleHovered(false)}
        >
          {completedToday ? "Done Today" : "Mark Today"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          style={getHabitDeleteButtonStyles({ isHovered: isDeleteHovered })}
          onMouseEnter={() => setIsDeleteHovered(true)}
          onMouseLeave={() => setIsDeleteHovered(false)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default HabitItem;
