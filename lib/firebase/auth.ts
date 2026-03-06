import {
  type Unsubscribe,
  createUserWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./client";

export function onAuthStateChanged(
  cb: (user: import("firebase/auth").User | null) => void
): Unsubscribe {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(
  cb: (user: import("firebase/auth").User | null) => void
): Unsubscribe {
  return _onIdTokenChanged(auth, cb);
}

export async function signUpWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
}

export async function signOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
}
