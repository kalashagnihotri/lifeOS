import theme from "../../../core/theme";

const colorsByScheme = {
  light: theme.colors.light,
  dark: theme.colors.dark,
};
const defaultColors = colorsByScheme.dark;
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
  1: `0 10px 22px ${hexToRgba(defaultColors.background, 0.4)}`,
  2: `0 14px 30px ${hexToRgba(defaultColors.background, 0.48)}`,
  3: `0 20px 36px ${hexToRgba(defaultColors.background, 0.56)}`,
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
    1: `0 12px 24px ${shadowTint}`,
    2: `0 16px 30px ${shadowTint}`,
    3: `0 22px 40px ${shadowTint}`,
  };
  const paddingValue = typeof padding === "number" ? padding : spacing[padding] || spacing.md;

  return {
    background: `linear-gradient(165deg, ${selectedColors.surface} 0%, ${hexToRgba(selectedColors.surface, 0.9)} 100%)`,
    border: `1px solid ${hexToRgba(selectedColors.border, 0.95)}`,
    borderRadius: spacing.md,
    padding: `${paddingValue}px`,
    boxShadow: dynamicShadows[elevation] || dynamicShadows[0],
    transform: isHovered ? "translateY(-3px)" : "none",
    backdropFilter: "blur(10px)",
    transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
  };
};
