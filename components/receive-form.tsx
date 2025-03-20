"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, Share2 } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

interface ReceiveFormProps {
  address: string
}

export function ReceiveForm({ address }: ReceiveFormProps) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareAddress = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Solana Address",
          text: `Here's my Solana address: ${address}`,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      await copyToClipboard()
    }
  }

  // Generate QR code SVG
  const generateQRCode = () => {
    // In a real app, you would use a library like qrcode.react
    // For this demo, we'll use a placeholder
    return (
      <div ref={qrRef} className="bg-white p-4 rounded-lg mx-auto w-48 h-48 flex items-center justify-center">
        <img src={`/placeholder.svg?height=160&width=160`} alt="QR Code for Solana address" className="w-full h-full" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("receiveUSDC")}</CardTitle>
        <CardDescription>{t("shareAddress")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {generateQRCode()}
          <p className="text-sm text-muted-foreground">{t("scanToReceive")}</p>
        </div>

        <div className="p-3 bg-muted rounded-md break-all text-sm">{address}</div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center justify-center space-x-2" onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>{t("copied")}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{t("copy")}</span>
              </>
            )}
          </Button>

          <Button variant="outline" className="flex items-center justify-center space-x-2" onClick={shareAddress}>
            <Share2 className="h-4 w-4" />
            <span>{t("share")}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

