import { useEffect, useMemo, useRef, useState } from "react";
import { addSession } from "../services/focusService";
import { minutesToSeconds } from "../utils/timeUtils";
import { notify } from "../../../shared/utils/notify";

const POMODORO_MINUTES = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
};
const SESSIONS_PER_LONG_BREAK = 4;

const useFocusTimer = ({ onSessionComplete } = {}) => {
  const [currentMode, setCurrentMode] = useState("focus");
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const totalSeconds = useMemo(() => {
    return minutesToSeconds(POMODORO_MINUTES[currentMode]);
  }, [currentMode]);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const handleTimerCompletion = () => {
      setIsRunning(false);

      if (currentMode === "focus") {
        const focusMinutes = POMODORO_MINUTES.focus;

        addSession({ duration: focusMinutes })
          .then((result) => {
            if (typeof onSessionComplete === "function") {
              onSessionComplete(result.sessions, result.newSession);
            }

            notify({
              title: "Focus complete",
              message: `${focusMinutes} minutes logged. Break time.`,
              type: "success",
            });
          })
          .catch(() => {
            notify({
              title: "Session save failed",
              message: "Focus session finished but could not be saved.",
              type: "error",
            });
          });

        setCompletedFocusSessions((previousCount) => {
          const nextCount = previousCount + 1;
          const shouldTakeLongBreak = nextCount % SESSIONS_PER_LONG_BREAK === 0;
          const nextMode = shouldTakeLongBreak ? "longBreak" : "shortBreak";
          setCurrentMode(nextMode);

          return nextCount;
        });

        return;
      }

      setCurrentMode("focus");

      notify({
        title: "Break complete",
        message: "Ready for the next focus session.",
        type: "info",
      });
    };

    intervalRef.current = setInterval(() => {
      setTimeLeft((previousTimeLeft) => {
        if (previousTimeLeft <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          handleTimerCompletion();

          return 0;
        }

        return previousTimeLeft - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentMode, isRunning, onSessionComplete]);

  const selectMode = (mode) => {
    if (!POMODORO_MINUTES[mode]) {
      return;
    }

    setIsRunning(false);
    setCurrentMode(mode);
  };

  const startTimer = () => {
    if (timeLeft <= 0) {
      setTimeLeft(totalSeconds);
    }

    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  return {
    timeLeft,
    isRunning,
    currentMode,
    completedFocusSessions,
    selectMode,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useFocusTimer;
