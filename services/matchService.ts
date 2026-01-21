import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const matchCollect = collection(db, "players");

export const addMatch = async (
  title: string,
  venue: string,
  date: string,
  teamA: { name: string; id: string; flag: string },
  teamB: { name: string; id: string; flag: string },
): Promise<string> => {
  try {
    const doc = await addDoc(matchCollect, {
      title: title,
      venue: venue,
      date: date,
      teamA: teamA,
      teamB: teamB,
      createdAt: new Date(),
    });
    return doc.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
