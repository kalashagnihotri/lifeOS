import { useEffect, useRef, useState } from "react";
import { NOTIFY_EVENT_NAME } from "../../utils/notify";
import {
  getToastContainerStyles,
  getToastItemStyles,
  getToastMessageStyles,
  getToastTitleStyles,
} from "./toast.styles";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef({});

  useEffect(() => {
    const timeoutRegistry = timeoutsRef.current;

    const handleNotify = (event) => {
      const toast = event.detail;

      if (!toast?.id) {
        return;
      }

      setToasts((previousToasts) => {
        return [...previousToasts, toast].slice(-4);
      });

      const timeoutId = window.setTimeout(() => {
        setToasts((previousToasts) => previousToasts.filter((item) => item.id !== toast.id));
        delete timeoutsRef.current[toast.id];
      }, toast.duration || 2800);

      timeoutRegistry[toast.id] = timeoutId;
    };

    window.addEventListener(NOTIFY_EVENT_NAME, handleNotify);

    return () => {
      window.removeEventListener(NOTIFY_EVENT_NAME, handleNotify);

      Object.values(timeoutRegistry).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  if (!toasts.length) {
    return null;
  }

  return (
    <aside style={getToastContainerStyles()} aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} style={getToastItemStyles({ type: toast.type })}>
          <p style={getToastTitleStyles()}>{toast.title || "Update"}</p>
          {toast.message ? <p style={getToastMessageStyles()}>{toast.message}</p> : null}
        </div>
      ))}
    </aside>
  );
};

export default ToastContainer;
