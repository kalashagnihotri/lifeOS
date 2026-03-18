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
    let isActive = true;

    const loadInsights = async () => {
      const [tasks, habits, sessions] = await Promise.all([getTasks(), getHabits(), getSessions()]);
      const mood = getMoodSnapshot();
      const generatedInsights = generateInsights({ tasks, habits, sessions, mood });

      if (isActive) {
        setInsights(generatedInsights);
      }
    };

    loadInsights();

    return () => {
      isActive = false;
    };
  }, []);

  return { insights };
};

export default useInsights;
