import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Button from "../../shared/components/Button/Button";
import {
  getSleepBreakdownGridStyles,
  getSleepBreakdownLabelStyles,
  getSleepBreakdownPanelStyles,
  getSleepBreakdownSummaryStyles,
  getSleepBreakdownValueStyles,
  getSleepHeroClockStyles,
  getSleepHeroMetaStyles,
  getSleepHeroStyles,
  getSleepInputFieldStyles,
  getSleepInputGridStyles,
  getSleepInputLabelStyles,
  getSleepInputStyles,
  getSleepInsightMetaStyles,
  getSleepInsightStyles,
  getSleepInsightTitleStyles,
  getSleepInsightValueStyles,
  getSleepPlanCardStyles,
  getSleepPlanHeaderStyles,
  getSleepPageStyles,
  getSleepSubTitleStyles,
  getSleepTimelineCycleStyles,
  getSleepTimelineDeltaStyles,
  getSleepTimelineItemStyles,
  getSleepTimelineStyles,
  getSleepTimelineTimeStyles,
  getSleepTitleStyles,
} from "./sleep.styles";

const CYCLE_MINUTES = 90;

const formatTimeInput = (date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const parseTimeToMinutes = (timeValue) => {
  if (!timeValue || !timeValue.includes(":")) {
    return null;
  }

  const [hourString, minuteString] = timeValue.split(":");
  const hours = Number(hourString);
  const minutes = Number(minuteString);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
};

const formatMinutesAsClock = (minutesFromMidnight) => {
  const normalized = ((minutesFromMidnight % (24 * 60)) + (24 * 60)) % (24 * 60);
  const hours24 = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;

  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
};

const getCircularMinuteDelta = (firstMinutes, secondMinutes) => {
  const rawDifference = Math.abs(firstMinutes - secondMinutes);
  return Math.min(rawDifference, 24 * 60 - rawDifference);
};

const Sleep = ({ windowMode = false }) => {
  const [sleepTime, setSleepTime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const sleepMetrics = useMemo(() => {
    const sleepMinutes = parseTimeToMinutes(sleepTime);
    const wakeMinutes = parseTimeToMinutes(wakeTime);

    if (!Number.isFinite(sleepMinutes) || !Number.isFinite(wakeMinutes)) {
      return {
        durationMinutes: 0,
        durationLabel: "0h 00m",
        completedCycles: 0,
        remainingMinutes: 0,
        wakeTargets: [],
        wakeMinutes: null,
        recommendedTarget: null,
      };
    }

    let durationMinutes = wakeMinutes - sleepMinutes;

    if (durationMinutes <= 0) {
      durationMinutes += 24 * 60;
    }

    const completedCycles = Math.floor(durationMinutes / CYCLE_MINUTES);
    const remainingMinutes = durationMinutes % CYCLE_MINUTES;
    const durationHours = Math.floor(durationMinutes / 60);
    const durationRemainderMinutes = durationMinutes % 60;
    const durationLabel = `${durationHours}h ${String(durationRemainderMinutes).padStart(2, "0")}m`;
    const wakeTargets = [4, 5, 6].map((cycleCount) => {
      const targetMinutes = sleepMinutes + cycleCount * CYCLE_MINUTES;
      return {
        cycleCount,
        targetMinutes,
        wakeAt: formatMinutesAsClock(targetMinutes),
        deltaToDesired: getCircularMinuteDelta(targetMinutes % (24 * 60), wakeMinutes),
      };
    });
    const recommendedTarget = wakeTargets.reduce((bestTarget, currentTarget) => {
      if (!bestTarget || currentTarget.deltaToDesired < bestTarget.deltaToDesired) {
        return currentTarget;
      }

      return bestTarget;
    }, null);

    return {
      durationMinutes,
      durationLabel,
      completedCycles,
      remainingMinutes,
      wakeTargets,
      wakeMinutes,
      recommendedTarget,
    };
  }, [sleepTime, wakeTime]);

  const rhythmMessage =
    sleepMetrics.remainingMinutes === 0
      ? "Perfect cycle alignment. Your wake time lands exactly at a cycle boundary."
      : `${sleepMetrics.remainingMinutes} minutes sit outside full cycles. Consider the highlighted wake target for easier mornings.`;

  const content = (
    <section style={getSleepPageStyles()}>
      <header style={getSleepHeroStyles()}>
        <h1 style={getSleepTitleStyles()}>Sleep Rhythm Studio</h1>
        <p style={getSleepSubTitleStyles()}>
          Same data, calmer presentation. Set bedtime and wake time, then read the night as one clear story.
        </p>
        <div style={getSleepHeroMetaStyles()}>
          <p style={getSleepHeroClockStyles()}>{formatMinutesAsClock(parseTimeToMinutes(formatTimeInput(liveTime)) ?? 0)}</p>
          <Button
            label="Set Bedtime To Now"
            variant="secondary"
            size="small"
            onClick={() => setSleepTime(formatTimeInput(new Date()))}
          />
        </div>
      </header>

      <div style={getSleepPlanCardStyles()}>
        <div style={getSleepPlanHeaderStyles()}>
          <p style={getSleepInputLabelStyles()}>Tonight's Plan</p>
          <p style={getSleepInputLabelStyles()}>{`Duration: ${sleepMetrics.durationLabel}`}</p>
        </div>

        <div style={getSleepInputGridStyles()}>
          <div style={getSleepInputFieldStyles()}>
            <p style={getSleepInputLabelStyles()}>Bedtime</p>
            <input
              type="time"
              value={sleepTime}
              onChange={(event) => setSleepTime(event.target.value)}
              style={getSleepInputStyles()}
            />
          </div>

          <div style={getSleepInputFieldStyles()}>
            <p style={getSleepInputLabelStyles()}>Wake Time</p>
            <input
              type="time"
              value={wakeTime}
              onChange={(event) => setWakeTime(event.target.value)}
              style={getSleepInputStyles()}
            />
          </div>
        </div>
      </div>

      <div style={getSleepInsightStyles()}>
        <p style={getSleepInsightTitleStyles()}>Best Cycle Match</p>
        <p style={getSleepInsightValueStyles()}>
          {sleepMetrics.recommendedTarget
            ? `${sleepMetrics.recommendedTarget.wakeAt} (${sleepMetrics.recommendedTarget.cycleCount} cycles)`
            : "Set times to see recommendation"}
        </p>
        <p style={getSleepInsightMetaStyles()}>{rhythmMessage}</p>
      </div>

      <div style={getSleepTimelineStyles()}>
        {sleepMetrics.wakeTargets.map((target) => {
          const isRecommended = sleepMetrics.recommendedTarget?.cycleCount === target.cycleCount;

          return (
            <article key={target.cycleCount} style={getSleepTimelineItemStyles(isRecommended)}>
              <p style={getSleepTimelineCycleStyles()}>{`${target.cycleCount} Cycles`}</p>
              <p style={getSleepTimelineTimeStyles()}>{target.wakeAt}</p>
              <p style={getSleepTimelineDeltaStyles()}>
                {`${target.deltaToDesired} min from selected wake time`}
              </p>
            </article>
          );
        })}
      </div>

      <details style={getSleepBreakdownPanelStyles()}>
        <summary style={getSleepBreakdownSummaryStyles()}>Full Sleep Breakdown</summary>
        <div style={getSleepBreakdownGridStyles()}>
          <div>
            <p style={getSleepBreakdownLabelStyles()}>Current Time</p>
            <p style={getSleepBreakdownValueStyles()}>{formatTimeInput(liveTime)}</p>
          </div>

          <div>
            <p style={getSleepBreakdownLabelStyles()}>Sleep Duration</p>
            <p style={getSleepBreakdownValueStyles()}>{sleepMetrics.durationLabel}</p>
          </div>

          <div>
            <p style={getSleepBreakdownLabelStyles()}>Completed Cycles</p>
            <p style={getSleepBreakdownValueStyles()}>{String(sleepMetrics.completedCycles)}</p>
          </div>

          <div>
            <p style={getSleepBreakdownLabelStyles()}>Remaining Minutes</p>
            <p style={getSleepBreakdownValueStyles()}>{String(sleepMetrics.remainingMinutes)}</p>
          </div>
        </div>
      </details>
    </section>
  );

  if (windowMode) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default Sleep;
