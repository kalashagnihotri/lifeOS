const toSafeArray = (value) => {
  return Array.isArray(value) ? value : [];
};

export const calculateTaskCompletionRate = (tasks) => {
  const normalizedTasks = toSafeArray(tasks);

  if (!normalizedTasks.length) {
    return 0;
  }

  const completedCount = normalizedTasks.filter((task) => task.completed).length;
  return Math.round((completedCount / normalizedTasks.length) * 100);
};

export const calculateTotalFocusTime = (sessions) => {
  const normalizedSessions = toSafeArray(sessions);

  return normalizedSessions.reduce((total, session) => {
    return total + (Number(session.duration) || 0);
  }, 0);
};

const calculateHabitStreak = (habit) => {
  const completedDates = Array.isArray(habit?.completedDates) ? habit.completedDates : [];

  if (!completedDates.length) {
    return 0;
  }

  const completedDateSet = new Set(completedDates);
  let streak = 0;

  while (true) {
    const date = new Date();
    date.setDate(date.getDate() - streak);
    const dateKey = date.toISOString().split("T")[0];

    if (!completedDateSet.has(dateKey)) {
      break;
    }

    streak += 1;
  }

  return streak;
};

export const getTopHabitStreak = (habits) => {
  const normalizedHabits = toSafeArray(habits);

  if (!normalizedHabits.length) {
    return {
      title: "No habits yet",
      streak: 0,
    };
  }

  return normalizedHabits.reduce(
    (bestHabit, currentHabit) => {
      const currentStreak = calculateHabitStreak(currentHabit);

      if (currentStreak > bestHabit.streak) {
        return {
          title: currentHabit.title,
          streak: currentStreak,
        };
      }

      return bestHabit;
    },
    { title: "No active streak", streak: 0 }
  );
};
