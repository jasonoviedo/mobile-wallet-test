"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sendMoney } from "@/lib/transactions"
import { Loader2 } from "lucide-react"

interface SendFormProps {
  balance: number
}

export function SendForm({ balance }: SendFormProps) {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [country, setCountry] = useState("mexico")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("crypto")

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const amountValue = Number.parseFloat(amount)

    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid amount")
      setLoading(false)
      return
    }

    if (amountValue > balance) {
      setError("Insufficient balance")
      setLoading(false)
      return
    }

    try {
      if (activeTab === "crypto") {
        if (!recipient) {
          throw new Error("Please enter a recipient address")
        }
        await sendMoney({
          type: "crypto",
          amount: amountValue,
          recipient,
        })
      } else {
        if (!bankName || !accountNumber) {
          throw new Error("Please fill in all bank details")
        }
        await sendMoney({
          type: "bank",
          amount: amountValue,
          bankName,
          accountNumber,
          country,
        })
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to send money. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
        <CardDescription>Send USDC to a crypto address or bank account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crypto" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USDC)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">Available balance: ${balance.toFixed(2)} USDC</p>
            </div>

            <TabsContent value="crypto" className="mt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="Solana address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="bank" className="mt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mexico">Mexico</SelectItem>
                    <SelectItem value="brazil">Brazil</SelectItem>
                    <SelectItem value="argentina">Argentina</SelectItem>
                    <SelectItem value="colombia">Colombia</SelectItem>
                    <SelectItem value="chile">Chile</SelectItem>
                    <SelectItem value="peru">Peru</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="Enter bank name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>
            </TabsContent>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Send Money"
              )}
            </Button>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}

