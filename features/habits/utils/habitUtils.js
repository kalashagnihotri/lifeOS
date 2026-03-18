const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getDateOffset = (daysAgo) => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - daysAgo);

  return targetDate.toISOString().split("T")[0];
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
