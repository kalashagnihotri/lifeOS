import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../core/firebase/firestore";
import { getCurrentUser } from "../../auth/services/authService";

const getTaskCollectionRef = () => {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  return collection(db, "users", user.uid, "tasks");
};

const mapTask = (taskDoc) => ({
  id: taskDoc.id,
  ...taskDoc.data(),
});

export const getTasks = async () => {
  const taskCollectionRef = getTaskCollectionRef();

  if (!taskCollectionRef) {
    return [];
  }

  const snapshot = await getDocs(taskCollectionRef);

  return snapshot.docs
    .map(mapTask)
    .sort((firstTask, secondTask) => (secondTask.createdAt || "").localeCompare(firstTask.createdAt || ""));
};

export const addTask = async (task) => {
  const taskCollectionRef = getTaskCollectionRef();

  if (!taskCollectionRef) {
    return [];
  }

  await addDoc(taskCollectionRef, {
    title: task.title,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  return getTasks();
};

export const toggleTask = async (id) => {
  const user = getCurrentUser();

  if (!user) {
    return [];
  }

  const existingTasks = await getTasks();
  const targetTask = existingTasks.find((task) => task.id === id);

  if (!targetTask) {
    return existingTasks;
  }

  const taskDocRef = doc(db, "users", user.uid, "tasks", id);

  await updateDoc(taskDocRef, {
    completed: !targetTask.completed,
  });

  return getTasks();
};

export const deleteTask = async (id) => {
  const user = getCurrentUser();

  if (!user) {
    return [];
  }

  const taskDocRef = doc(db, "users", user.uid, "tasks", id);
  await deleteDoc(taskDocRef);

  return getTasks();
};
