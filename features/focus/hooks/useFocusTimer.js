import { useEffect, useMemo, useRef, useState } from "react";
import { addSession } from "../services/focusService";
import { minutesToSeconds } from "../utils/timeUtils";
import { notify } from "../../../shared/utils/notify";

const DEFAULT_SESSION_MINUTES = 25;

const useFocusTimer = ({ sessionMinutes = DEFAULT_SESSION_MINUTES, onSessionComplete } = {}) => {
  const totalSeconds = useMemo(() => minutesToSeconds(sessionMinutes), [sessionMinutes]);
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

    intervalRef.current = setInterval(() => {
      setTimeLeft((previousTimeLeft) => {
        if (previousTimeLeft <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          setIsRunning(false);

          addSession({ duration: sessionMinutes })
            .then((result) => {
              if (typeof onSessionComplete === "function") {
                onSessionComplete(result.sessions, result.newSession);
              }

              notify({
                title: "Session complete",
                message: `${sessionMinutes} minutes logged to your focus history.`,
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
  }, [isRunning, onSessionComplete, sessionMinutes]);

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
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useFocusTimer;
