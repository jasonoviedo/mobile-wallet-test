"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

export function ActionButtons() {
  const router = useRouter()
  const { t } = useI18n()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // In a real app, you would fetch updated balance and transaction data
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.refresh()
    setIsRefreshing(false)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-20 space-y-1"
        onClick={() => router.push("/send")}
      >
        <ArrowUpRight className="h-6 w-6" />
        <span className="text-xs">{t("send")}</span>
      </Button>

      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-20 space-y-1"
        onClick={() => router.push("/receive")}
      >
        <ArrowDownLeft className="h-6 w-6" />
        <span className="text-xs">{t("receive")}</span>
      </Button>

      <Button
        variant="outline"
        className="flex flex-col items-center justify-center h-20 space-y-1"
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={`h-6 w-6 ${isRefreshing ? "animate-spin" : ""}`} />
        <span className="text-xs">{t("refresh")}</span>
      </Button>
    </div>
  )
}

