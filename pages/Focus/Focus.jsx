import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import TimerDisplay from "../../features/focus/components/TimerDisplay";
import TimerControls from "../../features/focus/components/TimerControls";
import SessionHistory from "../../features/focus/components/SessionHistory";
import useFocusTimer from "../../features/focus/hooks/useFocusTimer";
import { getSessions } from "../../features/focus/services/focusService";
import {
  getFocusHeaderStyles,
  getFocusPageStyles,
  getFocusSubHeaderStyles,
  getFocusTimerShellStyles,
} from "./focus.styles";

const Focus = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    let isActive = true;

    const loadSessions = async () => {
      const loadedSessions = await getSessions();

      if (isActive) {
        setSessions(loadedSessions);
      }
    };

    loadSessions();

    return () => {
      isActive = false;
    };
  }, []);

  const {
    timeLeft,
    isRunning,
    currentMode,
    completedFocusSessions,
    selectMode,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useFocusTimer({
    onSessionComplete: (updatedSessions) => {
      setSessions(updatedSessions);
    },
  });

  return (
    <MainLayout>
      <section style={getFocusPageStyles()}>
        <h1 style={getFocusHeaderStyles()}>Focus</h1>
        <p style={getFocusSubHeaderStyles()}>
          Run a full Pomodoro cycle with focus blocks, short breaks, and long breaks.
        </p>

        <div style={getFocusTimerShellStyles()}>
          <TimerDisplay
            timeLeft={timeLeft}
            isRunning={isRunning}
            currentMode={currentMode}
            completedFocusSessions={completedFocusSessions}
          />
          <TimerControls
            isRunning={isRunning}
            currentMode={currentMode}
            selectMode={selectMode}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
          />
          <SessionHistory sessions={sessions} />
        </div>
      </section>
    </MainLayout>
  );
};

export default Focus;
