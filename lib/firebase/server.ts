import { cookies } from "next/headers";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeServerApp } from "firebase/app";
import { firebaseConfig } from "./config";

export async function getAuthenticatedAppForUser() {
  const cookieStore = await cookies();
  const authIdToken = cookieStore.get("__session")?.value;

  const serverApp = initializeServerApp(firebaseConfig, {
    authIdToken: authIdToken ?? undefined,
    releaseOnDeref: cookieStore,
  });

  const auth = getAuth(serverApp);
  await auth.authStateReady();

  return {
    serverApp,
    auth,
    currentUser: auth.currentUser,
  };
}
