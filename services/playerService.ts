import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Player } from "../types/player";
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

export const getPlayersByCountry = async (countryName: string) => {
  try {
    const q = query(
      playerCollect,
      where("country", "==", countryName),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((dataSet) => {
      const data = dataSet.data();
      return {
        id: dataSet.id,
        name: data.name as string,
        image: data.image as string,
        role: data.role as string,
        country: data.country as string,
      };
    });
  } catch (error) {
    console.error("Error fetching players: ", error);
    return [];
  }
};

export const updatePlayer = async (id: string, updateData: Partial<Player>) => {
  try {
    const ref = doc(db, "players", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) throw new Error("Player not found");

    await updateDoc(ref, {
      ...updateData,
      updateAt: new Date(),
    });
  } catch (error) {
    console.error(error);
  }
};
