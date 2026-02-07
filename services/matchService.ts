import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

const matchCollect = collection(db, "matches");

interface Country {
  id: string;
  name: string;
  flag: string;
}
interface MatchData {
  tourName: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  teamA: Country;
  teamB: Country;
}
export const addMatch = async (matchData: MatchData): Promise<string> => {
  try {
    const doc = await addDoc(matchCollect, {
      ...matchData,
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
    const now = new Date();
    return snaphot.docs
      .map((dataSet) => {
        const data = dataSet.data();
        return {
          id: dataSet.id,
          ...(data as MatchData),
        };
      })
      .filter((match) => {
        const matchTime = new Date(match.date);
        return matchTime > now;
      });
  } catch (error) {
    console.error(error);
    return [];
  }
};
