import type { Firestore } from "firebase/firestore";

/**
 * Shared Firestore helpers accept a db instance as the first parameter.
 *
 * Server components:
 *   const { serverApp } = await getAuthenticatedAppForUser();
 *   const db = getFirestore(serverApp);
 *
 * Client components:
 *   import { db } from "@/lib/firebase/client";
 *
 * Then use collection(db, "name"), getDocs(q), etc. from "firebase/firestore"
 */
export type { Firestore };
