import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const STICKY_NOTE_PALETTE = {
  charcoal: "#1C1B19",
  espresso: "#24211D",
  ink: "#20252D",
  graphite: "#2A2927",
};

export const getNotesLayerStyles = () => ({
  position: "absolute",
  inset: 0,
  zIndex: 18,
  pointerEvents: "none",
});

export const getAddNoteButtonStyles = ({ isHovered = false } = {}) => ({
  position: "absolute",
  top: `${spacing.md}px`,
  right: `${spacing.md}px`,
  border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.42)" : "rgba(255, 255, 255, 0.24)"}`,
  borderRadius: spacing.md,
  backgroundColor: isHovered ? "rgba(20, 20, 30, 0.86)" : "rgba(20, 20, 30, 0.72)",
  color: colors.text.primary,
  padding: `${spacing.xs}px ${spacing.md}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  cursor: "pointer",
  pointerEvents: "auto",
  boxShadow: isHovered ? "0 12px 22px rgba(8, 10, 15, 0.3)" : "0 8px 14px rgba(8, 10, 15, 0.24)",
  transition: "background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
});

export const getStickyNoteShellStyles = ({
  x = 0,
  y = 0,
  width = 260,
  height = 220,
  zIndex = 20,
  isDragging = false,
  isResizing = false,
  isFocused = false,
} = {}) => ({
  position: "absolute",
  left: `${x}px`,
  top: `${y}px`,
  width: `${width}px`,
  height: `${height}px`,
  zIndex,
  pointerEvents: "auto",
  userSelect: "none",
  touchAction: "none",
  willChange: "left, top, transform, filter, box-shadow",
  transition: isDragging || isResizing
    ? "left 55ms linear, top 55ms linear, box-shadow 120ms ease, transform 120ms ease, opacity 140ms ease"
    : "box-shadow 180ms ease, transform 180ms ease, filter 180ms ease, opacity 180ms ease",
  transform: isDragging ? "scale(1.012)" : "scale(1)",
  filter: isFocused ? "saturate(1.02)" : "saturate(1)",
});

export const getNoteCardStyles = ({
  color = "#1C1B19",
  isHovered = false,
  isFocused = false,
  isDragging = false,
  tiltAngle = -0.5,
  stackCount = 1,
} = {}) => ({
  background: `radial-gradient(circle at 18% 14%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 34%), linear-gradient(165deg, ${color} 0%, rgba(18, 18, 18, 0.94) 100%)`,
  borderRadius: spacing.lg,
  border: `1px solid ${isFocused ? "rgba(200, 203, 210, 0.44)" : "rgba(255, 255, 255, 0.1)"}`,
  padding: `${spacing.sm}px`,
  height: "100%",
  boxSizing: "border-box",
  backgroundBlendMode: "screen, normal",
  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.03) 1px, transparent 1px), radial-gradient(circle at 78% 76%, rgba(255, 255, 255, 0.02) 1px, transparent 1px), radial-gradient(circle at 18% 14%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 34%), linear-gradient(165deg, ${color} 0%, rgba(18, 18, 18, 0.94) 100%)`,
  backgroundSize: "6px 6px, 8px 8px, 100% 100%, 100% 100%",
  boxShadow: isDragging
    ? "0 22px 32px rgba(8, 10, 15, 0.36)"
    : isFocused
      ? "0 0 0 2px rgba(150, 184, 255, 0.28), 0 16px 28px rgba(8, 10, 15, 0.44), inset 0 1px 10px rgba(0, 0, 0, 0.34)"
      : isHovered
        ? "0 14px 24px rgba(8, 10, 15, 0.3), inset 0 1px 10px rgba(0, 0, 0, 0.26)"
        : stackCount > 1
          ? "0 8px 16px rgba(8, 10, 15, 0.22), 4px 4px 0 rgba(17, 16, 14, 0.55), 8px 8px 0 rgba(17, 16, 14, 0.35), inset 0 1px 8px rgba(0, 0, 0, 0.22)"
          : "0 8px 16px rgba(8, 10, 15, 0.22), inset 0 1px 8px rgba(0, 0, 0, 0.22)",
  transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
  transform: isDragging
    ? "translateY(-2px) rotate(0deg)"
    : isHovered
      ? `translateY(-1px) rotate(${tiltAngle}deg)`
      : "translateY(0) rotate(0deg)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
  overflow: "hidden",
});

export const getNoteHeaderStyles = ({ isDragging = false } = {}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
  paddingBottom: `${spacing.xs}px`,
  borderBottom: "1px dashed rgba(218, 213, 202, 0.2)",
  cursor: isDragging ? "grabbing" : "grab",
  transition: "opacity 140ms ease",
  opacity: isDragging ? 0.92 : 1,
});

export const getNoteTitleStyles = () => ({
  margin: 0,
  color: "rgba(241, 235, 222, 0.96)",
  fontFamily: "'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive",
  fontSize: "22px",
  fontWeight: 700,
  lineHeight: 1,
});

export const getNoteColorListStyles = () => ({
  display: "inline-flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
});

