const NOTIFY_EVENT = "lifeos:notify";

export const notify = ({ title = "Update", message = "", type = "info", duration = 2800 } = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(NOTIFY_EVENT, {
      detail: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title,
        message,
        type,
        duration,
      },
    })
  );
};

export const NOTIFY_EVENT_NAME = NOTIFY_EVENT;
