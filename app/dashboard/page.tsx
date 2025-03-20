import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { DashboardHeader } from "@/components/dashboard-header"
import { BalanceCard } from "@/components/balance-card"
import { TransactionList } from "@/components/transaction-list"
import { getUserData } from "@/lib/user"
import { AppFooter } from "@/components/app-footer"

export default async function DashboardPage() {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get("auth-token")

  if (!isAuthenticated) {
    redirect("/")
  }

  const userData = await getUserData()

  return (
    <main className="min-h-screen bg-background pb-20">
      <DashboardHeader />
      <div className="container px-4 py-6 space-y-6 mx-auto max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl">
        <BalanceCard balance={userData.balance} address={userData.solanaAddress} />
        <TransactionList transactions={userData.transactions} />
      </div>
      <AppFooter />
    </main>
  )
}

