import { formatTime } from "../utils/timeUtils";
import {
  getPomodoroMetaStyles,
  getTimerCardStyles,
  getTimerDisplayStyles,
  getTimerLabelStyles,
} from "./focus.styles";

const modeLabelById = {
  focus: "Focus Session",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const TimerDisplay = ({ timeLeft, isRunning, currentMode, completedFocusSessions, autoPlan }) => {
  const modeLabel = modeLabelById[currentMode] || "Pomodoro";
  const autoPlanMeta = autoPlan?.isEnabled
    ? `Plan progress: ${Math.min(completedFocusSessions, autoPlan.targetSessions)}/${autoPlan.targetSessions}`
    : null;

  return (
    <section style={getTimerCardStyles({ isRunning })}>
      <p style={getTimerLabelStyles()}>{`Now: ${modeLabel}`}</p>
      <p style={getTimerDisplayStyles({ isRunning })}>{formatTime(timeLeft)}</p>
      <p style={getPomodoroMetaStyles()}>{`Completed focus blocks: ${completedFocusSessions}`}</p>
      {autoPlanMeta ? <p style={getPomodoroMetaStyles()}>{autoPlanMeta}</p> : null}
    </section>
  );
};

export default TimerDisplay;
