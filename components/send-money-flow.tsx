"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PaymentOptions } from "@/components/payment-options"
import { BankDetailsForm } from "@/components/bank-details-form"
import { PaymentReview } from "@/components/payment-review"
import { TransactionReceipt } from "@/components/transaction-receipt"
import { sendMoney } from "@/lib/transactions"
// import type { Contact } from "@/lib/types"
import type { Contact } from "@/lib/types"
import { create } from "axios"
import { se } from "date-fns/locale"

interface SendMoneyFlowProps {
  balance: number
  contacts: Contact[]
}

export function SendMoneyFlow({ balance, contacts }: SendMoneyFlowProps) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "crypto" | "contact">("bank")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [transactionId, setTransactionId] = useState<string>("")
  const [transactionDate, setTransactionDate] = useState<Date>(new Date())
  const [isProcessing, setIsProcessing] = useState(false)

  // Account type toggle
  const [accountType, setAccountType] = useState<"person" | "business">("person")

  // Person form fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [documentType, setDocumentType] = useState<"national_id" | "passport">("national_id")
  const [documentNumber, setDocumentNumber] = useState("")
  const [email, setEmail] = useState("")
  const [phoneCountry, setPhoneCountry] = useState("co")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Business form fields
  const [companyName, setCompanyName] = useState("")
  const [businessIdNumber, setBusinessIdNumber] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [businessPhoneCountry, setBusinessPhoneCountry] = useState("co")
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("")

  // Bank details (common for both)
  const [bank, setBank] = useState("")
  const [accountCategory, setAccountCategory] = useState<"individual" | "company">("individual")
  const [accountNumber, setAccountNumber] = useState("")

  // Payment details
  const [amount, setAmount] = useState("")

  const handleSelectPaymentMethod = (method: "bank" | "crypto", countryCode?: string) => {
    setPaymentMethod(method)
    if (countryCode) {
      setSelectedCountry(countryCode)
      // Pre-set the phone country code to match the selected country
      setPhoneCountry(countryCode)
      setBusinessPhoneCountry(countryCode)
    }
    setStep(2)
  }

  // Update the handleSelectContact function to fill in all the fields
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact)
    setPaymentMethod("contact")

    // Set the country if available
    if (contact.country) {
      setSelectedCountry(contact.country)
    }

    // Set account type
    if (contact.accountType === "company") {
      setAccountType("business")
      // Fill business fields if we have them
      setCompanyName(contact.name)
      // We don't have these fields in the Contact type, so we'll leave them empty
      // but in a real app, you would populate these from the contact data
      setBusinessIdNumber("")
      setBusinessAddress("")
      setBusinessEmail("")
      setBusinessPhoneCountry(contact.country || "co")
      setBusinessPhoneNumber("")
    } else {
      setAccountType("person")
      // Split name into first and last name
      const nameParts = contact.name.split(" ")
      setFirstName(nameParts[0] || "")
      setLastName(nameParts.slice(1).join(" ") || "")
      // We don't have these fields in the Contact type, so we'll leave them empty
      // but in a real app, you would populate these from the contact data
      setDocumentNumber("")
      setEmail("")
      setPhoneCountry(contact.country || "co")
      setPhoneNumber("")
    }

    // Set bank details
    if (contact.bankName) {
      // Convert bank name to bank code
      const bankCode = getBankCodeFromName(contact.bankName)
      setBank(bankCode)
    }

    if (contact.accountType === "company") {
      setAccountCategory("company")
    } else {
      setAccountCategory("individual")
    }

    if (contact.accountNumber) {
      setAccountNumber(contact.accountNumber)
    }

    // Go to step 2 to allow editing the details before proceeding
    setStep(2)
  }

  // Helper function to convert bank name to bank code
  const getBankCodeFromName = (bankName: string): string => {
    const bankMap: Record<string, string> = {
      Bancolombia: "bancolombia",
      "Banco de Bogotá": "banco_de_bogota",
      Davivienda: "davivienda",
      BBVA: "bbva",
      "Banco Popular": "banco_popular",
      Scotiabank: "scotiabank",
      Santander: "santander",
      "Banco de México": "banco_de_mexico",
      "Banco do Brasil": "banco_do_brasil",
      Itaú: "itau",
      Bradesco: "bradesco",
      "Banco de la Nación Argentina": "banco_nacion",
    }

    return bankMap[bankName] || bankName.toLowerCase().replace(/\s+/g, "_")
  }

  const handleBankDetailsSubmit = () => {
    setStep(3)
  }

  const handleReviewSubmit = async () => {
    setIsProcessing(true)

    try {
      // In a real app, this would submit the payment to the backend
      await sendMoney({
        type: "bank",
        amount: Number.parseFloat(amount),
        recipient: selectedContact?.id || "new",
        bankName: bank,
        accountNumber: accountNumber,
        country: selectedCountry,
      })

      // Generate a transaction ID (in a real app, this would come from the backend)
      const generatedId = `TX${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`
      setTransactionId(generatedId)

      // Set the transaction date to now
      setTransactionDate(new Date())

      // Move to the receipt step
      setStep(4)
    } catch (error) {
      // In a real app, you would handle errors here
      console.error("Transaction failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    if (step === 1) {
      router.push("/dashboard")
    } else {
      setStep(step === 3 ? 2 : 1)
    }
  }

  // Prepare recipient details for the review step
  const getRecipientDetails = () => {
    return {
      type: accountType,
      // Person details
      firstName,
      lastName,
      documentType,
      documentNumber,
      email,
      phoneCountry,
      phoneNumber,
      // Business details
      companyName,
      businessIdNumber,
      businessAddress,
      businessEmail,
      businessPhoneCountry,
      businessPhoneNumber,
      // Bank details
      bank,
      accountCategory,
      accountNumber,
    }
  }

  return (
    <div>
      {step === 1 && (
        <PaymentOptions
          onSelectMethod={handleSelectPaymentMethod}
          onSelectContact={handleSelectContact}
          contacts={contacts}
          onBack={handleBack}
        />
      )}

      {step === 2 && (
        <BankDetailsForm
          accountType={accountType}
          setAccountType={setAccountType}
          // Person form fields
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          documentType={documentType}
          setDocumentType={setDocumentType}
          documentNumber={documentNumber}
          setDocumentNumber={setDocumentNumber}
          email={email}
          setEmail={setEmail}
          phoneCountry={phoneCountry}
          setPhoneCountry={setPhoneCountry}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          // Business form fields
          companyName={companyName}
          setCompanyName={setCompanyName}
          businessIdNumber={businessIdNumber}
          setBusinessIdNumber={setBusinessIdNumber}
          businessAddress={businessAddress}
          setBusinessAddress={setBusinessAddress}
          businessEmail={businessEmail}
          setBusinessEmail={setBusinessEmail}
          businessPhoneCountry={businessPhoneCountry}
          setBusinessPhoneCountry={setBusinessPhoneCountry}
          businessPhoneNumber={businessPhoneNumber}
          setBusinessPhoneNumber={setBusinessPhoneNumber}
          // Bank details (common for both)
          bank={bank}
          setBank={setBank}
          accountCategory={accountCategory}
          setAccountCategory={setAccountCategory}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          onSubmit={handleBankDetailsSubmit}
          onBack={handleBack}
          selectedContact={selectedContact}
          selectedCountry={selectedCountry}
        />
      )}

      {step === 3 && (
        <PaymentReview
          amount={amount}
          setAmount={setAmount}
          balance={balance}
          recipient={
            selectedContact || {
              id: "new",
              name: accountType === "person" ? `${firstName} ${lastName}` : companyName,
              accountNumber: accountNumber,
              hasDetails: true,
            }
          }
          recipientDetails={getRecipientDetails()}
          onSubmit={handleReviewSubmit}
          onBack={handleBack}
          selectedCountry={selectedCountry}
          isProcessing={isProcessing}
        />
      )}

      {step === 4 && (
        <TransactionReceipt
          amount={amount}
          recipient={
            selectedContact || {
              id: "new",
              name: accountType === "person" ? `${firstName} ${lastName}` : companyName,
              accountNumber: accountNumber,
              hasDetails: true,
            }
          }
          recipientDetails={getRecipientDetails()}
          selectedCountry={selectedCountry}
          transactionId={transactionId}
          date={transactionDate}
        />
      )}
    </div>
  )
}

