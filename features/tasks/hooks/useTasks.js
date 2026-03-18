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
    setTasks(getTasks());
  }, []);

  const addTask = (title) => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    const updatedTasks = addTaskInService({ title: normalizedTitle });
    setTasks(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = toggleTaskInService(id);
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = deleteTaskInService(id);
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
