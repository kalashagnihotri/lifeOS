import MainLayout from "../../layouts/MainLayout/MainLayout";
import StatCard from "../../features/dashboard/components/StatCard";
import ProductivityChart from "../../features/dashboard/components/ProductivityChart";
import TaskSummary from "../../features/dashboard/components/TaskSummary";
import {
  getDashboardPageStyles,
  getDashboardSectionStyles,
  getDashboardTitleStyles,
  getStatGridStyles,
} from "./dashboard.styles";

const stats = [
  {
    title: "Tasks Completed",
    value: 18,
    description: "This week",
  },
  {
    title: "Focus Time",
    value: "12h 40m",
    description: "Last 7 days",
  },
  {
    title: "Habit Streak",
    value: "9 days",
    description: "Current streak",
  },
  {
    title: "Mood",
    value: "Calm",
    description: "Based on recent check-ins",
  },
];

const Dashboard = () => {
  return (
    <MainLayout>
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
          <ProductivityChart />
        </section>

        <section style={getDashboardSectionStyles()}>
          <TaskSummary />
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
