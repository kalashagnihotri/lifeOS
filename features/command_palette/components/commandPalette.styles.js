import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getCommandPaletteOverlayStyles = ({ isOpen = false }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: isOpen ? "rgba(8, 10, 15, 0.54)" : "rgba(8, 10, 15, 0)",
  backdropFilter: isOpen ? "blur(10px)" : "blur(0px)",
  WebkitBackdropFilter: isOpen ? "blur(10px)" : "blur(0px)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: `clamp(${spacing.md}px, 6vh, ${spacing.xxl}px) ${spacing.md}px ${spacing.md}px`,
  zIndex: 1200,
  opacity: isOpen ? 1 : 0,
  pointerEvents: isOpen ? "auto" : "none",
  transition: "opacity 0.2s ease, backdrop-filter 0.2s ease, background-color 0.2s ease",
});

export const getCommandPaletteModalStyles = ({ isOpen = false }) => ({
  width: "min(680px, 100%)",
  borderRadius: spacing.lg,
  border: "1px solid rgba(255, 255, 255, 0.16)",
  background: "linear-gradient(165deg, rgba(20, 20, 30, 0.78) 0%, rgba(16, 20, 32, 0.76) 100%)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 20px 44px rgba(8, 10, 15, 0.34)",
  overflow: "hidden",
  transform: isOpen ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.985)",
  opacity: isOpen ? 1 : 0,
  transition: "transform 0.22s ease, opacity 0.22s ease",
});

export const getCommandPaletteInputWrapStyles = () => ({
  padding: `${spacing.sm}px ${spacing.sm}px ${spacing.xs}px`,
  borderBottom: `1px solid ${colors.border}`,
});

export const getCommandPaletteInputStyles = () => ({
  width: "100%",
  border: "none",
  outline: "none",
  borderRadius: spacing.sm,
  backgroundColor: "rgba(20, 20, 30, 0.8)",
  color: colors.text.primary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});

export const getCommandPaletteListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: `${spacing.sm}px`,
  maxHeight: "360px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getCommandPaletteEmptyStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
  padding: `${spacing.lg}px`,
});

export const getCommandItemStyles = ({ isSelected = false, isHovered = false }) => ({
  border: `1px solid ${isSelected ? colors.primary : isHovered ? "rgba(141, 151, 184, 0.45)" : "transparent"}`,
  backgroundColor: isSelected ? "rgba(167, 176, 255, 0.16)" : isHovered ? "rgba(23, 28, 40, 0.86)" : "transparent",
  borderRadius: spacing.sm,
  width: "100%",
  textAlign: "left",
  padding: `${spacing.sm}px ${spacing.md}px`,
  cursor: "pointer",
  transition: "background-color 0.18s ease, border-color 0.18s ease",
});

export const getCommandItemTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
});

export const getCommandItemDescriptionStyles = () => ({
  margin: `${spacing.xs}px 0 0`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});
