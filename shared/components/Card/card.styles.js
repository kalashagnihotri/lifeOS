import theme from "../../../core/theme";

const colors = theme.colors.light;
const { spacing } = theme;

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const elevationShadows = {
  0: "none",
  1: `0 1px 3px ${hexToRgba(colors.text.primary, 0.08)}`,
  2: `0 4px 8px ${hexToRgba(colors.text.primary, 0.12)}`,
  3: `0 8px 16px ${hexToRgba(colors.text.primary, 0.16)}`,
};

export const getCardStyles = ({ padding = "md", elevation = 0 }) => {
  const paddingValue = typeof padding === "number" ? padding : spacing[padding] || spacing.md;

  return {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: `${paddingValue}px`,
    boxShadow: elevationShadows[elevation] || elevationShadows[0],
  };
};
