import { getCurrentUser } from "../../auth/services/authService";

export const TASKS_UPDATED_EVENT = "lifeos:tasks:updated";

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

    return parsed.map((task, index) => ({
      ...task,
      priority: ["low", "medium", "high"].includes(task?.priority) ? task.priority : "medium",
      dueDate: task?.dueDate || null,
      order: Number.isFinite(task?.order) ? task.order : index,
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
  window.dispatchEvent(new Event(TASKS_UPDATED_EVENT));
};

export const getTasks = async () => {
  return readTasks().sort((firstTask, secondTask) => {
    const orderGap = (firstTask.order ?? 0) - (secondTask.order ?? 0);

    if (orderGap !== 0) {
      return orderGap;
    }

    return (secondTask.createdAt || "").localeCompare(firstTask.createdAt || "");
  });
};

export const addTask = async (task) => {
  const currentTasks = await getTasks();
  const lastOrder = currentTasks.length ? Math.max(...currentTasks.map((item) => item.order || 0)) : -1;
  const nextTask = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: task.title,
    priority: ["low", "medium", "high"].includes(task?.priority) ? task.priority : "medium",
    dueDate: task?.dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
    order: lastOrder + 1,
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

    const nextCompleted = !task.completed;

    return {
      ...task,
      completed: nextCompleted,
      completedAt: nextCompleted ? new Date().toISOString() : null,
    };
  });
  writeTasks(nextTasks);

  return getTasks();
};

export const deleteTask = async (id) => {
  const existingTasks = await getTasks();
  const nextTasks = existingTasks.filter((task) => task.id !== id).map((task, index) => ({
    ...task,
    order: index,
  }));
  writeTasks(nextTasks);

  return getTasks();
};

export const reorderTasks = async (orderedTaskIds) => {
  const existingTasks = await getTasks();

  if (!Array.isArray(orderedTaskIds) || !orderedTaskIds.length) {
    return existingTasks;
  }

  const orderById = new Map(orderedTaskIds.map((id, index) => [id, index]));
  const reorderedTasks = existingTasks
    .map((task) => {
      if (!orderById.has(task.id)) {
        return task;
      }

      return {
        ...task,
        order: orderById.get(task.id),
      };
    })
    .sort((firstTask, secondTask) => (firstTask.order ?? 0) - (secondTask.order ?? 0));

  writeTasks(reorderedTasks);

  return getTasks();
};

export const updateTask = async (id, updates = {}) => {
  const existingTasks = await getTasks();
  const nextTasks = existingTasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    const normalizedTitle = String(updates?.title ?? task.title).trim();
    const normalizedPriority = ["low", "medium", "high"].includes(updates?.priority)
      ? updates.priority
      : task.priority;

    return {
      ...task,
      title: normalizedTitle || task.title,
      priority: normalizedPriority,
      dueDate: updates?.dueDate ?? task.dueDate ?? null,
    };
  });

  writeTasks(nextTasks);

  return getTasks();
};
