import "@testing-library/jest-dom/vitest";

const ORIGINAL_RAF = window.requestAnimationFrame;
const ORIGINAL_CANCEL_RAF = window.cancelAnimationFrame;

beforeEach(() => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: 1280,
  });

  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    writable: true,
    value: 800,
  });

  window.requestAnimationFrame = (callback) => {
    callback(performance.now());
    return 1;
  };

  window.cancelAnimationFrame = () => {};
});

afterEach(() => {
  window.requestAnimationFrame = ORIGINAL_RAF;
  window.cancelAnimationFrame = ORIGINAL_CANCEL_RAF;
});
