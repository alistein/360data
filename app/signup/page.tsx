import type { Metadata } from "next"
import { SignupForm } from "@/components/signup-form"
import { AuthPageGradient } from "@/components/auth-page-gradient"
import { RedirectIfAuthenticated } from "@/components/redirect-if-authenticated"

export const metadata: Metadata = {
  title: "Sign up",
}

export default function SignupPage() {
  return (
    <RedirectIfAuthenticated>
      <AuthPageGradient>
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </AuthPageGradient>
    </RedirectIfAuthenticated>
  )
}
