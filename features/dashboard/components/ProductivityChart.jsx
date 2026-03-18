import Card from "../../../shared/components/Card/Card";
import theme from "../../../core/theme";

const colors = theme.colors.light;
const { spacing, typography } = theme;

const getChartContainerStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.md}px`,
});

const getChartTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
});

const getChartPlaceholderStyles = () => ({
  minHeight: `${spacing.xxl * 6}px`,
  border: `1px dashed ${colors.border}`,
  borderRadius: spacing.sm,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.background,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});

const ProductivityChart = () => {
  return (
    <Card padding="lg" elevation={1}>
      <div style={getChartContainerStyles()}>
        <h3 style={getChartTitleStyles()}>Productivity Chart</h3>
        <div style={getChartPlaceholderStyles()}>Chart placeholder</div>
      </div>
    </Card>
  );
};

export default ProductivityChart;
