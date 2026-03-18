import AppIcon from "./AppIcon";
import {
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
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            label={app.label}
            icon={app.icon}
            onOpen={() => onOpenApp?.(app.id)}
          />
        ))}
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
