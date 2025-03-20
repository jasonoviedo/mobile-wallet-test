"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { Transaction } from "@/lib/types"
import { useI18n } from "@/lib/i18n/i18n-context"

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("all")
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null)

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "all") return true
    if (activeTab === "sent") return tx.type === "send"
    if (activeTab === "received") return tx.type === "receive"
    return true
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const toggleExpand = (txId: string) => {
    if (expandedTransaction === txId) {
      setExpandedTransaction(null)
    } else {
      setExpandedTransaction(txId)
    }
  }

  // Generate a more concise description based on transaction data
  const getImprovedDescription = (tx: Transaction) => {
    if (tx.type === "send") {
      // For sent transactions
      if (tx.recipient?.startsWith("0x") || tx.recipient?.length > 20) {
        // If it's a crypto address
        return `To: ${tx.recipient?.substring(0, 6)}...${tx.recipient?.substring(tx.recipient.length - 4)}`
      } else {
        // If it's a bank transfer
        return `To: ${tx.description}`
      }
    } else {
      // For received transactions
      if (tx.sender?.startsWith("0x") || tx.sender?.length > 20) {
        // If it's a crypto address
        return `From: ${tx.sender?.substring(0, 6)}...${tx.sender?.substring(tx.sender.length - 4)}`
      } else {
        // If it's a bank transfer
        return `From: ${tx.description}`
      }
    }
  }

  // Get country flag emoji
  const getCountryFlag = (countryCode: string) => {
    const countries: Record<string, string> = {
      ar: "🇦🇷",
      bo: "🇧🇴",
      br: "🇧🇷",
      cl: "🇨🇱",
      co: "🇨🇴",
      cr: "🇨🇷",
      ec: "🇪🇨",
      sv: "🇸🇻",
      gt: "🇬🇹",
      hn: "🇭🇳",
      mx: "🇲🇽",
      ni: "🇳🇮",
      pa: "🇵🇦",
      py: "🇵🇾",
      pe: "🇵🇪",
      uy: "🇺🇾",
      ve: "🇻🇪",
      us: "🇺🇸",
    }
    return countries[countryCode] || "🌎"
  }

  // Get country name
  const getCountryName = (countryCode: string) => {
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
      us: "United States",
    }
    return countries[countryCode] || countryCode
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{t("transactions")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
            <TabsTrigger value="sent">{t("sent")}</TabsTrigger>
            <TabsTrigger value="received">{t("received")}</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">{t("noTransactions")}</div>
            ) : (
              <div>
                {filteredTransactions.map((tx, index) => (
                  <div key={tx.id}>
                    <div
                      className="flex items-center justify-between py-4 cursor-pointer hover:bg-muted/10"
                      onClick={() => tx.type === "send" && toggleExpand(tx.id)}
                    >
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium">{getImprovedDescription(tx)}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex flex-col items-end">
                          <span className={`font-medium ${tx.type === "send" ? "text-black" : "text-green-500"}`}>
                            {tx.type === "send" ? "-" : "+"}${tx.amount.toFixed(2)}
                          </span>
                          {tx.type === "send" && tx.localCurrency && tx.localAmount && (
                            <p className="text-xs text-muted-foreground">
                              {tx.localCurrency} {tx.localAmount.toLocaleString()}
                            </p>
                          )}
                        </div>
                        {tx.type === "send" && (
                          <div className="ml-2">
                            {expandedTransaction === tx.id ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded transaction details for sent transactions */}
                    {tx.type === "send" && expandedTransaction === tx.id && (
                      <div className="bg-muted/5 p-4 text-sm mb-2">
                        <h4 className="font-medium mb-2">{t("transactionDetails")}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("amount")}:</span>
                            <span>${tx.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("processingFee")}:</span>
                            <span>$0.50</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t mt-1">
                            <span className="font-medium">{t("amountToBeExchanged")}:</span>
                            <span>${(tx.amount - 0.5).toFixed(2)}</span>
                          </div>

                          {/* Destination country */}
                          {tx.destinationCountry && (
                            <div className="flex justify-between mt-3">
                              <span className="text-muted-foreground">{t("destinationCountry")}:</span>
                              <span>
                                {getCountryFlag(tx.destinationCountry)} {getCountryName(tx.destinationCountry)}
                              </span>
                            </div>
                          )}

                          {/* Local currency and amount */}
                          {tx.localCurrency && tx.localAmount && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("recipientReceives")}:</span>
                              <span>
                                {tx.localCurrency} {tx.localAmount.toLocaleString()}
                              </span>
                            </div>
                          )}

                          {tx.recipient && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("recipient")}:</span>
                              <span className="text-right">{tx.recipient}</span>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("status")}:</span>
                            <span className="capitalize">{tx.status}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("date")}:</span>
                            <span>{formatDate(tx.date)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Add separator after each transaction except the last one */}
                    {index < filteredTransactions.length - 1 && <div className="border-b border-border/40"></div>}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

