import { useEffect, useMemo, useState } from "react";
import { notify } from "../../../shared/utils/notify";
import {
  addNote as addNoteInService,
  deleteNote as deleteNoteInService,
  getNotes,
  getNotesHistory,
  updateNote as updateNoteInService,
} from "../services/noteService";

const normalizeNoteInput = (input = {}) => ({
  content: String(input?.content ?? ""),
  position: input?.position,
  size: input?.size,
  color: input?.color,
  isPinned: Boolean(input?.isPinned),
  stackId: input?.stackId ?? null,
  isMinimized: Boolean(input?.isMinimized),
});

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadNotes = async () => {
    const [loadedNotes, loadedHistory] = await Promise.all([getNotes(), getNotesHistory()]);
    setNotes(Array.isArray(loadedNotes) ? loadedNotes : []);
    setAllNotes(Array.isArray(loadedHistory) ? loadedHistory : []);
  };

  useEffect(() => {
    let isActive = true;

    const loadInitialNotes = async () => {
      try {
        const [loadedNotes, loadedHistory] = await Promise.all([getNotes(), getNotesHistory()]);

        if (isActive) {
          setNotes(Array.isArray(loadedNotes) ? loadedNotes : []);
          setAllNotes(Array.isArray(loadedHistory) ? loadedHistory : []);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadInitialNotes();

    return () => {
      isActive = false;
    };
  }, []);

  const addNote = async (input = {}) => {
    try {
      const result = await addNoteInService(normalizeNoteInput(input));
      const nextNotes = Array.isArray(result?.notes) ? result.notes : [];
      const createdNoteId = result?.createdNoteId || null;
      const nextHistory = await getNotesHistory();
      setNotes(nextNotes);
      setAllNotes(Array.isArray(nextHistory) ? nextHistory : []);

      notify({
        title: "Note created",
        message: "Your note was added successfully.",
        type: "success",
      });

      return createdNoteId;
    } catch {
      notify({
        title: "Create failed",
        message: "Could not create note. Please try again.",
        type: "error",
      });

      return null;
    }
  };

  const updateNote = async (id, updates = {}) => {
    if (!id) {
      return false;
    }

    try {
      const updatedNotes = await updateNoteInService(id, updates);
      const updatedHistory = await getNotesHistory();
      setNotes(Array.isArray(updatedNotes) ? updatedNotes : []);
      setAllNotes(Array.isArray(updatedHistory) ? updatedHistory : []);
      return true;
    } catch {
      notify({
        title: "Update failed",
        message: "Could not save note changes.",
        type: "error",
      });

      return false;
    }
  };

  const deleteNote = async (id) => {
    if (!id) {
      return false;
    }

    try {
      const updatedNotes = await deleteNoteInService(id);
      const updatedHistory = await getNotesHistory();
      setNotes(Array.isArray(updatedNotes) ? updatedNotes : []);
      setAllNotes(Array.isArray(updatedHistory) ? updatedHistory : []);

      notify({
        title: "Note deleted",
        message: "The note was removed.",
        type: "info",
      });

      return true;
    } catch {
      notify({
        title: "Delete failed",
        message: "Could not delete note.",
        type: "error",
      });

      return false;
    }
  };

  const sortedNotes = useMemo(() => {
    return [...notes].sort((firstNote, secondNote) => {
      return String(secondNote?.createdAt || "").localeCompare(String(firstNote?.createdAt || ""));
    });
  }, [notes]);

  return {
    notes: sortedNotes,
    allNotes,
    isLoading,
    loadNotes,
    addNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
