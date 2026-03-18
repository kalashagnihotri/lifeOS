import { useEffect, useMemo, useState } from "react";
import {
  getTasks,
  addTask as addTaskInService,
  toggleTask as toggleTaskInService,
  deleteTask as deleteTaskInService,
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

  useEffect(() => {
    let isActive = true;

    const loadTasks = async () => {
      const loadedTasks = await getTasks();

      if (isActive) {
        setTasks(loadedTasks.map(normalizeTaskInput));
      }
    };

    loadTasks();

    return () => {
      isActive = false;
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
  };
};

export default useTasks;
