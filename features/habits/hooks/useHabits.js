import { useEffect, useState } from "react";
import {
  getHabits,
  addHabit as addHabitInService,
  toggleHabitForToday as toggleHabitForTodayInService,
  deleteHabit as deleteHabitInService,
} from "../services/habitService";
import { notify } from "../../../shared/utils/notify";

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

  const addHabit = async (title) => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      notify({
        title: "Habit not added",
        message: "Enter a habit title first.",
        type: "warning",
      });
      return false;
    }

    try {
      const updatedHabits = await addHabitInService({ title: normalizedTitle });
      setHabits(updatedHabits);
      notify({
        title: "Habit added",
        message: `Added "${normalizedTitle}" and tracking started.`,
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
      const updatedHabits = await toggleHabitForTodayInService(id);
      setHabits(updatedHabits);
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
