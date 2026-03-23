import { useEffect, useMemo, useRef, useState } from "react";
import {
  getNoteActionButtonStyles,
  getNoteBodyStyles,
  getNoteCardStyles,
  getNoteColorListStyles,
  getNoteColorSwatchStyles,
  getNoteFooterStyles,
  getNoteHeaderActionGroupStyles,
  getNoteHeaderStyles,
  getNoteMetaStyles,
  getNoteResizeHandleStyles,
  getNoteStackBadgeStyles,
  getNoteTextAreaStyles,
  getNoteTitleStyles,
  getStickyNoteShellStyles,
  STICKY_NOTE_PALETTE,
} from "./notes.styles";

const formatCreatedAt = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const saveTimeoutById = new Map();

const NoteCard = ({
  note,
  view,
  isDragging = false,
  isResizing = false,
  onStartDrag,
  onStartResize,
  onDelete,
  onColorChange,
  onAutoSave,
  onActivate,
  shouldAutoFocus = false,
  onAutoFocusHandled,
  onTogglePin,
  onToggleMinimize,
  onToggleStack,
  stackCount = 1,
  isPinned = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(Boolean(shouldAutoFocus));
  const [draftContent, setDraftContent] = useState(String(note?.content || ""));
  const textAreaRef = useRef(null);
  const createdAtLabel = useMemo(() => formatCreatedAt(note?.createdAt), [note?.createdAt]);
  const noteTilt = useMemo(() => {
    const idHash = String(note?.id || "").split("").reduce((total, char) => total + char.charCodeAt(0), 0);
    return idHash % 2 === 0 ? -0.55 : 0.55;
  }, [note?.id]);

  useEffect(() => {
    if (!isEditing) {
      return undefined;
    }

    if (String(draftContent) === String(note?.content || "")) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onAutoSave?.(note?.id, { content: draftContent });
      saveTimeoutById.delete(note?.id);
    }, 420);

    saveTimeoutById.set(note?.id, timeoutId);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [draftContent, isEditing, note?.content, note?.id, onAutoSave]);

  useEffect(() => {
    if (!shouldAutoFocus) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      onActivate?.(note?.id);
      textAreaRef.current?.focus();

      const currentLength = textAreaRef.current?.value?.length || 0;

      if (typeof textAreaRef.current?.setSelectionRange === "function") {
        textAreaRef.current.setSelectionRange(currentLength, currentLength);
      }

      onAutoFocusHandled?.(note?.id);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [note?.id, onActivate, onAutoFocusHandled, shouldAutoFocus]);

  const commitIfNeeded = async () => {
    if (String(draftContent) === String(note?.content || "")) {
      return;
    }

    const pendingTimeout = saveTimeoutById.get(note?.id);

    if (pendingTimeout) {
      window.clearTimeout(pendingTimeout);
      saveTimeoutById.delete(note?.id);
    }

    await onAutoSave?.(note?.id, { content: draftContent });
  };

  const paletteEntries = Object.entries(STICKY_NOTE_PALETTE);

  return (
    <article
      style={getStickyNoteShellStyles({
        x: view?.position?.x,
        y: view?.position?.y,
        width: view?.size?.width,
        height: view?.size?.height,
        zIndex: view?.zIndex,
        isDragging,
        isResizing,
        isFocused,
      })}
      onMouseDown={() => onActivate?.(note?.id)}
    >
      <section
        style={getNoteCardStyles({
          color: note?.color,
          isHovered,
          isFocused,
          isDragging,
          isEditing,
          tiltAngle: noteTilt,
          stackCount,
        })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <header
          style={getNoteHeaderStyles({ isDragging })}
          onPointerDown={(event) => onStartDrag?.(note?.id, event)}
        >
          <p style={getNoteTitleStyles()}>Note</p>

          <div style={getNoteHeaderActionGroupStyles()} onPointerDown={(event) => event.stopPropagation()}>
            {stackCount > 1 ? (
              <button
                type="button"
                style={getNoteStackBadgeStyles({ stackCount })}
                onClick={() => onToggleStack?.(note?.stackId)}
                aria-label="Toggle stack"
              >
                {`x${stackCount}`}
              </button>
            ) : null}

            <button
              type="button"
              style={getNoteActionButtonStyles({ tone: "neutral" })}
              onClick={() => onTogglePin?.(note?.id, !note?.isPinned)}
            >
              {isPinned ? "Unpin" : "Pin"}
            </button>

            <button
              type="button"
              style={getNoteActionButtonStyles({ tone: "neutral" })}
              onClick={() => onToggleMinimize?.(note?.id, true)}
            >
              Min
            </button>

            <div style={getNoteColorListStyles()}>
              {paletteEntries.map(([paletteKey, paletteColor]) => (
                <button
                  key={paletteKey}
                  type="button"
                  style={getNoteColorSwatchStyles({ color: paletteColor, isActive: note?.color === paletteColor })}
                  onClick={() => onColorChange?.(note?.id, paletteColor)}
                  aria-label={`Set note color ${paletteKey}`}
                />
              ))}
            </div>
          </div>
        </header>

        <div style={getNoteBodyStyles()}>
          <textarea
            ref={textAreaRef}
            value={isEditing ? draftContent : String(note?.content || "")}
            onClick={() => {
              setIsEditing(true);
              setIsFocused(true);
              setDraftContent(String(note?.content || ""));
              onActivate?.(note?.id);
            }}
            onFocus={() => {
              setIsFocused(true);
              setIsEditing(true);
            }}
            onChange={(event) => {
              setDraftContent(event.target.value);
              setIsEditing(true);
            }}
            onBlur={async () => {
              await commitIfNeeded();
              setIsEditing(false);
              setIsFocused(false);
            }}
            style={getNoteTextAreaStyles({ isEditing, isFocused })}
          />
        </div>

        <footer style={getNoteFooterStyles()}>
          {createdAtLabel ? <p style={getNoteMetaStyles()}>{`Created ${createdAtLabel}`}</p> : <span />}

          <button
            type="button"
            style={getNoteActionButtonStyles({ tone: "danger" })}
            onClick={() => onDelete?.(note?.id)}
          >
            Delete
          </button>
        </footer>
      </section>

      <span
        style={getNoteResizeHandleStyles({ isResizing })}
        onPointerDown={(event) => onStartResize?.(note?.id, event)}
      />
    </article>
  );
};

export default NoteCard;
