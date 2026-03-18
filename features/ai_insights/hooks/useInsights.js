import { useEffect, useState } from "react";
import { getTasks } from "../../tasks/services/taskService";
import { getHabits } from "../../habits/services/habitService";
import { getSessions } from "../../focus/services/focusService";
import { generateInsights } from "../services/insightService";

const getMoodSnapshot = () => {
  if (typeof window === "undefined") {
    return { label: "steady", score: 3 };
  }

  const rawMood = window.localStorage.getItem("lifeos.mood.latest");

  if (!rawMood) {
    return { label: "steady", score: 3 };
  }

  try {
    const parsedMood = JSON.parse(rawMood);

    return {
      label: parsedMood.label || "steady",
      score: Number(parsedMood.score) || 3,
    };
  } catch {
    return { label: "steady", score: 3 };
  }
};

const useInsights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const tasks = getTasks();
    const habits = getHabits();
    const sessions = getSessions();
    const mood = getMoodSnapshot();

    const generatedInsights = generateInsights({ tasks, habits, sessions, mood });
    setInsights(generatedInsights);
  }, []);

  return { insights };
};

export default useInsights;
