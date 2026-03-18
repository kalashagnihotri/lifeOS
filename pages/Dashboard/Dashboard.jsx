import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import StatCard from "../../features/dashboard/components/StatCard";
import ProductivityChart from "../../features/dashboard/components/ProductivityChart";
import TaskSummary from "../../features/dashboard/components/TaskSummary";
import ActivityTimeline from "../../features/dashboard/components/ActivityTimeline";
import DailyScoreCard from "../../features/analytics/components/DailyScoreCard";
import { getTasks } from "../../features/tasks/services/taskService";
import { getHabits } from "../../features/habits/services/habitService";
import { calculateStreak } from "../../features/habits/utils/habitUtils";
import { getSessions } from "../../features/focus/services/focusService";
import {
  getDashboardPageStyles,
  getDashboardSectionStyles,
  getDashboardTitleStyles,
  getStatGridStyles,
} from "./dashboard.styles";

const formatFocusTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  return `${hours}h ${String(mins).padStart(2, "0")}m`;
};

const Dashboard = ({ windowMode = false }) => {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    let isActive = true;

    const loadDashboardData = async () => {
      const [loadedTasks, loadedHabits, loadedSessions] = await Promise.all([
        getTasks(),
        getHabits(),
        getSessions(),
      ]);

      if (!isActive) {
        return;
      }

      setTasks(loadedTasks);
      setHabits(loadedHabits);
      setSessions(loadedSessions);
    };

    loadDashboardData();

    return () => {
      isActive = false;
    };
  }, []);

  const stats = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = tasks.length - completedTasks;
    const totalFocusMinutes = sessions.reduce((total, session) => total + (Number(session.duration) || 0), 0);
    const topStreak = habits.reduce((highestStreak, habit) => {
      return Math.max(highestStreak, calculateStreak(habit));
    }, 0);

    return [
      {
        title: "Tasks Completed",
        value: completedTasks,
        description: `${pendingTasks} pending`,
      },
      {
        title: "Focus Time",
        value: formatFocusTime(totalFocusMinutes),
        description: `${sessions.length} sessions logged`,
      },
      {
        title: "Top Habit Streak",
        value: `${topStreak} day${topStreak === 1 ? "" : "s"}`,
        description: habits.length ? "Best active streak" : "No habits yet",
      },
      {
        title: "Total Habits",
        value: habits.length,
        description: "Tracked habits",
      },
    ];
  }, [tasks, sessions, habits]);

  const content = (
    <div style={getDashboardPageStyles()}>
      <section style={getDashboardSectionStyles()}>
        <h2 style={getDashboardTitleStyles()}>Overview</h2>
        <div style={getStatGridStyles()}>
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
            />
          ))}
        </div>
      </section>

      <section style={getDashboardSectionStyles()}>
        <ProductivityChart sessions={sessions} />
      </section>

      <section style={getDashboardSectionStyles()}>
        <DailyScoreCard tasks={tasks} habits={habits} sessions={sessions} />
      </section>

      <section style={getDashboardSectionStyles()}>
        <TaskSummary tasks={tasks} />
      </section>

      <section style={getDashboardSectionStyles()}>
        <ActivityTimeline tasks={tasks} habits={habits} sessions={sessions} />
      </section>
    </div>
  );

  if (windowMode) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default Dashboard;
