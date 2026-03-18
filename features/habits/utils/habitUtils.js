const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getDateOffset = (daysAgo) => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - daysAgo);

  return targetDate.toISOString().split("T")[0];
};

export const getLast7DateKeys = () => {
  return Array.from({ length: 7 }, (_, index) => {
    return getDateOffset(6 - index);
  });
};

export const isCompletedToday = (habit) => {
  const completedDates = Array.isArray(habit?.completedDates) ? habit.completedDates : [];
  return completedDates.includes(getTodayDate());
};

export const calculateStreak = (habit) => {
  const completedDates = Array.isArray(habit?.completedDates) ? habit.completedDates : [];

  if (!completedDates.length) {
    return 0;
  }

  const completedDateSet = new Set(completedDates);
  let streak = 0;

  while (completedDateSet.has(getDateOffset(streak))) {
    streak += 1;
  }

  return streak;
};

export const getWeeklyCompletionMap = (habit) => {
  const completedDates = Array.isArray(habit?.completedDates) ? habit.completedDates : [];
  const completedSet = new Set(completedDates);

  return getLast7DateKeys().map((dateKey) => {
    return {
      dateKey,
      completed: completedSet.has(dateKey),
    };
  });
};

export const calculateWeeklyCompletionPercent = (habit) => {
  const weeklyMap = getWeeklyCompletionMap(habit);
  const completedCount = weeklyMap.filter((day) => day.completed).length;

  return Math.round((completedCount / 7) * 100);
};
