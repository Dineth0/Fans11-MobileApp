import { db } from "@/services/firebase";
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
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

export const getAllCountries = async () => {
  try {
    const q = query(countryCollect, orderBy("createdAt", "desc"));
    const snaphot = await getDocs(q);
    return snaphot.docs.map((dataSet) => {
      const data = dataSet.data();
      return {
        id: dataSet.id,
        name: data.name as string,
        flag: data.flag as string,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
