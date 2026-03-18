import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import TimerDisplay from "../../features/focus/components/TimerDisplay";
import TimerControls from "../../features/focus/components/TimerControls";
import SessionHistory from "../../features/focus/components/SessionHistory";
import CandleWidget from "../../features/focus/components/CandleWidget";
import Candle from "../../features/focus/components/Candle";
import Button from "../../shared/components/Button/Button";
import useFocusTimer from "../../features/focus/hooks/useFocusTimer";
import { getSessions } from "../../features/focus/services/focusService";
import {
  getFocusActionRowStyles,
  getFocusHeaderStyles,
  getFocusPageStyles,
  getFocusSubHeaderStyles,
  getFocusTimerShellStyles,
  getZenDraggableItemStyles,
  getZenModeLayerStyles,
  getZenModePageStyles,
} from "./focus.styles";

const START_FOCUS_EVENT = "lifeos:start-focus-session";
const START_FOCUS_FLAG = "lifeos.pendingStartFocusSession";
const CANDLE_WIDGET_STORAGE_KEY = "lifeos.focus.candleWidget.position";
const CANDLE_WIDGET_SIZE_STORAGE_KEY = "lifeos.focus.candleWidget.size";
const TIMER_WIDGET_STORAGE_KEY = "lifeos.focus.timerWidget.position";
const DEFAULT_WIDGET_POSITION = { x: 28, y: 124 };
const DEFAULT_WIDGET_SIZE = { width: 300, height: 450 };
const ZEN_CANDLE_SIZE = { width: 320, height: 420 };
const ZEN_TIMER_SIZE = { width: 480, height: 280 };
const DEFAULT_TIMER_POSITION = { x: 84, y: 72 };

const clampFloatingPosition = (position, size) => {
  const minX = 10;
  const minY = 10;
  const maxX = Math.max(minX, window.innerWidth - size.width - 10);
  const maxY = Math.max(minY, window.innerHeight - size.height - 10);

  return {
    x: Math.min(maxX, Math.max(minX, Math.round(position.x))),
    y: Math.min(maxY, Math.max(minY, Math.round(position.y))),
  };
};

const clampWidgetPosition = (position, size = DEFAULT_WIDGET_SIZE) => {
  return clampFloatingPosition(position, size);
};

const clampTimerPosition = (position) => {
  return clampFloatingPosition(position, ZEN_TIMER_SIZE);
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

const loadTimerPosition = () => {
  if (typeof window === "undefined") {
    return DEFAULT_TIMER_POSITION;
  }

  const stored = window.localStorage.getItem(TIMER_WIDGET_STORAGE_KEY);

  if (!stored) {
    return clampTimerPosition(DEFAULT_TIMER_POSITION);
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Number.isFinite(parsed?.x) || !Number.isFinite(parsed?.y)) {
      return clampTimerPosition(DEFAULT_TIMER_POSITION);
    }

    return clampTimerPosition(parsed);
  } catch {
    return clampTimerPosition(DEFAULT_TIMER_POSITION);
  }
};

