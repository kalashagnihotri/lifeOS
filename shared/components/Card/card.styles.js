import theme from "../../../core/theme";

const colorsByScheme = {
  light: theme.colors.light,
  dark: theme.colors.dark,
};
const defaultColors = colorsByScheme.light;
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
  1: `0 1px 3px ${hexToRgba(defaultColors.text.primary, 0.08)}`,
  2: `0 4px 8px ${hexToRgba(defaultColors.text.primary, 0.12)}`,
  3: `0 8px 16px ${hexToRgba(defaultColors.text.primary, 0.16)}`,
};

export const getCardStyles = ({
  padding = "md",
  elevation = 0,
  scheme = "light",
  isHovered = false,
}) => {
  const selectedColors = colorsByScheme[scheme] || colorsByScheme.light;
  const shadowTint =
    scheme === "dark"
      ? hexToRgba(selectedColors.text.primary, 0.12)
      : hexToRgba(selectedColors.text.primary, 0.18);
  const dynamicShadows = {
    ...elevationShadows,
    1: `0 2px 6px ${shadowTint}`,
    2: `0 8px 18px ${shadowTint}`,
    3: `0 12px 24px ${shadowTint}`,
  };
  const paddingValue = typeof padding === "number" ? padding : spacing[padding] || spacing.md;

  return {
    backgroundColor: selectedColors.surface,
    border: `1px solid ${selectedColors.border}`,
    borderRadius: 8,
    padding: `${paddingValue}px`,
    boxShadow: dynamicShadows[elevation] || dynamicShadows[0],
    transform: isHovered ? "translateY(-2px)" : "none",
    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
  };
};
