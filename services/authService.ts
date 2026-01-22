import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

interface IUserData {
  name: string;
  role: string;
  email: string;
  creatAt: any;
}

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const userRegister = async (
  fullName: string,
  email: string,
  password: string,
  role: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, { displayName: fullName });
  await setDoc(doc(db, "users", userCredential.user.uid), {
    name: fullName,
    role: role,
    email,
    creatAt: new Date(),
  });
  return userCredential.user;
};

export const getUserData = async (uid: string): Promise<IUserData> => {
  const userDoc = await getDoc(doc(db, "users", uid));

  if (!userDoc.exists()) {
    throw new Error("User Data not found");
  }
  return userDoc.data() as IUserData;
};

export const logOutUser = async () => {
  await signOut(auth);
  AsyncStorage.clear();
  return;
};
