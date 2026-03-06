"use server";

import { cookies } from "next/headers";

export async function setSession(idToken: string | null) {
  const cookieStore = await cookies();
  if (idToken) {
    cookieStore.set("__session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: "/",
    });
  } else {
    cookieStore.delete("__session");
  }
}
