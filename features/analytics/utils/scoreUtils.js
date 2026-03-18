const getDateKey = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getTodayKey = () => getDateKey(new Date());

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getCompletedTasksToday = (tasks, todayKey) => {
  return tasks.filter((task) => {
    if (!task.completed) {
      return false;
    }

    const stamp = task.completedAt || task.createdAt;
    return getDateKey(stamp) === todayKey;
  }).length;
};

const getFocusMinutesToday = (sessions, todayKey) => {
  return sessions.reduce((total, session) => {
    if (getDateKey(session?.completedAt) !== todayKey) {
      return total;
    }

    return total + (Number(session.duration) || 0);
  }, 0);
};

export const calculateScore = (tasks = [], sessions = []) => {
  const todayKey = getTodayKey();
  const completedTasksToday = getCompletedTasksToday(tasks, todayKey);
  const focusMinutesToday = getFocusMinutesToday(sessions, todayKey);

  const taskScore = clamp((completedTasksToday / 5) * 60, 0, 60);
  const focusScore = clamp((focusMinutesToday / 120) * 40, 0, 40);

  const score = Math.round(taskScore + focusScore);
  const label = score >= 75 ? "Great day 🚀" : "Keep improving";

  return {
    score,
    label,
    breakdown: {
      tasks: Math.round(taskScore),
      focus: Math.round(focusScore),
    },
    raw: {
      completedTasksToday,
      focusMinutesToday,
    },
  };
};
