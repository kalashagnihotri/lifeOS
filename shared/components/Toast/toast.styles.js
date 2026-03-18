import theme from "../../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const accentByType = {
  success: colors.success,
  error: colors.error,
  warning: colors.warning,
  info: colors.secondary,
};

export const getToastContainerStyles = () => ({
  position: "fixed",
  right: `${spacing.md}px`,
  bottom: `${spacing.md}px`,
  zIndex: 30,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
  width: `min(92vw, ${spacing.xxl * 14}px)`,
  pointerEvents: "none",
});

export const getToastItemStyles = ({ type = "info" }) => ({
  borderRadius: spacing.md,
  border: `1px solid ${hexToRgba(accentByType[type] || colors.secondary, 0.6)}`,
  borderLeft: `${spacing.xs}px solid ${accentByType[type] || colors.secondary}`,
  background: `linear-gradient(160deg, ${hexToRgba(colors.surface, 0.94)} 0%, ${hexToRgba(colors.background, 0.9)} 100%)`,
  boxShadow: `0 14px 24px ${hexToRgba(colors.background, 0.55)}`,
  backdropFilter: "blur(12px)",
  padding: `${spacing.sm}px ${spacing.md}px`,
  animation: "lifeosToastIn 260ms ease",
});

export const getToastTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.bold,
});

export const getToastMessageStyles = () => ({
  margin: `${spacing.xs}px 0 0`,
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
  lineHeight: 1.45,
});
