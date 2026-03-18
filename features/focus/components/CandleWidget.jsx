import Candle from "./Candle";
import { createPortal } from "react-dom";
import {
  getCandleWidgetBodyStyles,
  getCandleWidgetMetaStyles,
  getCandleWidgetPinButtonStyles,
  getCandleWidgetResizeHandleStyles,
  getCandleWidgetShellStyles,
  getCandleWidgetTopRowStyles,
} from "./candleWidget.styles";

const CandleWidget = ({
  timeLeft,
  totalTime,
  isRunning,
  isBreak,
  modeLabel,
  position,
  size,
  isDragging,
  isResizing,
  isPinned,
  onPointerDown,
  onResizePointerDown,
  onTogglePin,
}) => {
  if (typeof document === "undefined") {
    return null;
  }

  const visualSize = {
    width: Math.max(180, size.width - 12),
    height: Math.max(260, size.height - 24),
  };

  return createPortal(
    <section style={getCandleWidgetShellStyles({ x: position.x, y: position.y, width: size.width, height: size.height, isDragging })}>
      <div style={getCandleWidgetBodyStyles()} onPointerDown={onPointerDown}>
        <div style={getCandleWidgetTopRowStyles()}>
          <p style={getCandleWidgetMetaStyles()}>{`Now: ${modeLabel}`}</p>
          <button type="button" style={getCandleWidgetPinButtonStyles({ isPinned })} onClick={onTogglePin}>
            {isPinned ? "Pinned" : "Pin"}
          </button>
        </div>
        <Candle
          timeLeft={timeLeft}
          totalTime={totalTime}
          isRunning={isRunning}
          isBreak={isBreak}
          visualSize={visualSize}
        />
      </div>
      <span style={getCandleWidgetResizeHandleStyles({ isResizing })} onPointerDown={onResizePointerDown} />
    </section>,
    document.body
  );
};

export default CandleWidget;
