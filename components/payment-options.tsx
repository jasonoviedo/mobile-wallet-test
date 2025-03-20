"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, ChevronRight, Building } from "lucide-react"
import type { Contact } from "@/lib/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useI18n } from "@/lib/i18n/i18n-context"

interface PaymentOptionsProps {
  onSelectMethod: (method: "bank" | "crypto" | "link", countryCode?: string) => void
  onSelectContact: (contact: Contact) => void
  contacts: Contact[]
  onBack: () => void
}

export function PaymentOptions({ onSelectMethod, onSelectContact, contacts }: PaymentOptionsProps) {
  const { t } = useI18n()
  const [showCountries, setShowCountries] = useState(false)

  // Country data with flags (emoji), codes, names, and exchange rates
  const countries = [
    { value: "ar", code: "AR", flag: "🇦🇷", name: "Argentina", currency: "ARS", exchangeRate: 870 },
    { value: "bo", code: "BO", flag: "🇧🇴", name: "Bolivia", currency: "BOB", exchangeRate: 6.91 },
    { value: "br", code: "BR", flag: "🇧🇷", name: "Brazil", currency: "BRL", exchangeRate: 5.05 },
    { value: "cl", code: "CL", flag: "🇨🇱", name: "Chile", currency: "CLP", exchangeRate: 950 },
    { value: "co", code: "CO", flag: "🇨🇴", name: "Colombia", currency: "COP", exchangeRate: 3900 },
    { value: "cr", code: "CR", flag: "🇨🇷", name: "Costa Rica", currency: "CRC", exchangeRate: 520 },
    { value: "ec", code: "EC", flag: "🇪🇨", name: "Ecuador", currency: "USD", exchangeRate: 1 },
    { value: "sv", code: "SV", flag: "🇸🇻", name: "El Salvador", currency: "USD", exchangeRate: 1 },
    { value: "gt", code: "GT", flag: "🇬🇹", name: "Guatemala", currency: "GTQ", exchangeRate: 7.8 },
    { value: "hn", code: "HN", flag: "🇭🇳", name: "Honduras", currency: "HNL", exchangeRate: 24.7 },
    { value: "mx", code: "MX", flag: "🇲🇽", name: "Mexico", currency: "MXN", exchangeRate: 16.8 },
    { value: "ni", code: "NI", flag: "🇳🇮", name: "Nicaragua", currency: "NIO", exchangeRate: 36.5 },
    { value: "pa", code: "PA", flag: "🇵🇦", name: "Panama", currency: "USD", exchangeRate: 1 },
    { value: "py", code: "PY", flag: "🇵🇾", name: "Paraguay", currency: "PYG", exchangeRate: 7300 },
    { value: "pe", code: "PE", flag: "🇵🇪", name: "Peru", currency: "PEN", exchangeRate: 3.7 },
    { value: "uy", code: "UY", flag: "🇺🇾", name: "Uruguay", currency: "UYU", exchangeRate: 39.5 },
    { value: "ve", code: "VE", flag: "🇻🇪", name: "Venezuela", currency: "VES", exchangeRate: 36.5 },
  ]

  const handleToggleCountries = () => {
    setShowCountries(!showCountries)
  }

  const handleSelectCountry = (countryCode: string) => {
    // Close the countries list and proceed to step 2 with the selected country
    setShowCountries(false)
    onSelectMethod("bank", countryCode)
  }

  // Format exchange rate based on value
  const formatExchangeRate = (rate: number, currency: string) => {
    // For high-value currencies, don't show decimal places
    const formattedRate =
      rate >= 100
        ? rate.toLocaleString("en-US", { maximumFractionDigits: 0 })
        : rate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return `1 USD = ${currency} ${formattedRate}`
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="flex items-center p-4 cursor-pointer hover:bg-muted/50" onClick={handleToggleCountries}>
          <div className="h-12 w-12 rounded-md bg-black flex items-center justify-center text-white mr-4">
            <Building className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{t("makeTransfer")}</h3>
            <p className="text-sm text-muted-foreground">{t("scheduledPayments")}</p>
          </div>
          {showCountries ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        {/* Countries list */}
        {showCountries && (
          <div className="border-t divide-y max-h-64 overflow-y-auto">
            {countries.map((country) => (
              <div
                key={country.value}
                className="flex items-center p-3 pl-16 cursor-pointer hover:bg-muted/50"
                onClick={() => handleSelectCountry(country.value)}
              >
                <span className="mr-3 text-lg">{country.flag}</span>
                <div className="flex-1">
                  <span>{country.name}</span>
                  <p className="text-xs text-muted-foreground">
                    {formatExchangeRate(country.exchangeRate, country.currency)}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}
      </Card>

      {contacts.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-muted-foreground mt-6 mb-2">{t("recent")}</h2>
          <Card className="overflow-hidden divide-y">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => onSelectContact(contact)}
              >
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback
                    className={`${
                      contact.accountType === "company" ? "bg-blue-100 text-blue-500" : "bg-primary/10 text-primary"
                    } font-semibold`}
                  >
                    {contact.accountType === "company" ? (
                      <Building className="h-5 w-5" />
                    ) : (
                      contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">{contact.name}</h3>
                    {contact.country && (
                      <span className="ml-2 text-lg">
                        {countries.find((c) => c.value === contact.country)?.flag || "🌎"}
                      </span>
                    )}
                  </div>
                  {contact.bankName && (
                    <p className="text-xs text-muted-foreground">
                      {contact.bankName} • {contact.accountType === "company" ? t("company") : t("individual")} •
                      {contact.accountNumber &&
                        contact.accountNumber.slice(-4).padStart(contact.accountNumber.length, "•")}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  )
}

