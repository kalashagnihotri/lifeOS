import { useEffect, useState } from "react";
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

const PAGE_BY_HASH = {
  "#/dashboard": Dashboard,
  "#/tasks": Tasks,
  "#/habits": Habits,
  "#/focus": Focus,
  "#/insights": Insights,
};

const resolvePageFromHash = (hash) => {
  return PAGE_BY_HASH[hash] || Dashboard;
};

function App() {
  const [CurrentPage, setCurrentPage] = useState(() => resolvePageFromHash(window.location.hash));
  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "#/dashboard";
    }

    const handleHashChange = () => {
      setCurrentPage(() => resolvePageFromHash(window.location.hash));
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (!user) {
    return (
      <section style={getLoginScreenStyles()}>
        <div style={getLoginCardStyles()}>
          <h1 style={getLoginTitleStyles()}>LifeOS</h1>
          <p style={getLoginSubtitleStyles()}>
            Sign in to sync your productivity system across your personal workspace.
          </p>
          <LoginButton onClick={login} />
        </div>
      </section>
    );
  }

  return (
    <>
      <div style={getTopBarStyles()}>
        <p style={getUserBadgeStyles()}>{user.displayName || user.email}</p>
        <Button label="Sign Out" onClick={logout} variant="secondary" size="small" />
      </div>
      <CurrentPage />
    </>
  );
}

export default App;
