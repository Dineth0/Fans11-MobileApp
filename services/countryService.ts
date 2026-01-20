import { db } from "@/services/firebase";
import {
    addDoc,
    collection
} from "firebase/firestore";

const countryCollect = collection(db, "countries");

export const addCountry = async (
  name: string,
  flagBase64: string,
): Promise<string> => {
  try {
    const doc = await addDoc(countryCollect, {
      name: name,
      flag: flagBase64,
      createdAt: new Date(),
    });
    return doc.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
