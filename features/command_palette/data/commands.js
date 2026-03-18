const OPEN_TASK_COMPOSER_EVENT = "lifeos:open-task-composer";
const OPEN_TASK_COMPOSER_FLAG = "lifeos.pendingOpenTaskComposer";
const START_FOCUS_EVENT = "lifeos:start-focus-session";
const START_FOCUS_FLAG = "lifeos.pendingStartFocusSession";

const navigateTo = (route) => {
  if (window.location.hash !== route) {
    window.location.hash = route;
  }
};

const openTaskComposer = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(OPEN_TASK_COMPOSER_FLAG, String(Date.now()));
  navigateTo("#/tasks");

  window.setTimeout(() => {
    window.dispatchEvent(new Event(OPEN_TASK_COMPOSER_EVENT));
  }, 40);
};

const startFocusSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(START_FOCUS_FLAG, String(Date.now()));
  navigateTo("#/focus");

  window.setTimeout(() => {
    window.dispatchEvent(new Event(START_FOCUS_EVENT));
  }, 40);
};

export const createCommands = ({ onAddTask } = {}) => {
  return [
    {
      id: "go-dashboard",
      title: "Go to Dashboard",
      description: "Open productivity overview",
      action: () => navigateTo("#/dashboard"),
    },
    {
      id: "go-tasks",
      title: "Go to Tasks",
      description: "Open task management workspace",
      action: () => navigateTo("#/tasks"),
    },
    {
      id: "go-habits",
      title: "Go to Habits",
      description: "Open habit tracker",
      action: () => navigateTo("#/habits"),
    },
    {
      id: "start-focus",
      title: "Start Focus",
      description: "Jump to Focus and start a focus session",
      action: startFocusSession,
    },
    {
      id: "add-task",
      title: "Add Task",
      description: "Open quick add task input",
      action: () => {
        if (typeof onAddTask === "function") {
          onAddTask();
          return;
        }

        openTaskComposer();
      },
    },
  ];
};
