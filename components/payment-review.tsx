"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, User, Building, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import type { Contact, RecipientDetails } from "@/lib/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/i18n-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Add selectedCountry prop to the interface
interface PaymentReviewProps {
  amount: string
  setAmount: (amount: string) => void
  balance: number
  recipient: Contact
  recipientDetails?: RecipientDetails
  onSubmit: () => void
  onBack: () => void
  selectedCountry?: string
  isProcessing?: boolean
}

// Fixed processing fee in USD
const PROCESSING_FEE = 0.5

// Update the function parameters to include selectedCountry
export function PaymentReview({
  amount,
  setAmount,
  balance,
  recipient,
  recipientDetails,
  onSubmit,
  onBack,
  selectedCountry,
  isProcessing = false,
}: PaymentReviewProps) {
  const router = useRouter()
  const { t, language } = useI18n()
  const [error, setError] = useState("")
  const [showSummary, setShowSummary] = useState(true)
  const [localAmount, setLocalAmount] = useState("")
  const [localCurrency, setLocalCurrency] = useState("")
  const [exchangeableAmount, setExchangeableAmount] = useState("")

  // Add new state variables for exchange rate updates
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [previousExchangeRate, setPreviousExchangeRate] = useState<number | null>(null)
  const [showRateAlert, setShowRateAlert] = useState(false)
  const [rateIncreased, setRateIncreased] = useState<boolean | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Validate if the amount is valid
  const isAmountValid = () => {
    const amountValue = Number.parseFloat(amount)
    return !isNaN(amountValue) && amountValue > 0 && amountValue + PROCESSING_FEE <= balance
  }

  // Handle amount change with real-time validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)

    const amountValue = Number.parseFloat(value)
    if (isNaN(amountValue) || amountValue <= 0) {
      setError(t("enterValidAmount"))
    } else if (amountValue + PROCESSING_FEE > balance) {
      setError(t("insufficientBalance"))
    } else {
      setError("")
    }
  }

  // Exchange rates for Latin American countries (USD to local currency)
  const exchangeRates: Record<string, { rate: number; currency: string; symbol: string }> = {
    ar: { rate: 870, currency: "ARS", symbol: "$" }, // Argentine Peso
    bo: { rate: 6.91, currency: "BOB", symbol: "Bs" }, // Bolivian Boliviano
    br: { rate: 5.05, currency: "BRL", symbol: "R$" }, // Brazilian Real
    cl: { rate: 950, currency: "CLP", symbol: "$" }, // Chilean Peso
    co: { rate: 3900, currency: "COP", symbol: "$" }, // Colombian Peso
    cr: { rate: 520, currency: "CRC", symbol: "₡" }, // Costa Rican Colón
    ec: { rate: 1, currency: "USD", symbol: "$" }, // Ecuador uses USD
    sv: { rate: 8.75, currency: "SVC", symbol: "$" }, // Salvadoran Colón
    gt: { rate: 7.8, currency: "GTQ", symbol: "Q" }, // Guatemalan Quetzal
    hn: { rate: 24.7, currency: "HNL", symbol: "L" }, // Honduran Lempira
    mx: { rate: 16.8, currency: "MXN", symbol: "$" }, // Mexican Peso
    ni: { rate: 36.5, currency: "NIO", symbol: "C$" }, // Nicaraguan Córdoba
    pa: { rate: 1, currency: "USD", symbol: "$" }, // Panama uses USD
    py: { rate: 7300, currency: "PYG", symbol: "₲" }, // Paraguayan Guaraní
    pe: { rate: 3.7, currency: "PEN", symbol: "S/" }, // Peruvian Sol
    uy: { rate: 39.5, currency: "UYU", symbol: "$U" }, // Uruguayan Peso
    ve: { rate: 36.5, currency: "VES", symbol: "Bs.S" }, // Venezuelan Bolívar
  }

  // Function to simulate exchange rate fluctuation
  const getUpdatedExchangeRate = (currentRate: number): number => {
    // Simulate market fluctuation with a small random change (±2%)
    const fluctuationPercent = Math.random() * 4 - 2 // Random value between -2 and 2
    const fluctuationAmount = currentRate * (fluctuationPercent / 100)
    return currentRate + fluctuationAmount
  }

  // Update exchange rate every 15 seconds
  useEffect(() => {
    if (selectedCountry && exchangeRates[selectedCountry]) {
      // Set initial exchange rate
      const initialRate = exchangeRates[selectedCountry].rate
      setExchangeRate(initialRate)

      // Set up timer to update exchange rate every 15 seconds
      timerRef.current = setInterval(() => {
        setPreviousExchangeRate(exchangeRate)
        const newRate = getUpdatedExchangeRate(exchangeRate || initialRate)
        setExchangeRate(newRate)

        // Show alert when rate changes
        setShowRateAlert(true)
        setRateIncreased(newRate > (exchangeRate || initialRate))

        // Hide alert after 5 seconds
        setTimeout(() => {
          setShowRateAlert(false)
        }, 5000)
      }, 15000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [selectedCountry, exchangeRate])

  // Format currency based on locale and amount
  const formatCurrency = (value: number, currencyCode: string, symbol: string) => {
    // Get the appropriate locale based on the current language
    const locale = language === "es" ? "es-ES" : language === "pt" ? "pt-BR" : "en-US"

    // For high-value currencies, don't show decimal places
    const options: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: value >= 1000 ? 0 : 2,
      maximumFractionDigits: value >= 1000 ? 0 : 2,
    }

    return `${symbol} ${new Intl.NumberFormat(locale, options).format(value)}`
  }

  // Format exchange rate based on locale
  const formatExchangeRate = (rate: number) => {
    // Get the appropriate locale based on the current language
    const locale = language === "es" ? "es-ES" : language === "pt" ? "pt-BR" : "en-US"

    // For high-value currencies, don't show decimal places
    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: rate >= 100 ? 0 : 2,
      maximumFractionDigits: rate >= 100 ? 0 : 2,
    }

    return new Intl.NumberFormat(locale, options).format(rate)
  }

  // Update local currency amount when USD amount or exchange rate changes
  useEffect(() => {
    if (selectedCountry && amount && exchangeRate) {
      const amountValue = Number.parseFloat(amount)
      if (!isNaN(amountValue) && amountValue > 0) {
        const countryData = exchangeRates[selectedCountry]
        if (countryData) {
          // Calculate the amount to be exchanged (amount - fee)
          const amountToExchange = amountValue - PROCESSING_FEE

          // Format the exchangeable amount
          setExchangeableAmount(
            new Intl.NumberFormat(language === "es" ? "es-ES" : language === "pt" ? "pt-BR" : "en-US", {
              style: "currency",
              currency: "USD",
            }).format(amountToExchange),
          )

          // Calculate the local amount based on the exchangeable amount and current exchange rate
          const convertedAmount = amountToExchange * exchangeRate
          setLocalCurrency(countryData.currency)
          setLocalAmount(formatCurrency(convertedAmount, countryData.currency, countryData.symbol))
        }
      }
    }
  }, [amount, selectedCountry, language, exchangeRate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const amountValue = Number.parseFloat(amount)

    if (isNaN(amountValue) || amountValue <= 0) {
      setError(t("enterValidAmount"))
      return
    }

    if (amountValue + PROCESSING_FEE > balance) {
      setError(t("insufficientBalance"))
      return
    }

    // Call onSubmit without setting isProcessing locally
    onSubmit()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Get bank name from bank code
  const getBankName = (bankCode: string) => {
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

  // Get country name and flag from country code
  const getCountryInfo = (countryCode: string) => {
    const countries: Record<string, { name: string; flag: string; currency: string }> = {
      ar: { name: "Argentina", flag: "🇦🇷", currency: "ARS" },
      bo: { name: "Bolivia", flag: "🇧🇴", currency: "BOB" },
      br: { name: "Brazil", flag: "🇧🇷", currency: "BRL" },
      cl: { name: "Chile", flag: "🇨🇱", currency: "CLP" },
      co: { name: "Colombia", flag: "🇨🇴", currency: "COP" },
      cr: { name: "Costa Rica", flag: "🇨🇷", currency: "CRC" },
      ec: { name: "Ecuador", flag: "🇪🇨", currency: "USD" },
      sv: { name: "El Salvador", flag: "🇸🇻", currency: "USD" },
      gt: { name: "Guatemala", flag: "🇬🇹", currency: "GTQ" },
      hn: { name: "Honduras", flag: "🇭🇳", currency: "HNL" },
      mx: { name: "Mexico", flag: "🇲🇽", currency: "MXN" },
      ni: { name: "Nicaragua", flag: "🇳🇮", currency: "NIO" },
      pa: { name: "Panama", flag: "🇵🇦", currency: "USD" },
      py: { name: "Paraguay", flag: "🇵🇾", currency: "PYG" },
      pe: { name: "Peru", flag: "🇵🇪", currency: "PEN" },
      uy: { name: "Uruguay", flag: "🇺🇾", currency: "UYU" },
      ve: { name: "Venezuela", flag: "🇻🇪", currency: "VES" },
    }
    return countries[countryCode] || { name: countryCode, flag: "🌎", currency: "USD" }
  }

  // Find the country that was selected in step 1
  const selectedDestinationCountry = selectedCountry ? getCountryInfo(selectedCountry) : null

  // Format the processing fee with the current locale
  const formattedProcessingFee = new Intl.NumberFormat(
    language === "es" ? "es-ES" : language === "pt" ? "pt-BR" : "en-US",
    { style: "currency", currency: "USD" },
  ).format(PROCESSING_FEE)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Display selected destination country if available */}
      {selectedDestinationCountry && (
        <div className="bg-muted/30 rounded-lg p-3 flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-xl mr-3">{selectedDestinationCountry.flag}</span>
            <div>
              <p className="text-sm text-muted-foreground">{t("destinationCountry")}</p>
              <p className="font-medium">{selectedDestinationCountry.name}</p>
            </div>
          </div>
          {/* Exchange rate display */}
          <div className="text-right text-sm text-muted-foreground">
            <p>{t("exchangeRate")}</p>
            <p
              className={`font-medium ${
                rateIncreased === true ? "text-green-500" : rateIncreased === false ? "text-red-500" : ""
              }`}
            >
              1 USD = {exchangeRates[selectedCountry]?.symbol}{" "}
              {formatExchangeRate(exchangeRate || exchangeRates[selectedCountry]?.rate)}
            </p>
          </div>
        </div>
      )}

      {/* Exchange rate update alert */}
      {showRateAlert && (
        <Alert
          className={`${
            rateIncreased ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
          } animate-pulse`}
        >
          <AlertCircle className={`h-4 w-4 ${rateIncreased ? "text-green-500" : "text-red-500"}`} />
          <AlertDescription>
            {t("exchangeRate")} {rateIncreased ? t("increased") : t("decreased")}. {t("checkNewAmount")}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center py-6">
          <div className="relative inline-block">
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-muted-foreground">$</span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="text-5xl font-light text-center bg-transparent border-none focus:outline-none focus:ring-0 w-full pl-8"
              placeholder="0.00"
            />
          </div>

          {/* Display fee breakdown */}
          <div className="mt-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{t("amount")}:</span>
              <span>${new Intl.NumberFormat().format(Number.parseFloat(amount) || 0)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-muted-foreground">{t("processingFee")}:</span>
              <span>{formattedProcessingFee}</span>
            </div>
            <div className="flex justify-between items-center mt-1 pt-2 border-t">
              <span className="font-medium">{t("amountToBeExchanged")}:</span>
              <span className="font-medium">{exchangeableAmount}</span>
            </div>
          </div>

          {/* Display local currency equivalent below the breakdown */}
          {localAmount && (
            <div
              className={`mt-4 ${
                rateIncreased === true
                  ? "text-green-600"
                  : rateIncreased === false
                    ? "text-red-600"
                    : "text-muted-foreground"
              } transition-colors duration-500`}
            >
              {t("recipientReceives")}: <span className="font-medium">{localAmount}</span>
            </div>
          )}
        </div>

        <Card className="overflow-hidden divide-y">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3 bg-red-100">
                <AvatarFallback className="bg-red-100 text-red-500">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{t("personalAccount")}</p>
                <p className="text-sm text-muted-foreground">${balance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-green-100 text-green-500">
                    {recipientDetails?.type === "business" ? (
                      <Building className="h-5 w-5" />
                    ) : (
                      getInitials(recipient.name)
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{recipient.name}</p>
                </div>
              </div>

              {recipientDetails && (
                <Button
                  type="button" // Add type="button" to prevent form submission
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setShowSummary(!showSummary)}
                >
                  {showSummary ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      <span className="text-xs">{t("hideSummary")}</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      <span className="text-xs">{t("showSummary")}</span>
                    </>
                  )}
                </Button>
              )}
            </div>

            {recipientDetails && showSummary && (
              <div className="mt-4 text-sm space-y-3">
                {recipientDetails.type === "person" ? (
                  // Person details summary
                  <div className="space-y-1">
                    <p className="text-muted-foreground">
                      <span className="font-medium">{t("documentType")}:</span>{" "}
                      {recipientDetails.documentType === "national_id" ? t("nationalID") : t("passport")}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">{t("documentNumber")}:</span> {recipientDetails.documentNumber}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">{t("emailAddress")}:</span> {recipientDetails.email}
                    </p>
                    {recipientDetails.phoneCountry && (
                      <p className="text-muted-foreground">
                        <span className="font-medium">{t("phoneNumber")}:</span>{" "}
                        {getCountryInfo(recipientDetails.phoneCountry).flag} {recipientDetails.phoneNumber}
                      </p>
                    )}
                  </div>
                ) : (
                  // Business details summary
                  <div className="space-y-1">
                    <p className="text-muted-foreground">
                      <span className="font-medium">{t("nationalIdentificationNumber")}:</span>{" "}
                      {recipientDetails.businessIdNumber}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">{t("address")}:</span> {recipientDetails.businessAddress}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">{t("email")}:</span> {recipientDetails.businessEmail}
                    </p>
                    {recipientDetails.businessPhoneCountry && (
                      <p className="text-muted-foreground">
                        <span className="font-medium">{t("phone")}:</span>{" "}
                        {getCountryInfo(recipientDetails.businessPhoneCountry).flag}{" "}
                        {recipientDetails.businessPhoneNumber}
                      </p>
                    )}
                  </div>
                )}

                {/* Bank details summary */}
                <div className="pt-2 border-t border-muted">
                  <p className="text-muted-foreground">
                    <span className="font-medium">{t("bankDetails")}:</span> {getBankName(recipientDetails.bank)}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">{t("accountType")}:</span>{" "}
                    {recipientDetails.accountCategory === "individual" ? t("individual") : t("company")}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">{t("accountNumber")}:</span> {recipientDetails.accountNumber}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {error && <p className="text-sm text-destructive text-center">{error}</p>}

        <Button
          type="submit"
          className={`w-full transition-all duration-300 ${
            isAmountValid() && !isProcessing
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
          disabled={isProcessing || !isAmountValid()}
        >
          {isProcessing ? t("processing") : t("send")}
        </Button>
      </form>
    </div>
  )
}

