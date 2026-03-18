import { useEffect, useState } from "react";
import { addTask } from "../../tasks/services/taskService";
import { notify } from "../../../shared/utils/notify";

const isTypingTarget = (target) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = String(target.tagName || "").toLowerCase();
  return target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select";
};

const useQuickAdd = ({ enabled = true } = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openQuickAdd = () => {
    setIsOpen(true);
  };

  const closeQuickAdd = () => {
    setIsOpen(false);
    setInputValue("");
  };

  const submitTask = async () => {
    const normalizedTitle = inputValue.trim();

    if (!normalizedTitle) {
      notify({
        title: "Quick add",
        message: "Enter a task title first.",
        type: "warning",
      });
      return false;
    }

    try {
      await addTask({
        title: normalizedTitle,
        priority: "medium",
        dueDate: null,
      });

      notify({
        title: "Task added",
        message: `Added "${normalizedTitle}".`,
        type: "success",
      });
      closeQuickAdd();
      return true;
    } catch {
      notify({
        title: "Quick add failed",
        message: "Could not add task.",
        type: "error",
      });
      return false;
    }
  };

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.repeat || isTypingTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (String(event.key || "").toLowerCase() === "n") {
        event.preventDefault();
        openQuickAdd();
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closeQuickAdd();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, isOpen]);

  return {
    isOpen,
    inputValue,
    openQuickAdd,
    closeQuickAdd,
    setInputValue,
    submitTask,
  };
};

export default useQuickAdd;
