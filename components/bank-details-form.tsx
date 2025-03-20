"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import type { Contact } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useI18n } from "@/lib/i18n/i18n-context"

interface BankDetailsFormProps {
  accountType: "person" | "business"
  setAccountType: (type: "person" | "business") => void
  // Person form fields
  firstName: string
  setFirstName: (name: string) => void
  lastName: string
  setLastName: (name: string) => void
  documentType: "national_id" | "passport"
  setDocumentType: (type: "national_id" | "passport") => void
  documentNumber: string
  setDocumentNumber: (number: string) => void
  email: string
  setEmail: (email: string) => void
  phoneCountry: string
  setPhoneCountry: (country: string) => void
  phoneNumber: string
  setPhoneNumber: (number: string) => void
  // Business form fields
  companyName: string
  setCompanyName: (name: string) => void
  businessIdNumber: string
  setBusinessIdNumber: (number: string) => void
  businessAddress: string
  setBusinessAddress: (address: string) => void
  businessEmail: string
  setBusinessEmail: (email: string) => void
  businessPhoneCountry: string
  setBusinessPhoneCountry: (country: string) => void
  businessPhoneNumber: string
  setBusinessPhoneNumber: (number: string) => void
  // Bank details (common for both)
  bank: string
  setBank: (bank: string) => void
  accountCategory: "individual" | "company"
  setAccountCategory: (type: "individual" | "company") => void
  accountNumber: string
  setAccountNumber: (number: string) => void
  onSubmit: () => void
  onBack: () => void
  selectedContact: Contact | null
  selectedCountry?: string
}

