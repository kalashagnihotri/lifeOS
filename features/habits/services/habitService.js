import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../core/firebase/firestore";
import { getCurrentUser } from "../../auth/services/authService";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getHabitCollectionRef = () => {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return collection(db, "users", user.uid, "habits");
};

const mapHabit = (habitDoc) => ({
  id: habitDoc.id,
  ...habitDoc.data(),
});

export const getHabits = async () => {
  const habitCollectionRef = getHabitCollectionRef();

  if (!habitCollectionRef) {
    return [];
  }

  const snapshot = await getDocs(habitCollectionRef);

  return snapshot.docs
    .map(mapHabit)
    .sort((firstHabit, secondHabit) => (secondHabit.createdAt || "").localeCompare(firstHabit.createdAt || ""));
};

export const addHabit = async (habit) => {
  const habitCollectionRef = getHabitCollectionRef();

  if (!habitCollectionRef) {
    return [];
  }

  await addDoc(habitCollectionRef, {
    title: habit.title,
    createdAt: new Date().toISOString(),
    completedDates: [],
  });

  return getHabits();
};

export const toggleHabitForToday = async (id) => {
  const user = getCurrentUser();

  if (!user) {
    return [];
  }

  const today = getTodayDate();
  const existingHabits = await getHabits();
  const targetHabit = existingHabits.find((habit) => habit.id === id);

  if (!targetHabit) {
    return existingHabits;
  }

  const completedDates = Array.isArray(targetHabit.completedDates) ? targetHabit.completedDates : [];
  const hasCompletedToday = completedDates.includes(today);
  const nextCompletedDates = hasCompletedToday
    ? completedDates.filter((date) => date !== today)
    : [...completedDates, today];

  const habitDocRef = doc(db, "users", user.uid, "habits", id);

  await updateDoc(habitDocRef, {
    completedDates: nextCompletedDates,
  });

  return getHabits();
};

export const deleteHabit = async (id) => {
  const user = getCurrentUser();

  if (!user) {
    return [];
  }

  const habitDocRef = doc(db, "users", user.uid, "habits", id);
  await deleteDoc(habitDocRef);

  return getHabits();
};
