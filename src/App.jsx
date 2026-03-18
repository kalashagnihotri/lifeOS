import { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { Brain, CheckSquare, Flame, LayoutDashboard, Timer } from "lucide-react";
import Dashboard from "../pages/Dashboard/Dashboard";
import Tasks from "../pages/Tasks/Tasks";
import Habits from "../pages/Habits/Habits";
import Focus from "../pages/Focus/Focus";
import Insights from "../pages/Insights/Insights";
import LoginButton from "../features/auth/components/LoginButton";
import useAuth from "../features/auth/hooks/useAuth";
import {
  getLoginCardStyles,
  getLoginScreenStyles,
  getLoginSubtitleStyles,
  getLoginTitleStyles,
  getTopBarStyles,
  getUserBadgeStyles,
} from "../features/auth/components/auth.styles";
import Button from "../shared/components/Button/Button";
import ToastContainer from "../shared/components/Toast/ToastContainer";
import CommandPalette from "../features/command_palette/components/CommandPalette";
import useCommandPalette from "../features/command_palette/hooks/useCommandPalette";
import { createCommands } from "../features/command_palette/data/commands";
import QuickAdd from "../features/quick_add/components/QuickAdd";
import useQuickAdd from "../features/quick_add/hooks/useQuickAdd";
import Desktop from "../features/desktop/components/Desktop";
import Window from "../features/window_manager/components/Window";
import useWindowManager from "../features/window_manager/hooks/useWindowManager";

const APP_REGISTRY = {
  dashboard: {
    id: "dashboard",
    title: "Dashboard",
    label: "Dashboard",
    hash: "#/dashboard",
    icon: LayoutDashboard,
    component: Dashboard,
  },
  tasks: {
    id: "tasks",
    title: "Tasks",
    label: "Tasks",
    hash: "#/tasks",
    icon: CheckSquare,
    component: Tasks,
  },
  habits: {
    id: "habits",
    title: "Habits",
    label: "Habits",
    hash: "#/habits",
    icon: Flame,
    component: Habits,
  },
  focus: {
    id: "focus",
    title: "Focus",
    label: "Focus",
    hash: "#/focus",
    icon: Timer,
    component: Focus,
  },
  insights: {
    id: "insights",
    title: "Insights",
    label: "Insights",
    hash: "#/insights",
    icon: Brain,
    component: Insights,
  },
};

const APP_BY_HASH = {
  "#/dashboard": APP_REGISTRY.dashboard,
  "#/tasks": APP_REGISTRY.tasks,
  "#/habits": APP_REGISTRY.habits,
  "#/focus": APP_REGISTRY.focus,
  "#/insights": APP_REGISTRY.insights,
};

const DESKTOP_HASH = "#/desktop";

const DESKTOP_APPS = [
  APP_REGISTRY.dashboard,
  APP_REGISTRY.tasks,
  APP_REGISTRY.habits,
  APP_REGISTRY.focus,
  APP_REGISTRY.insights,
];

const resolveAppFromHash = (hash) => {
  return APP_BY_HASH[hash] || APP_REGISTRY.dashboard;
};

function App() {
  const { user, login, logout } = useAuth();
  const {
    openWindows,
    activeWindow,
    openWindow,
    closeWindow,
    closeAllWindows,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    startDrag,
    startResize,
  } = useWindowManager();
  const {
    isOpen: isQuickAddOpen,
    inputValue,
    openQuickAdd,
    closeQuickAdd,
    setInputValue,
    submitTask,
  } = useQuickAdd({ enabled: Boolean(user) });

  const commands = useMemo(() => createCommands({ onAddTask: openQuickAdd }), [openQuickAdd]);
  const {
    isOpen: isPaletteOpen,
    searchQuery,
    selectedIndex,
    closePalette,
    setSearchQuery,
    setSelectedIndex,
    filteredCommands,
  } = useCommandPalette({ commands, enabled: Boolean(user) });

  const openAppWindow = useCallback((appId) => {
    const app = APP_REGISTRY[appId];

    if (!app) {
      return;
    }

    // openWindow handles both new and existing windows by id.
    openWindow(app.component, app.title, { id: app.id });

    if (window.location.hash !== app.hash) {
      window.location.hash = app.hash;
    }
  }, [openWindow]);

  const dockWindows = useMemo(() => {
    return openWindows
      .map((windowItem) => {
        const matchingApp = Object.values(APP_REGISTRY).find((app) => app.id === windowItem.id);

        return {
          id: windowItem.id,
          title: windowItem.title,
          icon: matchingApp?.icon,
          isMinimized: windowItem.isMinimized,
          isActive: activeWindow === windowItem.id,
        };
      });
  }, [activeWindow, openWindows]);

  const activateDockWindow = useCallback(
    (windowId) => {
      const targetWindow = openWindows.find((windowItem) => windowItem.id === windowId);

      if (!targetWindow) {
        return;
      }

      if (targetWindow.isMinimized) {
        restoreWindow(windowId);
        return;
      }

      focusWindow(windowId);
    },
    [focusWindow, openWindows, restoreWindow]
  );

  const handleCloseAllWindows = useCallback(() => {
    closeAllWindows();

    if (window.location.hash !== DESKTOP_HASH) {
      window.location.hash = DESKTOP_HASH;
    }
  }, [closeAllWindows]);

  useEffect(() => {
    if (!window.location.hash || !APP_BY_HASH[window.location.hash]) {
      window.location.hash = "#/dashboard";
    }

    const handleHashChange = () => {
      if (window.location.hash === DESKTOP_HASH) {
        return;
      }

      if (!APP_BY_HASH[window.location.hash]) {
        window.location.hash = "#/dashboard";
        return;
      }

      const app = resolveAppFromHash(window.location.hash);
      openAppWindow(app.id);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [openAppWindow]);

  if (!user) {
    return (
      <>
        <section style={getLoginScreenStyles()}>
          <div style={getLoginCardStyles()}>
            <h1 style={getLoginTitleStyles()}>LifeOS</h1>
            <p style={getLoginSubtitleStyles()}>
              Sign in to sync your productivity system across your personal workspace.
            </p>
            <LoginButton onClick={login} />
          </div>
        </section>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div style={getTopBarStyles()}>
        <p style={getUserBadgeStyles()}>{user.displayName || user.email}</p>
        <Button label="Sign Out" onClick={logout} variant="secondary" size="small" />
      </div>

      <Desktop
        apps={DESKTOP_APPS}
        dockWindows={dockWindows}
        onOpenApp={openAppWindow}
        onActivateDockWindow={activateDockWindow}
        onRestoreWindow={restoreWindow}
        onCloseDockWindow={closeWindow}
        onCloseAllWindows={handleCloseAllWindows}
      >
        {openWindows.filter((windowItem) => !windowItem.isMinimized || windowItem.isMinimizing).map((windowItem) => {
          const WindowComponent = windowItem.component;

          return (
            <Window
              key={windowItem.id}
              id={windowItem.id}
              title={windowItem.title}
              position={windowItem.position}
              size={windowItem.size}
              zIndex={windowItem.zIndex}
              isMinimized={windowItem.isMinimized}
              isMinimizing={windowItem.isMinimizing}
              isRestoring={windowItem.isRestoring}
              isDragging={windowItem.isDragging}
              isResizing={windowItem.isResizing}
              isMaximized={windowItem.isMaximized}
              snapPreview={windowItem.snapPreview}
              isActive={activeWindow === windowItem.id}
              onActivate={focusWindow}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onStartDrag={startDrag}
              onStartResize={startResize}
            >
              {WindowComponent ? <WindowComponent windowMode /> : null}
            </Window>
          );
        })}
      </Desktop>

      <CommandPalette
        isOpen={isPaletteOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCommands={filteredCommands}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onClose={closePalette}
      />
      <QuickAdd
        isOpen={isQuickAddOpen}
        inputValue={inputValue}
        setInputValue={setInputValue}
        closeQuickAdd={closeQuickAdd}
        submitTask={submitTask}
      />
      <ToastContainer />
    </>
  );
}

export default App;
