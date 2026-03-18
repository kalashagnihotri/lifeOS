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

const variantStyles = {
  primary: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: colors.background,
    border: `1px solid ${hexToRgba(colors.primary, 0.55)}`,
    shadow: `0 8px 20px ${hexToRgba(colors.primary, 0.28)}`,
  },
  secondary: {
    background: hexToRgba(colors.surface, 0.7),
    color: colors.text.primary,
    border: `1px solid ${hexToRgba(colors.border, 0.9)}`,
    shadow: `0 6px 16px ${hexToRgba(colors.background, 0.4)}`,
  },
  danger: {
    background: hexToRgba(colors.error, 0.25),
    color: colors.error,
    border: `1px solid ${hexToRgba(colors.error, 0.7)}`,
    shadow: `0 6px 16px ${hexToRgba(colors.error, 0.25)}`,
  },
};

const sizeStyles = {
  small: {
    padding: `${spacing.sm}px ${spacing.md}px`,
    fontSize: typography.fontSizes.small,
  },
  medium: {
    padding: `${spacing.md}px ${spacing.lg}px`,
    fontSize: typography.fontSizes.medium,
  },
  large: {
    padding: `${spacing.lg}px ${spacing.xl}px`,
    fontSize: typography.fontSizes.large,
  },
};

export const getButtonStyles = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  isHovered = false,
  isFocused = false,
  isPressed = false,
}) => {
  const selectedVariant = variantStyles[variant] || variantStyles.primary;
  const selectedSize = sizeStyles[size] || sizeStyles.medium;

  return {
    ...selectedSize,
    borderRadius: spacing.md,
    border: selectedVariant.border,
    background: selectedVariant.background,
    color: selectedVariant.color,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.medium,
    letterSpacing: "0.01em",
    outline: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.48 : 1,
    filter: isHovered && !disabled ? "brightness(1.04)" : "none",
    boxShadow:
      isFocused && !disabled
        ? `0 0 0 ${spacing.xs}px ${hexToRgba(colors.secondary, 0.45)}, ${selectedVariant.shadow}`
        : selectedVariant.shadow,
    transform:
      disabled
        ? "none"
        : isPressed
          ? "translateY(0) scale(0.98)"
          : isHovered
            ? "translateY(-1px) scale(1.02)"
            : "none",
    animation: !disabled && isPressed ? "lifeosClickMicro 180ms ease" : "none",
    backdropFilter: "blur(8px)",
    transition:
      "background 0.28s ease, border-color 0.28s ease, opacity 0.28s ease, transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease",
  };
};
