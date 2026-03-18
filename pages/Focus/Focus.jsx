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
    setSessions(getSessions());
  }, []);

  const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer } = useFocusTimer({
    onSessionComplete: (updatedSessions) => {
      setSessions(updatedSessions);
    },
  });

  return (
    <MainLayout>
      <section style={getFocusPageStyles()}>
        <h1 style={getFocusHeaderStyles()}>Focus</h1>
        <p style={getFocusSubHeaderStyles()}>
          Stay in deep work mode with a simple 25-minute focus cycle.
        </p>

        <div style={getFocusTimerShellStyles()}>
          <TimerDisplay timeLeft={timeLeft} />
          <TimerControls
            isRunning={isRunning}
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