const clampWidgetSize = (size) => {
  const minWidth = 250;
  const minHeight = 360;
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
  const [isZenMode, setIsZenMode] = useState(false);
  const [isCandleWidgetVisible, setIsCandleWidgetVisible] = useState(false);
  const [isWidgetPinned, setIsWidgetPinned] = useState(false);
  const [isWidgetDragging, setIsWidgetDragging] = useState(false);
  const [isWidgetResizing, setIsWidgetResizing] = useState(false);
  const [widgetSize, setWidgetSize] = useState(() => loadWidgetSize());
  const [widgetPosition, setWidgetPosition] = useState(() => loadWidgetPosition());
  const [timerPosition, setTimerPosition] = useState(() => loadTimerPosition());
  const [isTimerDragging, setIsTimerDragging] = useState(false);
  const [widgetDragState, setWidgetDragState] = useState(null);
  const [timerDragState, setTimerDragState] = useState(null);
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
      const activeSize = widgetDragState.boundsSize || widgetSize;
      const nextPosition = clampWidgetPosition({
        x: event.clientX - widgetDragState.offsetX,
        y: event.clientY - widgetDragState.offsetY,
      }, activeSize);

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
    if (!timerDragState?.isActive) {
      return;
    }

    const handlePointerMove = (event) => {
      const nextPosition = clampTimerPosition({
        x: event.clientX - timerDragState.offsetX,
        y: event.clientY - timerDragState.offsetY,
      });

      setTimerPosition(nextPosition);
    };

    const handlePointerUp = () => {
      setIsTimerDragging(false);
      setTimerDragState(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [timerDragState]);

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(TIMER_WIDGET_STORAGE_KEY, JSON.stringify(timerPosition));
  }, [timerPosition]);

  const modeLabelById = {
    focus: "Focus Session",
    focusQuick: "Focus Session (1 min)",
    shortBreak: "Short Break",
    longBreak: "Long Break",
  };

  const currentModeLabel = modeLabelById[currentMode] || "Pomodoro";

  useEffect(() => {
    if (!isZenMode || typeof window === "undefined") {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsZenMode(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isZenMode]);

  useEffect(() => {
    if (!isZenMode || typeof document === "undefined") {
      return;
    }

    const requestFullscreen = async () => {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        try {
          await document.documentElement.requestFullscreen({ navigationUI: "hide" });
        } catch {
          // Ignore browser permission errors and continue with overlay-only zen mode.
        }
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsZenMode(false);
      }
    };

    requestFullscreen();
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);

      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          // If exiting fullscreen fails, keep zen mode teardown resilient.
        });
      }
    };
  }, [isZenMode]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setWidgetPosition((previous) => clampWidgetPosition(previous, widgetSize));
      setTimerPosition((previous) => clampTimerPosition(previous));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [widgetSize]);

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

  const zenContent = (
    <section style={getZenModePageStyles()}>
      <div style={getZenModeLayerStyles()}>
        <div
          style={getZenDraggableItemStyles({
            x: timerPosition.x,
            y: timerPosition.y,
            isDragging: isTimerDragging,
            zIndex: 2,
          })}
          onPointerDown={(event) => {
            if (event.button !== 0) {
              return;
            }

            event.preventDefault();
            setIsTimerDragging(true);
            setTimerDragState({
              isActive: true,
              offsetX: event.clientX - timerPosition.x,
              offsetY: event.clientY - timerPosition.y,
            });
          }}
        >
          <TimerDisplay
            timeLeft={timeLeft}
            isRunning={isRunning}
            currentMode={currentMode}
            completedFocusSessions={completedFocusSessions}
            autoPlan={autoPlan}
            isZenMode={isZenMode}
          />
        </div>

        <div
          style={getZenDraggableItemStyles({
            x: widgetPosition.x,
            y: widgetPosition.y,
            isDragging: isWidgetDragging,
            zIndex: 1,
          })}
          onPointerDown={(event) => {
            if (isWidgetPinned || event.button !== 0) {
              return;
            }

            event.preventDefault();
            setIsWidgetDragging(true);
            setWidgetDragState({
              isActive: true,
              boundsSize: ZEN_CANDLE_SIZE,
              offsetX: event.clientX - widgetPosition.x,
              offsetY: event.clientY - widgetPosition.y,
            });
          }}
        >
          <Candle
            timeLeft={timeLeft}
            totalTime={totalTime}
            isRunning={isRunning}
            isBreak={currentMode !== "focus" && currentMode !== "focusQuick"}
            isZenMode
            visualSize={ZEN_CANDLE_SIZE}
          />
        </div>
      </div>
    </section>
  );

  const content = isZenMode ? (
    typeof document !== "undefined" ? createPortal(zenContent, document.body) : null
  ) : (
    <section style={getFocusPageStyles()}>
      <h1 style={getFocusHeaderStyles()}>Focus</h1>
      <p style={getFocusSubHeaderStyles()}>
        Run a full Pomodoro cycle with focus blocks, short breaks, and long breaks.
      </p>
      <div style={getFocusActionRowStyles()}>
        <Button label="Enter Zen Mode" onClick={() => setIsZenMode(true)} variant="secondary" size="small" />
      </div>

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
      {isCandleWidgetVisible && !isZenMode ? (
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
              boundsSize: widgetSize,
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

  if (windowMode || isZenMode) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default Focus;
