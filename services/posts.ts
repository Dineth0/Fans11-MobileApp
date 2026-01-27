import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const postCollect = collection(db, "posts");

export const addReactions = async (
  select11PostId: string,
  userId: string,
  type: "like" | "dislike",
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated.");

    const ref = doc(db, "postReactions", select11PostId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        likes: type === "like" ? [userId] : [],
        dislikes: type === "dislike" ? [userId] : [],
        updatedAt: new Date(),
      });
      return;
    }

    const data = snap.data();

    if (type === "like") {
      const isLiked = data.likes?.includes(userId);
      await updateDoc(ref, {
        likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
        dislikes: arrayRemove(userId),
      });
    } else {
      const isdisliked = data.dislikes?.includes(userId);
      await updateDoc(ref, {
        dislikes: isdisliked ? arrayRemove(userId) : arrayUnion(userId),
        likes: arrayRemove(userId),
      });
    }
  } catch (error) {
    console.error(error);
  }
};
