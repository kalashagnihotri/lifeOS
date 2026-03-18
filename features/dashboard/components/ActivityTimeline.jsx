import { useMemo } from "react";
import { CheckCircle2, Timer } from "lucide-react";
import Card from "../../../shared/components/Card/Card";
import {
  getTimelineContainerStyles,
  getTimelineContentStyles,
  getTimelineDayGroupStyles,
  getTimelineDayLabelStyles,
  getTimelineEmptyStyles,
  getTimelineIconWrapStyles,
  getTimelineItemStyles,
  getTimelineLineStyles,
  getTimelineListStyles,
  getTimelineMessageStyles,
  getTimelineRailStyles,
  getTimelineScrollStyles,
  getTimelineTimestampStyles,
  getTimelineTitleStyles,
} from "./activityTimeline.styles";

const padNumber = (value) => String(value).padStart(2, "0");

const getLocalDayKey = (dateValue) => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
};

const getTodayLocalKey = () => getLocalDayKey(new Date());

const getYesterdayLocalKey = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return getLocalDayKey(yesterday);
};

const formatDayLabel = (dayKey) => {
  const todayKey = getTodayLocalKey();
  const yesterdayKey = getYesterdayLocalKey();

  if (dayKey === todayKey) {
    return "Today";
  }

  if (dayKey === yesterdayKey) {
    return "Yesterday";
  }

  return new Date(`${dayKey}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getFocusMessage = (session) => {
  const minutes = Number(session?.duration) || 0;
  return `Completed a focus session (${minutes} min)`;
};

const buildTimelineItems = ({ tasks, sessions }) => {
  const taskItems = tasks
    .filter((task) => task.completed)
    .map((task) => {
      const timestamp = task.completedAt || task.createdAt;

      if (!timestamp) {
        return null;
      }

      return {
        id: `task-${task.id}-${timestamp}`,
        type: "task",
        message: `Completed task: ${task.title}`,
        timestamp,
      };
    })
    .filter(Boolean);

  const focusItems = sessions
    .filter((session) => session.completedAt)
    .map((session) => ({
      id: `focus-${session.id}`,
      type: "focus",
      message: getFocusMessage(session),
      timestamp: session.completedAt,
    }));

  return [...taskItems, ...focusItems]
    .sort((firstItem, secondItem) => {
      return new Date(secondItem.timestamp).getTime() - new Date(firstItem.timestamp).getTime();
    });
};

const ActivityIcon = ({ type }) => {
  if (type === "task") {
    return <CheckCircle2 size={12} strokeWidth={2.2} />;
  }

  return <Timer size={12} strokeWidth={2.2} />;
};

const ActivityTimeline = ({ tasks = [], sessions = [] }) => {
  const timelineItems = useMemo(() => {
    return buildTimelineItems({ tasks, sessions });
  }, [tasks, sessions]);

  const timelineByDay = useMemo(() => {
    return timelineItems.reduce((accumulator, item) => {
      const dayKey = getLocalDayKey(item.timestamp);

      if (!dayKey) {
        return accumulator;
      }

      if (!accumulator[dayKey]) {
        accumulator[dayKey] = [];
      }

      accumulator[dayKey].push(item);
      return accumulator;
    }, {});
  }, [timelineItems]);

  const dayKeys = useMemo(() => {
    return Object.keys(timelineByDay).sort((firstKey, secondKey) => {
      return new Date(secondKey).getTime() - new Date(firstKey).getTime();
    });
  }, [timelineByDay]);

  return (
    <Card padding="lg" elevation={1}>
      <div style={getTimelineContainerStyles()}>
        <h3 style={getTimelineTitleStyles()}>Activity Timeline</h3>

        {!dayKeys.length ? (
          <p style={getTimelineEmptyStyles()}>No activity yet. Complete a task or focus session to begin your journey.</p>
        ) : (
          <div style={getTimelineScrollStyles()}>
            {dayKeys.map((dayKey) => {
              const items = timelineByDay[dayKey];

              return (
                <div key={dayKey} style={getTimelineDayGroupStyles()}>
                  <p style={getTimelineDayLabelStyles()}>{formatDayLabel(dayKey)}</p>
                  <ul style={getTimelineListStyles()}>
                    {items.map((item, index) => (
                      <li key={item.id} style={getTimelineItemStyles()}>
                        <div style={getTimelineRailStyles()}>
                          {index !== items.length - 1 ? <span style={getTimelineLineStyles()} /> : null}
                          <span style={getTimelineIconWrapStyles({ tone: item.type })}>
                            <ActivityIcon type={item.type} />
                          </span>
                        </div>

                        <div style={getTimelineContentStyles()}>
                          <p style={getTimelineMessageStyles()}>{item.message}</p>
                          <p style={getTimelineTimestampStyles()}>{formatTimestamp(item.timestamp)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActivityTimeline;
