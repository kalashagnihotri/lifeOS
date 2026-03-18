import { getCurrentUser } from "../../auth/services/authService";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getHabitStorageKey = () => {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return `lifeos.localdb.${user.uid}.habits`;
};

const readHabits = () => {
  const storageKey = getHabitStorageKey();

  if (!storageKey || typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(storageKey);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeHabits = (habits) => {
  const storageKey = getHabitStorageKey();

  if (!storageKey || typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(habits));
};

export const getHabits = async () => {
  return readHabits()
    .sort((firstHabit, secondHabit) => (secondHabit.createdAt || "").localeCompare(firstHabit.createdAt || ""));
};

export const addHabit = async (habit) => {
  const existingHabits = await getHabits();
  const nextHabit = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: habit.title,
    createdAt: new Date().toISOString(),
    completedDates: [],
  };
  writeHabits([nextHabit, ...existingHabits]);

  return getHabits();
};

export const toggleHabitForToday = async (id) => {
  const today = getTodayDate();
  const existingHabits = await getHabits();
  const nextHabits = existingHabits.map((habit) => {
    if (habit.id !== id) {
      return habit;
    }

    const completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : [];
    const hasCompletedToday = completedDates.includes(today);
    const nextCompletedDates = hasCompletedToday
      ? completedDates.filter((date) => date !== today)
      : [...completedDates, today];

    return {
      ...habit,
      completedDates: nextCompletedDates,
    };
  });
  writeHabits(nextHabits);

  return getHabits();
};

export const deleteHabit = async (id) => {
  const existingHabits = await getHabits();
  const nextHabits = existingHabits.filter((habit) => habit.id !== id);
  writeHabits(nextHabits);

  return getHabits();
};
