import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing } = theme;

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getLayoutRootStyles = ({ isCompact = false }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  background: isCompact
    ? colors.background
    : `radial-gradient(circle at 86% 4%, ${hexToRgba(colors.primary, 0.08)} 0%, ${colors.background} 50%), radial-gradient(circle at 12% 108%, ${hexToRgba(colors.secondary, 0.07)} 0%, ${colors.background} 45%)`,
  overflow: "hidden",
  transition: "background 0.28s ease",
});

export const getMainSectionStyles = ({ isCompact = false }) => ({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(180deg, rgba(31, 31, 31, 0.44) 0%, rgba(19, 19, 19, 0.56) 100%)",
  boxShadow: isCompact ? "none" : `inset 1px 0 0 ${hexToRgba(colors.outlineVariant || colors.border, 0.12)}`,
  transition: "box-shadow 0.25s ease",
});

export const getContentAreaStyles = ({ isCompact = false }) => ({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  padding: isCompact ? `${spacing.md}px` : `${spacing.xl}px`,
  boxSizing: "border-box",
  animation: "lifeosPageFade 320ms ease",
  transition: "padding 0.25s ease",
});
