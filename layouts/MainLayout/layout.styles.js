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
    : `radial-gradient(circle at 82% 8%, ${hexToRgba(colors.primary, 0.14)} 0%, ${colors.background} 48%)`,
  overflow: "hidden",
  transition: "background 0.28s ease",
});

export const getMainSectionStyles = ({ isCompact = false }) => ({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: colors.background,
  boxShadow: isCompact ? "none" : `inset 1px 0 0 ${colors.border}`,
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
