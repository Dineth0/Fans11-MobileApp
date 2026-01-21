import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
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