export function BankDetailsForm({
  accountType,
  setAccountType,
  // Person form fields
  firstName,
  setFirstName,
  lastName,
  setLastName,
  documentType,
  setDocumentType,
  documentNumber,
  setDocumentNumber,
  email,
  setEmail,
  phoneCountry,
  setPhoneCountry,
  phoneNumber,
  setPhoneNumber,
  // Business form fields
  companyName,
  setCompanyName,
  businessIdNumber,
  setBusinessIdNumber,
  businessAddress,
  setBusinessAddress,
  businessEmail,
  setBusinessEmail,
  businessPhoneCountry,
  setBusinessPhoneCountry,
  businessPhoneNumber,
  setBusinessPhoneNumber,
  // Bank details (common for both)
  bank,
  setBank,
  accountCategory,
  setAccountCategory,
  accountNumber,
  setAccountNumber,
  onSubmit,
  onBack,
  selectedContact,
  selectedCountry,
}: BankDetailsFormProps) {
  const { t } = useI18n()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  // Validate if all required fields are filled
  const isFormValid = () => {
    // Common validations for both person and business
    const isBankDetailsValid = bank && accountNumber

    if (accountType === "person") {
      return firstName && lastName && documentNumber && email && phoneNumber && isBankDetailsValid
    } else {
      return (
        companyName && businessIdNumber && businessAddress && businessEmail && businessPhoneNumber && isBankDetailsValid
      )
    }
  }

  // Country data with flags (emoji), codes, dial codes, and exchange rates
  const countries = [
    { value: "ar", code: "AR", flag: "🇦🇷", dialCode: "+54", name: "Argentina", currency: "ARS", exchangeRate: 870 },
    { value: "bo", code: "BO", flag: "🇧🇴", dialCode: "+591", name: "Bolivia", currency: "BOB", exchangeRate: 6.91 },
    { value: "br", code: "BR", flag: "🇧🇷", dialCode: "+55", name: "Brazil", currency: "BRL", exchangeRate: 5.05 },
    { value: "cl", code: "CL", flag: "🇨🇱", dialCode: "+56", name: "Chile", currency: "CLP", exchangeRate: 950 },
    { value: "co", code: "CO", flag: "🇨🇴", dialCode: "+57", name: "Colombia", currency: "COP", exchangeRate: 3900 },
    { value: "cr", code: "CR", flag: "🇨🇷", dialCode: "+506", name: "Costa Rica", currency: "CRC", exchangeRate: 520 },
    { value: "ec", code: "EC", flag: "🇪🇨", dialCode: "+593", name: "Ecuador", currency: "USD", exchangeRate: 1 },
    { value: "sv", code: "SV", flag: "🇸🇻", dialCode: "+503", name: "El Salvador", currency: "USD", exchangeRate: 1 },
    { value: "gt", code: "GT", flag: "🇬🇹", dialCode: "+502", name: "Guatemala", currency: "GTQ", exchangeRate: 7.8 },
    { value: "hn", code: "HN", flag: "🇭🇳", dialCode: "+504", name: "Honduras", currency: "HNL", exchangeRate: 24.7 },
    { value: "mx", code: "MX", flag: "🇲🇽", dialCode: "+52", name: "Mexico", currency: "MXN", exchangeRate: 16.8 },
    { value: "ni", code: "NI", flag: "🇳🇮", dialCode: "+505", name: "Nicaragua", currency: "NIO", exchangeRate: 36.5 },
    { value: "pa", code: "PA", flag: "🇵🇦", dialCode: "+507", name: "Panama", currency: "USD", exchangeRate: 1 },
    { value: "py", code: "PY", flag: "🇵🇾", dialCode: "+595", name: "Paraguay", currency: "PYG", exchangeRate: 7300 },
    { value: "pe", code: "PE", flag: "🇵🇪", dialCode: "+51", name: "Peru", currency: "PEN", exchangeRate: 3.7 },
    { value: "uy", code: "UY", flag: "🇺🇾", dialCode: "+598", name: "Uruguay", currency: "UYU", exchangeRate: 39.5 },
    { value: "ve", code: "VE", flag: "🇻🇪", dialCode: "+58", name: "Venezuela", currency: "VES", exchangeRate: 36.5 },
  ]

  const banks = [
    { value: "bancolombia", label: "Bancolombia" },
    { value: "banco_de_bogota", label: "Banco de Bogotá" },
    { value: "davivienda", label: "Davivienda" },
    { value: "bbva", label: "BBVA" },
    { value: "banco_popular", label: "Banco Popular" },
    { value: "scotiabank", label: "Scotiabank" },
    { value: "santander", label: "Santander" },
    { value: "banco_de_mexico", label: "Banco de México" },
    { value: "banco_do_brasil", label: "Banco do Brasil" },
    { value: "itau", label: "Itaú" },
    { value: "bradesco", label: "Bradesco" },
    { value: "banco_nacion", label: "Banco de la Nación Argentina" },
  ]

  // Find the selected country for person
  const selectedCountryObj = countries.find((c) => c.value === phoneCountry) || countries[0]

  // Find the selected country for business
  const selectedBusinessCountryObj = countries.find((c) => c.value === businessPhoneCountry) || countries[0]

  // Find the country that was selected in step 1
  const selectedDestinationCountry = selectedCountry ? countries.find((c) => c.value === selectedCountry) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full mr-2">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">{t("addBankDetails")}</h1>
      </div>

      {/* Display selected destination country if available */}
      {selectedDestinationCountry && (
        <div className="bg-muted/30 rounded-lg p-3 flex items-center justify-between">
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
            <p className="font-medium">
              1 USD = {selectedDestinationCountry.currency}{" "}
              {countries.find((c) => c.value === selectedCountry)?.exchangeRate.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="bg-muted rounded-full p-1 flex mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded-full text-center ${
            accountType === "person" ? "bg-white shadow-sm" : ""
          }`}
          onClick={() => setAccountType("person")}
        >
          {t("person")}
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-full text-center ${
            accountType === "business" ? "bg-white shadow-sm" : ""
          }`}
          onClick={() => setAccountType("business")}
        >
          {t("business")}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {accountType === "person" ? (
          // Person Form
          <div>
            <h2 className="text-lg font-medium mb-4">{t("contactInformation")}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder={t("firstName")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <Input
                  placeholder={t("lastName")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">{t("documentType")}</p>
                <RadioGroup
                  value={documentType}
                  onValueChange={(value) => setDocumentType(value as "national_id" | "passport")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="national_id" id="national_id" />
                    <label htmlFor="national_id" className="text-sm cursor-pointer">
                      {t("nationalID")}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="passport" id="passport" />
                    <label htmlFor="passport" className="text-sm cursor-pointer">
                      {t("passport")}
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <Input
                placeholder={t("documentNumber")}
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                required
              />

              <Input
                type="email"
                placeholder={t("emailAddress")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="flex space-x-2">
                <Select value={phoneCountry} onValueChange={setPhoneCountry}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      <div className="flex items-center">
                        <span className="mr-2">{selectedCountryObj.flag}</span>
                        <span>{selectedCountryObj.code}</span>
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
                  type="tel"
                  placeholder={t("phoneNumber")}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        ) : (
          // Business Form
          <div>
            <h2 className="text-lg font-medium mb-4">{t("businessInformation")}</h2>
            <div className="space-y-4">
              <Input
                placeholder={t("companyName")}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />

              <Input
                placeholder={t("nationalIdentificationNumber")}
                value={businessIdNumber}
                onChange={(e) => setBusinessIdNumber(e.target.value)}
                required
              />

              <Input
                placeholder={t("address")}
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                required
              />

              <Input
                type="email"
                placeholder={t("email")}
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                required
              />

              <div className="flex space-x-2">
                <Select value={businessPhoneCountry} onValueChange={setBusinessPhoneCountry}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      <div className="flex items-center">
                        <span className="mr-2">{selectedBusinessCountryObj.flag}</span>
                        <span>{selectedBusinessCountryObj.code}</span>
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
                  type="tel"
                  placeholder={t("phone")}
                  value={businessPhoneNumber}
                  onChange={(e) => setBusinessPhoneNumber(e.target.value)}
                  required
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-medium mb-4">{t("bankDetails")}</h2>
          <div className="space-y-4">
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectBank")} />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.value} value={bank.value}>
                    {bank.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t("accountType")}</p>
              <RadioGroup
                value={accountCategory}
                onValueChange={(value) => setAccountCategory(value as "individual" | "company")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <label htmlFor="individual" className="text-sm cursor-pointer">
                    {t("individual")}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <label htmlFor="company" className="text-sm cursor-pointer">
                    {t("company")}
                  </label>
                </div>
              </RadioGroup>
            </div>

            <Input
              placeholder={t("accountNumber")}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className={`w-full transition-all duration-300 ${
            isFormValid()
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
          disabled={!isFormValid()}
        >
          {t("addAmountDetails")}
        </Button>
      </form>
    </div>
  )
}

