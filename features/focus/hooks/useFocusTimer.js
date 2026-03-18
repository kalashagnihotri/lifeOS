import { useEffect, useMemo, useRef, useState } from "react";
import { addSession } from "../services/focusService";
import { minutesToSeconds } from "../utils/timeUtils";
import { notify } from "../../../shared/utils/notify";

const POMODORO_MINUTES = {
  focus: 25,
  focusQuick: 1,
  shortBreak: 5,
  longBreak: 15,
};
const SESSIONS_PER_LONG_BREAK = 4;

const isFocusMode = (mode) => mode === "focus" || mode === "focusQuick";

const calculateBreakMinutes = (sessionsCount) => {
  if (sessionsCount <= 1) {
    return 0;
  }

  let totalBreakMinutes = 0;

  for (let breakIndex = 1; breakIndex < sessionsCount; breakIndex += 1) {
    const shouldTakeLongBreak = breakIndex % SESSIONS_PER_LONG_BREAK === 0;
    totalBreakMinutes += shouldTakeLongBreak ? POMODORO_MINUTES.longBreak : POMODORO_MINUTES.shortBreak;
  }

  return totalBreakMinutes;
};

const useFocusTimer = ({ onSessionComplete } = {}) => {
  const [currentMode, setCurrentMode] = useState("focus");
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const totalSeconds = useMemo(() => {
    return minutesToSeconds(POMODORO_MINUTES[currentMode]);
  }, [currentMode]);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [autoPlan, setAutoPlan] = useState(null);
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
      const hasAutoPlan = Boolean(autoPlan?.isEnabled);

      if (isFocusMode(currentMode)) {
        const focusMinutes = POMODORO_MINUTES[currentMode] || POMODORO_MINUTES.focus;

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

          if (hasAutoPlan && nextCount >= autoPlan.targetSessions) {
            setCurrentMode("focus");
            setIsRunning(false);

            notify({
              title: "Plan complete",
              message: `You completed ${autoPlan.targetSessions} focus sessions in this plan.`,
              type: "success",
            });

            return nextCount;
          }

          const shouldTakeLongBreak = nextCount % SESSIONS_PER_LONG_BREAK === 0;
          const nextMode = shouldTakeLongBreak ? "longBreak" : "shortBreak";
          setCurrentMode(nextMode);
          if (hasAutoPlan) {
            setIsRunning(true);
          }

          return nextCount;
        });

        return;
      }

      setCurrentMode("focus");
      const shouldAutoContinue =
        hasAutoPlan && completedFocusSessions < (autoPlan?.targetSessions || 0);

      if (shouldAutoContinue) {
        setIsRunning(true);
      }

      notify({
        title: "Break complete",
        message: shouldAutoContinue
          ? "Starting your next focus session."
          : "Ready for the next focus session.",
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
  }, [autoPlan, completedFocusSessions, currentMode, isRunning, onSessionComplete]);

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

  const configureAutoPlan = (targetFocusMinutes, options = {}) => {
    const { autoStart = false } = options;
    const parsedTargetMinutes = Number(targetFocusMinutes);

    if (!Number.isFinite(parsedTargetMinutes) || parsedTargetMinutes <= 0) {
      return null;
    }

    const roundedTargetMinutes = Math.round(parsedTargetMinutes);
    const targetSessions = Math.max(1, Math.ceil(roundedTargetMinutes / POMODORO_MINUTES.focus));
    const totalBreakMinutes = calculateBreakMinutes(targetSessions);
    const plannedTotalMinutes = targetSessions * POMODORO_MINUTES.focus + totalBreakMinutes;

    const plan = {
      isEnabled: true,
      targetFocusMinutes: roundedTargetMinutes,
      targetSessions,
      totalBreakMinutes,
      plannedTotalMinutes,
    };

    setAutoPlan(plan);
    setIsRunning(Boolean(autoStart));
    setCurrentMode("focus");
    setCompletedFocusSessions(0);
    setTimeLeft(minutesToSeconds(POMODORO_MINUTES.focus));

    return plan;
  };

  const clearAutoPlan = () => {
    setAutoPlan(null);
  };

  return {
    timeLeft,
    totalTime: totalSeconds,
    isRunning,
    currentMode,
    completedFocusSessions,
    selectMode,
    startTimer,
    pauseTimer,
    resetTimer,
    autoPlan,
    configureAutoPlan,
    clearAutoPlan,
  };
};

export default useFocusTimer;
