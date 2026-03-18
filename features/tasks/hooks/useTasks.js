import { useEffect, useState } from "react";
import {
  getTasks,
  addTask as addTaskInService,
  toggleTask as toggleTaskInService,
  deleteTask as deleteTaskInService,
} from "../services/taskService";
import { notify } from "../../../shared/utils/notify";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let isActive = true;

    const loadTasks = async () => {
      const loadedTasks = await getTasks();

      if (isActive) {
        setTasks(loadedTasks);
      }
    };

    loadTasks();

    return () => {
      isActive = false;
    };
  }, []);

  const addTask = async (title) => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      notify({
        title: "Task not added",
        message: "Enter a task title first.",
        type: "warning",
      });
      return false;
    }

    try {
      const updatedTasks = await addTaskInService({ title: normalizedTitle });
      setTasks(updatedTasks);
      notify({
        title: "Task added",
        message: `Added "${normalizedTitle}" to your list.`,
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
      setTasks(updatedTasks);
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
      setTasks(updatedTasks);
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

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
};

export default useTasks;
