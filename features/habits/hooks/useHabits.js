import { useEffect, useState } from "react";
import {
  getHabits,
  addHabit as addHabitInService,
  toggleHabitForToday as toggleHabitForTodayInService,
  deleteHabit as deleteHabitInService,
} from "../services/habitService";

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
      return;
    }

    const updatedHabits = await addHabitInService({ title: normalizedTitle });
    setHabits(updatedHabits);
  };

  const toggleHabitForToday = async (id) => {
    const updatedHabits = await toggleHabitForTodayInService(id);
    setHabits(updatedHabits);
  };

  const deleteHabit = async (id) => {
    const updatedHabits = await deleteHabitInService(id);
    setHabits(updatedHabits);
  };

  return {
    habits,
    addHabit,
    toggleHabitForToday,
    deleteHabit,
  };
};

export default useHabits;
