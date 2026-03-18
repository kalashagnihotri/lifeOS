import {
  getEmptySessionStyles,
  getSessionCompletedAtStyles,
  getSessionDurationStyles,
  getSessionItemStyles,
  getSessionListStyles,
  getSessionSectionStyles,
  getSessionTitleStyles,
} from "./focus.styles";

const formatCompletedAt = (completedAt) => {
  return new Date(completedAt).toLocaleString();
};

const SessionHistory = ({ sessions }) => {
  return (
    <section style={getSessionSectionStyles()}>
      <h3 style={getSessionTitleStyles()}>Session History</h3>

      {!sessions.length ? (
        <p style={getEmptySessionStyles()}>No completed focus sessions yet.</p>
      ) : (
        <ul style={getSessionListStyles()}>
          {sessions.map((session) => (
            <li key={session.id} style={getSessionItemStyles()}>
              <p style={getSessionDurationStyles()}>{session.duration} min focus</p>
              <p style={getSessionCompletedAtStyles()}>{formatCompletedAt(session.completedAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SessionHistory;
