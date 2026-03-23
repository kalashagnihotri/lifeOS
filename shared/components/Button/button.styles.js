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
    background: `linear-gradient(145deg, ${hexToRgba(colors.primary, 0.3)} 0%, ${hexToRgba(colors.secondary, 0.2)} 100%)`,
    color: "#FFFFFF",
    border: `1px solid ${hexToRgba(colors.outlineVariant || colors.border, 0.14)}`,
    shadow: "0 18px 42px rgba(0, 0, 0, 0.42)",
  },
  secondary: {
    background: "rgba(31, 31, 31, 0.5)",
    color: colors.text.primary,
    border: `1px solid ${hexToRgba(colors.outlineVariant || colors.border, 0.12)}`,
    shadow: "0 12px 28px rgba(0, 0, 0, 0.36)",
  },
  glass: {
    background: "linear-gradient(135deg, rgba(42, 42, 42, 0.42) 0%, rgba(20, 20, 20, 0.55) 100%)",
    color: "rgba(236, 236, 239, 0.94)",
    border: `1px solid ${hexToRgba(colors.outlineVariant || colors.border, 0.12)}`,
    shadow: "0 16px 36px rgba(0, 0, 0, 0.4)",
  },
  danger: {
    background: hexToRgba(colors.error, 0.22),
    color: colors.error,
    border: `1px solid ${hexToRgba(colors.error, 0.3)}`,
    shadow: "0 14px 30px rgba(0, 0, 0, 0.34)",
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
    filter: isHovered && !disabled ? "brightness(1.05)" : "none",
    boxShadow:
      isFocused && !disabled
        ? `inset 0 0 0 1px ${hexToRgba(colors.primary, 0.2)}, 0 0 0 ${spacing.xs}px ${hexToRgba(colors.outlineVariant || colors.text.muted, 0.22)}, ${selectedVariant.shadow}`
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
    backdropFilter: "blur(20px)",
    transition:
      "background 0.28s ease, border-color 0.28s ease, opacity 0.28s ease, transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease",
  };
};
