import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get("auth-token")

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md md:max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">AresPay</h1>
          <p className="mt-2 text-muted-foreground md:text-lg">
            Your secure wallet for USDC and Latin American banking
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}

