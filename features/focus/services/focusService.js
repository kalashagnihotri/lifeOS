import { getCurrentUser } from "../../auth/services/authService";

const getSessionStorageKey = () => {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return `lifeos.localdb.${user.uid}.sessions`;
};

const readSessions = () => {
  const storageKey = getSessionStorageKey();

  if (!storageKey || typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(storageKey);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeSessions = (sessions) => {
  const storageKey = getSessionStorageKey();

  if (!storageKey || typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(sessions));
};

export const getSessions = async () => {
  return readSessions()
    .sort((firstSession, secondSession) => (secondSession.completedAt || "").localeCompare(firstSession.completedAt || ""));
};

export const addSession = async (session) => {
  const existingSessions = await getSessions();

  if (!getSessionStorageKey()) {
    return {
      newSession: null,
      sessions: [],
    };
  }

  const completedAt = new Date().toISOString();
  const newSession = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    duration: session.duration,
    completedAt,
  };
  writeSessions([newSession, ...existingSessions]);
  const sessions = await getSessions();

  return {
    newSession,
    sessions,
  };
};

export const clearSessions = async () => {
  writeSessions([]);

  return [];
};
