import AppIcon from "./AppIcon";
import NoteCard from "../../notes/components/NoteCard";
import {
  getAppIconPositionStyles,
  getDesktopDockCloseAllStyles,
  getDesktopDockContextActionStyles,
  getDesktopDockContextMenuStyles,
  getDesktopDockIndicatorStyles,
  getDesktopDockItemInnerStyles,
  getDesktopDockItemStyles,
  getDesktopDockStyles,
  getDesktopIconGridStyles,
  getDesktopRootStyles,
  getDesktopSurfaceStyles,
} from "./desktop.styles";
import {
  getNoteMinimizedIconStyles,
  getNotesLayerStyles,
  STICKY_NOTE_PALETTE,
} from "../../notes/components/notes.styles";
import { useCallback, useEffect, useRef, useState } from "react";

const ICON_WIDTH = 92;
const ICON_HEIGHT = 84;
const ICON_MARGIN_LEFT = 28;
const ICON_MARGIN_TOP = 34;
const ICON_GAP = 12;
const ICONS_PER_COLUMN = 5;
const ICON_POSITION_STORAGE_KEY = "lifeos.desktop.iconPositions";
const NOTE_DEFAULT_SIZE = { width: 260, height: 220 };
const NOTE_MIN_SIZE = { width: 200, height: 150 };
const NOTE_DEFAULT_POSITION = { x: 120, y: 120 };

