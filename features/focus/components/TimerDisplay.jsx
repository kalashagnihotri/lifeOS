import { formatTime } from "../utils/timeUtils";
import {
  getPomodoroMetaStyles,
  getTimerCardStyles,
  getTimerDisplayStyles,
  getTimerLabelStyles,
} from "./focus.styles";

const modeLabelById = {
  focus: "Focus Session",
  focusQuick: "Focus Session (1 min)",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const TimerDisplay = ({
  timeLeft,
  isRunning,
  currentMode,
  completedFocusSessions,
  autoPlan,
  isZenMode = false,
}) => {
  const modeLabel = modeLabelById[currentMode] || "Pomodoro";
  const autoPlanMeta = autoPlan?.isEnabled
    ? `Plan progress: ${Math.min(completedFocusSessions, autoPlan.targetSessions)}/${autoPlan.targetSessions}`
    : null;

  return (
    <section style={getTimerCardStyles({ isRunning, isZenMode })}>
      <p style={getTimerLabelStyles()}>{`Now: ${modeLabel}`}</p>
      <p style={getTimerDisplayStyles({ isRunning })}>{formatTime(timeLeft)}</p>
      {!isZenMode ? <p style={getPomodoroMetaStyles()}>{`Completed focus blocks: ${completedFocusSessions}`}</p> : null}
      {!isZenMode && autoPlanMeta ? <p style={getPomodoroMetaStyles()}>{autoPlanMeta}</p> : null}
    </section>
  );
};

export default TimerDisplay;
