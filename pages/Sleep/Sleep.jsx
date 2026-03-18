import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Button from "../../shared/components/Button/Button";
import {
  getSleepCardStyles,
  getSleepInputLabelStyles,
  getSleepInputRowStyles,
  getSleepInputStyles,
  getSleepListItemStyles,
  getSleepListStyles,
  getSleepMetricLabelStyles,
  getSleepMetricStyles,
  getSleepMetricValueStyles,
  getSleepPageStyles,
  getSleepSubTitleStyles,
  getSleepSummaryStyles,
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
      return {
        cycleCount,
        wakeAt: formatMinutesAsClock(sleepMinutes + cycleCount * CYCLE_MINUTES),
      };
    });

    return {
      durationMinutes,
      durationLabel,
      completedCycles,
      remainingMinutes,
      wakeTargets,
    };
  }, [sleepTime, wakeTime]);

  const content = (
    <section style={getSleepPageStyles()}>
      <h1 style={getSleepTitleStyles()}>Sleep Cycle Calculator</h1>
      <p style={getSleepSubTitleStyles()}>
        Enter your sleep and wake time to see completed 90-minute cycles and suggested wake targets.
      </p>

      <div style={getSleepCardStyles()}>
        <div style={getSleepInputRowStyles()}>
          <p style={getSleepInputLabelStyles()}>Sleep Time</p>
          <input
            type="time"
            value={sleepTime}
            onChange={(event) => setSleepTime(event.target.value)}
            style={getSleepInputStyles()}
          />
          <Button
            label="Use Live Time"
            variant="secondary"
            size="small"
            onClick={() => setSleepTime(formatTimeInput(new Date()))}
          />
        </div>

        <div style={getSleepInputRowStyles()}>
          <p style={getSleepInputLabelStyles()}>Wake Time</p>
          <input
            type="time"
            value={wakeTime}
            onChange={(event) => setWakeTime(event.target.value)}
            style={getSleepInputStyles()}
          />
        </div>

        <div style={getSleepSummaryStyles()}>
          <div style={getSleepMetricStyles()}>
            <p style={getSleepMetricLabelStyles()}>Live Time</p>
            <p style={getSleepMetricValueStyles()}>{formatTimeInput(liveTime)}</p>
          </div>
          <div style={getSleepMetricStyles()}>
            <p style={getSleepMetricLabelStyles()}>Sleep Duration</p>
            <p style={getSleepMetricValueStyles()}>{sleepMetrics.durationLabel}</p>
          </div>
          <div style={getSleepMetricStyles()}>
            <p style={getSleepMetricLabelStyles()}>Completed Cycles</p>
            <p style={getSleepMetricValueStyles()}>{String(sleepMetrics.completedCycles)}</p>
          </div>
          <div style={getSleepMetricStyles()}>
            <p style={getSleepMetricLabelStyles()}>Remaining Minutes</p>
            <p style={getSleepMetricValueStyles()}>{String(sleepMetrics.remainingMinutes)}</p>
          </div>
        </div>

        <ul style={getSleepListStyles()}>
          {sleepMetrics.wakeTargets.map((target) => (
            <li key={target.cycleCount} style={getSleepListItemStyles()}>
              {`${target.cycleCount} cycles target wake: ${target.wakeAt}`}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  if (windowMode) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default Sleep;
