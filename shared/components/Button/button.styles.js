import theme from "../../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

const variantStyles = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.surface,
    border: `1px solid ${colors.primary}`,
  },
  secondary: {
    backgroundColor: colors.surface,
    color: colors.text.primary,
    border: `1px solid ${colors.border}`,
  },
  danger: {
    backgroundColor: colors.error,
    color: colors.surface,
    border: `1px solid ${colors.error}`,
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
}) => {
  const selectedVariant = variantStyles[variant] || variantStyles.primary;
  const selectedSize = sizeStyles[size] || sizeStyles.medium;

  return {
    ...selectedSize,
    borderRadius: 6,
    border: selectedVariant.border,
    backgroundColor: selectedVariant.backgroundColor,
    color: selectedVariant.color,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.medium,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    filter: isHovered && !disabled ? "brightness(0.94)" : "none",
    transition: "background-color 0.2s ease, opacity 0.2s ease",
  };
};
