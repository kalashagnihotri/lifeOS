import MainLayout from "../../layouts/MainLayout/MainLayout";
import useNotes from "../../features/notes/hooks/useNotes";
import {
  getNotesCountBadgeStyles,
  getNotesEmptyStateStyles,
  getNotesHeaderStyles,
  getNotesItemMetaStyles,
  getNotesItemStatusStyles,
  getNotesItemStyles,
  getNotesItemTagListStyles,
  getNotesItemTagStyles,
  getNotesItemTitleStyles,
  getNotesListStyles,
  getNotesPageStyles,
  getNotesSummaryCardStyles,
  getNotesSummaryGridStyles,
  getNotesSummaryLabelStyles,
  getNotesSummaryValueStyles,
  getNotesSectionStyles,
  getNotesSectionTitleStyles,
  getNotesSubHeaderStyles,
} from "./notes.styles";

const formatDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const NoteRow = ({ note }) => {
  const excerpt = (note.content || "(empty note)").replace(/\s+/g, " ").trim();
  const isStacked = Boolean(note.stackId);

  return (
    <li style={getNotesItemStyles()}>
      <div>
        <p style={getNotesItemTitleStyles()}>{excerpt.slice(0, 150) || "(empty note)"}</p>
        <p style={getNotesItemMetaStyles()}>{`Created: ${formatDate(note.createdAt)}`}</p>
        {note.deletedAt ? <p style={getNotesItemMetaStyles()}>{`Deleted: ${formatDate(note.deletedAt)}`}</p> : null}
        <div style={getNotesItemTagListStyles()}>
          {note.isPinned ? <span style={getNotesItemTagStyles({ tone: "accent" })}>Pinned</span> : null}
          {note.isMinimized ? <span style={getNotesItemTagStyles({ tone: "info" })}>Minimized</span> : null}
          {isStacked ? <span style={getNotesItemTagStyles({ tone: "neutral" })}>{`Stack ${note.stackId}`}</span> : null}
        </div>
      </div>
      <span style={getNotesItemStatusStyles({ isDeleted: note.isDeleted })}>
        {note.isDeleted ? "Deleted" : "Active"}
      </span>
    </li>
  );
};

const Notes = ({ windowMode = false }) => {
  const { allNotes, isLoading } = useNotes();

  const activeNotes = allNotes.filter((note) => !note.isDeleted);
  const deletedNotes = allNotes.filter((note) => note.isDeleted);
  const totalNotes = allNotes.length;
  const pinnedNotes = activeNotes.filter((note) => note.isPinned);
  const minimizedNotes = activeNotes.filter((note) => note.isMinimized);

  const content = (
    <section style={getNotesPageStyles()}>
      <h1 style={getNotesHeaderStyles()}>Notes</h1>
      <p style={getNotesSubHeaderStyles()}>
        Notes history including currently active notes and deleted notes.
      </p>

      <section style={getNotesSummaryGridStyles()}>
        <div style={getNotesSummaryCardStyles()}>
          <p style={getNotesSummaryLabelStyles()}>Total Notes</p>
          <p style={getNotesSummaryValueStyles()}>{totalNotes}</p>
        </div>
        <div style={getNotesSummaryCardStyles()}>
          <p style={getNotesSummaryLabelStyles()}>Active</p>
          <p style={getNotesSummaryValueStyles()}>{activeNotes.length}</p>
        </div>
        <div style={getNotesSummaryCardStyles()}>
          <p style={getNotesSummaryLabelStyles()}>Deleted</p>
          <p style={getNotesSummaryValueStyles()}>{deletedNotes.length}</p>
        </div>
        <div style={getNotesSummaryCardStyles()}>
          <p style={getNotesSummaryLabelStyles()}>Pinned</p>
          <p style={getNotesSummaryValueStyles()}>{pinnedNotes.length}</p>
        </div>
        <div style={getNotesSummaryCardStyles()}>
          <p style={getNotesSummaryLabelStyles()}>Minimized</p>
          <p style={getNotesSummaryValueStyles()}>{minimizedNotes.length}</p>
        </div>
      </section>

      <section style={getNotesSectionStyles()}>
        <h2 style={getNotesSectionTitleStyles()}>
          Active Notes
          <span style={getNotesCountBadgeStyles()}>{activeNotes.length}</span>
        </h2>

        {isLoading ? (
          <p style={getNotesEmptyStateStyles()}>Loading notes...</p>
        ) : activeNotes.length ? (
          <ul style={getNotesListStyles()}>
            {activeNotes.map((note) => (
              <NoteRow key={note.id} note={note} />
            ))}
          </ul>
        ) : (
          <p style={getNotesEmptyStateStyles()}>No active notes yet.</p>
        )}
      </section>

      <section style={getNotesSectionStyles()}>
        <h2 style={getNotesSectionTitleStyles()}>
          Deleted Notes
          <span style={getNotesCountBadgeStyles()}>{deletedNotes.length}</span>
        </h2>

        {isLoading ? (
          <p style={getNotesEmptyStateStyles()}>Loading notes...</p>
        ) : deletedNotes.length ? (
          <ul style={getNotesListStyles()}>
            {deletedNotes.map((note) => (
              <NoteRow key={note.id} note={note} />
            ))}
          </ul>
        ) : (
          <p style={getNotesEmptyStateStyles()}>No deleted notes yet.</p>
        )}
      </section>
    </section>
  );

  if (windowMode) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default Notes;
