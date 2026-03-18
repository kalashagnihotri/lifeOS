import {
  getTaskFilterButtonStyles,
  getTaskFilterGroupStyles,
  getTaskSearchInputStyles,
  getTaskToolbarStyles,
} from "./task.styles";

const filters = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "pending", label: "Pending" },
];

const TaskToolbar = ({ filter, onFilterChange, searchQuery, onSearchChange }) => {
  return (
    <div style={getTaskToolbarStyles()}>
      <div style={getTaskFilterGroupStyles()}>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            style={getTaskFilterButtonStyles({ isActive: filter === item.id })}
            onClick={() => onFilterChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <input
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tasks"
        style={getTaskSearchInputStyles()}
      />
    </div>
  );
};

export default TaskToolbar;
