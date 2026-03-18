import theme from "../../core/theme";

const colors = theme.colors.light;
const { spacing } = theme;

export const getLayoutRootStyles = () => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  backgroundColor: colors.background,
  overflow: "hidden",
});

export const getMainSectionStyles = () => ({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: colors.background,
});

export const getContentAreaStyles = () => ({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  padding: `${spacing.xl}px`,
  boxSizing: "border-box",
});
