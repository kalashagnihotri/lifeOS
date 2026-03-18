import { useEffect, useState } from "react";
import {
  getHabits,
  addHabit as addHabitInService,
  toggleHabitForToday as toggleHabitForTodayInService,
  deleteHabit as deleteHabitInService,
} from "../services/habitService";
import { notify } from "../../../shared/utils/notify";
import { calculateStreak, isCompletedToday } from "../utils/habitUtils";

const normalizeCategory = (value) => {
  return ["Health", "Study", "Work", "General"].includes(value) ? value : "General";
};

const useHabits = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    let isActive = true;

    const loadHabits = async () => {
      const loadedHabits = await getHabits();

      if (isActive) {
        setHabits(loadedHabits);
      }
    };

    loadHabits();

    return () => {
      isActive = false;
    };
  }, []);

  const addHabit = async (habitInput) => {
    const normalizedTitle =
      typeof habitInput === "string" ? habitInput.trim() : String(habitInput?.title || "").trim();

    if (!normalizedTitle) {
      notify({
        title: "Habit not added",
        message: "Enter a habit title first.",
        type: "warning",
      });
      return false;
    }

    const normalizedCategory = normalizeCategory(habitInput?.category);

    try {
      const updatedHabits = await addHabitInService({
        title: normalizedTitle,
        category: normalizedCategory,
      });
      setHabits(updatedHabits);
      notify({
        title: "Habit added",
        message: `Added "${normalizedTitle}" in ${normalizedCategory}.`,
        type: "success",
      });
      return true;
    } catch {
      notify({
        title: "Habit add failed",
        message: "Please try again.",
        type: "error",
      });
      return false;
    }
  };

  const toggleHabitForToday = async (id) => {
    try {
      const previousHabit = habits.find((habit) => habit.id === id);
      const previousStreak = previousHabit ? calculateStreak(previousHabit) : 0;
      const wasCompletedToday = previousHabit ? isCompletedToday(previousHabit) : false;

      const updatedHabits = await toggleHabitForTodayInService(id);
      setHabits(updatedHabits);

      const nextHabit = updatedHabits.find((habit) => habit.id === id);

      if (!nextHabit) {
        return;
      }

      const nextStreak = calculateStreak(nextHabit);
      const isNowCompletedToday = isCompletedToday(nextHabit);

      if (isNowCompletedToday && nextStreak > previousStreak) {
        notify({
          title: `🔥 ${nextStreak} day streak!`,
          message: "Keep going! Consistency compounds.",
          type: "success",
        });
      } else if (!isNowCompletedToday && wasCompletedToday) {
        notify({
          title: "Habit unmarked",
          message: "Today's completion was removed.",
          type: "info",
          duration: 1800,
        });
      }
    } catch {
      notify({
        title: "Habit update failed",
        message: "Could not update today status.",
        type: "error",
      });
    }
  };

  const deleteHabit = async (id) => {
    try {
      const updatedHabits = await deleteHabitInService(id);
      setHabits(updatedHabits);
      notify({
        title: "Habit removed",
        message: "Habit deleted successfully.",
        type: "info",
      });
    } catch {
      notify({
        title: "Delete failed",
        message: "Could not remove habit.",
        type: "error",
      });
    }
  };

  return {
    habits,
    addHabit,
    toggleHabitForToday,
    deleteHabit,
  };
};

export default useHabits;
