import { formatTime } from "../utils/timeUtils";
import {
  getTimerCardStyles,
  getTimerDisplayStyles,
  getTimerLabelStyles,
} from "./focus.styles";

const TimerDisplay = ({ timeLeft, isRunning }) => {
  return (
    <section style={getTimerCardStyles({ isRunning })}>
      <p style={getTimerLabelStyles()}>Focus Session</p>
      <p style={getTimerDisplayStyles({ isRunning })}>{formatTime(timeLeft)}</p>
    </section>
  );
};

export default TimerDisplay;
