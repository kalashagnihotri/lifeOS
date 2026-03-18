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

const TimerDisplay = ({ timeLeft, isRunning, currentMode, completedFocusSessions }) => {
  const modeLabel = modeLabelById[currentMode] || "Pomodoro";

  return (
    <section style={getTimerCardStyles({ isRunning })}>
      <p style={getTimerLabelStyles()}>{modeLabel}</p>
      <p style={getTimerDisplayStyles({ isRunning })}>{formatTime(timeLeft)}</p>
      <p style={getPomodoroMetaStyles()}>{`Completed focus blocks: ${completedFocusSessions}`}</p>
    </section>
  );
};

export default TimerDisplay;
