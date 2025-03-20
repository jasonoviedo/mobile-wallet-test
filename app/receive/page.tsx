import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { ReceiveForm } from "@/components/receive-form"
import { DashboardHeader } from "@/components/dashboard-header"
import { getUserData } from "@/lib/user"
import { AppFooter } from "@/components/app-footer"

export default async function ReceivePage() {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get("auth-token")

  if (!isAuthenticated) {
    redirect("/")
  }

  const userData = await getUserData()

  return (
    <main className="min-h-screen bg-background pb-20">
      <DashboardHeader />
      <div className="container px-4 py-6 mx-auto max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl">
        <ReceiveForm address={userData.solanaAddress} />
      </div>
      <AppFooter />
    </main>
  )
}

