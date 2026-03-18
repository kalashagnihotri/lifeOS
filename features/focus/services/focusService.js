import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../core/firebase/firestore";
import { getCurrentUser } from "../../auth/services/authService";

const getSessionCollectionRef = () => {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return collection(db, "users", user.uid, "sessions");
};

const mapSession = (sessionDoc) => ({
  id: sessionDoc.id,
  ...sessionDoc.data(),
});

export const getSessions = async () => {
  const sessionCollectionRef = getSessionCollectionRef();

  if (!sessionCollectionRef) {
    return [];
  }

  const snapshot = await getDocs(sessionCollectionRef);

  return snapshot.docs
    .map(mapSession)
    .sort((firstSession, secondSession) => (secondSession.completedAt || "").localeCompare(firstSession.completedAt || ""));
};

export const addSession = async (session) => {
  const sessionCollectionRef = getSessionCollectionRef();

  if (!sessionCollectionRef) {
    return {
      newSession: null,
      sessions: [],
    };
  }

  const completedAt = new Date().toISOString();
  const createdRef = await addDoc(sessionCollectionRef, {
    duration: session.duration,
    completedAt,
  });

  const sessions = await getSessions();

  return {
    newSession: {
      id: createdRef.id,
      duration: session.duration,
      completedAt,
    },
    sessions,
  };
};

export const clearSessions = async () => {
  const user = getCurrentUser();

  if (!user) {
    return [];
  }

  const sessions = await getSessions();

  await Promise.all(
    sessions.map((session) => {
      const sessionDocRef = doc(db, "users", user.uid, "sessions", session.id);
      return deleteDoc(sessionDocRef);
    })
  );

  return [];
};
