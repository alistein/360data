import { cn } from "@/lib/utils"

type AuthPageGradientProps = {
  children: React.ReactNode
  className?: string
}

export function AuthPageGradient({ children, className }: AuthPageGradientProps) {
  return (
    <div className={cn("relative min-h-svh overflow-hidden bg-background", className)}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-violet-200/70 via-violet-100/30 to-transparent dark:from-violet-950/40 dark:via-violet-900/15 dark:to-transparent"
        aria-hidden
      />
      <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        {children}
      </div>
    </div>
  )
}
