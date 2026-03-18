import {
  getHeaderAccentStyles,
  getHeaderBottomGlowStyles,
  getHeaderStyles,
  getHeaderBrandStyles,
  getHeaderRightStyles,
} from "./header.styles";
import { ChartColumn } from "lucide-react";
import Button from "../../shared/components/Button/Button";
import { notify } from "../../shared/utils/notify";

const OPEN_TASK_COMPOSER_EVENT = "lifeos:open-task-composer";
const OPEN_TASK_COMPOSER_FLAG = "lifeos.pendingOpenTaskComposer";

const Header = ({ isCompact = false }) => {
  const handleAddTaskClick = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(OPEN_TASK_COMPOSER_FLAG, String(Date.now()));
    }

    if (window.location.hash !== "#/tasks") {
      window.location.hash = "#/tasks";
    }

    window.setTimeout(() => {
      window.dispatchEvent(new Event(OPEN_TASK_COMPOSER_EVENT));
      notify({
        title: "Quick add",
        message: "Task composer is ready.",
        type: "info",
        duration: 1800,
      });
    }, 50);
  };

  return (
    <header style={getHeaderStyles({ isCompact })}>
      <span style={getHeaderAccentStyles()} />
      <h1 style={getHeaderBrandStyles({ isCompact })}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ChartColumn size={18} strokeWidth={2.2} />
          LifeOS
        </span>
      </h1>
      <div style={getHeaderRightStyles({ isCompact })}>
        <Button
          label={isCompact ? "+ Add" : "+ Add Task"}
          variant="primary"
          size="small"
          onClick={handleAddTaskClick}
        />
      </div>
      <span style={getHeaderBottomGlowStyles()} />
    </header>
  );
};

export default Header;
