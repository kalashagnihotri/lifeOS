import { getCurrentUser } from "../../auth/services/authService";

const DEFAULT_POSITION = { x: 120, y: 120 };
const DEFAULT_SIZE = { width: 260, height: 220 };
const DEFAULT_COLOR = "#1A2233";

const toRoundedNumber = (value, fallback) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.round(parsed);
};

const normalizePosition = (position) => ({
  x: toRoundedNumber(position?.x, DEFAULT_POSITION.x),
  y: toRoundedNumber(position?.y, DEFAULT_POSITION.y),
});

const normalizeSize = (size) => ({
  width: Math.max(180, toRoundedNumber(size?.width, DEFAULT_SIZE.width)),
  height: Math.max(140, toRoundedNumber(size?.height, DEFAULT_SIZE.height)),
});

const normalizeContent = (content) => String(content ?? "");

const normalizeColor = (value) => {
  const rawValue = String(value ?? "").trim();
  return rawValue || DEFAULT_COLOR;
};

const normalizeStackId = (value) => {
  const rawValue = String(value ?? "").trim();
  return rawValue || null;
};

const normalizeNote = (note) => ({
  id: String(note?.id || ""),
  content: String(note?.content || ""),
  position: normalizePosition(note?.position),
  size: normalizeSize(note?.size),
  color: normalizeColor(note?.color),
  isPinned: Boolean(note?.isPinned),
  stackId: normalizeStackId(note?.stackId),
  isMinimized: Boolean(note?.isMinimized),
  createdAt: String(note?.createdAt || ""),
  isDeleted: Boolean(note?.isDeleted),
  deletedAt: note?.deletedAt ? String(note.deletedAt) : null,
});

const getNotesStorageKey = () => {
  const user = getCurrentUser();

  if (!user?.uid) {
    return null;
  }

  return `lifeos.localdb.${user.uid}.notes`;
};

const readNotes = () => {
  const storageKey = getNotesStorageKey();

  if (!storageKey || typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(storageKey);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((note) => normalizeNote(note)).filter((note) => note.id);
  } catch {
    return [];
  }
};

const writeNotes = (notes) => {
  const storageKey = getNotesStorageKey();

  if (!storageKey || typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(notes));
};

const sortNotesByCreatedAtDesc = (notes) => {
  return [...notes].sort((firstNote, secondNote) => {
    return String(secondNote?.createdAt || "").localeCompare(String(firstNote?.createdAt || ""));
  });
};

const createNoteId = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const getNotes = async () => {
  const notes = readNotes().filter((note) => !note.isDeleted);
  return sortNotesByCreatedAtDesc(notes);
};

export const getNotesHistory = async () => {
  return sortNotesByCreatedAtDesc(readNotes());
};

export const addNote = async (input = {}) => {
  if (!getNotesStorageKey()) {
    return {
      notes: [],
      createdNoteId: null,
    };
  }

  const existingNotes = await getNotesHistory();
  const noteId = createNoteId();
  const nextNote = normalizeNote({
    id: noteId,
    content: normalizeContent(input?.content),
    position: normalizePosition(input?.position),
    size: normalizeSize(input?.size),
    color: normalizeColor(input?.color),
    isPinned: Boolean(input?.isPinned),
    stackId: normalizeStackId(input?.stackId),
    isMinimized: Boolean(input?.isMinimized),
    createdAt: new Date().toISOString(),
    isDeleted: false,
    deletedAt: null,
  });

  writeNotes([nextNote, ...existingNotes]);

  const notes = await getNotes();

  return {
    notes,
    createdNoteId: noteId,
  };
};

export const updateNote = async (id, updates = {}) => {
  if (!getNotesStorageKey() || !id) {
    return [];
  }

  const updatePayload = {};

  if (Object.prototype.hasOwnProperty.call(updates, "content")) {
    updatePayload.content = normalizeContent(updates.content);
  }

  if (Object.prototype.hasOwnProperty.call(updates, "position")) {
    updatePayload.position = normalizePosition(updates.position);
  }

  if (Object.prototype.hasOwnProperty.call(updates, "size")) {
    updatePayload.size = normalizeSize(updates.size);
  }

  if (Object.prototype.hasOwnProperty.call(updates, "color")) {
    updatePayload.color = normalizeColor(updates.color);
  }

  if (Object.prototype.hasOwnProperty.call(updates, "isPinned")) {
    updatePayload.isPinned = Boolean(updates.isPinned);
  }

  if (Object.prototype.hasOwnProperty.call(updates, "stackId")) {
    updatePayload.stackId = normalizeStackId(updates.stackId);
  }

  if (Object.prototype.hasOwnProperty.call(updates, "isMinimized")) {
    updatePayload.isMinimized = Boolean(updates.isMinimized);
  }

  if (!Object.keys(updatePayload).length) {
    return getNotes();
  }

  const existingNotes = await getNotesHistory();
  const nextNotes = existingNotes.map((note) => {
    if (note.id !== String(id)) {
      return note;
    }

    return normalizeNote({
      ...note,
      ...updatePayload,
    });
  });

  writeNotes(nextNotes);

  return getNotes();
};

export const deleteNote = async (id) => {
  if (!getNotesStorageKey() || !id) {
    return [];
  }

  const existingNotes = await getNotesHistory();
  const nextNotes = existingNotes.map((note) => {
    if (note.id !== String(id)) {
      return note;
    }

    return normalizeNote({
      ...note,
      isDeleted: true,
      deletedAt: new Date().toISOString(),
    });
  });

  writeNotes(nextNotes);

  return getNotes();
};
