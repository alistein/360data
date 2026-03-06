import { redirect } from "next/navigation"
import { getAuthenticatedAppForUser } from "@/lib/firebase/server"

export default async function Page() {
  const { currentUser } = await getAuthenticatedAppForUser()
  if (currentUser) {
    redirect("/dashboard")
  }
  redirect("/signup")
}
