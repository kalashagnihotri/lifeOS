import theme from "../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

const headerHeight = spacing.xxl * 2;

export const getHeaderStyles = ({ isCompact = false }) => ({
  minHeight: `${headerHeight}px`,
  height: `${headerHeight}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 ${isCompact ? spacing.md : spacing.xl}px`,
  backgroundColor: colors.surface,
  borderBottom: `1px solid ${colors.border}`,
  position: "sticky",
  top: 0,
  zIndex: 2,
  boxSizing: "border-box",
  backdropFilter: "blur(4px)",
  transition: "padding 0.25s ease",
});

export const getHeaderBrandStyles = ({ isCompact = false }) => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: isCompact ? typography.fontSizes.medium : typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
  transition: "font-size 0.25s ease",
});

export const getHeaderRightStyles = ({ isCompact = false }) => ({
  display: "flex",
  alignItems: "center",
  gap: `${isCompact ? spacing.xs : spacing.md}px`,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: isCompact ? typography.fontSizes.small : typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  transition: "gap 0.25s ease, font-size 0.25s ease",
});
