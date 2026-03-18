const FOCUS_SESSIONS_STORAGE_KEY = "lifeos.focus.sessions";

const readSessionsFromStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const rawSessions = window.localStorage.getItem(FOCUS_SESSIONS_STORAGE_KEY);

  if (!rawSessions) {
    return [];
  }

  try {
    const parsedSessions = JSON.parse(rawSessions);
    return Array.isArray(parsedSessions) ? parsedSessions : [];
  } catch {
    return [];
  }
};

const writeSessionsToStorage = (sessions) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(FOCUS_SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
};

const createSession = (session) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  duration: session.duration,
  completedAt: new Date().toISOString(),
});

export const getSessions = () => {
  return readSessionsFromStorage();
};

export const addSession = (session) => {
  const newSession = createSession(session);
  const existingSessions = readSessionsFromStorage();
  const updatedSessions = [newSession, ...existingSessions];

  writeSessionsToStorage(updatedSessions);

  return {
    newSession,
    sessions: updatedSessions,
  };
};

export const clearSessions = () => {
  writeSessionsToStorage([]);
  return [];
};
