import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import TimerDisplay from "../../features/focus/components/TimerDisplay";
import TimerControls from "../../features/focus/components/TimerControls";
import SessionHistory from "../../features/focus/components/SessionHistory";
import CandleWidget from "../../features/focus/components/CandleWidget";
import useFocusTimer from "../../features/focus/hooks/useFocusTimer";
import { getSessions } from "../../features/focus/services/focusService";
import {
  getFocusHeaderStyles,
  getFocusPageStyles,
  getFocusSubHeaderStyles,
  getFocusTimerShellStyles,
} from "./focus.styles";

const START_FOCUS_EVENT = "lifeos:start-focus-session";
const START_FOCUS_FLAG = "lifeos.pendingStartFocusSession";
const CANDLE_WIDGET_STORAGE_KEY = "lifeos.focus.candleWidget.position";
const CANDLE_WIDGET_SIZE_STORAGE_KEY = "lifeos.focus.candleWidget.size";
const DEFAULT_WIDGET_POSITION = { x: 28, y: 124 };
const DEFAULT_WIDGET_SIZE = { width: 250, height: 390 };

const clampWidgetPosition = (position, size = DEFAULT_WIDGET_SIZE) => {
  const widgetWidth = size.width;
  const widgetHeight = size.height;
  const minX = 10;
  const minY = 10;
  const maxX = Math.max(minX, window.innerWidth - widgetWidth - 10);
  const maxY = Math.max(minY, window.innerHeight - widgetHeight - 10);

  return {
    x: Math.min(maxX, Math.max(minX, Math.round(position.x))),
    y: Math.min(maxY, Math.max(minY, Math.round(position.y))),
  };
};

const loadWidgetPosition = () => {
  if (typeof window === "undefined") {
    return DEFAULT_WIDGET_POSITION;
  }

  const stored = window.localStorage.getItem(CANDLE_WIDGET_STORAGE_KEY);

  if (!stored) {
    return DEFAULT_WIDGET_POSITION;
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Number.isFinite(parsed?.x) || !Number.isFinite(parsed?.y)) {
      return DEFAULT_WIDGET_POSITION;
    }

    return clampWidgetPosition(parsed, DEFAULT_WIDGET_SIZE);
  } catch {
    return DEFAULT_WIDGET_POSITION;
  }
};

const clampWidgetSize = (size) => {
  const minWidth = 220;
  const minHeight = 320;
  const maxWidth = 340;
  const maxHeight = 500;

  return {
    width: Math.min(maxWidth, Math.max(minWidth, Math.round(size.width))),
    height: Math.min(maxHeight, Math.max(minHeight, Math.round(size.height))),
  };
};

const loadWidgetSize = () => {
  if (typeof window === "undefined") {
    return DEFAULT_WIDGET_SIZE;
  }

  const stored = window.localStorage.getItem(CANDLE_WIDGET_SIZE_STORAGE_KEY);

  if (!stored) {
    return DEFAULT_WIDGET_SIZE;
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Number.isFinite(parsed?.width) || !Number.isFinite(parsed?.height)) {
      return DEFAULT_WIDGET_SIZE;
    }

    return clampWidgetSize(parsed);
  } catch {
    return DEFAULT_WIDGET_SIZE;
  }
};

