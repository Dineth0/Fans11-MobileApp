import {
  addDoc,
  collection
} from "firebase/firestore";
import { db } from "./firebase";

const playerCollect = collection(db, "players");

export const addPlayer = async (
  name: string,
  image: string,
  role: string,
  country: string,
): Promise<string> => {
  try {
    const doc = await addDoc(playerCollect, {
      name: name,
      image: image,
      role: role,
      country: country,
      createdAt: new Date(),
    });
    return doc.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
