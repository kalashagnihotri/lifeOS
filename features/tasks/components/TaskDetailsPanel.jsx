import { useEffect, useMemo, useState } from "react";
import {
  getTaskDetailsFieldWrapStyles,
  getTaskDetailsHintStyles,
  getTaskDetailsInputStyles,
  getTaskDetailsLabelStyles,
  getTaskDetailsOverlayStyles,
  getTaskDetailsPanelStyles,
  getTaskDetailsTitleStyles,
} from "./taskDetails.styles";

const mapTaskToDraft = (task) => ({
  title: task?.title || "",
  priority: task?.priority || "medium",
  dueDate: task?.dueDate || "",
});

const TaskDetailsPanel = ({ task, isOpen, onClose, onUpdateTask }) => {
  const [draft, setDraft] = useState(mapTaskToDraft(task));

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const hasChanges = useMemo(() => {
    if (!task) {
      return false;
    }

    return (
      String(task.title || "") !== String(draft.title || "") ||
      String(task.priority || "medium") !== String(draft.priority || "medium") ||
      String(task.dueDate || "") !== String(draft.dueDate || "")
    );
  }, [draft.dueDate, draft.priority, draft.title, task]);

  useEffect(() => {
    if (!isOpen || !task || !hasChanges || typeof onUpdateTask !== "function") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onUpdateTask(task.id, {
        title: draft.title,
        priority: draft.priority,
        dueDate: draft.dueDate || null,
      });
    }, 220);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [draft.dueDate, draft.priority, draft.title, hasChanges, isOpen, onUpdateTask, task]);

  return (
    <div style={getTaskDetailsOverlayStyles({ isOpen })} onMouseDown={onClose}>
      <aside style={getTaskDetailsPanelStyles({ isOpen })} onMouseDown={(event) => event.stopPropagation()}>
        <h3 style={getTaskDetailsTitleStyles()}>Task Details</h3>

        {!task ? (
          <p style={getTaskDetailsHintStyles()}>Select a task to view details.</p>
        ) : (
          <>
            <div style={getTaskDetailsFieldWrapStyles()}>
              <p style={getTaskDetailsLabelStyles()}>Title</p>
              <input
                value={draft.title}
                onChange={(event) => setDraft((previous) => ({ ...previous, title: event.target.value }))}
                style={getTaskDetailsInputStyles()}
                placeholder="Task title"
              />
            </div>

            <div style={getTaskDetailsFieldWrapStyles()}>
              <p style={getTaskDetailsLabelStyles()}>Priority</p>
              <select
                value={draft.priority}
                onChange={(event) => setDraft((previous) => ({ ...previous, priority: event.target.value }))}
                style={getTaskDetailsInputStyles()}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div style={getTaskDetailsFieldWrapStyles()}>
              <p style={getTaskDetailsLabelStyles()}>Due Date</p>
              <input
                type="date"
                value={draft.dueDate}
                onChange={(event) => setDraft((previous) => ({ ...previous, dueDate: event.target.value }))}
                style={getTaskDetailsInputStyles()}
              />
            </div>

            <p style={getTaskDetailsHintStyles()}>Changes are saved automatically.</p>
          </>
        )}
      </aside>
    </div>
  );
};

export default TaskDetailsPanel;
