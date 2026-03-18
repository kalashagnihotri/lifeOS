import { useRef, useState } from "react";
import {
  getWindowCloseButtonStyles,
  getWindowContentStyles,
  getWindowControlsClusterStyles,
  getWindowControlsSpacerStyles,
  getWindowHeaderStyles,
  getWindowResizeHandleStyles,
  getWindowSnapPreviewStyles,
  getWindowShellStyles,
  getWindowTitleWrapStyles,
  getWindowTitleStyles,
} from "./window.styles";

const Window = ({
  id,
  title,
  position,
  size,
  zIndex,
  isActive,
  isMinimized,
  isMinimizing,
  isRestoring,
  isDragging,
  isResizing,
  isMaximized,
  snapPreview,
  onActivate,
  onClose,
  onMinimize,
  onMaximize,
  onStartDrag,
  onStartResize,
  children,
}) => {
  const [isMinimizeHovered, setIsMinimizeHovered] = useState(false);
  const [isMaximizeHovered, setIsMaximizeHovered] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const controlsRef = useRef(null);

  const handleActivate = () => {
    onActivate?.(id);
  };

  const handleHeaderMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    if (controlsRef.current?.contains(event.target)) {
      return;
    }

    event.preventDefault();
    onStartDrag?.(id, event);
  };

  const handleClose = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClose?.(id);
  };

  const handleMinimize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onMinimize?.(id);
  };

  const handleMaximize = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onMaximize?.(id);
  };

  const handleResizeStart = (direction, event) => {
    event.preventDefault();
    event.stopPropagation();
    onStartResize?.(id, direction, event);
  };

  return (
    <article
      style={getWindowShellStyles({
        x: position?.x,
        y: position?.y,
        width: size?.width,
        height: size?.height,
        zIndex,
        isActive,
        isMinimized,
        isMinimizing,
        isRestoring,
        isDragging,
        isResizing,
        isMaximized,
      })}
      onMouseDown={handleActivate}
    >
      <header style={getWindowHeaderStyles({ isActive })} onMouseDown={handleHeaderMouseDown}>
        <div style={getWindowControlsClusterStyles()} data-window-control="true" ref={controlsRef}>
          <button
            type="button"
            aria-label="Minimize window"
            style={getWindowCloseButtonStyles({ isHovered: isMinimizeHovered, tone: "minimize" })}
            data-window-control="true"
            onMouseDown={handleMinimize}
            onMouseEnter={() => setIsMinimizeHovered(true)}
            onMouseLeave={() => setIsMinimizeHovered(false)}
          >
            {isMinimizeHovered ? "-" : ""}
          </button>
          <button
            type="button"
            aria-label="Maximize window"
            style={getWindowCloseButtonStyles({ isHovered: isMaximizeHovered, tone: "maximize" })}
            data-window-control="true"
            onMouseDown={handleMaximize}
            onMouseEnter={() => setIsMaximizeHovered(true)}
            onMouseLeave={() => setIsMaximizeHovered(false)}
          >
            {isMaximizeHovered ? "+" : ""}
          </button>
          <button
            type="button"
            aria-label="Close window"
            style={getWindowCloseButtonStyles({ isHovered: isCloseHovered })}
            data-window-control="true"
            onMouseDown={handleClose}
            onMouseEnter={() => setIsCloseHovered(true)}
            onMouseLeave={() => setIsCloseHovered(false)}
          >
            {isCloseHovered ? "x" : ""}
          </button>
        </div>
        <div style={getWindowTitleWrapStyles()}>
          <h3 style={getWindowTitleStyles()}>{title}</h3>
        </div>
        <span style={getWindowControlsSpacerStyles()} />
      </header>
      <section style={getWindowContentStyles({ isMinimized })}>{children}</section>
      {isDragging && snapPreview ? <span style={getWindowSnapPreviewStyles({ snapPreview })} /> : null}

      {!isMinimized && !isMaximized ? (
        <>
          <span
            style={getWindowResizeHandleStyles({ direction: "right" })}
            onMouseDown={(event) => handleResizeStart("right", event)}
          />
          <span
            style={getWindowResizeHandleStyles({ direction: "bottom" })}
            onMouseDown={(event) => handleResizeStart("bottom", event)}
          />
          <span
            style={getWindowResizeHandleStyles({ direction: "corner" })}
            onMouseDown={(event) => handleResizeStart("corner", event)}
          />
        </>
      ) : null}
    </article>
  );
};

export default Window;
