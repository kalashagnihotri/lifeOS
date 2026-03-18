import { fireEvent, render, screen } from "@testing-library/react";
import Window from "../Window";

const createBaseProps = () => ({
  id: "focus-window",
  title: "Focus",
  position: { x: 120, y: 80 },
  size: { width: 860, height: 560 },
  zIndex: 30,
  isActive: true,
  isMinimized: false,
  isMinimizing: false,
  isRestoring: false,
  isDragging: false,
  isResizing: false,
  isMaximized: false,
  snapPreview: null,
  onActivate: vi.fn(),
  onClose: vi.fn(),
  onMinimize: vi.fn(),
  onMaximize: vi.fn(),
  onStartDrag: vi.fn(),
  onStartResize: vi.fn(),
});

const renderWindow = (overrides = {}) => {
  const props = {
    ...createBaseProps(),
    ...overrides,
  };

  render(
    <Window {...props}>
      <div>Window Body</div>
    </Window>
  );

  return props;
};

describe("Window controls interactions", () => {
  it("closes window from close control mousedown", () => {
    const props = renderWindow();

    fireEvent.mouseDown(screen.getByRole("button", { name: "Close window" }));

    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledWith("focus-window");
  });

  it("minimize and maximize controls trigger their handlers", () => {
    const props = renderWindow();

    fireEvent.mouseDown(screen.getByRole("button", { name: "Minimize window" }));
    fireEvent.mouseDown(screen.getByRole("button", { name: "Maximize window" }));

    expect(props.onMinimize).toHaveBeenCalledTimes(1);
    expect(props.onMinimize).toHaveBeenCalledWith("focus-window");
    expect(props.onMaximize).toHaveBeenCalledTimes(1);
    expect(props.onMaximize).toHaveBeenCalledWith("focus-window");
  });

  it("does not start drag when using any traffic-light control", () => {
    const props = renderWindow();

    fireEvent.mouseDown(screen.getByRole("button", { name: "Close window" }));
    fireEvent.mouseDown(screen.getByRole("button", { name: "Minimize window" }));
    fireEvent.mouseDown(screen.getByRole("button", { name: "Maximize window" }));

    expect(props.onStartDrag).not.toHaveBeenCalled();
  });

  it("starts drag when header is pressed directly", () => {
    const props = renderWindow();

    const title = screen.getByRole("heading", { name: "Focus" });
    const header = title.closest("header");

    expect(header).toBeTruthy();

    fireEvent.mouseDown(header, { button: 0, clientX: 400, clientY: 20 });

    expect(props.onStartDrag).toHaveBeenCalledTimes(1);
    expect(props.onStartDrag).toHaveBeenCalledWith("focus-window", expect.any(Object));
  });

  it("close still triggers when window is maximized", () => {
    const props = renderWindow({ isMaximized: true });

    fireEvent.mouseDown(screen.getByRole("button", { name: "Close window" }));

    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledWith("focus-window");
  });
});
