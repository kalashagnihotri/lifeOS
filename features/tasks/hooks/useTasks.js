import { useEffect, useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  getTasks,
  addTask as addTaskInService,
  toggleTask as toggleTaskInService,
  deleteTask as deleteTaskInService,
  reorderTasks as reorderTasksInService,
  updateTask as updateTaskInService,
  TASKS_UPDATED_EVENT,
} from "../services/taskService";
import { notify } from "../../../shared/utils/notify";

const getTodayDateKey = () => {
  return new Date().toISOString().split("T")[0];
};

const normalizePriority = (value) => {
  return ["low", "medium", "high"].includes(value) ? value : "medium";
};

const normalizeTaskInput = (task) => ({
  ...task,
  priority: normalizePriority(task?.priority),
  dueDate: task?.dueDate || null,
});

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const loadTasks = async () => {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks.map(normalizeTaskInput));
  };

  useEffect(() => {
    let isActive = true;

    const loadInitialTasks = async () => {
      const loadedTasks = await getTasks();

      if (isActive) {
        setTasks(loadedTasks.map(normalizeTaskInput));
      }
    };

    loadInitialTasks();

    const handleTasksUpdated = async () => {
      if (!isActive) {
        return;
      }

      await loadTasks();
    };

    window.addEventListener(TASKS_UPDATED_EVENT, handleTasksUpdated);

    return () => {
      isActive = false;
      window.removeEventListener(TASKS_UPDATED_EVENT, handleTasksUpdated);
    };
  }, []);

  const addTask = async (taskInput) => {
    const normalizedTitle =
      typeof taskInput === "string" ? taskInput.trim() : String(taskInput?.title || "").trim();

    if (!normalizedTitle) {
      notify({
        title: "Task not added",
        message: "Enter a task title first.",
        type: "warning",
      });
      return false;
    }

    const normalizedPriority = normalizePriority(taskInput?.priority);
    const normalizedDueDate = taskInput?.dueDate || null;

    try {
      const updatedTasks = await addTaskInService({
        title: normalizedTitle,
        priority: normalizedPriority,
        dueDate: normalizedDueDate,
      });
      setTasks(updatedTasks.map(normalizeTaskInput));
      notify({
        title: "Task added",
        message: `Added "${normalizedTitle}" (${normalizedPriority}).`,
        type: "success",
      });
      return true;
    } catch {
      notify({
        title: "Task add failed",
        message: "Please try again.",
        type: "error",
      });
      return false;
    }
  };

  const toggleTask = async (id) => {
    try {
      const updatedTasks = await toggleTaskInService(id);
      setTasks(updatedTasks.map(normalizeTaskInput));
    } catch {
      notify({
        title: "Task update failed",
        message: "Could not update task status.",
        type: "error",
      });
    }
  };

  const deleteTask = async (id) => {
    try {
      const updatedTasks = await deleteTaskInService(id);
      setTasks(updatedTasks.map(normalizeTaskInput));
      notify({
        title: "Task removed",
        message: "Task deleted successfully.",
        type: "info",
      });
    } catch {
      notify({
        title: "Delete failed",
        message: "Could not remove task.",
        type: "error",
      });
    }
  };

  const reorderTasks = async (activeId, overId) => {
    if (!activeId || !overId || activeId === overId) {
      return;
    }

    const previousTasks = [...tasks];
    const oldIndex = tasks.findIndex((task) => task.id === activeId);
    const newIndex = tasks.findIndex((task) => task.id === overId);

    if (oldIndex < 0 || newIndex < 0) {
      return;
    }

    const reordered = arrayMove(tasks, oldIndex, newIndex).map((task, index) => ({
      ...task,
      order: index,
    }));

    setTasks(reordered);

    try {
      await reorderTasksInService(reordered.map((task) => task.id));
    } catch {
      setTasks(previousTasks);
      notify({
        title: "Reorder failed",
        message: "Could not persist task order.",
        type: "error",
      });
    }
  };

  const openTaskPanel = (taskId) => {
    setSelectedTaskId(taskId);
    setIsPanelOpen(true);
  };

  const closeTaskPanel = () => {
    setIsPanelOpen(false);
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTasks = await updateTaskInService(id, updates);
      setTasks(updatedTasks.map(normalizeTaskInput));
    } catch {
      notify({
        title: "Task update failed",
        message: "Could not save task details.",
        type: "error",
      });
    }
  };

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      if (filter === "completed" && !task.completed) {
        return false;
      }

      if (filter === "pending" && task.completed) {
        return false;
      }

      if (normalizedSearch && !String(task.title || "").toLowerCase().includes(normalizedSearch)) {
        return false;
      }

      return true;
    });
  }, [filter, searchQuery, tasks]);

  const groupedTasks = useMemo(() => {
    const todayKey = getTodayDateKey();
    const completed = filteredTasks.filter((task) => task.completed);
    const pending = filteredTasks.filter((task) => !task.completed);
    const today = pending.filter((task) => !task.dueDate || task.dueDate <= todayKey);
    const upcoming = pending.filter((task) => task.dueDate && task.dueDate > todayKey);

    return {
      today,
      upcoming,
      completed,
    };
  }, [filteredTasks]);

  const selectedTask = useMemo(() => {
    return tasks.find((task) => task.id === selectedTaskId) || null;
  }, [selectedTaskId, tasks]);

  return {
    tasks,
    groupedTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    selectedTask,
    isPanelOpen: isPanelOpen && Boolean(selectedTask),
    openTaskPanel,
    closeTaskPanel,
    updateTask,
  };
};

export default useTasks;
