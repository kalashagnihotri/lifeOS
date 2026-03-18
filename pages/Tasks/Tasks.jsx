import MainLayout from "../../layouts/MainLayout/MainLayout";
import TaskForm from "../../features/tasks/components/TaskForm";
import TaskList from "../../features/tasks/components/TaskList";
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

const Tasks = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <MainLayout>
      <section style={getTasksPageStyles()}>
        <h1 style={getTasksHeaderStyles()}>Tasks</h1>
        <p style={getTasksSubHeaderStyles()}>
          Track your daily work with simple, focused task management.
        </p>

        <div style={getTaskSectionStyles()}>
          <h2 style={getTaskHeadingStyles()}>My Task List</h2>
          <TaskForm onAddTask={addTask} />
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </section>
    </MainLayout>
  );
};

export default Tasks;
