import { Comment } from "@/types/Comments";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const commentCollect = collection(db, "Comments");

export const addComments = async (
  postId: string,
  userId: string,
  userName: string,
  userImage: string,
  comment: string,
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated.");

    await addDoc(commentCollect, {
      postId,
      userId,
      userName,
      userImage,
      comment,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComments = (
  postId: string,
  callback: (comments: Comment[]) => void,
) => {
  const q = query(
    commentCollect,
    where("postId", "==", postId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Comment),
    }));
    callback(comments);
  });
};

export const deleteComment = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  try {
    const ref = doc(db, "Comments", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) throw new Error("Task not found");
    if (snap.data().userId !== user.uid) throw new Error("Unauthorized");

    await deleteDoc(ref);
  } catch (error) {
    console.error(error);
  }
};
