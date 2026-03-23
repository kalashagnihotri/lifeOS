import { useEffect, useState } from "react";
import {
  getNoteActionButtonStyles,
  getNoteEditorActionsStyles,
  getNoteEditorFieldStyles,
  getNoteEditorFieldsRowStyles,
  getNoteEditorInputStyles,
  getNoteEditorLabelStyles,
  getNoteEditorStyles,
  getNoteEditorTextAreaStyles,
} from "./notes.styles";

const EMPTY_NOTE_DRAFT = {
  content: "",
  color: "#FFE08A",
  position: { x: 120, y: 120 },
  size: { width: 260, height: 220 },
};

const toFieldNumber = (value, fallback) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.round(parsed);
};

const toDraftFromNote = (note) => {
  const source = note || EMPTY_NOTE_DRAFT;

  return {
    content: String(source.content || ""),
    color: String(source.color || "#FFE08A"),
    position: {
      x: toFieldNumber(source?.position?.x, 120),
      y: toFieldNumber(source?.position?.y, 120),
    },
    size: {
      width: toFieldNumber(source?.size?.width, 260),
      height: toFieldNumber(source?.size?.height, 220),
    },
  };
};

const NoteEditor = ({ note = null, onSave, onCancel }) => {
  const [draft, setDraft] = useState(() => toDraftFromNote(note));

  useEffect(() => {
    setDraft(toDraftFromNote(note));
  }, [note]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (typeof onSave === "function") {
      await onSave({
        content: String(draft.content || "").trim(),
        color: draft.color,
        position: {
          x: toFieldNumber(draft.position.x, 120),
          y: toFieldNumber(draft.position.y, 120),
        },
        size: {
          width: Math.max(180, toFieldNumber(draft.size.width, 260)),
          height: Math.max(140, toFieldNumber(draft.size.height, 220)),
        },
      });
    }
  };

  return (
    <form style={getNoteEditorStyles()} onSubmit={handleSubmit}>
      <textarea
        value={draft.content}
        onChange={(event) => setDraft((previous) => ({ ...previous, content: event.target.value }))}
        placeholder="Write a note..."
        style={getNoteEditorTextAreaStyles()}
      />

      <div style={getNoteEditorFieldsRowStyles()}>
        <div style={getNoteEditorFieldStyles()}>
          <p style={getNoteEditorLabelStyles()}>Color</p>
          <input
            type="text"
            value={draft.color}
            onChange={(event) => setDraft((previous) => ({ ...previous, color: event.target.value }))}
            style={getNoteEditorInputStyles()}
            placeholder="#FFE08A"
          />
        </div>

        <div style={getNoteEditorFieldStyles()}>
          <p style={getNoteEditorLabelStyles()}>Position (x, y)</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <input
              type="number"
              value={draft.position.x}
              onChange={(event) => {
                const nextX = toFieldNumber(event.target.value, draft.position.x);
                setDraft((previous) => ({
                  ...previous,
                  position: { ...previous.position, x: nextX },
                }));
              }}
              style={getNoteEditorInputStyles()}
            />
            <input
              type="number"
              value={draft.position.y}
              onChange={(event) => {
                const nextY = toFieldNumber(event.target.value, draft.position.y);
                setDraft((previous) => ({
                  ...previous,
                  position: { ...previous.position, y: nextY },
                }));
              }}
              style={getNoteEditorInputStyles()}
            />
          </div>
        </div>
      </div>

      <div style={getNoteEditorFieldsRowStyles()}>
        <div style={getNoteEditorFieldStyles()}>
          <p style={getNoteEditorLabelStyles()}>Size (width, height)</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <input
              type="number"
              value={draft.size.width}
              onChange={(event) => {
                const nextWidth = toFieldNumber(event.target.value, draft.size.width);
                setDraft((previous) => ({
                  ...previous,
                  size: { ...previous.size, width: nextWidth },
                }));
              }}
              style={getNoteEditorInputStyles()}
            />
            <input
              type="number"
              value={draft.size.height}
              onChange={(event) => {
                const nextHeight = toFieldNumber(event.target.value, draft.size.height);
                setDraft((previous) => ({
                  ...previous,
                  size: { ...previous.size, height: nextHeight },
                }));
              }}
              style={getNoteEditorInputStyles()}
            />
          </div>
        </div>
      </div>

      <div style={getNoteEditorActionsStyles()}>
        <button type="button" style={getNoteActionButtonStyles()} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" style={getNoteActionButtonStyles()}>
          Save
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
