import Button from "../../../shared/components/Button/Button";
import {
  getAutoPlanHintStyles,
  getAutoPlanInputStyles,
  getAutoPlanRowStyles,
  getAutoPlanShellStyles,
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
  autoTargetMinutes,
  setAutoTargetMinutes,
  autoPlan,
  applyAutoPlan,
  clearAutoPlan,
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

      <section style={getAutoPlanShellStyles()}>
        <div style={getAutoPlanRowStyles()}>
          <input
            type="number"
            min="1"
            step="5"
            value={autoTargetMinutes}
            onChange={(event) => setAutoTargetMinutes(event.target.value)}
            style={getAutoPlanInputStyles()}
            placeholder="Target focus minutes"
          />
          <Button label="Auto Plan" onClick={applyAutoPlan} variant="primary" size="small" />
          <Button label="Clear" onClick={clearAutoPlan} variant="secondary" size="small" />
        </div>
        {autoPlan?.isEnabled ? (
          <p style={getAutoPlanHintStyles()}>
            {`Plan: ${autoPlan.targetSessions} focus sessions • ${autoPlan.totalBreakMinutes} break min • total ${autoPlan.plannedTotalMinutes} min`}
          </p>
        ) : (
          <p style={getAutoPlanHintStyles()}>
            Enter your target focus minutes and LifeOS will calculate the session and break plan.
          </p>
        )}
      </section>
    </>
  );
};

export default TimerControls;
