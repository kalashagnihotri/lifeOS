const HABITS_STORAGE_KEY = "lifeos.habits";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const readHabitsFromStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const rawHabits = window.localStorage.getItem(HABITS_STORAGE_KEY);

  if (!rawHabits) {
    return [];
  }

  try {
    const parsedHabits = JSON.parse(rawHabits);
    return Array.isArray(parsedHabits) ? parsedHabits : [];
  } catch {
    return [];
  }
};

const writeHabitsToStorage = (habits) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
};

const createHabit = (habit) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: habit.title,
  createdAt: new Date().toISOString(),
  completedDates: [],
});

export const getHabits = () => {
  return readHabitsFromStorage();
};

export const addHabit = (habit) => {
  const newHabit = createHabit(habit);
  const existingHabits = readHabitsFromStorage();
  const updatedHabits = [newHabit, ...existingHabits];

  writeHabitsToStorage(updatedHabits);
  return updatedHabits;
};

export const toggleHabitForToday = (id) => {
  const today = getTodayDate();
  const existingHabits = readHabitsFromStorage();

  const updatedHabits = existingHabits.map((habit) => {
    if (habit.id !== id) {
      return habit;
    }

    const completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : [];
    const hasCompletedToday = completedDates.includes(today);

    return {
      ...habit,
      completedDates: hasCompletedToday
        ? completedDates.filter((date) => date !== today)
        : [...completedDates, today],
    };
  });

  writeHabitsToStorage(updatedHabits);
  return updatedHabits;
};

export const deleteHabit = (id) => {
  const existingHabits = readHabitsFromStorage();
  const updatedHabits = existingHabits.filter((habit) => habit.id !== id);

  writeHabitsToStorage(updatedHabits);
  return updatedHabits;
};
