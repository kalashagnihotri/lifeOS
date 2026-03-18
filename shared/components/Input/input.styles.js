import theme from "../../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

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

export const getInputStyles = ({ isFocused = false, hasError = false }) => {
  const borderColor = hasError
    ? colors.error
    : isFocused
      ? colors.primary
      : colors.border;

  return {
    width: "100%",
    backgroundColor: colors.surface,
    color: colors.text.primary,
    border: `1px solid ${borderColor}`,
    borderRadius: 6,
    padding: `${spacing.sm}px ${spacing.md}px`,
    outline: "none",
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizes.medium,
    fontWeight: typography.fontWeights.regular,
    transition: "border-color 0.2s ease",
  };
};

export const getErrorStyles = () => ({
  color: colors.error,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});