const createStackId = () => {
  return `stack-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

const isOverlapping = (firstRect, secondRect) => {
  return !(
    firstRect.right < secondRect.left
    || firstRect.left > secondRect.right
    || firstRect.bottom < secondRect.top
    || firstRect.top > secondRect.bottom
  );
};

const isTypingTarget = (target) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = String(target.tagName || "").toLowerCase();
  return target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select";
};

const clampNoteSize = (size) => {
  return {
    width: Math.max(NOTE_MIN_SIZE.width, Math.round(size.width)),
    height: Math.max(NOTE_MIN_SIZE.height, Math.round(size.height)),
  };
};

const clampNotePosition = (position, size) => {
  const minX = 12;
  const minY = 12;
  const maxX = Math.max(minX, window.innerWidth - size.width - 12);
  const maxY = Math.max(minY, window.innerHeight - size.height - 12);

  return {
    x: Math.min(maxX, Math.max(minX, Math.round(position.x))),
    y: Math.min(maxY, Math.max(minY, Math.round(position.y))),
  };
};

const getDefaultIconPosition = (index) => {
  const column = Math.floor(index / ICONS_PER_COLUMN);
  const row = index % ICONS_PER_COLUMN;

  return {
    x: ICON_MARGIN_LEFT + column * (ICON_WIDTH + ICON_GAP),
    y: ICON_MARGIN_TOP + row * (ICON_HEIGHT + ICON_GAP),
  };
};

const clampIconPosition = (position) => {
  const maxX = Math.max(ICON_MARGIN_LEFT, window.innerWidth - ICON_WIDTH - 24);
  const maxY = Math.max(ICON_MARGIN_TOP, window.innerHeight - ICON_HEIGHT - 24);

  return {
    x: Math.min(maxX, Math.max(ICON_MARGIN_LEFT, Math.round(position.x))),
    y: Math.min(maxY, Math.max(ICON_MARGIN_TOP, Math.round(position.y))),
  };
};

const Desktop = ({
  apps = [],
  dockWindows = [],
  notes = [],
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  onOpenApp,
  onActivateDockWindow,
  onRestoreWindow,
  onCloseDockWindow,
  onCloseAllWindows,
  children,
}) => {
  const [hoveredDockId, setHoveredDockId] = useState(null);
  const [isCloseAllHovered, setIsCloseAllHovered] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [iconPositions, setIconPositions] = useState(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const storedRaw = window.localStorage.getItem(ICON_POSITION_STORAGE_KEY);

    if (!storedRaw) {
      return {};
    }

    try {
      return JSON.parse(storedRaw) || {};
    } catch {
      return {};
    }
  });
  const [draggingIconId, setDraggingIconId] = useState(null);
  const [dragState, setDragState] = useState(null);
  const [noteViewState, setNoteViewState] = useState({});
  const [noteColorOverrides, setNoteColorOverrides] = useState({});
  const [noteOrder, setNoteOrder] = useState([]);
  const [expandedStacks, setExpandedStacks] = useState({});
  const [noteDragState, setNoteDragState] = useState(null);
  const [noteResizeState, setNoteResizeState] = useState(null);
  const [autoFocusNoteId, setAutoFocusNoteId] = useState(null);
  const noteDragLastRef = useRef(null);
  const noteResizeLastRef = useRef(null);
  const contextMenuRef = useRef(null);

  const createQuickNote = useCallback(async ({ position } = {}) => {
    const paletteValues = Object.values(STICKY_NOTE_PALETTE);
    const color = paletteValues[Math.floor(Math.random() * paletteValues.length)] || "#1A2233";
    const resolvedPosition = clampNotePosition(position || NOTE_DEFAULT_POSITION, NOTE_DEFAULT_SIZE);

    const createdNoteId = await onCreateNote?.({
      content: "",
      position: resolvedPosition,
      size: NOTE_DEFAULT_SIZE,
      color,
      isPinned: false,
      stackId: null,
      isMinimized: false,
    });

    if (!createdNoteId) {
      return;
    }

    setAutoFocusNoteId(createdNoteId);
    setNoteOrder((previous) => {
      const filtered = previous.filter((id) => id !== createdNoteId);
      return [...filtered, createdNoteId];
    });
    setNoteViewState((previous) => ({
      ...previous,
      [createdNoteId]: {
        position: resolvedPosition,
        size: NOTE_DEFAULT_SIZE,
      },
    }));
  }, [onCreateNote]);

  const resolveNoteView = useCallback((note) => {
    const persistedSize = clampNoteSize(note?.size || NOTE_DEFAULT_SIZE);
    const persistedPosition = clampNotePosition(note?.position || { x: 120, y: 120 }, persistedSize);
    const cached = noteViewState[note.id];
    const resolvedSize = cached?.size ? clampNoteSize(cached.size) : persistedSize;
    const resolvedPosition = cached?.position
      ? clampNotePosition(cached.position, resolvedSize)
      : clampNotePosition(persistedPosition, resolvedSize);

    return {
      position: resolvedPosition,
      size: resolvedSize,
    };
  }, [noteViewState]);

  useEffect(() => {
    if (!Object.keys(iconPositions).length || typeof window === "undefined" || dragState?.id) {
      return;
    }

    window.localStorage.setItem(ICON_POSITION_STORAGE_KEY, JSON.stringify(iconPositions));
  }, [dragState?.id, iconPositions]);

  useEffect(() => {
    if (!dragState?.id) {
      return;
    }

    const handlePointerMove = (event) => {
      const nextPosition = clampIconPosition({
        x: event.clientX - dragState.offsetX,
        y: event.clientY - dragState.offsetY,
      });

      setIconPositions((previous) => ({
        ...previous,
        [dragState.id]: nextPosition,
      }));

      setDragState((previous) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          moved: true,
        };
      });
    };

    const handlePointerUp = () => {
      if (dragState && !dragState.moved) {
        onOpenApp?.(dragState.id);
      }

      setDraggingIconId(null);
      setDragState(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState, onOpenApp]);

  useEffect(() => {
    const handleGlobalPointer = (event) => {
      if (contextMenuRef.current?.contains(event.target)) {
        return;
      }

      setContextMenu(null);
    };

    window.addEventListener("pointerdown", handleGlobalPointer);

    return () => {
      window.removeEventListener("pointerdown", handleGlobalPointer);
    };
  }, []);

  useEffect(() => {
    const handleQuickNoteShortcut = (event) => {
      const hasModifier = event.ctrlKey || event.metaKey;
      const hasAlt = event.altKey;
      const isShortcutPressed = hasModifier && hasAlt && String(event.key || "").toLowerCase() === "n";

      if (!isShortcutPressed || isTypingTarget(event.target)) {
        return;
      }

      event.preventDefault();
      createQuickNote();
    };

    window.addEventListener("keydown", handleQuickNoteShortcut);

    return () => {
      window.removeEventListener("keydown", handleQuickNoteShortcut);
    };
  }, [createQuickNote]);

  useEffect(() => {
    if (!noteDragState?.id) {
      return;
    }

    const handlePointerMove = (event) => {
      const resolvedSize = noteDragState.size;
      const nextPosition = clampNotePosition({
        x: event.clientX - noteDragState.offsetX,
        y: event.clientY - noteDragState.offsetY,
      }, resolvedSize);

      setNoteViewState((previous) => ({
        ...previous,
        [noteDragState.id]: {
          position: nextPosition,
          size: resolvedSize,
        },
      }));
      noteDragLastRef.current = nextPosition;
    };

    const handlePointerUp = async () => {
      const finalizedDrag = noteDragState;
      setNoteDragState(null);

      if (!finalizedDrag?.id || !noteDragLastRef.current) {
        return;
      }

      await onUpdateNote?.(finalizedDrag.id, {
        position: noteDragLastRef.current,
      });

      const draggedNote = notes.find((note) => note.id === finalizedDrag.id);

      if (draggedNote?.isMinimized) {
        noteDragLastRef.current = null;
        return;
      }

      const draggedRect = {
        left: noteDragLastRef.current.x,
        top: noteDragLastRef.current.y,
        right: noteDragLastRef.current.x + finalizedDrag.size.width,
        bottom: noteDragLastRef.current.y + finalizedDrag.size.height,
      };

      const overlappingTarget = notes.find((candidate) => {
        if (!candidate || candidate.id === finalizedDrag.id || candidate.isMinimized) {
          return false;
        }

        const candidateView = resolveNoteView(candidate);
        const candidateRect = {
          left: candidateView.position.x,
          top: candidateView.position.y,
          right: candidateView.position.x + candidateView.size.width,
          bottom: candidateView.position.y + candidateView.size.height,
        };

        return isOverlapping(draggedRect, candidateRect);
      });

      if (overlappingTarget) {
        const nextStackId = overlappingTarget.stackId || draggedNote.stackId || createStackId();
        const updates = [];

        if (draggedNote.stackId !== nextStackId) {
          updates.push(onUpdateNote?.(draggedNote.id, { stackId: nextStackId }));
        }

        if (overlappingTarget.stackId !== nextStackId) {
          updates.push(onUpdateNote?.(overlappingTarget.id, { stackId: nextStackId }));
        }

        if (updates.length) {
          await Promise.all(updates);
        }

        setExpandedStacks((previous) => ({
          ...previous,
          [nextStackId]: false,
        }));
      }

      noteDragLastRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [noteDragState, notes, onUpdateNote, resolveNoteView]);

  useEffect(() => {
    if (!noteResizeState?.id) {
      return;
    }

    const handlePointerMove = (event) => {
      const nextSize = clampNoteSize({
        width: noteResizeState.startSize.width + (event.clientX - noteResizeState.startPointer.x),
        height: noteResizeState.startSize.height + (event.clientY - noteResizeState.startPointer.y),
      });

      const nextPosition = clampNotePosition(noteResizeState.startPosition, nextSize);

      setNoteViewState((previous) => ({
        ...previous,
        [noteResizeState.id]: {
          position: nextPosition,
          size: nextSize,
        },
      }));
      noteResizeLastRef.current = nextSize;
    };

    const handlePointerUp = async () => {
      const finalizedResize = noteResizeState;
      setNoteResizeState(null);

      if (!finalizedResize?.id || !noteResizeLastRef.current) {
        return;
      }

      await onUpdateNote?.(finalizedResize.id, {
        size: noteResizeLastRef.current,
      });

      noteResizeLastRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [noteResizeState, onUpdateNote]);

  const minimizedNotes = notes.filter((note) => note?.isMinimized);
  const interactiveNotes = notes.filter((note) => !note?.isMinimized);
  const stackBuckets = interactiveNotes.reduce((accumulator, note) => {
    const bucketKey = note?.stackId || `single-${note.id}`;

    if (!accumulator[bucketKey]) {
      accumulator[bucketKey] = [];
    }

    accumulator[bucketKey].push(note);
    return accumulator;
  }, {});

  const orderedInteractiveNotes = Object.entries(stackBuckets).flatMap(([bucketKey, bucketNotes]) => {
    if (!bucketKey.startsWith("single-") && bucketNotes.length > 1 && !expandedStacks[bucketKey]) {
      const sortedBucket = [...bucketNotes].sort((firstNote, secondNote) => {
        const firstIndex = noteOrder.indexOf(firstNote.id);
        const secondIndex = noteOrder.indexOf(secondNote.id);

        if (firstIndex === -1 && secondIndex === -1) {
          return notes.indexOf(firstNote) - notes.indexOf(secondNote);
        }

        return firstIndex - secondIndex;
      });

      return [sortedBucket[sortedBucket.length - 1]];
    }

    return bucketNotes;
  });

  return (
    <section
      style={getDesktopRootStyles()}
      onContextMenuCapture={(event) => {
        event.preventDefault();

        const dockContextTrigger = event.target instanceof HTMLElement
          ? event.target.closest("[data-dock-context-trigger='true']")
          : null;

        if (dockContextTrigger) {
          return;
        }

        setContextMenu({
          type: "desktop",
          x: event.clientX,
          y: event.clientY,
        });
      }}
    >
      <span style={getDesktopSurfaceStyles()} />

      <div style={getDesktopIconGridStyles()}>
        {apps.map((app, index) => {
          const position = iconPositions[app.id] || getDefaultIconPosition(index);

          return (
            <div
              key={app.id}
              style={getAppIconPositionStyles({ x: position.x, y: position.y, isDragging: draggingIconId === app.id })}
            >
              <AppIcon
                label={app.label}
                icon={app.icon}
                onOpen={() => onOpenApp?.(app.id)}
                onPointerDown={(event) => {
                  if (event.button !== 0) {
                    return;
                  }

                  event.preventDefault();

                  const currentPosition = iconPositions[app.id] || getDefaultIconPosition(index);
                  setDraggingIconId(app.id);
                  setDragState({
                    id: app.id,
                    offsetX: event.clientX - currentPosition.x,
                    offsetY: event.clientY - currentPosition.y,
                    moved: false,
                  });
                }}
                isDragging={draggingIconId === app.id}
              />
            </div>
          );
        })}
      </div>

      <div style={getNotesLayerStyles()}>
        {orderedInteractiveNotes.map((note) => {
          const resolvedView = resolveNoteView(note);
          const orderIndex = noteOrder.indexOf(note.id);
          const stackCount = note?.stackId ? notes.filter((item) => item.stackId === note.stackId && !item.isMinimized).length : 1;
          const baseStackIndex = orderIndex >= 0 ? orderIndex : notes.indexOf(note);
          const zIndex = (note?.isPinned ? 360 : 40) + baseStackIndex;
          const resolvedColor = noteColorOverrides[note.id] || note.color;

          return (
            <NoteCard
              key={note.id}
              note={{ ...note, color: resolvedColor }}
              view={{
                position: resolvedView.position,
                size: resolvedView.size,
                zIndex,
              }}
              isDragging={noteDragState?.id === note.id}
              isResizing={noteResizeState?.id === note.id}
              shouldAutoFocus={autoFocusNoteId === note.id}
              stackCount={stackCount}
              isPinned={Boolean(note?.isPinned)}
              onAutoFocusHandled={(noteId) => {
                if (autoFocusNoteId === noteId) {
                  setAutoFocusNoteId(null);
                }
              }}
              onToggleStack={(stackId) => {
                if (!stackId) {
                  return;
                }

                setExpandedStacks((previous) => ({
                  ...previous,
                  [stackId]: !previous[stackId],
                }));
              }}
              onTogglePin={async (noteId, isPinned) => {
                await onUpdateNote?.(noteId, {
                  isPinned,
                });

                setNoteOrder((previous) => {
                  const filtered = previous.filter((id) => id !== noteId);
                  return [...filtered, noteId];
                });
              }}
              onToggleMinimize={async (noteId, isMinimized) => {
                await onUpdateNote?.(noteId, {
                  isMinimized,
                });
              }}
              onActivate={(noteId) => {
                setNoteOrder((previous) => {
                  const filtered = previous.filter((id) => id !== noteId);
                  return [...filtered, noteId];
                });
              }}
              onStartDrag={(noteId, event) => {
                if (event.button !== 0 || noteResizeState?.id) {
                  return;
                }

                event.preventDefault();
                event.stopPropagation();

                const currentView = resolveNoteView(note);

                setNoteOrder((previous) => {
                  const filtered = previous.filter((id) => id !== noteId);
                  return [...filtered, noteId];
                });

                setNoteDragState({
                  id: noteId,
                  offsetX: event.clientX - currentView.position.x,
                  offsetY: event.clientY - currentView.position.y,
                  size: currentView.size,
                });
                noteDragLastRef.current = currentView.position;
              }}
              onStartResize={(noteId, event) => {
                if (event.button !== 0 || noteDragState?.id) {
                  return;
                }

                event.preventDefault();
                event.stopPropagation();

                const currentView = resolveNoteView(note);

                setNoteOrder((previous) => {
                  const filtered = previous.filter((id) => id !== noteId);
                  return [...filtered, noteId];
                });

                setNoteResizeState({
                  id: noteId,
                  startPointer: { x: event.clientX, y: event.clientY },
                  startPosition: currentView.position,
                  startSize: currentView.size,
                });
                noteResizeLastRef.current = currentView.size;
              }}
              onDelete={async (noteId) => {
                setNoteViewState((previous) => {
                  const next = { ...previous };
                  delete next[noteId];
                  return next;
                });

                setNoteColorOverrides((previous) => {
                  const next = { ...previous };
                  delete next[noteId];
                  return next;
                });

                setNoteOrder((previous) => previous.filter((id) => id !== noteId));
                await onDeleteNote?.(noteId);
              }}
              onColorChange={async (noteId, color) => {
                setNoteColorOverrides((previous) => ({
                  ...previous,
                  [noteId]: color,
                }));

                const isUpdated = await onUpdateNote?.(noteId, { color });

                if (!isUpdated) {
                  setNoteColorOverrides((previous) => {
                    const next = { ...previous };
                    delete next[noteId];
                    return next;
                  });
                }
              }}
              onAutoSave={onUpdateNote}
            />
          );
        })}

        {minimizedNotes.map((note) => {
          const noteView = resolveNoteView(note);
          const isPinned = Boolean(note?.isPinned);
          const zIndex = (isPinned ? 360 : 40) + (noteOrder.indexOf(note.id) >= 0 ? noteOrder.indexOf(note.id) : 0);
          const previewText = String(note?.content || "Note").trim().slice(0, 18) || "Note";

          return (
            <button
              key={`min-${note.id}`}
              type="button"
              style={getNoteMinimizedIconStyles({
                x: noteView.position.x,
                y: noteView.position.y,
                zIndex,
                isPinned,
              })}
              onClick={async () => {
                await onUpdateNote?.(note.id, { isMinimized: false });
                setNoteOrder((previous) => {
                  const filtered = previous.filter((id) => id !== note.id);
                  return [...filtered, note.id];
                });
              }}
              title="Restore note"
            >
              {previewText}
            </button>
          );
        })}
      </div>

      {dockWindows.length ? (
        <div style={getDesktopDockStyles()}>
          {dockWindows.map((windowItem) => {
            const Icon = windowItem.icon;

            return (
              <button
                key={windowItem.id}
                type="button"
                style={getDesktopDockItemStyles({ isHovered: hoveredDockId === windowItem.id })}
                onMouseEnter={() => setHoveredDockId(windowItem.id)}
                onMouseLeave={() => setHoveredDockId(null)}
                onClick={() => onActivateDockWindow?.(windowItem.id)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setContextMenu({
                    type: "dock",
                    id: windowItem.id,
                    x: event.clientX,
                    y: event.clientY,
                  });
                }}
                data-dock-context-trigger="true"
              >
                <span style={getDesktopDockItemInnerStyles()}>
                  {Icon ? <Icon size={14} strokeWidth={2} /> : null}
                  {windowItem.title}
                </span>
                <span style={getDesktopDockIndicatorStyles({ isActive: windowItem.isActive })} />
              </button>
            );
          })}

          <button
            type="button"
            style={getDesktopDockCloseAllStyles({ isHovered: isCloseAllHovered })}
            onMouseEnter={() => setIsCloseAllHovered(true)}
            onMouseLeave={() => setIsCloseAllHovered(false)}
            onClick={() => onCloseAllWindows?.()}
          >
            Close All
          </button>
        </div>
      ) : null}

      {contextMenu ? (
        <div ref={contextMenuRef} style={getDesktopDockContextMenuStyles({ x: contextMenu.x, y: contextMenu.y })}>
          {contextMenu.type === "dock" ? (
            <>
              <button
                type="button"
                style={getDesktopDockContextActionStyles({ isDanger: false })}
                onClick={() => {
                  onRestoreWindow?.(contextMenu.id);
                  setContextMenu(null);
                }}
              >
                Restore
              </button>
              <button
                type="button"
                style={getDesktopDockContextActionStyles({ isDanger: true })}
                onClick={() => {
                  onCloseDockWindow?.(contextMenu.id);
                  setContextMenu(null);
                }}
              >
                Close
              </button>
              <button
                type="button"
                style={getDesktopDockContextActionStyles({ isDanger: true })}
                onClick={() => {
                  onCloseAllWindows?.();
                  setContextMenu(null);
                }}
              >
                Close All
              </button>
            </>
          ) : (
            <button
              type="button"
              style={getDesktopDockContextActionStyles({ isDanger: false })}
              onClick={async () => {
                await createQuickNote({
                  position: {
                    x: contextMenu.x,
                    y: contextMenu.y,
                  },
                });
                setContextMenu(null);
              }}
            >
              Add Note
            </button>
          )}
        </div>
      ) : null}

      {children}
    </section>
  );
};

export default Desktop;
