import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "./firebase";

const matchCollect = collection(db, "players");

interface Country {
  id: string;
  name: string;
  flag: string;
}
export const addMatch = async (
  title: string,
  venue: string,
  date: string,
  teamA: Country,
  teamB: Country,
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

export const getAllMatches = async () => {
  try {
    const q = query(matchCollect, orderBy("createdAt", "desc"));
    const snaphot = await getDocs(q);
    return snaphot.docs.map((dataSet) => {
      const data = dataSet.data();
      return {
        id: dataSet.id,
        title: data.title as string,
        venue: data.vanue as string,
        date: data.date as string,
        teamA: data.teamA as Country,
        teamB: data.teamB as Country,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
