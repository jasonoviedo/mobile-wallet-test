"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { requestOTP, verifyOTP } from "@/lib/auth"
import { Loader2 } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"
import { LanguageSwitcher } from "@/components/language-switcher"

// Country data with flags, codes, and dial codes
const countries = [
  { value: "us", code: "US", flag: "🇺🇸", dialCode: "+1", name: "United States" },
  { value: "ar", code: "AR", flag: "🇦🇷", dialCode: "+54", name: "Argentina" },
  { value: "bo", code: "BO", flag: "🇧🇴", dialCode: "+591", name: "Bolivia" },
  { value: "br", code: "BR", flag: "🇧🇷", dialCode: "+55", name: "Brazil" },
  { value: "cl", code: "CL", flag: "🇨🇱", dialCode: "+56", name: "Chile" },
  { value: "co", code: "CO", flag: "🇨🇴", dialCode: "+57", name: "Colombia" },
  { value: "cr", code: "CR", flag: "🇨🇷", dialCode: "+506", name: "Costa Rica" },
  { value: "ec", code: "EC", flag: "🇪🇨", dialCode: "+593", name: "Ecuador" },
  { value: "sv", code: "SV", flag: "🇸🇻", dialCode: "+503", name: "El Salvador" },
  { value: "gt", code: "GT", flag: "🇬🇹", dialCode: "+502", name: "Guatemala" },
  { value: "hn", code: "HN", flag: "🇭🇳", dialCode: "+504", name: "Honduras" },
  { value: "mx", code: "MX", flag: "🇲🇽", dialCode: "+52", name: "Mexico" },
  { value: "ni", code: "NI", flag: "🇳🇮", dialCode: "+505", name: "Nicaragua" },
  { value: "pa", code: "PA", flag: "🇵🇦", dialCode: "+507", name: "Panama" },
  { value: "py", code: "PY", flag: "🇵🇾", dialCode: "+595", name: "Paraguay" },
  { value: "pe", code: "PE", flag: "🇵🇪", dialCode: "+51", name: "Peru" },
  { value: "uy", code: "UY", flag: "🇺🇾", dialCode: "+598", name: "Uruguay" },
  { value: "ve", code: "VE", flag: "🇻🇪", dialCode: "+58", name: "Venezuela" },
  { value: "es", code: "ES", flag: "🇪🇸", dialCode: "+34", name: "Spain" },
  { value: "pt", code: "PT", flag: "🇵🇹", dialCode: "+351", name: "Portugal" },
]

export function LoginForm() {
  const router = useRouter()
  const { t } = useI18n()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("us") // Default to US
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Find the selected country object
  const selectedCountryObj = countries.find((c) => c.value === selectedCountry) || countries[0]

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Get the full phone number with country code
    const fullPhoneNumber = `${selectedCountryObj.dialCode}${phoneNumber.startsWith("0") ? phoneNumber.substring(1) : phoneNumber}`

    try {
      // await requestOTP(fullPhoneNumber) // Replacing with actual API call
      await requestOTP({
        country: selectedCountryObj.code,
        dialCode: selectedCountryObj.dialCode,
        phone: phoneNumber,
      })
      setStep("otp")
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Get the full phone number with country code
    const fullPhoneNumber = `${selectedCountryObj.dialCode}${phoneNumber.startsWith("0") ? phoneNumber.substring(1) : phoneNumber}`

    try {
      await verifyOTP({
        country: selectedCountryObj.code,
        dialCode: selectedCountryObj.dialCode,
        phone: phoneNumber,
      }, otp)
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError(t("invalidOTP"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <div className="absolute right-4 top-4">
          <LanguageSwitcher />
        </div>
        <CardTitle>{t("signIn")}</CardTitle>
        <CardDescription>{t("secureAccess")}</CardDescription>
      </CardHeader>
      <CardContent>
        {step === "phone" ? (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phoneNumber")}</Label>
              <div className="flex space-x-2">
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      <div className="flex items-center">
                        <span className="mr-2">{selectedCountryObj.flag}</span>
                        <span>{selectedCountryObj.dialCode}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        <div className="flex items-center">
                          <span className="mr-2">{country.flag}</span>
                          <span className="mr-2">{country.code}</span>
                          <span className="text-muted-foreground">{country.dialCode}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="123-456-7890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">{t("enterPhoneNumber")}</p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("sendingOTP")}
                </>
              ) : (
                t("requestOTP")
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">{t("oneTimePassword")}</Label>
              <Input
                id="otp"
                type="text"
                placeholder={t("enterCode")}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
              <p className="text-sm text-muted-foreground">
                {t("weSentCode")} {selectedCountryObj.dialCode}
                {phoneNumber}
              </p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("verifying")}
                </>
              ) : (
                t("verifyOTP")
              )}
            </Button>
            <Button type="button" variant="link" className="w-full" onClick={() => setStep("phone")} disabled={loading}>
              {t("changePhone")}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

