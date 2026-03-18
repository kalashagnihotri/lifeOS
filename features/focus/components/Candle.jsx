import {
  getCandleBodyStyles,
  getCandleSceneStyles,
  getCandleWrapStyles,
  getFlameStyles,
  getSmokeStyles,
  getWaxBlobStyles,
  getWaxPuddleStyles,
  getWickStyles,
} from "./candle.styles";

const clampProgress = (timeLeft, totalTime) => {
  if (!Number.isFinite(totalTime) || totalTime <= 0) {
    return 1;
  }

  const ratio = timeLeft / totalTime;
  return Math.max(0, Math.min(1, ratio));
};

const BASE_SCENE_WIDTH = 220;
const BASE_SCENE_HEIGHT = 420;

const Candle = ({
  timeLeft,
  totalTime,
  isRunning,
  isBreak,
  visualSize = { width: 164, height: 220 },
}) => {
  const progress = clampProgress(timeLeft, totalTime);
  const showFlame = Boolean(isRunning && !isBreak);
  const showSmoke = Boolean(isBreak);

  const widthScale = visualSize.width / BASE_SCENE_WIDTH;
  const heightScale = visualSize.height / BASE_SCENE_HEIGHT;
  const scale = Math.max(0.62, Math.min(2.05, Math.min(widthScale, heightScale)));

  return (
    <section
      style={getCandleSceneStyles({ width: visualSize.width, height: visualSize.height })}
      aria-label="Focus candle visualization"
    >
      <style>{`
        @keyframes lifeosFlameFlicker {
          0% { transform: translateY(0px) scale(1); opacity: 0.95; }
          35% { transform: translateY(-1px) scale(0.96); opacity: 0.88; }
          65% { transform: translateY(-2px) scale(1.03); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 0.94; }
        }

        @keyframes lifeosSmokeRise {
          0% { transform: translateY(0px) scale(0.85); opacity: 0.35; }
          100% { transform: translateY(-18px) scale(1.2); opacity: 0; }
        }
      `}</style>
      <div style={getCandleWrapStyles({ scale })}>
        <div style={getWaxPuddleStyles({ progress, scale })}>
          {[0, 1, 2, 3].map((variant) => (
            <span
              key={`wax-blob-${variant}`}
              style={getWaxBlobStyles({ progress, isBreak, variant, scale })}
            />
          ))}
        </div>
        <span style={getWickStyles({ progress, scale })} />
        <div style={getCandleBodyStyles({ progress, isBreak, scale })} />
        {showFlame ? <span style={getFlameStyles({ progress, scale })} /> : null}
        {showSmoke ? <span style={getSmokeStyles({ progress, scale })} /> : null}
      </div>
    </section>
  );
};

export default Candle;
