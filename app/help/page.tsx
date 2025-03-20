import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { DashboardHeader } from "@/components/dashboard-header"
import { AppFooter } from "@/components/app-footer"
import { HelpContent } from "@/components/help-content"

export default async function HelpPage() {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get("auth-token")

  if (!isAuthenticated) {
    redirect("/")
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <DashboardHeader />
      <div className="container px-4 py-6 mx-auto max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl">
        <HelpContent />
      </div>
      <AppFooter />
    </main>
  )
}

