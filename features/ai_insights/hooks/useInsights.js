import { useEffect, useState } from "react";
import { getTasks } from "../../tasks/services/taskService";
import { getSessions } from "../../focus/services/focusService";
import { generateInsights } from "../services/insightService";

const getMoodSnapshot = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawMood = window.localStorage.getItem("lifeos.mood.latest");

  if (!rawMood) {
    return null;
  }

  try {
    const parsedMood = JSON.parse(rawMood);

    return {
      label: parsedMood.label || "steady",
      score: Number(parsedMood.score) || 3,
    };
  } catch {
    return null;
  }
};

const useInsights = () => {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadInsights = async () => {
      if (isActive) {
        setIsLoading(true);
      }

      try {
        const [tasks, sessions] = await Promise.all([getTasks(), getSessions()]);
        const mood = getMoodSnapshot();
        const generatedInsights = await generateInsights({ tasks, sessions, mood });

        if (isActive) {
          setInsights(generatedInsights);
        }
      } catch {
        if (isActive) {
          setInsights([]);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadInsights();

    return () => {
      isActive = false;
    };
  }, []);

  return { insights, isLoading };
};

export default useInsights;
