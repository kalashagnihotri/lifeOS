import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getWindowShellStyles = ({
  x = 0,
  y = 0,
  width,
  height,
  zIndex = 20,
  isActive = false,
  isMinimized = false,
  isMinimizing = false,
  isRestoring = false,
  isDragging = false,
  isResizing = false,
  isMaximized = false,
}) => ({
  position: "absolute",
  top: isMaximized ? 0 : `${Math.max(0, y)}px`,
  left: isMaximized ? 0 : `${Math.max(0, x)}px`,
  width: isMaximized ? "100vw" : `${Number.isFinite(width) ? width : 780}px`,
  height: isMaximized ? "100vh" : isMinimized ? "auto" : `${Number.isFinite(height) ? height : 520}px`,
  maxWidth: "100vw",
  minHeight: isMinimized ? "auto" : "320px",
  maxHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  borderRadius: isMaximized ? 0 : spacing.lg,
  border: `1px solid ${isActive ? "rgba(71, 71, 71, 0.16)" : "rgba(71, 71, 71, 0.12)"}`,
  background: isActive
    ? "linear-gradient(160deg, rgba(31, 31, 31, 0.62) 0%, rgba(23, 23, 23, 0.58) 100%)"
    : "linear-gradient(160deg, rgba(31, 31, 31, 0.54) 0%, rgba(20, 20, 20, 0.5) 100%)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow: isActive
    ? "0 26px 58px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
    : "0 18px 42px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  overflow: "hidden",
  zIndex,
  userSelect: "none",
  opacity: isMinimizing ? 0 : 1,
  transform: isMinimizing
    ? "translateY(86px) scale(0.58)"
    : isRestoring
      ? "translateY(32px) scale(0.88)"
      : isActive
        ? "translateY(0) scale(1)"
        : "translateY(2px) scale(0.992)",
  pointerEvents: isMinimizing || isMinimized ? "none" : "auto",
  visibility: isMinimized ? "hidden" : "visible",
  transformOrigin: "bottom center",
  transition: isDragging || isResizing
    ? "none"
    : "top 0.14s ease, left 0.14s ease, width 0.18s ease, height 0.18s ease, border-radius 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, transform 0.2s ease, opacity 0.2s ease",
});

export const getWindowHeaderStyles = ({ isActive = false }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: `${spacing.sm}px`,
  padding: `${spacing.sm}px ${spacing.md}px`,
  background:
    isActive
      ? "radial-gradient(circle at 12% -40%, rgba(255, 255, 255, 0.08) 0%, rgba(31, 31, 31, 0) 46%), rgba(31, 31, 31, 0.5)"
      : "rgba(31, 31, 31, 0.42)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  cursor: "grab",
});

export const getWindowControlsClusterStyles = () => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  flexShrink: 0,
});

export const getWindowTitleWrapStyles = () => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  minWidth: 0,
});

export const getWindowControlsSpacerStyles = () => ({
  width: "54px",
  flexShrink: 0,
});

export const getWindowTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const getWindowCloseButtonStyles = ({ isHovered = false, tone = "close" }) => {
  const toneMap = {
    close: "#D6D6D8",
    minimize: "#B7B8BD",
    maximize: "#8F9096",
  };

  const toneColor = toneMap[tone] || toneMap.close;

  return {
    border: "none",
    borderRadius: "999px",
    backgroundColor: toneColor,
    color: "rgba(0, 0, 0, 0.75)",
    width: "12px",
    height: "12px",
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: typography.fontFamily,
    fontSize: "8px",
    fontWeight: typography.fontWeights.bold,
    lineHeight: 1,
    cursor: "pointer",
    boxShadow: isHovered ? "inset 0 0 0 1px rgba(0, 0, 0, 0.28)" : "none",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    transform: isHovered ? "scale(1.04)" : "scale(1)",
  };
};

export const getWindowContentStyles = ({ isMinimized = false } = {}) => ({
  flex: 1,
  display: isMinimized ? "none" : "block",
  overflow: "auto",
  padding: `${spacing.md}px`,
  backgroundColor: "rgba(27, 27, 27, 0.62)",
});

export const getWindowResizeHandleStyles = ({ direction = "corner" }) => {
  if (direction === "right") {
    return {
      position: "absolute",
      top: "34px",
      right: 0,
      width: "8px",
      height: "calc(100% - 40px)",
      cursor: "ew-resize",
      zIndex: 2,
    };
  }

  if (direction === "bottom") {
    return {
      position: "absolute",
      left: 0,
      bottom: 0,
      height: "8px",
      width: "calc(100% - 12px)",
      cursor: "ns-resize",
      zIndex: 2,
    };
  }

  return {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "14px",
    height: "14px",
    cursor: "nwse-resize",
    zIndex: 3,
    background: "linear-gradient(135deg, transparent 0%, transparent 40%, rgba(202, 204, 210, 0.5) 100%)",
  };
};

export const getWindowSnapPreviewStyles = ({ snapPreview }) => {
  const baseStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 12,
    border: "1px solid rgba(71, 71, 71, 0.16)",
    background: "rgba(231, 231, 233, 0.08)",
    backdropFilter: "blur(12px)",
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 0 0 1px rgba(71, 71, 71, 0.12)",
    transition: "all 0.1s ease",
  };

  if (snapPreview === "left") {
    return {
      ...baseStyles,
      top: 0,
      left: 0,
      width: "50vw",
      height: "100vh",
    };
  }

  if (snapPreview === "right") {
    return {
      ...baseStyles,
      top: 0,
      right: 0,
      width: "50vw",
      height: "100vh",
    };
  }

  return {
    ...baseStyles,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  };
};