const Focus = ({ windowMode = false }) => {
  const [sessions, setSessions] = useState([]);
  const [autoTargetMinutes, setAutoTargetMinutes] = useState("120");
  const [isCandleWidgetVisible, setIsCandleWidgetVisible] = useState(false);
  const [isWidgetPinned, setIsWidgetPinned] = useState(false);
  const [isWidgetDragging, setIsWidgetDragging] = useState(false);
  const [isWidgetResizing, setIsWidgetResizing] = useState(false);
  const [widgetSize, setWidgetSize] = useState(() => loadWidgetSize());
  const [widgetPosition, setWidgetPosition] = useState(() => loadWidgetPosition());
  const [widgetDragState, setWidgetDragState] = useState(null);
  const [widgetResizeState, setWidgetResizeState] = useState(null);

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
    totalTime,
    isRunning,
    currentMode,
    completedFocusSessions,
    selectMode,
    startTimer,
    pauseTimer,
    resetTimer,
    autoPlan,
    configureAutoPlan,
    clearAutoPlan,
  } = useFocusTimer({
    onSessionComplete: (updatedSessions) => {
      setSessions(updatedSessions);
    },
  });

  const applyAutoPlan = () => {
    setIsCandleWidgetVisible(true);
    configureAutoPlan(autoTargetMinutes, { autoStart: true });
  };

  const startTimerAndShowWidget = () => {
    setIsCandleWidgetVisible(true);
    startTimer();
  };

  const clearAutoPlanState = () => {
    clearAutoPlan();
  };

  useEffect(() => {
    if (!widgetDragState?.isActive) {
      return;
    }

    const handlePointerMove = (event) => {
      const nextPosition = clampWidgetPosition({
        x: event.clientX - widgetDragState.offsetX,
        y: event.clientY - widgetDragState.offsetY,
      }, widgetSize);

      setWidgetPosition(nextPosition);
    };

    const handlePointerUp = () => {
      setIsWidgetDragging(false);
      setWidgetDragState(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [widgetDragState, widgetSize]);

  useEffect(() => {
    if (!widgetResizeState?.isActive) {
      return;
    }

    const handlePointerMove = (event) => {
      const resized = clampWidgetSize({
        width: widgetResizeState.startWidth + (event.clientX - widgetResizeState.startX),
        height: widgetResizeState.startHeight + (event.clientY - widgetResizeState.startY),
      });

      setWidgetSize(resized);
      setWidgetPosition((previousPosition) => clampWidgetPosition(previousPosition, resized));
    };

    const handlePointerUp = () => {
      setIsWidgetResizing(false);
      setWidgetResizeState(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [widgetResizeState]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CANDLE_WIDGET_STORAGE_KEY, JSON.stringify(widgetPosition));
  }, [widgetPosition]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CANDLE_WIDGET_SIZE_STORAGE_KEY, JSON.stringify(widgetSize));
  }, [widgetSize]);

  const modeLabelById = {
    focus: "Focus Session",
    focusQuick: "Focus Session (1 min)",
    shortBreak: "Short Break",
    longBreak: "Long Break",
  };

  const currentModeLabel = modeLabelById[currentMode] || "Pomodoro";

  useEffect(() => {
    const handleStartFocus = () => {
      selectMode("focus");
      startTimer();

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(START_FOCUS_FLAG);
      }
    };

    const shouldStartOnMount =
      typeof window !== "undefined" && window.sessionStorage.getItem(START_FOCUS_FLAG);

    if (shouldStartOnMount) {
      window.requestAnimationFrame(() => {
        handleStartFocus();
      });
    }

    window.addEventListener(START_FOCUS_EVENT, handleStartFocus);

    return () => {
      window.removeEventListener(START_FOCUS_EVENT, handleStartFocus);
    };
  }, [selectMode, startTimer]);

  const content = (
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
          autoPlan={autoPlan}
        />
        <TimerControls
          isRunning={isRunning}
          currentMode={currentMode}
          selectMode={selectMode}
          startTimer={startTimerAndShowWidget}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
          autoTargetMinutes={autoTargetMinutes}
          setAutoTargetMinutes={setAutoTargetMinutes}
          autoPlan={autoPlan}
          applyAutoPlan={applyAutoPlan}
          clearAutoPlan={clearAutoPlanState}
        />
        <SessionHistory sessions={sessions} />
      </div>
      {isCandleWidgetVisible ? (
        <CandleWidget
          timeLeft={timeLeft}
          totalTime={totalTime}
          isRunning={isRunning}
          isBreak={currentMode !== "focus" && currentMode !== "focusQuick"}
          modeLabel={currentModeLabel}
          position={widgetPosition}
          size={widgetSize}
          isDragging={isWidgetDragging}
          isResizing={isWidgetResizing}
          isPinned={isWidgetPinned}
          onPointerDown={(event) => {
            if (isWidgetPinned) {
              return;
            }

            if (event.button !== 0) {
              return;
            }

            event.preventDefault();
            setIsWidgetDragging(true);
            setWidgetDragState({
              isActive: true,
              offsetX: event.clientX - widgetPosition.x,
              offsetY: event.clientY - widgetPosition.y,
            });
          }}
          onResizePointerDown={(event) => {
            if (event.button !== 0) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();
            setIsWidgetResizing(true);
            setWidgetResizeState({
              isActive: true,
              startX: event.clientX,
              startY: event.clientY,
              startWidth: widgetSize.width,
              startHeight: widgetSize.height,
            });
          }}
          onTogglePin={() => setIsWidgetPinned((previous) => !previous)}
        />
      ) : null}
    </section>
  );

  if (windowMode) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default Focus;
