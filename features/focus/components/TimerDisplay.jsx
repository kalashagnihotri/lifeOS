import { formatTime } from "../utils/timeUtils";
import {
  getTimerCardStyles,
  getTimerDisplayStyles,
  getTimerLabelStyles,
} from "./focus.styles";

const TimerDisplay = ({ timeLeft }) => {
  return (
    <section style={getTimerCardStyles()}>
      <p style={getTimerLabelStyles()}>Focus Session</p>
      <p style={getTimerDisplayStyles()}>{formatTime(timeLeft)}</p>
    </section>
  );
};

export default TimerDisplay;
