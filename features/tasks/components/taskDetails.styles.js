import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getTaskDetailsOverlayStyles = ({ isOpen = false }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: isOpen ? "rgba(8, 10, 15, 0.52)" : "rgba(8, 10, 15, 0)",
  backdropFilter: isOpen ? "blur(4px)" : "blur(0px)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 1100,
  pointerEvents: isOpen ? "auto" : "none",
  opacity: isOpen ? 1 : 0,
  transition: "opacity 0.22s ease, backdrop-filter 0.22s ease, background-color 0.22s ease",
});

export const getTaskDetailsPanelStyles = ({ isOpen = false }) => ({
  width: "min(440px, 100%)",
  height: "100%",
  borderLeft: `1px solid ${colors.border}`,
  background: "linear-gradient(165deg, rgba(23, 28, 40, 0.98) 0%, rgba(15, 17, 23, 0.96) 100%)",
  boxShadow: "-24px 0 42px rgba(8, 10, 15, 0.42)",
  padding: `${spacing.lg}px ${spacing.md}px`,
  boxSizing: "border-box",
  transform: isOpen ? "translateX(0)" : "translateX(100%)",
  transition: "transform 0.24s ease",
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
});

export const getTaskDetailsTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.xl,
  fontWeight: typography.fontWeights.bold,
});

export const getTaskDetailsFieldWrapStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getTaskDetailsLabelStyles = () => ({
  margin: 0,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const getTaskDetailsInputStyles = () => ({
  width: "100%",
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: "rgba(15, 17, 23, 0.72)",
  color: colors.text.primary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  outline: "none",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});

export const getTaskDetailsHintStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});
