import { useMemo, useState } from "react";
import { DndContext, DragOverlay, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import TaskItem from "./TaskItem";
import {
  getEmptyStateStyles,
  getTaskDragOverlayBadgeStyles,
  getTaskDragOverlayStyles,
  getTaskDragOverlayTitleStyles,
  getTaskDropZoneStyles,
  getTaskGroupCountStyles,
  getTaskGroupHeaderStyles,
  getTaskGroupShellStyles,
  getTaskGroupTitleStyles,
  getTaskListStyles,
} from "./task.styles";

const groups = [
  { id: "today", label: "Today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
];

const TaskList = ({ groupedTasks, onToggle, onDelete, onReorder, onSelectTask }) => {
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [overTaskId, setOverTaskId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

  const allTasks = useMemo(() => groups.flatMap((group) => groupedTasks[group.id] || []), [groupedTasks]);
  const activeTask = useMemo(
    () => allTasks.find((task) => task.id === activeTaskId) || null,
    [activeTaskId, allTasks]
  );

  const totalTasks = groups.reduce((sum, group) => {
    return sum + (groupedTasks[group.id]?.length || 0);
  }, 0);

  if (!totalTasks) {
    return <p style={getEmptyStateStyles()}>No tasks yet. Add something meaningful ✨</p>;
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveTaskId(null);
    setOverTaskId(null);

    if (!active?.id || !over?.id || active.id === over.id) {
      return;
    }

    if (typeof onReorder === "function") {
      onReorder(String(active.id), String(over.id));
    }
  };

  const handleDragStart = (event) => {
    setActiveTaskId(String(event?.active?.id || ""));
  };

  const handleDragOver = (event) => {
    setOverTaskId(event?.over?.id ? String(event.over.id) : null);
  };

  const handleDragCancel = () => {
    setActiveTaskId(null);
    setOverTaskId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <div style={getTaskGroupShellStyles()}>
        {groups.map((group) => {
          const tasks = groupedTasks[group.id] || [];

          if (!tasks.length) {
            return null;
          }

          return (
            <section key={group.id}>
              <header style={getTaskGroupHeaderStyles()}>
                <h3 style={getTaskGroupTitleStyles()}>{group.label}</h3>
                <span style={getTaskGroupCountStyles()}>{tasks.length}</span>
              </header>

              <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                <div
                  style={getTaskDropZoneStyles({
                    isDragActive: Boolean(activeTaskId),
                    isReceivingDrop: tasks.some((task) => task.id === overTaskId),
                  })}
                >
                  <ul style={getTaskListStyles()}>
                    {tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onSelect={onSelectTask}
                      />
                    ))}
                  </ul>
                </div>
              </SortableContext>
            </section>
          );
        })}
      </div>

      <DragOverlay dropAnimation={{ duration: 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
        {activeTask ? (
          <div style={getTaskDragOverlayStyles()}>
            <GripVertical size={16} strokeWidth={2.1} />
            <p style={getTaskDragOverlayTitleStyles()}>{activeTask.title}</p>
            <span style={getTaskDragOverlayBadgeStyles({ priority: activeTask.priority })}>
              {activeTask.priority}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskList;
