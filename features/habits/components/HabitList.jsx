import HabitItem from "./HabitItem";
import { getHabitEmptyStateStyles, getHabitListStyles } from "./habit.styles";

const HabitList = ({ habits, onToggle, onDelete }) => {
  if (!habits.length) {
    return (
      <p style={getHabitEmptyStateStyles()}>
        No habits yet. Add one and start building your streak.
      </p>
    );
  }

  return (
    <ul style={getHabitListStyles()}>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default HabitList;
