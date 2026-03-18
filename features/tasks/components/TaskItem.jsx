import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import {
  getTaskCheckboxStyles,
  getTaskDeleteButtonStyles,
  getTaskDragHandleStyles,
  getTaskDueDateStyles,
  getTaskItemStyles,
  getTaskMetaRowStyles,
  getTaskMainStyles,
  getTaskPriorityBadgeStyles,
  getTaskTitleBlockStyles,
  getTaskTitleStyles,
} from "./task.styles";

const formatDueDate = (dueDate) => {
  if (!dueDate) {
    return "No due date";
  }

  return new Date(`${dueDate}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TaskItem = ({ task, onToggle, onDelete, onSelect }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isHandleHovered, setIsHandleHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const removeTimeoutRef = useRef(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => {
      cancelAnimationFrame(frameId);

      if (removeTimeoutRef.current) {
        window.clearTimeout(removeTimeoutRef.current);
      }
    };
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const isOverdue = Boolean(task.dueDate && !task.completed && task.dueDate < today);

  const handleDelete = () => {
    setIsRemoving(true);
    removeTimeoutRef.current = window.setTimeout(() => {
      onDelete(task.id);
    }, 220);
  };

  return (
    <li
      ref={setNodeRef}
      style={getTaskItemStyles({
        isHovered: isItemHovered,
        completed: task.completed,
        isMounted,
        isRemoving,
        isDragging,
        dragTransform: CSS.Transform.toString(transform),
        dragTransition: transition,
      })}
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
      onClick={() => onSelect?.(task.id)}
    >
      <button
        type="button"
        aria-label="Drag to reorder task"
        style={getTaskDragHandleStyles({ isDragging, isHovered: isHandleHovered })}
        onMouseEnter={() => setIsHandleHovered(true)}
        onMouseLeave={() => setIsHandleHovered(false)}
        onClick={(event) => event.stopPropagation()}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} strokeWidth={2.2} />
      </button>

      <div style={getTaskMainStyles()}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          onClick={(event) => event.stopPropagation()}
          style={getTaskCheckboxStyles()}
        />

        <div style={getTaskTitleBlockStyles()}>
          <p style={getTaskTitleStyles({ completed: task.completed })}>{task.title}</p>
          <div style={getTaskMetaRowStyles()}>
            <span style={getTaskPriorityBadgeStyles({ priority: task.priority })}>{task.priority}</span>
            <span style={getTaskDueDateStyles({ isOverdue, completed: task.completed })}>
              {isOverdue ? "Overdue" : "Due"}: {formatDueDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        style={getTaskDeleteButtonStyles({
          isHovered: isDeleteHovered,
          isVisible: isItemHovered,
        })}
        onMouseDown={(event) => event.stopPropagation()}
        onMouseEnter={() => setIsDeleteHovered(true)}
        onMouseLeave={() => setIsDeleteHovered(false)}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
