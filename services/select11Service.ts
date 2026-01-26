import { Player } from "@/types/player";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const select11Collect = collection(db, "selected11s");

interface Select11Data {
  matchId: string;
  matchTitle: string;
  select11: Player[];
  countryName: string;
  captainId: string;
  userId: string;
  userName: string;
  userImage?: string;
}
export const addSelect11 = async (
  select11Data: Select11Data,
): Promise<string> => {
  try {
    const doc = await addDoc(select11Collect, {
      ...select11Data,
      createdAt: new Date(),
    });
    return doc.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllSelection11s = async () => {
  try {
    const q = query(select11Collect, orderBy("createdAt", "desc"));
    const snaphot = await getDocs(q);

    return snaphot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSelection11sByUser = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  try {
    const q = query(
      select11Collect,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMySelection11 = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "selected11s", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("Task not found");
  if (snap.data().userId !== user.uid) throw new Error("Unauthorized");

  await deleteDoc(ref);
};

export const getSelection11sById = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "selected11s", id);
  const selection11Doc = await getDoc(ref);

  if (!selection11Doc.exists()) throw new Error("selection11 not found");

  const data = selection11Doc.data() as Select11Data;
  if (data.userId !== user.uid) throw new Error("Unauthorized");

  return {
    id: selection11Doc.id,
    ...data,
  };
};

export const updateMySelection11s = async (
  id: string,
  updateData: Partial<Select11Data>,
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated.");

    const ref = doc(db, "selected11s", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) throw new Error("selected11s not found");

    const data = snap.data();
    if (data.userId !== user.uid) throw new Error("Unauthorized");

    await updateDoc(ref, {
      ...updateData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(error);
  }
};
