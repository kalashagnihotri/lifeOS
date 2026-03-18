const TASKS_STORAGE_KEY = "lifeos.tasks";

const readTasksFromStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const rawTasks = window.localStorage.getItem(TASKS_STORAGE_KEY);

  if (!rawTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(rawTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch {
    return [];
  }
};

const writeTasksToStorage = (tasks) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

const createTask = (task) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: task.title,
  completed: false,
  createdAt: new Date().toISOString(),
});

export const getTasks = () => {
  return readTasksFromStorage();
};

export const addTask = (task) => {
  const newTask = createTask(task);
  const existingTasks = readTasksFromStorage();
  const updatedTasks = [newTask, ...existingTasks];

  writeTasksToStorage(updatedTasks);

  return updatedTasks;
};

export const toggleTask = (id) => {
  const existingTasks = readTasksFromStorage();
  const updatedTasks = existingTasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    return {
      ...task,
      completed: !task.completed,
    };
  });

  writeTasksToStorage(updatedTasks);

  return updatedTasks;
};

export const deleteTask = (id) => {
  const existingTasks = readTasksFromStorage();
  const updatedTasks = existingTasks.filter((task) => task.id !== id);

  writeTasksToStorage(updatedTasks);

  return updatedTasks;
};
