import { act, renderHook } from "@testing-library/react";
import useWindowManager from "../useWindowManager";

const DummyComponent = () => null;

describe("useWindowManager close behavior", () => {
  it("closes an inactive window", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "First", { id: "first" });
      result.current.openWindow(DummyComponent, "Second", { id: "second" });
    });

    expect(result.current.activeWindow).toBe("second");

    act(() => {
      result.current.closeWindow("first");
    });

    expect(result.current.openWindows).toHaveLength(1);
    expect(result.current.openWindows[0].id).toBe("second");
    expect(result.current.activeWindow).toBe("second");
  });

  it("snaps left when window reaches left edge even if cursor is away from edge", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "Geometry Left", { id: "geometry-left" });
    });

    act(() => {
      result.current.startDrag("geometry-left", { clientX: 300, clientY: 120 });

      // With default position.x = 80, offsetX = 220. Moving cursor to x = 220 makes windowLeft = 0.
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 220, clientY: 180 }));
      window.dispatchEvent(new MouseEvent("mouseup", { clientX: 220, clientY: 180 }));
    });

    const snapped = result.current.openWindows.find((windowItem) => windowItem.id === "geometry-left");

    expect(snapped).toBeDefined();
    expect(snapped?.position.x).toBe(0);
    expect(snapped?.isMaximized).toBe(false);
  });

  it("keeps current active window when a different window is closed", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "One", { id: "one" });
      result.current.openWindow(DummyComponent, "Two", { id: "two" });
      result.current.openWindow(DummyComponent, "Three", { id: "three" });
    });

    expect(result.current.activeWindow).toBe("three");

    act(() => {
      result.current.closeWindow("one");
    });

    expect(result.current.activeWindow).toBe("three");
  });

  it("selects next visible window when active window is minimized", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "One", { id: "one" });
      result.current.openWindow(DummyComponent, "Two", { id: "two" });
      result.current.openWindow(DummyComponent, "Three", { id: "three" });
    });

    expect(result.current.activeWindow).toBe("three");

    act(() => {
      result.current.minimizeWindow("three");
    });

    expect(result.current.activeWindow).toBe("two");
  });

  it("prefers non-minimized window when closing the active window", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "One", { id: "one" });
      result.current.openWindow(DummyComponent, "Two", { id: "two" });
      result.current.openWindow(DummyComponent, "Three", { id: "three" });
      result.current.minimizeWindow("two");
      result.current.focusWindow("three");
      result.current.closeWindow("three");
    });

    expect(result.current.activeWindow).toBe("one");
  });

  it("closes correctly right after dragging", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "Drag Me", { id: "drag-window" });
    });

    act(() => {
      result.current.startDrag("drag-window", { clientX: 100, clientY: 100 });
    });

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 430, clientY: 280 }));
    });

    act(() => {
      result.current.closeWindow("drag-window");
    });

    act(() => {
      window.dispatchEvent(new MouseEvent("mouseup"));
    });

    expect(result.current.openWindows).toHaveLength(0);
    expect(result.current.activeWindow).toBeNull();
  });

  it("snaps left then closes", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "Snap Left", { id: "snap-left" });
    });

    act(() => {
      result.current.startDrag("snap-left", { clientX: 120, clientY: 110 });
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 4, clientY: 140 }));
      window.dispatchEvent(new MouseEvent("mouseup"));
    });

    const snappedWindow = result.current.openWindows.find((windowItem) => windowItem.id === "snap-left");

    expect(snappedWindow).toBeDefined();
    expect(snappedWindow.position.x).toBe(0);

    act(() => {
      result.current.closeWindow("snap-left");
    });

    expect(result.current.openWindows).toHaveLength(0);
  });

  it("maximized window closes", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "Maximized", { id: "max-window" });
      result.current.maximizeWindow("max-window");
    });

    const targetWindow = result.current.openWindows.find((windowItem) => windowItem.id === "max-window");
    expect(targetWindow?.isMaximized).toBe(true);

    act(() => {
      result.current.closeWindow("max-window");
    });

    expect(result.current.openWindows).toHaveLength(0);
  });

  it("snaps right then closes", () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.openWindow(DummyComponent, "Snap Right", { id: "snap-right" });
    });

    act(() => {
      result.current.startDrag("snap-right", { clientX: 130, clientY: 110 });
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: window.innerWidth - 2, clientY: 150 }));
      window.dispatchEvent(new MouseEvent("mouseup"));
    });

    const snappedRight = result.current.openWindows.find((windowItem) => windowItem.id === "snap-right");
    expect(snappedRight).toBeDefined();
    expect(snappedRight.position.x).toBeGreaterThan(0);

    act(() => {
      result.current.closeWindow("snap-right");
    });

    expect(result.current.openWindows).toHaveLength(0);
  });
});
