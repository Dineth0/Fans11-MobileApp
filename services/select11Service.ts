import { Country } from "@/types/country";
import { Player } from "@/types/player";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const select11Collect = collection(db, "selected11s");

interface Match {
  title: string;
  venue: string;
  date: string;
  teamA: Country;
  teamB: Country;
}
interface Select11Data {
  matchId: string;
  matchTitle: string;

  select11: Player[];
  countryName: string;
  captainId: string;
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
