import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getQuickAddOverlayStyles = ({ isOpen = false }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: isOpen ? "rgba(8, 10, 15, 0.52)" : "rgba(8, 10, 15, 0)",
  backdropFilter: isOpen ? "blur(10px)" : "blur(0px)",
  WebkitBackdropFilter: isOpen ? "blur(10px)" : "blur(0px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${spacing.md}px`,
  zIndex: 1150,
  opacity: isOpen ? 1 : 0,
  pointerEvents: isOpen ? "auto" : "none",
  transition: "opacity 0.18s ease, backdrop-filter 0.18s ease, background-color 0.18s ease",
});

export const getQuickAddCardStyles = ({ isOpen = false }) => ({
  width: "min(560px, 100%)",
  borderRadius: spacing.lg,
  border: "1px solid rgba(255, 255, 255, 0.16)",
  background: "linear-gradient(165deg, rgba(20, 20, 30, 0.78) 0%, rgba(16, 20, 32, 0.76) 100%)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  padding: `${spacing.md}px`,
  boxShadow: "0 18px 40px rgba(8, 10, 15, 0.34)",
  transform: isOpen ? "translateY(0) scale(1)" : "translateY(8px) scale(0.985)",
  transition: "transform 0.18s ease",
});

export const getQuickAddInputStyles = () => ({
  width: "100%",
  border: "1px solid rgba(255, 255, 255, 0.14)",
  borderRadius: spacing.md,
  backgroundColor: "rgba(20, 20, 30, 0.84)",
  color: colors.text.primary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  outline: "none",
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});

export const getQuickAddHintStyles = () => ({
  margin: `${spacing.sm}px 0 0`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});