export const getNoteColorSwatchStyles = ({ color, isActive = false } = {}) => ({
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  border: `1px solid ${isActive ? "rgba(244, 248, 255, 0.92)" : "rgba(255, 255, 255, 0.28)"}`,
  backgroundColor: color,
  cursor: "pointer",
  boxShadow: isActive ? "0 0 0 2px rgba(99, 130, 190, 0.8)" : "none",
});

export const getNoteBodyStyles = () => ({
  flex: 1,
  minHeight: 0,
  display: "flex",
});

export const getNoteTextAreaStyles = ({ isEditing = false, isFocused = false } = {}) => ({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  resize: "none",
  background: isFocused ? "rgba(250, 245, 235, 0.06)" : "transparent",
  color: "rgba(246, 240, 228, 0.94)",
  padding: `${spacing.xs}px ${spacing.xs}px ${spacing.sm}px`,
  margin: 0,
  fontFamily: "'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive",
  fontSize: "24px",
  fontWeight: 600,
  lineHeight: 1.35,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  cursor: isEditing ? "text" : "pointer",
  borderRadius: `${spacing.sm}px`,
  boxShadow: isFocused ? "inset 0 0 0 1px rgba(180, 165, 138, 0.35)" : "none",
  transition: "background-color 180ms ease, box-shadow 180ms ease",
});

export const getNoteFooterStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${spacing.sm}px`,
});

export const getNoteResizeHandleStyles = ({ isResizing = false } = {}) => ({
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "16px",
  height: "16px",
  borderRadius: "2px 0 10px 0",
  cursor: "nwse-resize",
  background: isResizing
    ? "linear-gradient(135deg, transparent 0%, transparent 35%, rgba(31, 36, 48, 0.7) 100%)"
    : "linear-gradient(135deg, transparent 0%, transparent 35%, rgba(31, 36, 48, 0.45) 100%)",
});

export const getNoteContentStyles = () => ({
  margin: 0,
  color: "#1F2430",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const getNoteMetaStyles = () => ({
  margin: 0,
  color: "rgba(219, 209, 192, 0.72)",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});

export const getNoteHeaderActionGroupStyles = () => ({
  display: "inline-flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
});

export const getNoteStackBadgeStyles = ({ stackCount = 1 } = {}) => ({
  border: "1px solid rgba(240, 230, 210, 0.28)",
  borderRadius: spacing.sm,
  backgroundColor: "rgba(20, 18, 16, 0.74)",
  color: "rgba(243, 235, 222, 0.94)",
  padding: `0 ${spacing.xs}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  lineHeight: 1.6,
  minWidth: stackCount > 9 ? "36px" : "30px",
  textAlign: "center",
});

export const getNoteMinimizedIconStyles = ({
  x = 0,
  y = 0,
  zIndex = 28,
  isPinned = false,
} = {}) => ({
  position: "absolute",
  left: `${x}px`,
  top: `${y}px`,
  zIndex,
  width: "58px",
  height: "58px",
  borderRadius: "16px",
  border: `1px solid ${isPinned ? "rgba(236, 202, 131, 0.72)" : "rgba(255, 255, 255, 0.2)"}`,
  background: "linear-gradient(165deg, rgba(38, 34, 29, 0.94) 0%, rgba(24, 22, 20, 0.96) 100%)",
  color: "rgba(243, 235, 222, 0.94)",
  boxShadow: "0 10px 20px rgba(8, 10, 15, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: `${spacing.xs}px`,
  boxSizing: "border-box",
  fontFamily: "'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: 1.1,
  cursor: "pointer",
  pointerEvents: "auto",
  transition: "transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease",
  transform: "scale(1)",
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const getNoteActionsStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: `${spacing.xs}px`,
});

export const getNoteActionButtonStyles = ({ tone = "neutral" } = {}) => {
  const palette = tone === "danger"
    ? {
        background: "rgba(176, 38, 50, 0.92)",
        border: "rgba(111, 15, 25, 0.4)",
      }
    : {
        background: "rgba(13, 16, 24, 0.84)",
        border: "rgba(195, 213, 255, 0.28)",
      };

  return {
    border: `1px solid ${palette.border}`,
    borderRadius: spacing.sm,
    backgroundColor: palette.background,
    color: colors.text.primary,
    padding: `${spacing.xs}px ${spacing.sm}px`,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizes.small,
    fontWeight: typography.fontWeights.medium,
    cursor: "pointer",
  };
};

export const getNoteEditorStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
  borderRadius: spacing.lg,
  border: `1px solid ${colors.border}`,
  backgroundColor: "rgba(20, 20, 30, 0.86)",
  padding: `${spacing.md}px`,
});

export const getNoteEditorTextAreaStyles = () => ({
  width: "100%",
  minHeight: "140px",
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: "rgba(15, 17, 23, 0.9)",
  color: colors.text.primary,
  padding: `${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  lineHeight: 1.5,
  resize: "vertical",
  outline: "none",
});

export const getNoteEditorFieldsRowStyles = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: `${spacing.sm}px`,
});

export const getNoteEditorFieldStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getNoteEditorLabelStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
});

export const getNoteEditorInputStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor: "rgba(15, 17, 23, 0.9)",
  color: colors.text.primary,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
  outline: "none",
});

export const getNoteEditorActionsStyles = () => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: `${spacing.sm}px`,
});
