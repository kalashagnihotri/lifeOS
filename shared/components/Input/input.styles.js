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

export const getInputWrapperStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getLabelStyles = () => ({
  color: colors.text.secondary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.medium,
});

export const getInputStyles = ({
  isFocused = false,
  isHovered = false,
  hasError = false,
}) => {
  const borderColor = hasError
    ? colors.error
    : isFocused
      ? hexToRgba(colors.outlineVariant || colors.border, 0.22)
      : isHovered
        ? hexToRgba(colors.outlineVariant || colors.border, 0.16)
        : "transparent";

  return {
    width: "100%",
    backgroundColor: isFocused
      ? "rgba(42, 42, 42, 0.78)"
      : "rgba(22, 22, 22, 0.72)",
    color: colors.text.primary,
    border: `1px solid ${borderColor}`,
    borderRadius: spacing.md,
    padding: `${spacing.sm}px ${spacing.md}px`,
    outline: "none",
    boxShadow: isFocused
      ? `inset 0 0 0 1px ${hexToRgba(colors.primary, 0.2)}, 0 0 0 ${spacing.xs}px ${hexToRgba(colors.outlineVariant || colors.border, 0.2)}`
      : "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
    fontFamily: typography.bodyFontFamily || typography.fontFamily,
    fontSize: typography.fontSizes.medium,
    fontWeight: typography.fontWeights.regular,
    backdropFilter: "blur(20px)",
    transition: "border-color 0.28s ease, box-shadow 0.28s ease, background-color 0.28s ease",
  };
};

export const getErrorStyles = () => ({
  color: colors.error,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});
