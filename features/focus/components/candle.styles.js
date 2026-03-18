import theme from "../../../core/theme";

const { spacing } = theme;

const scalePx = (value, scale = 1) => Math.round(value * scale);
const MIN_BODY_PROGRESS = 0.08;
const BASE_BODY_HEIGHT = 312;
const BASE_WICK_HEIGHT = 14;
const BASE_WICK_EMBED = 6;

const getBodyVisibleHeight = (progress = 1, scale = 1) =>
  scalePx(BASE_BODY_HEIGHT * Math.max(MIN_BODY_PROGRESS, progress), scale);

const getWickBottom = (progress = 1, scale = 1) =>
  Math.max(scalePx(8, scale), getBodyVisibleHeight(progress, scale) - scalePx(BASE_WICK_EMBED, scale));

const getWickTop = (progress = 1, scale = 1) =>
  getWickBottom(progress, scale) + scalePx(BASE_WICK_HEIGHT, scale);

export const getCandleSceneStyles = ({ width = 164, height = 220, isZenMode = false } = {}) => ({
  width: `${width}px`,
  height: `${height}px`,
  minHeight: `${height}px`,
  maxHeight: `${height}px`,
  borderRadius: spacing.lg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: isZenMode
    ? "transparent"
    : "radial-gradient(circle at 50% 10%, rgba(167, 176, 255, 0.12) 0%, rgba(15, 17, 23, 0) 42%), rgba(11, 13, 18, 0.55)",
  border: "none",
  boxShadow: isZenMode ? "none" : "inset 0 0 18px rgba(8, 10, 15, 0.36)",
  overflow: "hidden",
});

export const getCandleWrapStyles = ({ scale = 1 } = {}) => ({
  position: "relative",
  width: `${scalePx(118, scale)}px`,
  height: `${scalePx(372, scale)}px`,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
});

export const getCandleBodyStyles = ({ progress = 1, isBreak = false, scale = 1 }) => ({
  width: `${scalePx(74, scale)}px`,
  height: `${scalePx(BASE_BODY_HEIGHT, scale)}px`,
  borderRadius: "14px 14px 10px 10px",
  transformOrigin: "bottom center",
  transform: `scaleY(${Math.max(MIN_BODY_PROGRESS, progress)})`,
  transition: "transform 0.45s ease",
  background: isBreak
    ? "linear-gradient(180deg, rgba(214, 198, 166, 0.55) 0%, rgba(162, 136, 98, 0.62) 100%)"
    : "linear-gradient(180deg, rgba(241, 221, 184, 0.95) 0%, rgba(199, 164, 112, 0.88) 100%)",
  border: "none",
  boxShadow: isBreak
    ? "0 10px 20px rgba(8, 10, 15, 0.2)"
    : "0 14px 26px rgba(8, 10, 15, 0.3)",
});

export const getWickStyles = ({ progress = 1, scale = 1 }) => ({
  position: "absolute",
  bottom: `${getWickBottom(progress, scale)}px`,
  width: `${scalePx(4, scale)}px`,
  height: `${scalePx(BASE_WICK_HEIGHT, scale)}px`,
  borderRadius: "999px",
  background: "rgba(38, 32, 28, 0.92)",
  transition: "bottom 0.45s ease",
});

export const getFlameStyles = ({ progress = 1, scale = 1 }) => ({
  position: "absolute",
  width: `${scalePx(16, scale)}px`,
  height: `${scalePx(26, scale)}px`,
  bottom: `${getWickTop(progress, scale) - scalePx(4, scale)}px`,
  borderRadius: "50% 50% 45% 45%",
  background: "radial-gradient(circle at 45% 34%, rgba(255, 251, 223, 0.96) 0%, rgba(255, 206, 114, 0.92) 38%, rgba(247, 124, 53, 0.82) 100%)",
  boxShadow: "0 0 14px rgba(255, 195, 102, 0.72), 0 0 28px rgba(255, 118, 66, 0.34)",
  transformOrigin: "bottom center",
  transition: "bottom 0.45s ease",
  animation: "lifeosFlameFlicker 1.35s ease-in-out infinite",
});

export const getSmokeStyles = ({ progress = 1, scale = 1 }) => ({
  position: "absolute",
  width: `${scalePx(12, scale)}px`,
  height: `${scalePx(12, scale)}px`,
  bottom: `${getWickTop(progress, scale)}px`,
  borderRadius: "50%",
  background: "rgba(196, 204, 224, 0.24)",
  filter: "blur(1px)",
  transition: "bottom 0.45s ease",
  animation: "lifeosSmokeRise 1.6s ease-out infinite",
});

export const getWaxPuddleStyles = ({ progress = 1, scale = 1 }) => {
  const meltedRatio = Math.max(0, Math.min(1, 1 - progress));
  const puddleScaleX = 0.82 + meltedRatio * 0.34;
  const puddleScaleY = 0.76 + meltedRatio * 0.3;

  return {
    position: "absolute",
    bottom: `${scalePx(-8, scale)}px`,
    width: `${scalePx(98, scale)}px`,
    height: `${scalePx(34, scale)}px`,
    transform: `scale(${puddleScaleX}, ${puddleScaleY})`,
    transformOrigin: "center",
    opacity: 0.36 + meltedRatio * 0.52,
    transition: "transform 0.45s ease, opacity 0.45s ease",
    pointerEvents: "none",
  };
};

export const getWaxBlobStyles = ({ progress = 1, isBreak = false, variant = 0, scale = 1 }) => {
  const meltedRatio = Math.max(0, Math.min(1, 1 - progress));
  const presets = [
    {
      width: 48,
      height: 20,
      left: 24,
      bottom: 7,
      rotate: -6,
      radius: "63% 49% 58% 47% / 58% 54% 52% 49%",
      opacityBase: 0.48,
    },
    {
      width: 28,
      height: 14,
      left: 0,
      bottom: 8,
      rotate: 11,
      radius: "57% 46% 62% 44% / 61% 45% 58% 50%",
      opacityBase: 0.44,
    },
    {
      width: 26,
      height: 13,
      left: 70,
      bottom: 8,
      rotate: -15,
      radius: "49% 61% 54% 47% / 56% 48% 61% 42%",
      opacityBase: 0.42,
    },
    {
      width: 20,
      height: 10,
      left: 42,
      bottom: 1,
      rotate: 6,
      radius: "55% 51% 47% 63% / 59% 44% 56% 50%",
      opacityBase: 0.36,
    },
  ];

  const shape = presets[variant] || presets[0];

  return {
    position: "absolute",
    width: `${scalePx(shape.width + meltedRatio * 8, scale)}px`,
    height: `${scalePx(shape.height + meltedRatio * 5, scale)}px`,
    left: `${scalePx(shape.left - meltedRatio * 2, scale)}px`,
    bottom: `${scalePx(shape.bottom, scale)}px`,
    borderRadius: shape.radius,
    transform: `rotate(${shape.rotate}deg)`,
    background: isBreak
      ? "radial-gradient(circle at 38% 32%, rgba(208, 190, 162, 0.46) 0%, rgba(146, 122, 90, 0.44) 100%)"
      : "radial-gradient(circle at 38% 32%, rgba(242, 226, 196, 0.78) 0%, rgba(187, 154, 110, 0.58) 100%)",
    boxShadow: "0 4px 10px rgba(8, 10, 15, 0.2)",
    opacity: shape.opacityBase + meltedRatio * 0.34,
    transition:
      "width 0.45s ease, height 0.45s ease, left 0.45s ease, opacity 0.45s ease",
  };
};
