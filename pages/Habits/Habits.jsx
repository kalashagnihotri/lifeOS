import MainLayout from "../../layouts/MainLayout/MainLayout";
import HabitForm from "../../features/habits/components/HabitForm";
import HabitList from "../../features/habits/components/HabitList";
import useHabits from "../../features/habits/hooks/useHabits";
import {
  getHabitHeadingStyles,
  getHabitSectionStyles,
} from "../../features/habits/components/habit.styles";
import {
  getHabitsHeaderStyles,
  getHabitsPageStyles,
  getHabitsSubHeaderStyles,
} from "./habits.styles";

const Habits = ({ windowMode = false }) => {
  const { habits, addHabit, toggleHabitForToday, deleteHabit } = useHabits();

  const content = (
    <section style={getHabitsPageStyles()}>
      <h1 style={getHabitsHeaderStyles()}>Habits</h1>
      <p style={getHabitsSubHeaderStyles()}>
        Build consistency with daily completions and visible streak momentum.
      </p>

      <div style={getHabitSectionStyles()}>
        <h2 style={getHabitHeadingStyles()}>My Habits</h2>
        <HabitForm onAddHabit={addHabit} />
        <HabitList habits={habits} onToggle={toggleHabitForToday} onDelete={deleteHabit} />
      </div>
    </section>
  );

  if (windowMode) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default Habits;
