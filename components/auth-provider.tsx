"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";
import { onIdTokenChanged } from "@/lib/firebase/auth";
import { setSession } from "@/lib/firebase/session";

export type AuthUser = User | null;

type AuthContextValue = {
  user: AuthUser;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

/** Serialized user from server (User.toJSON()) */
export type SerializedUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
} | null;

type AuthProviderProps = {
  children: ReactNode;
  initialUser?: SerializedUser;
};

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(!initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(async (newUser) => {
      if (newUser) {
        const idToken = await newUser.getIdToken();
        await setSession(idToken);
      } else {
        await setSession(null);
      }
      setUser(newUser);
      router.refresh();
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      loading,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
