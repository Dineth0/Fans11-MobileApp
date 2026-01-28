import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase";

const commentCollect = collection(db, "Comments");

export const addComments = async (
  postId: string,
  userId: string,
  comment: string,
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated.");

    await addDoc(commentCollect, {
      postId,
      userId,
      comment,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
