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
