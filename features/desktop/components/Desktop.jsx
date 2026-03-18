import AppIcon from "./AppIcon";
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
import { useEffect, useState } from "react";

const ICON_WIDTH = 92;
const ICON_HEIGHT = 84;
const ICON_MARGIN_LEFT = 28;
const ICON_MARGIN_TOP = 34;
const ICON_GAP = 12;
const ICONS_PER_COLUMN = 5;
const ICON_POSITION_STORAGE_KEY = "lifeos.desktop.iconPositions";

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
    const handleGlobalPointer = () => {
      setContextMenu(null);
    };

    window.addEventListener("pointerdown", handleGlobalPointer);

    return () => {
      window.removeEventListener("pointerdown", handleGlobalPointer);
    };
  }, []);

  return (
    <section style={getDesktopRootStyles()}>
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
                  setContextMenu({
                    id: windowItem.id,
                    x: event.clientX,
                    y: event.clientY,
                  });
                }}
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
        <div style={getDesktopDockContextMenuStyles({ x: contextMenu.x, y: contextMenu.y })}>
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
        </div>
      ) : null}

      {children}
    </section>
  );
};

export default Desktop;
