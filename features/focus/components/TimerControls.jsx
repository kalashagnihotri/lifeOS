import Button from "../../../shared/components/Button/Button";
import { getTimerControlsStyles } from "./focus.styles";

const TimerControls = ({ isRunning, startTimer, pauseTimer, resetTimer }) => {
  return (
    <div style={getTimerControlsStyles()}>
      <Button
        label={isRunning ? "Running" : "Start"}
        onClick={startTimer}
        variant="primary"
        size="medium"
        disabled={isRunning}
      />
      <Button
        label="Pause"
        onClick={pauseTimer}
        variant="secondary"
        size="medium"
        disabled={!isRunning}
      />
      <Button label="Reset" onClick={resetTimer} variant="danger" size="medium" />
    </div>
  );
};

export default TimerControls;
