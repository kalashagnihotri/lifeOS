import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_POSITION = { x: 80, y: 80 };
const DEFAULT_SIZE = { width: 860, height: 560 };
const MIN_WIDTH = 340;
const MIN_HEIGHT = 240;
const CASCADE_STEP = 28;
const BASE_Z_INDEX = 20;
const SNAP_EDGE_THRESHOLD = 40;

const getHighestZWindow = (windows, { includeMinimized = true } = {}) => {
  const candidates = includeMinimized
    ? windows
    : windows.filter((windowItem) => !windowItem.isMinimized && !windowItem.isMinimizing);

  if (!candidates.length) {
    return null;
  }

  return [...candidates].sort((firstWindow, secondWindow) => {
    return (secondWindow.zIndex || BASE_Z_INDEX) - (firstWindow.zIndex || BASE_Z_INDEX);
  })[0];
};

const resolveSnapTarget = (clientX, clientY, geometry = {}) => {
  const left = Number.isFinite(geometry.windowLeft) ? geometry.windowLeft : null;
  const right = Number.isFinite(geometry.windowRight) ? geometry.windowRight : null;
  const top = Number.isFinite(geometry.windowTop) ? geometry.windowTop : null;

  if (left != null && left <= SNAP_EDGE_THRESHOLD) {
    return "left";
  }

  if (right != null && right >= window.innerWidth - SNAP_EDGE_THRESHOLD) {
    return "right";
  }

  if (top != null && top <= SNAP_EDGE_THRESHOLD) {
    return "top";
  }

  if (clientX <= SNAP_EDGE_THRESHOLD) {
    return "left";
  }

  if (clientX >= window.innerWidth - SNAP_EDGE_THRESHOLD) {
    return "right";
  }

  if (clientY <= SNAP_EDGE_THRESHOLD) {
    return "top";
  }

  return null;
};

const resolveComponent = (component) => {
  if (!component) {
    return null;
  }

  if (typeof component === "function") {
    return component;
  }

  return () => component;
};

const getRenderedWindowRect = (windowId) => {
  if (typeof document === "undefined") {
    return null;
  }

  const windowElement = document.querySelector(`[data-window-id='${String(windowId)}']`);

  if (!windowElement || typeof windowElement.getBoundingClientRect !== "function") {
    return null;
  }

  const rect = windowElement.getBoundingClientRect();

  if (!Number.isFinite(rect?.width) || !Number.isFinite(rect?.height)) {
    return null;
  }

  return {
    x: Number.isFinite(rect.left) ? Math.round(rect.left) : null,
    y: Number.isFinite(rect.top) ? Math.round(rect.top) : null,
    width: Math.max(MIN_WIDTH, Math.round(rect.width)),
    height: Math.max(MIN_HEIGHT, Math.round(rect.height)),
  };
};

const normalizeWindow = (windowConfig, index = 0, zIndex = BASE_Z_INDEX) => {
  const safeId = String(windowConfig?.id || `window-${Date.now()}-${index}`);

  return {
    id: safeId,
    title: String(windowConfig?.title || "Untitled Window"),
    component: resolveComponent(windowConfig?.component),
    position: {
      x: Number.isFinite(windowConfig?.position?.x)
        ? windowConfig.position.x
        : DEFAULT_POSITION.x + CASCADE_STEP * index,
      y: Number.isFinite(windowConfig?.position?.y)
        ? windowConfig.position.y
        : DEFAULT_POSITION.y + CASCADE_STEP * index,
    },
    size: {
      width: Number.isFinite(windowConfig?.size?.width)
        ? windowConfig.size.width
        : DEFAULT_SIZE.width,
      height: Number.isFinite(windowConfig?.size?.height)
        ? windowConfig.size.height
        : DEFAULT_SIZE.height,
    },
    isMinimized: Boolean(windowConfig?.isMinimized),
    isMaximized: Boolean(windowConfig?.isMaximized),
    isMinimizing: Boolean(windowConfig?.isMinimizing),
    isRestoring: Boolean(windowConfig?.isRestoring),
    isDragging: Boolean(windowConfig?.isDragging),
    isResizing: Boolean(windowConfig?.isResizing),
    snapPreview: windowConfig?.snapPreview || null,
    restoreBounds: windowConfig?.restoreBounds || null,
    zIndex,
  };
};

