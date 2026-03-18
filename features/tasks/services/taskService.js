import { getCurrentUser } from "../../auth/services/authService";

const getTaskStorageKey = () => {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return `lifeos.localdb.${user.uid}.tasks`;
};

const readTasks = () => {
  const storageKey = getTaskStorageKey();

  if (!storageKey || typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(storageKey);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((task) => ({
      ...task,
      priority: ["low", "medium", "high"].includes(task?.priority) ? task.priority : "medium",
      dueDate: task?.dueDate || null,
    }));
  } catch {
    return [];
  }
};

const writeTasks = (tasks) => {
  const storageKey = getTaskStorageKey();

  if (!storageKey || typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(tasks));
};

export const getTasks = async () => {
  return readTasks()
    .sort((firstTask, secondTask) => (secondTask.createdAt || "").localeCompare(firstTask.createdAt || ""));
};

export const addTask = async (task) => {
  const currentTasks = await getTasks();
  const nextTask = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: task.title,
    priority: ["low", "medium", "high"].includes(task?.priority) ? task.priority : "medium",
    dueDate: task?.dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  writeTasks([nextTask, ...currentTasks]);

  return getTasks();
};

export const toggleTask = async (id) => {
  const existingTasks = await getTasks();
  const nextTasks = existingTasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    return {
      ...task,
      completed: !task.completed,
    };
  });
  writeTasks(nextTasks);

  return getTasks();
};

export const deleteTask = async (id) => {
  const existingTasks = await getTasks();
  const nextTasks = existingTasks.filter((task) => task.id !== id);
  writeTasks(nextTasks);

  return getTasks();
};
