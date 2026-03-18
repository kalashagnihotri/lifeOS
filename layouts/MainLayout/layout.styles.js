import theme from "../../core/theme";

const colors = theme.colors.light;
const { spacing } = theme;

export const getLayoutRootStyles = ({ isCompact = false }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  backgroundColor: colors.background,
  overflow: "hidden",
  transition: "background-color 0.25s ease",
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
  transition: "padding 0.25s ease",
});
