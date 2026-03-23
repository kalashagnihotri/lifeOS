import theme from "../../core/theme";

const colors = theme.colors.dark;
const { spacing, typography } = theme;

export const getNotesPageStyles = () => ({
  minHeight: "100%",
  width: "100%",
  background:
    "radial-gradient(circle at 20% 8%, rgba(141, 151, 184, 0.12) 0%, rgba(15, 17, 23, 0) 38%), #0f1117",
  display: "flex",
  flexDirection: "column",
  gap: `clamp(${spacing.md}px, 2vw, ${spacing.xl}px)`,
  padding: `clamp(${spacing.md}px, 3vw, ${spacing.xl}px)`,
  boxSizing: "border-box",
  animation: "lifeosPageFade 320ms ease",
});

export const getNotesHeaderStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: `clamp(${typography.fontSizes.xl}px, 3vw, ${typography.fontSizes.heading}px)`,
  fontWeight: typography.fontWeights.bold,
});

export const getNotesSubHeaderStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
});

export const getNotesSummaryGridStyles = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: `${spacing.sm}px`,
});

export const getNotesSummaryCardStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.md,
  backgroundColor: "rgba(20, 20, 30, 0.72)",
  padding: `${spacing.sm}px ${spacing.md}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getNotesSummaryLabelStyles = () => ({
  margin: 0,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const getNotesSummaryValueStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.xl,
  fontWeight: typography.fontWeights.bold,
  lineHeight: 1.1,
});

export const getNotesSectionStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.lg,
  background: "linear-gradient(170deg, rgba(23, 28, 40, 0.94) 0%, rgba(15, 17, 23, 0.92) 100%)",
  padding: `${spacing.md}px`,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.sm}px`,
});

export const getNotesSectionTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.large,
  fontWeight: typography.fontWeights.bold,
  display: "flex",
  alignItems: "center",
  gap: `${spacing.xs}px`,
});

export const getNotesCountBadgeStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  padding: `0 ${spacing.xs}px`,
  color: colors.text.secondary,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
});

export const getNotesListStyles = () => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: `${spacing.xs}px`,
});

export const getNotesItemStyles = () => ({
  border: `1px solid ${colors.border}`,
  borderRadius: spacing.sm,
  backgroundColor: "rgba(15, 17, 23, 0.86)",
  padding: `${spacing.sm}px`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: `${spacing.md}px`,
  transition: "border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
});

export const getNotesItemTitleStyles = () => ({
  margin: 0,
  color: colors.text.primary,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.bold,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const getNotesItemMetaStyles = () => ({
  margin: `${spacing.xs}px 0 0`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.regular,
});

export const getNotesItemTagListStyles = () => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: `${spacing.xs}px`,
  marginTop: `${spacing.xs}px`,
});

export const getNotesItemTagStyles = ({ tone = "neutral" } = {}) => {
  const paletteByTone = {
    neutral: {
      border: "rgba(255, 255, 255, 0.2)",
      text: colors.text.secondary,
      background: "rgba(20, 20, 30, 0.56)",
    },
    accent: {
      border: "rgba(236, 202, 131, 0.42)",
      text: "rgba(236, 202, 131, 0.96)",
      background: "rgba(70, 54, 25, 0.4)",
    },
    info: {
      border: "rgba(186, 189, 198, 0.42)",
      text: "rgba(214, 216, 222, 0.94)",
      background: "rgba(32, 34, 40, 0.44)",
    },
  };

  const palette = paletteByTone[tone] || paletteByTone.neutral;

  return {
    border: `1px solid ${palette.border}`,
    borderRadius: spacing.sm,
    backgroundColor: palette.background,
    color: palette.text,
    padding: `0 ${spacing.xs}px`,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizes.small,
    fontWeight: typography.fontWeights.medium,
    lineHeight: 1.6,
  };
};

export const getNotesItemStatusStyles = ({ isDeleted = false } = {}) => ({
  border: `1px solid ${isDeleted ? "rgba(255, 95, 87, 0.6)" : "rgba(143, 185, 164, 0.6)"}`,
  borderRadius: spacing.sm,
  padding: `${spacing.xs}px ${spacing.sm}px`,
  color: isDeleted ? colors.error : colors.success,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.small,
  fontWeight: typography.fontWeights.medium,
  flexShrink: 0,
});

export const getNotesEmptyStateStyles = () => ({
  margin: 0,
  borderRadius: spacing.sm,
  border: `1px dashed ${colors.border}`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSizes.medium,
  fontWeight: typography.fontWeights.regular,
  textAlign: "center",
  padding: `${spacing.md}px`,
});
