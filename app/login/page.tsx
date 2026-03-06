import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"
import { AuthPageGradient } from "@/components/auth-page-gradient"
import { RedirectIfAuthenticated } from "@/components/redirect-if-authenticated"

export const metadata: Metadata = {
  title: "Log in",
}

export default function LoginPage() {
  return (
    <RedirectIfAuthenticated>
      <AuthPageGradient>
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </AuthPageGradient>
    </RedirectIfAuthenticated>
  )
}
