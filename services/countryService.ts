import { db, storage } from "@/services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const countryCollect = collection(db, "countries");

export const addCountry = async (name: string, image: string) => {
  try {
    const filePath = `flags/${Date.now()}.png`;
    const storageReferance = ref(storage, filePath);

    const response = await fetch(image);
    const blob = await response.blob();

    await uploadBytes(storageReferance, blob);

    const downloadURL = await getDownloadURL(storageReferance);

    const doc = await addDoc(countryCollect, {
      name: name,
      image: downloadURL,
      cratedAt: new Date(),
    });
    return doc.id;
  } catch (error) {
    console.error(error);
  }
};
