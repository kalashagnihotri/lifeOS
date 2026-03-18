import theme from "../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

const headerHeight = spacing.xxl * 2;

export const getHeaderStyles = () => ({
  minHeight: `${headerHeight}px`,
  height: `${headerHeight}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 ${spacing.xl}px`,
  backgroundColor: colors.surface,
  borderBottom: `1px solid ${colors.border}`,
  position: "sticky",
  top: 0,
  zIndex: 1,
  boxSizing: "border-box",
});

export const getHeaderBrandStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

export const getHeaderRightStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: `${spacing.md}px`,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});
