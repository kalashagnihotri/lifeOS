import Button from "../../../shared/components/Button/Button";
import {
  getPomodoroModeButtonStyles,
  getPomodoroModeSelectorStyles,
  getTimerControlsStyles,
} from "./focus.styles";

const modes = [
  { id: "focus", label: "Focus 25" },
  { id: "shortBreak", label: "Short 5" },
  { id: "longBreak", label: "Long 15" },
];

const TimerControls = ({
  isRunning,
  currentMode,
  selectMode,
  startTimer,
  pauseTimer,
  resetTimer,
}) => {
  return (
    <>
      <div style={getPomodoroModeSelectorStyles()}>
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            style={getPomodoroModeButtonStyles({
              isActive: currentMode === mode.id,
            })}
            onClick={() => selectMode(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>

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
    </>
  );
};

export default TimerControls;
