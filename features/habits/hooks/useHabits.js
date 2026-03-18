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
    setHabits(getHabits());
  }, []);

  const addHabit = (title) => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    const updatedHabits = addHabitInService({ title: normalizedTitle });
    setHabits(updatedHabits);
  };

  const toggleHabitForToday = (id) => {
    const updatedHabits = toggleHabitForTodayInService(id);
    setHabits(updatedHabits);
  };

  const deleteHabit = (id) => {
    const updatedHabits = deleteHabitInService(id);
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
