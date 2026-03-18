import { useEffect, useRef, useState } from "react";
import {
  calculateStreak,
  calculateWeeklyCompletionPercent,
  getWeeklyCompletionMap,
  isCompletedToday,
} from "../utils/habitUtils";
import {
  getHabitActionsStyles,
  getHabitCategoryTagStyles,
  getHabitDeleteButtonStyles,
  getHabitItemStyles,
  getHabitLeftContentStyles,
  getHabitMetaTopRowStyles,
  getHabitProgressBarFillStyles,
  getHabitProgressBarTrackStyles,
  getHabitProgressTextStyles,
  getHabitTitleStyles,
  getHabitWeeklyTrackStyles,
  getHabitWeeklyTrackDotStyles,
  getHabitToggleButtonStyles,
  getStreakBadgeStyles,
} from "./habit.styles";

const HabitItem = ({ habit, onToggle, onDelete }) => {
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isToggleAnimating, setIsToggleAnimating] = useState(false);
  const removeTimeoutRef = useRef(null);
  const toggleAnimationTimeoutRef = useRef(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => {
      cancelAnimationFrame(frameId);

      if (removeTimeoutRef.current) {
        window.clearTimeout(removeTimeoutRef.current);
      }

      if (toggleAnimationTimeoutRef.current) {
        window.clearTimeout(toggleAnimationTimeoutRef.current);
      }
    };
  }, []);

  const completedToday = isCompletedToday(habit);
  const streak = calculateStreak(habit);
  const weeklyMap = getWeeklyCompletionMap(habit);
  const weeklyPercent = calculateWeeklyCompletionPercent(habit);

  const handleDelete = () => {
    setIsRemoving(true);
    removeTimeoutRef.current = window.setTimeout(() => {
      onDelete(habit.id);
    }, 220);
  };

  const handleToggle = () => {
    setIsToggleAnimating(true);
    toggleAnimationTimeoutRef.current = window.setTimeout(() => {
      setIsToggleAnimating(false);
    }, 280);
    onToggle(habit.id);
  };

  return (
    <li
      style={getHabitItemStyles({
        isHovered: isItemHovered,
        completedToday,
        isMounted,
        isRemoving,
        isToggleAnimating,
      })}
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
    >
      <div style={getHabitLeftContentStyles()}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
          <div style={getHabitMetaTopRowStyles()}>
            <p style={getHabitTitleStyles({ completedToday })}>{habit.title}</p>
            <span style={getHabitCategoryTagStyles({ category: habit.category })}>
              {habit.category || "General"}
            </span>
          </div>

          <div style={getHabitMetaTopRowStyles()}>
            <span style={getStreakBadgeStyles({ streak })}>🔥 {streak} day streak</span>
            <span style={getHabitProgressTextStyles()}>{weeklyPercent}% this week</span>
          </div>

          <div style={getHabitProgressBarTrackStyles()}>
            <div style={getHabitProgressBarFillStyles({ weeklyPercent })} />
          </div>

          <div style={getHabitWeeklyTrackStyles()}>
            {weeklyMap.map((day) => (
              <span
                key={day.dateKey}
                style={getHabitWeeklyTrackDotStyles({ completed: day.completed })}
                title={day.dateKey}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={getHabitActionsStyles()}>
        <button
          type="button"
          onClick={handleToggle}
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
