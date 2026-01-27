import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export const addReaction = async (
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

export const getReactions = (postId: string, callback: (data: any) => void) => {
  const ref = doc(db, "postReactions", postId);

  return onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback({ likes: [], dislikes: [] });
    }
  });
};
