import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const headerHeight = spacing.xxl * 2;

export const getHeaderStyles = ({ isCompact = false }) => ({
  minHeight: `${headerHeight}px`,
  height: `${headerHeight}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 ${isCompact ? spacing.md : spacing.xl}px`,
  background: `linear-gradient(145deg, ${hexToRgba(colors.surface, 0.7)} 0%, ${hexToRgba(colors.surface, 0.52)} 60%, ${hexToRgba(colors.background, 0.42)} 100%)`,
  borderBottom: `1px solid ${hexToRgba(colors.border, 0.65)}`,
  position: "sticky",
  top: 0,
  zIndex: 5,
  boxSizing: "border-box",
  overflow: "hidden",
  backdropFilter: "blur(18px) saturate(140%)",
  boxShadow: `0 10px 28px ${hexToRgba(colors.background, 0.35)}, inset 0 1px 0 ${hexToRgba(colors.text.primary, 0.06)}`,
  transition: "padding 0.25s ease, border-color 0.25s ease",
});

export const getHeaderAccentStyles = () => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background:
    "radial-gradient(circle at 14% -30%, rgba(133, 207, 232, 0.2) 0%, rgba(133, 207, 232, 0) 45%), radial-gradient(circle at 88% -20%, rgba(167, 176, 255, 0.16) 0%, rgba(167, 176, 255, 0) 46%)",
});

export const getHeaderBottomGlowStyles = () => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "1px",
  pointerEvents: "none",
  background: "linear-gradient(90deg, rgba(133, 207, 232, 0) 0%, rgba(133, 207, 232, 0.42) 50%, rgba(167, 176, 255, 0) 100%)",
});

export const getHeaderBrandStyles = ({ isCompact = false }) => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: isCompact ? typography.fontSizes.large : typography.fontSizes.xl,
  fontWeight: typography.fontWeights.bold,
  letterSpacing: "0.02em",
  transition: "font-size 0.25s ease, color 0.25s ease",
});

export const getHeaderRightStyles = ({ isCompact = false }) => ({
  display: "flex",
  alignItems: "center",
  gap: `${isCompact ? spacing.xs : spacing.md}px`,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: isCompact ? typography.fontSizes.small : typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
  transition: "gap 0.25s ease, font-size 0.25s ease",
});
