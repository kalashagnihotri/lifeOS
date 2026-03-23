import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getCandleWidgetShellStyles = ({
  x = 0,
  y = 0,
  width = 220,
  height = 320,
  isDragging = false,
}) => ({
  position: "fixed",
  left: `${x}px`,
  top: `${y}px`,
  width: `${width}px`,
  height: `${height}px`,
  border: "none",
  borderRadius: spacing.md,
  backgroundColor: "rgba(20, 20, 30, 0.6)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: isDragging
    ? "0 18px 30px rgba(8, 10, 15, 0.3)"
    : "0 10px 22px rgba(8, 10, 15, 0.24)",
  zIndex: 12050,
  overflow: "hidden",
  userSelect: "none",
  cursor: isDragging ? "grabbing" : "grab",
});

export const getCandleWidgetBodyStyles = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.xs}px`,
  padding: `${spacing.sm}px`,
  height: "100%",
  boxSizing: "border-box",
});

export const getCandleWidgetMetaStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: "11px",
  fontWeight: typography.fontWeights.medium,
  letterSpacing: "0.02em",
});

export const getCandleWidgetTopRowStyles = () => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
});

export const getCandleWidgetPinButtonStyles = ({ isPinned = false }) => ({
  border: "none",
  borderRadius: spacing.xs,
  backgroundColor: isPinned ? "rgba(189, 192, 201, 0.24)" : "rgba(15, 17, 23, 0.55)",
  color: colors.text.secondary,
  padding: "2px 8px",
  fontFamily: typography.fontFamily,
  fontSize: "11px",
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
});

export const getCandleWidgetResizeHandleStyles = ({ isResizing = false }) => ({
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "14px",
  height: "14px",
  borderRadius: "2px 0 6px 0",
  cursor: "nwse-resize",
  background: isResizing
    ? "linear-gradient(135deg, transparent 0%, transparent 35%, rgba(196, 199, 207, 0.82) 100%)"
    : "linear-gradient(135deg, transparent 0%, transparent 35%, rgba(196, 199, 207, 0.52) 100%)",
});
