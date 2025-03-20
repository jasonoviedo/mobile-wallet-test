"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"
import type { RecipientDetails } from "@/lib/types"

interface TransactionReceiptProps {
  amount: string
  recipient: {
    id: string
    name: string
    accountNumber?: string
    hasDetails: boolean
  }
  recipientDetails?: RecipientDetails
  selectedCountry?: string
  transactionId: string
  date: Date
}

export function TransactionReceipt({
  amount,
  recipient,
  recipientDetails,
  selectedCountry,
  transactionId,
  date,
}: TransactionReceiptProps) {
  const { t } = useI18n()

  // Format the amount
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.parseFloat(amount) || 0)

  // Format the date
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  // Get country name from country code
  const getCountryName = (countryCode?: string) => {
    if (!countryCode) return ""

    const countries: Record<string, string> = {
      ar: "Argentina",
      bo: "Bolivia",
      br: "Brazil",
      cl: "Chile",
      co: "Colombia",
      cr: "Costa Rica",
      ec: "Ecuador",
      sv: "El Salvador",
      gt: "Guatemala",
      hn: "Honduras",
      mx: "Mexico",
      ni: "Nicaragua",
      pa: "Panama",
      py: "Paraguay",
      pe: "Peru",
      uy: "Uruguay",
      ve: "Venezuela",
    }

    return countries[countryCode] || countryCode
  }

  // Get bank name from bank code
  const getBankName = (bankCode?: string) => {
    if (!bankCode) return ""

    const banks: Record<string, string> = {
      bancolombia: "Bancolombia",
      banco_de_bogota: "Banco de Bogotá",
      davivienda: "Davivienda",
      bbva: "BBVA",
      banco_popular: "Banco Popular",
      scotiabank: "Scotiabank",
      santander: "Santander",
      banco_de_mexico: "Banco de México",
      banco_do_brasil: "Banco do Brasil",
      itau: "Itaú",
      bradesco: "Bradesco",
      banco_nacion: "Banco de la Nación Argentina",
    }

    return banks[bankCode] || bankCode
  }

  // Calculate local amount if country is selected
  const getLocalAmount = () => {
    if (!selectedCountry || !amount) return null

    const exchangeRates: Record<string, { rate: number; currency: string }> = {
      ar: { rate: 870, currency: "ARS" },
      bo: { rate: 6.91, currency: "BOB" },
      br: { rate: 5.05, currency: "BRL" },
      cl: { rate: 950, currency: "CLP" },
      co: { rate: 3900, currency: "COP" },
      cr: { rate: 520, currency: "CRC" },
      ec: { rate: 1, currency: "USD" },
      sv: { rate: 1, currency: "USD" },
      gt: { rate: 7.8, currency: "GTQ" },
      hn: { rate: 24.7, currency: "HNL" },
      mx: { rate: 16.8, currency: "MXN" },
      ni: { rate: 36.5, currency: "NIO" },
      pa: { rate: 1, currency: "USD" },
      py: { rate: 7300, currency: "PYG" },
      pe: { rate: 3.7, currency: "PEN" },
      uy: { rate: 39.5, currency: "UYU" },
      ve: { rate: 36.5, currency: "VES" },
    }

    if (!exchangeRates[selectedCountry]) return null

    const { rate, currency } = exchangeRates[selectedCountry]
    const amountValue = Number.parseFloat(amount) - 0.5 // Subtract fee
    const localAmount = amountValue * rate

    // Format based on currency value
    const formattedLocalAmount =
      localAmount >= 1000
        ? localAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })
        : localAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    return `${currency} ${formattedLocalAmount}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-center">{t("transactionSuccessful")}</h1>
        <p className="text-muted-foreground text-center mt-2">{t("moneyOnTheWay")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("transactionDetails")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-muted-foreground">{t("amount")}</span>
            <span className="font-medium">{formattedAmount}</span>
          </div>

          {getLocalAmount() && (
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">{t("recipientReceives")}</span>
              <span className="font-medium">{getLocalAmount()}</span>
            </div>
          )}

          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-muted-foreground">{t("recipient")}</span>
            <span className="font-medium">{recipient.name}</span>
          </div>

          {recipientDetails?.bank && (
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">{t("bank")}</span>
              <span className="font-medium">{getBankName(recipientDetails.bank)}</span>
            </div>
          )}

          {recipient.accountNumber && (
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">{t("accountNumber")}</span>
              <span className="font-medium">••••{recipient.accountNumber.slice(-4)}</span>
            </div>
          )}

          {selectedCountry && (
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">{t("destinationCountry")}</span>
              <span className="font-medium">{getCountryName(selectedCountry)}</span>
            </div>
          )}

          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-muted-foreground">{t("date")}</span>
            <span className="font-medium text-right">{formattedDate}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-muted-foreground">{t("transactionId")}</span>
            <span className="font-medium font-mono">{transactionId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t("status")}</span>
            <span className="font-medium text-green-500">{t("completed")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

