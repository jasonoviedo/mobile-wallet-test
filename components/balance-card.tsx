"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Eye, EyeOff } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

interface BalanceCardProps {
  balance: number
  address: string
}

export function BalanceCard({ balance, address }: BalanceCardProps) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const [showBalance, setShowBalance] = useState(true)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium md:text-xl">{t("balance")}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-9 md:w-9 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-baseline">
            <span className="text-3xl md:text-4xl font-bold">{showBalance ? formatBalance(balance) : "••••••"}</span>
            <span className="ml-2 text-primary-foreground/80 md:text-lg">USDC</span>
          </div>

          <div className="flex items-center justify-between bg-primary-foreground/10 rounded-md p-2 md:p-3">
            <span className="text-sm md:text-base text-primary-foreground/90">{formatAddress(address)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-9 md:w-9 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : <Copy className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

