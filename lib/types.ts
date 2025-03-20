export interface Transaction {
  id: string
  type: "send" | "receive"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
  recipient?: string
  sender?: string
  destinationCountry?: string
  localCurrency?: string
  localAmount?: number
}

export interface Contact {
  id: string
  name: string
  accountType?: "individual" | "company" | string
  bankName?: string
  accountNumber?: string
  country?: string
  hasDetails: boolean
}

export interface UserData {
  balance: number
  solanaAddress: string
  transactions: Transaction[]
  contacts: Contact[]
  // We could add profile fields here in a real app
  // name?: string
  // email?: string
  // phoneNumber?: string
}

export interface SendMoneyParams {
  type: "crypto" | "bank" | "link" | "nearby" | "charity"
  amount: number
  recipient?: string
  bankName?: string
  accountNumber?: string
  country?: string
  reference?: string
}

export interface RecipientDetails {
  type: "person" | "business"
  // Person details
  firstName?: string
  lastName?: string
  documentType?: "national_id" | "passport"
  documentNumber?: string
  email?: string
  phoneCountry?: string
  phoneNumber?: string
  // Business details
  companyName?: string
  businessIdNumber?: string
  businessAddress?: string
  businessEmail?: string
  businessPhoneCountry?: string
  businessPhoneNumber?: string
  // Bank details
  bank?: string
  accountCategory?: "individual" | "company"
  accountNumber?: string
}

