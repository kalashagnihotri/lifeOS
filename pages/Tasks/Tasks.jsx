import MainLayout from "../../layouts/MainLayout/MainLayout";
import TaskForm from "../../features/tasks/components/TaskForm";
import TaskList from "../../features/tasks/components/TaskList";
import TaskToolbar from "../../features/tasks/components/TaskToolbar";
import TaskDetailsPanel from "../../features/tasks/components/TaskDetailsPanel";
import useTasks from "../../features/tasks/hooks/useTasks";
import {
  getTasksHeaderStyles,
  getTasksPageStyles,
  getTasksSubHeaderStyles,
} from "./tasks.styles";
import {
  getTaskHeadingStyles,
  getTaskSectionStyles,
} from "../../features/tasks/components/task.styles";

const Tasks = ({ windowMode = false }) => {
  const {
    groupedTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    selectedTask,
    isPanelOpen,
    openTaskPanel,
    closeTaskPanel,
    updateTask,
  } = useTasks();

  const content = (
    <section style={getTasksPageStyles()}>
      <h1 style={getTasksHeaderStyles()}>Tasks</h1>
      <p style={getTasksSubHeaderStyles()}>
        Track your daily work with simple, focused task management.
      </p>

      <div style={getTaskSectionStyles()}>
        <h2 style={getTaskHeadingStyles()}>My Task List</h2>
        <TaskForm onAddTask={addTask} />
        <TaskToolbar
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <TaskList
          groupedTasks={groupedTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onReorder={reorderTasks}
          onSelectTask={openTaskPanel}
        />
      </div>

      <TaskDetailsPanel
        key={selectedTask?.id || "task-details-panel"}
        task={selectedTask}
        isOpen={isPanelOpen}
        onClose={closeTaskPanel}
        onUpdateTask={updateTask}
      />
    </section>
  );

  if (windowMode) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default Tasks;