const useWindowManager = ({ initialWindows = [] } = {}) => {
  const normalizedInitialWindows = useMemo(() => {
    return initialWindows.map((windowConfig, index) => {
      return normalizeWindow(windowConfig, index, BASE_Z_INDEX + index);
    });
  }, [initialWindows]);

  const [openWindows, setOpenWindows] = useState(normalizedInitialWindows);
  const [activeWindow, setActiveWindow] = useState(normalizedInitialWindows.at(-1)?.id || null);
  const activeWindowRef = useRef(normalizedInitialWindows.at(-1)?.id || null);
  const dragRef = useRef({
    id: null,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
    lastClientX: 0,
    lastClientY: 0,
  });
  const resizeRef = useRef({
    id: null,
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });
  const timerRef = useRef({
    minimize: new Map(),
    restore: new Map(),
  });
  const frameRef = useRef({
    id: null,
    mode: null,
    windowId: null,
    nextX: 0,
    nextY: 0,
    nextWidth: 0,
    nextHeight: 0,
    snapPreview: null,
  });

  const resetResizeRef = useCallback(() => {
    resizeRef.current = {
      id: null,
      direction: null,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
    };
  }, []);

  const cancelFrame = useCallback(() => {
    if (frameRef.current.id) {
      window.cancelAnimationFrame(frameRef.current.id);
    }

    frameRef.current.id = null;
    frameRef.current.mode = null;
    frameRef.current.windowId = null;
    frameRef.current.snapPreview = null;
  }, []);

  const clearWindowInteraction = useCallback(
    (id) => {
      const safeId = String(id);

      if (dragRef.current.id === safeId) {
        dragRef.current = { id: null, offsetX: 0, offsetY: 0, width: 0, height: 0, lastClientX: 0, lastClientY: 0 };
      }

      if (resizeRef.current.id === safeId) {
        resetResizeRef();
      }

      if (frameRef.current.windowId === safeId) {
        cancelFrame();
      }

      setOpenWindows((previousWindows) => {
        return previousWindows.map((windowItem) => {
          if (windowItem.id !== safeId) {
            return windowItem;
          }

          return {
            ...windowItem,
            isDragging: false,
            isResizing: false,
            snapPreview: null,
          };
        });
      });
    },
    [cancelFrame, resetResizeRef]
  );

  const clearWindowTimers = useCallback((id) => {
    const safeId = String(id);

    const minimizeTimer = timerRef.current.minimize.get(safeId);
    if (minimizeTimer) {
      window.clearTimeout(minimizeTimer);
      timerRef.current.minimize.delete(safeId);
    }

    const restoreTimer = timerRef.current.restore.get(safeId);
    if (restoreTimer) {
      window.clearTimeout(restoreTimer);
      timerRef.current.restore.delete(safeId);
    }
  }, []);

  const getNextZIndex = useCallback((windows) => {
    return windows.reduce((highest, windowItem) => Math.max(highest, windowItem.zIndex || BASE_Z_INDEX), BASE_Z_INDEX) + 1;
  }, []);

  const setActiveWindowSafe = useCallback((nextActiveId) => {
    const normalizedId = nextActiveId == null ? null : String(nextActiveId);
    activeWindowRef.current = normalizedId;
    setActiveWindow(normalizedId);
  }, []);

  const focusWindow = useCallback(
    (id) => {
      const safeId = String(id);

      setOpenWindows((previousWindows) => {
        const hasTarget = previousWindows.some((windowItem) => windowItem.id === safeId);

        if (!hasTarget) {
          return previousWindows;
        }

        const nextZIndex = getNextZIndex(previousWindows);

        return previousWindows.map((windowItem) => {
          if (windowItem.id !== safeId) {
            return windowItem;
          }

          return {
            ...windowItem,
            zIndex: nextZIndex,
          };
        });
      });

      setActiveWindowSafe(safeId);
    },
    [getNextZIndex, setActiveWindowSafe]
  );

  const openWindow = useCallback(
    (componentOrConfig, title, options = {}) => {
      const windowConfig =
        componentOrConfig && typeof componentOrConfig === "object" && !title
          ? componentOrConfig
          : {
              component: componentOrConfig,
              title,
              ...options,
            };

      const normalized = normalizeWindow(windowConfig, 0, BASE_Z_INDEX);
      let shouldClearRestoreState = false;

      setOpenWindows((previousWindows) => {
        const existing = previousWindows.find((windowItem) => windowItem.id === normalized.id);

        if (existing) {
          clearWindowTimers(normalized.id);
          const isReturningFromMinimized = existing.isMinimized || existing.isMinimizing;
          shouldClearRestoreState = isReturningFromMinimized;

          return previousWindows.map((windowItem) => {
            if (windowItem.id !== normalized.id) {
              return windowItem;
            }

            return {
              ...windowItem,
              isMinimized: false,
              isMinimizing: false,
              isRestoring: isReturningFromMinimized,
            };
          });
        }

        const nextZIndex = getNextZIndex(previousWindows);
        const cascadeOffset = previousWindows.length % 8;

        return [
          ...previousWindows,
          {
            ...normalized,
            zIndex: nextZIndex,
            position: {
              x: Number.isFinite(windowConfig?.position?.x)
                ? windowConfig.position.x
                : DEFAULT_POSITION.x + CASCADE_STEP * cascadeOffset,
              y: Number.isFinite(windowConfig?.position?.y)
                ? windowConfig.position.y
                : DEFAULT_POSITION.y + CASCADE_STEP * cascadeOffset,
            },
          },
        ];
      });

      if (shouldClearRestoreState) {
        const restoreTimer = window.setTimeout(() => {
          setOpenWindows((previousWindows) => {
            return previousWindows.map((windowItem) => {
              if (windowItem.id !== normalized.id) {
                return windowItem;
              }

              return {
                ...windowItem,
                isRestoring: false,
              };
            });
          });

          timerRef.current.restore.delete(normalized.id);
        }, 180);

        timerRef.current.restore.set(normalized.id, restoreTimer);
      }

      setActiveWindowSafe(normalized.id);
      focusWindow(normalized.id);
    },
    [clearWindowTimers, focusWindow, getNextZIndex, setActiveWindowSafe]
  );

  const closeWindow = useCallback((id) => {
    const safeId = String(id);
    clearWindowInteraction(safeId);
    clearWindowTimers(safeId);

    setOpenWindows((previousWindows) => {
      const closingWindow = previousWindows.find((windowItem) => windowItem.id === safeId);

      if (!closingWindow) {
        return previousWindows;
      }

      const nextWindows = previousWindows.filter((windowItem) => windowItem.id !== safeId);

      if (!nextWindows.length) {
        setActiveWindowSafe(null);
        return nextWindows;
      }

      const isClosingActive = activeWindowRef.current === safeId;
      const stillActiveWindow = nextWindows.find((windowItem) => windowItem.id === activeWindowRef.current);
      const nextPreferredWindow = isClosingActive
        ? getHighestZWindow(nextWindows, { includeMinimized: false }) || getHighestZWindow(nextWindows)
        : stillActiveWindow || getHighestZWindow(nextWindows, { includeMinimized: false }) || getHighestZWindow(nextWindows);

      setActiveWindowSafe(nextPreferredWindow?.id || null);
      return nextWindows;
    });

  }, [clearWindowInteraction, clearWindowTimers, setActiveWindowSafe]);

  const closeAllWindows = useCallback(() => {
    timerRef.current.minimize.forEach((timerId) => window.clearTimeout(timerId));
    timerRef.current.restore.forEach((timerId) => window.clearTimeout(timerId));
    timerRef.current.minimize.clear();
    timerRef.current.restore.clear();

    cancelFrame();

    dragRef.current = { id: null, offsetX: 0, offsetY: 0, width: 0, height: 0, lastClientX: 0, lastClientY: 0 };
    resetResizeRef();

    setOpenWindows([]);
    setActiveWindowSafe(null);
  }, [cancelFrame, resetResizeRef, setActiveWindowSafe]);

  const minimizeWindow = useCallback(
    (id) => {
      const safeId = String(id);
      clearWindowInteraction(safeId);
      clearWindowTimers(safeId);

      setOpenWindows((previousWindows) => {
        const nextWindows = previousWindows.map((windowItem) => {
          if (windowItem.id !== safeId) {
            return windowItem;
          }

          if (windowItem.isMinimized || windowItem.isMinimizing) {
            return windowItem;
          }

          return {
            ...windowItem,
            isMinimizing: true,
              isDragging: false,
              isResizing: false,
            isMaximized: false,
          };
        });

        if (activeWindowRef.current === safeId) {
          const nextActiveCandidate =
            getHighestZWindow(nextWindows.filter((windowItem) => windowItem.id !== safeId), {
              includeMinimized: false,
            }) || getHighestZWindow(nextWindows.filter((windowItem) => windowItem.id !== safeId));
          setActiveWindowSafe(nextActiveCandidate?.id || null);
        }

        return nextWindows;
      });

      const minimizeTimer = window.setTimeout(() => {
        setOpenWindows((previousWindows) => {
          return previousWindows.map((windowItem) => {
            if (windowItem.id !== safeId) {
              return windowItem;
            }

            return {
              ...windowItem,
              isMinimized: true,
              isMinimizing: false,
            };
          });
        });

        timerRef.current.minimize.delete(safeId);
      }, 170);

      timerRef.current.minimize.set(safeId, minimizeTimer);
    },
    [clearWindowInteraction, clearWindowTimers, setActiveWindowSafe]
  );

  const maximizeWindow = useCallback(
    (id) => {
      const safeId = String(id);
      clearWindowInteraction(safeId);

      setOpenWindows((previousWindows) => {
        const nextZIndex = getNextZIndex(previousWindows);

        return previousWindows.map((windowItem) => {
          if (windowItem.id !== safeId) {
            return windowItem;
          }

          if (!windowItem.isMaximized) {
            return {
              ...windowItem,
              isMinimized: false,
              isMaximized: true,
              isDragging: false,
              isResizing: false,
              isMinimizing: false,
              isRestoring: false,
              restoreBounds: {
                position: {
                  x: windowItem.position.x,
                  y: windowItem.position.y,
                },
                size: {
                  width: windowItem.size.width,
                  height: windowItem.size.height,
                },
              },
              zIndex: nextZIndex,
            };
          }

          return {
            ...windowItem,
            isMaximized: false,
            isMinimized: false,
            isDragging: false,
            isResizing: false,
            isMinimizing: false,
            isRestoring: false,
            position: {
              x: Number.isFinite(windowItem.restoreBounds?.position?.x)
                ? windowItem.restoreBounds.position.x
                : windowItem.position.x,
              y: Number.isFinite(windowItem.restoreBounds?.position?.y)
                ? windowItem.restoreBounds.position.y
                : windowItem.position.y,
            },
            size: {
              width: Number.isFinite(windowItem.restoreBounds?.size?.width)
                ? windowItem.restoreBounds.size.width
                : windowItem.size.width,
              height: Number.isFinite(windowItem.restoreBounds?.size?.height)
                ? windowItem.restoreBounds.size.height
                : windowItem.size.height,
            },
            restoreBounds: null,
            zIndex: nextZIndex,
          };
        });
      });

      setActiveWindowSafe(safeId);
    },
    [clearWindowInteraction, getNextZIndex, setActiveWindowSafe]
  );

  const restoreWindow = useCallback(
    (id) => {
      const safeId = String(id);
      clearWindowInteraction(safeId);
      clearWindowTimers(safeId);

      setOpenWindows((previousWindows) => {
        const nextZIndex = getNextZIndex(previousWindows);

        return previousWindows.map((windowItem) => {
          if (windowItem.id !== safeId) {
            return windowItem;
          }

          return {
            ...windowItem,
            isMinimized: false,
            isDragging: false,
            isResizing: false,
            isMinimizing: false,
            isRestoring: true,
            zIndex: nextZIndex,
          };
        });
      });

      setActiveWindowSafe(safeId);

      const restoreTimer = window.setTimeout(() => {
        setOpenWindows((previousWindows) => {
          return previousWindows.map((windowItem) => {
            if (windowItem.id !== safeId) {
              return windowItem;
            }

            return {
              ...windowItem,
              isRestoring: false,
            };
          });
        });

        timerRef.current.restore.delete(safeId);
      }, 180);

      timerRef.current.restore.set(safeId, restoreTimer);
    },
    [clearWindowInteraction, clearWindowTimers, getNextZIndex, setActiveWindowSafe]
  );

  const updatePosition = useCallback((id, position) => {
    const safeId = String(id);
    const nextX = Number.isFinite(position?.x) ? Math.max(0, position.x) : 0;
    const nextY = Number.isFinite(position?.y) ? Math.max(0, position.y) : 0;
    const nextSnapPreview = position?.snapPreview || null;

    setOpenWindows((previousWindows) => {
      return previousWindows.map((windowItem) => {
        if (windowItem.id !== safeId) {
          return windowItem;
        }

        if (windowItem.isMaximized) {
          return windowItem;
        }

        return {
          ...windowItem,
          position: {
            x: nextX,
            y: nextY,
          },
          snapPreview: nextSnapPreview,
        };
      });
    });
  }, []);

  const updateSize = useCallback((id, size) => {
    const safeId = String(id);
    const nextWidth = Number.isFinite(size?.width) ? Math.max(MIN_WIDTH, size.width) : DEFAULT_SIZE.width;
    const nextHeight = Number.isFinite(size?.height) ? Math.max(MIN_HEIGHT, size.height) : DEFAULT_SIZE.height;

    setOpenWindows((previousWindows) => {
      return previousWindows.map((windowItem) => {
        if (windowItem.id !== safeId) {
          return windowItem;
        }

        if (windowItem.isMaximized) {
          return windowItem;
        }

        return {
          ...windowItem,
          size: {
            width: nextWidth,
            height: nextHeight,
          },
        };
      });
    });
  }, []);

  const startDrag = useCallback(
    (id, event) => {
      const safeId = String(id);
      const targetWindow = openWindows.find((windowItem) => windowItem.id === safeId);
      const renderedRect = getRenderedWindowRect(safeId);

      if (!targetWindow) {
        return;
      }

      focusWindow(safeId);

      if (targetWindow.isMaximized) {
        const restoredWidth = Number.isFinite(targetWindow.restoreBounds?.size?.width)
          ? targetWindow.restoreBounds.size.width
          : DEFAULT_SIZE.width;
        const restoredHeight = Number.isFinite(targetWindow.restoreBounds?.size?.height)
          ? targetWindow.restoreBounds.size.height
          : DEFAULT_SIZE.height;
        const pointerRatio = Math.min(0.9, Math.max(0.1, event.clientX / Math.max(window.innerWidth, 1)));
        const restoredX = Math.max(0, Math.round(event.clientX - restoredWidth * pointerRatio));
        const restoredY = Math.max(0, Math.round(event.clientY - 18));

        dragRef.current = {
          id: safeId,
          offsetX: event.clientX - restoredX,
          offsetY: event.clientY - restoredY,
          width: restoredWidth,
          height: restoredHeight,
          lastClientX: event.clientX,
          lastClientY: event.clientY,
        };

        setOpenWindows((previousWindows) => {
          return previousWindows.map((windowItem) => {
            if (windowItem.id !== safeId) {
              return windowItem;
            }

            return {
              ...windowItem,
              isMaximized: false,
              isDragging: true,
              snapPreview: null,
              position: {
                x: restoredX,
                y: restoredY,
              },
              size: {
                width: restoredWidth,
                height: restoredHeight,
              },
              restoreBounds: null,
            };
          });
        });

        return;
      }

      dragRef.current = {
        id: safeId,
        offsetX: event.clientX - (renderedRect?.x ?? targetWindow.position.x),
        offsetY: event.clientY - (renderedRect?.y ?? targetWindow.position.y),
        width: renderedRect?.width ?? targetWindow.size.width,
        height: renderedRect?.height ?? targetWindow.size.height,
        lastClientX: event.clientX,
        lastClientY: event.clientY,
      };

      setOpenWindows((previousWindows) => {
        return previousWindows.map((windowItem) => {
          if (windowItem.id !== safeId) {
            return windowItem;
          }

          return {
            ...windowItem,
            isDragging: true,
            snapPreview: null,
          };
        });
      });
    },
    [focusWindow, openWindows]
  );

  const startResize = useCallback(
    (id, direction, event) => {
      const safeId = String(id);
      const targetWindow = openWindows.find((windowItem) => windowItem.id === safeId);

      if (!targetWindow || targetWindow.isMaximized || targetWindow.isMinimized) {
        return;
      }

      focusWindow(safeId);

      resizeRef.current = {
        id: safeId,
        direction,
        startX: event.clientX,
        startY: event.clientY,
        startWidth: targetWindow.size.width,
        startHeight: targetWindow.size.height,
      };

      setOpenWindows((previousWindows) => {
        return previousWindows.map((windowItem) => {
          if (windowItem.id !== safeId) {
            return windowItem;
          }

          return {
            ...windowItem,
            isResizing: true,
          };
        });
      });
    },
    [focusWindow, openWindows]
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (resizeRef.current.id) {
        const { id, direction, startX, startY, startWidth, startHeight } = resizeRef.current;
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        const nextWidth = direction === "right" || direction === "corner"
          ? Math.max(MIN_WIDTH, startWidth + deltaX)
          : startWidth;
        const nextHeight = direction === "bottom" || direction === "corner"
          ? Math.max(MIN_HEIGHT, startHeight + deltaY)
          : startHeight;

        frameRef.current.mode = "resize";
        frameRef.current.windowId = id;
        frameRef.current.nextWidth = nextWidth;
        frameRef.current.nextHeight = nextHeight;

        if (!frameRef.current.id) {
          frameRef.current.id = window.requestAnimationFrame(() => {
            if (frameRef.current.mode === "resize" && frameRef.current.windowId) {
              updateSize(frameRef.current.windowId, {
                width: frameRef.current.nextWidth,
                height: frameRef.current.nextHeight,
              });
            }

            frameRef.current.id = null;
          });
        }
        return;
      }

      const draggingId = dragRef.current.id;

      if (!draggingId) {
        return;
      }

      const nextX = Math.max(0, event.clientX - dragRef.current.offsetX);
      const nextY = Math.max(0, event.clientY - dragRef.current.offsetY);
      const snapPreview = resolveSnapTarget(event.clientX, event.clientY, {
        windowLeft: nextX,
        windowRight: nextX + dragRef.current.width,
        windowTop: nextY,
      });

      dragRef.current.lastClientX = event.clientX;
      dragRef.current.lastClientY = event.clientY;

      frameRef.current.mode = "drag";
      frameRef.current.windowId = draggingId;
      frameRef.current.nextX = nextX;
      frameRef.current.nextY = nextY;
      frameRef.current.snapPreview = snapPreview;

      if (!frameRef.current.id) {
        frameRef.current.id = window.requestAnimationFrame(() => {
          if (frameRef.current.mode === "drag" && frameRef.current.windowId) {
            updatePosition(frameRef.current.windowId, {
              x: frameRef.current.nextX,
              y: frameRef.current.nextY,
              snapPreview: frameRef.current.snapPreview,
            });
          }

          frameRef.current.id = null;
        });
      }
    };

    const handleMouseUp = (event) => {
      if (dragRef.current.id) {
        const draggingId = dragRef.current.id;
        const draggingSnapshot = {
          width: dragRef.current.width,
          height: dragRef.current.height,
          lastClientX: dragRef.current.lastClientX,
          lastClientY: dragRef.current.lastClientY,
        };
        const isPendingDragFrame =
          frameRef.current.mode === "drag" && frameRef.current.windowId === draggingId;
        const pendingX = frameRef.current.nextX;
        const pendingY = frameRef.current.nextY;
        const pendingSnapPreview = frameRef.current.snapPreview;
        const releaseClientX = Number.isFinite(event?.clientX) ? event.clientX : draggingSnapshot.lastClientX;
        const releaseClientY = Number.isFinite(event?.clientY) ? event.clientY : draggingSnapshot.lastClientY;

        dragRef.current = {
          id: null,
          offsetX: 0,
          offsetY: 0,
          width: 0,
          height: 0,
          lastClientX: 0,
          lastClientY: 0,
        };

        setOpenWindows((previousWindows) => {
          return previousWindows.map((windowItem) => {
            if (windowItem.id !== draggingId) {
              return windowItem;
            }

            const finalX = isPendingDragFrame && Number.isFinite(pendingX)
              ? Math.max(0, pendingX)
              : windowItem.position.x;
            const finalY = isPendingDragFrame && Number.isFinite(pendingY)
              ? Math.max(0, pendingY)
              : windowItem.position.y;
            const releaseSnapPreview = Number.isFinite(releaseClientX) && Number.isFinite(releaseClientY)
              ? resolveSnapTarget(releaseClientX, releaseClientY, {
                  windowLeft: finalX,
                  windowRight: finalX + draggingSnapshot.width,
                  windowTop: finalY,
                })
              : null;
            const effectiveSnapPreview = releaseSnapPreview
              || (isPendingDragFrame ? pendingSnapPreview : null)
              || windowItem.snapPreview;

            if (effectiveSnapPreview === "left") {
              return {
                ...windowItem,
                isDragging: false,
                isMaximized: false,
                snapPreview: null,
                position: {
                  x: 0,
                  y: 0,
                },
                size: {
                  width: Math.max(MIN_WIDTH, Math.floor(window.innerWidth / 2)),
                  height: Math.max(MIN_HEIGHT, window.innerHeight),
                },
              };
            }

            if (effectiveSnapPreview === "right") {
              const snappedWidth = Math.max(MIN_WIDTH, Math.floor(window.innerWidth / 2));

              return {
                ...windowItem,
                isDragging: false,
                isMaximized: false,
                snapPreview: null,
                position: {
                  x: window.innerWidth - snappedWidth,
                  y: 0,
                },
                size: {
                  width: snappedWidth,
                  height: Math.max(MIN_HEIGHT, window.innerHeight),
                },
              };
            }

            if (effectiveSnapPreview === "top") {
              return {
                ...windowItem,
                isDragging: false,
                isMaximized: true,
                snapPreview: null,
                restoreBounds: {
                  position: {
                    x: finalX,
                    y: finalY,
                  },
                  size: {
                    width: windowItem.size.width,
                    height: windowItem.size.height,
                  },
                },
              };
            }

            return {
              ...windowItem,
              isDragging: false,
              position: {
                x: finalX,
                y: finalY,
              },
              snapPreview: null,
            };
          });
        });
      }

      if (resizeRef.current.id) {
        const resizingId = resizeRef.current.id;

        resetResizeRef();

        setOpenWindows((previousWindows) => {
          return previousWindows.map((windowItem) => {
            if (windowItem.id !== resizingId) {
              return windowItem;
            }

            return {
              ...windowItem,
              isResizing: false,
            };
          });
        });
      }

      cancelFrame();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cancelFrame, resetResizeRef, updatePosition, updateSize]);

  useEffect(() => {
    const timers = timerRef.current;
    const frame = frameRef.current;

    return () => {
      timers.minimize.forEach((timerId) => window.clearTimeout(timerId));
      timers.restore.forEach((timerId) => window.clearTimeout(timerId));
      timers.minimize.clear();
      timers.restore.clear();

      if (frame.id) {
        window.cancelAnimationFrame(frame.id);
      }
    };
  }, []);

  const sortedOpenWindows = useMemo(() => {
    return [...openWindows].sort((firstWindow, secondWindow) => {
      return (firstWindow.zIndex || BASE_Z_INDEX) - (secondWindow.zIndex || BASE_Z_INDEX);
    });
  }, [openWindows]);

  return {
    openWindows: sortedOpenWindows,
    windows: sortedOpenWindows,
    activeWindow,
    activeWindowId: activeWindow,
    openWindow,
    closeWindow,
    closeAllWindows,
    focusWindow,
    bringToFront: focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updatePosition,
    updateSize,
    startDrag,
    startResize,
  };
};

export default useWindowManager;
