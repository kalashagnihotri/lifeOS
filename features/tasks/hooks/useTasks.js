import { useEffect, useState } from "react";
import {
  getTasks,
  addTask as addTaskInService,
  toggleTask as toggleTaskInService,
  deleteTask as deleteTaskInService,
} from "../services/taskService";

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
      return;
    }

    const updatedTasks = await addTaskInService({ title: normalizedTitle });
    setTasks(updatedTasks);
  };

  const toggleTask = async (id) => {
    const updatedTasks = await toggleTaskInService(id);
    setTasks(updatedTasks);
  };

  const deleteTask = async (id) => {
    const updatedTasks = await deleteTaskInService(id);
    setTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
};

export default useTasks;
