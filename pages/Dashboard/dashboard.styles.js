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

export const getDashboardPageStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  minWidth: 0,
  width: "100%",
  animation: "lifeosPageFade 320ms ease",
});

export const getDashboardSectionStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
  minWidth: 0,
  background: `linear-gradient(165deg, ${hexToRgba(colors.surface, 0.94)} 0%, ${hexToRgba(colors.background, 0.84)} 100%)`,
  border: `1px solid ${hexToRgba(colors.border, 0.92)}`,
  borderRadius: spacing.lg,
  padding: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  boxSizing: "border-box",
  boxShadow: `0 14px 28px ${hexToRgba(colors.background, 0.4)}`,
  backdropFilter: "blur(10px)",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
});

export const getDashboardTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.large}px, 2vw, ${typography.fontSizes.xl}px)`,
  fontWeight: typography.fontWeights.bold,
});

export const getStatGridStyles = () => ({
  display: "grid",
  gap: `${spacing.md}px`,
  gridTemplateColumns: `repeat(auto-fit, minmax(${spacing.xxl * 7}px, 1fr))`,
  alignItems: "stretch",
});
