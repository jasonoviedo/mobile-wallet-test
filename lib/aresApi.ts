import axios from 'axios';

// ----------- TYPES ------------

// Add these interfaces

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  walletAddress: string;
  email: string;
  phone: PhoneNumber;
}

export interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: number; // USD, should be string as per spec
  date: string; // ISO 8601
  status: 'pending' | 'completed' | 'failed';  
  description: string;
}

export interface SendTransaction extends Transaction {
  type: 'send';  
  recipient: string;
  destinationCountry: string;
  localAmount: number;
  localCurrency: string;
}

export interface ReceiveTransaction extends Transaction {
  type: 'receive';
  sender: string;  
}

export interface Country {
  id: string;
  name: string;
  code: string;
  dialCode: string;
  currency: string;
  banks?: Bank[];
  exchangeRate?: ExchangeRate;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
  country: string;
}

export interface ExchangeRate {
  currency: string;
  rate: number;
  date: string;
}

export interface RefreshTokenResponse {
  token: string;
}
export interface PhoneNumber {
  country: string;
  dialCode: string;
  phone: string;
}

export interface OTPRequestResponse {
  message: string;
  expires_in: number;
}

export interface OTPVerifyPayload {
  otp: string;
  phoneNumber: PhoneNumber;
}

export interface OTPVerifyResponse {
  token: string;
  wallet?: any;
}

export interface BankDetails {
  bankCode: string;
  bankName: string;
  accountType: 'individual' | 'company';
  accountNumber: string;
}

export interface ContactBase {
  id?: string;
  country: string;
  name: string;
  phone: PhoneNumber;
  email: string;
  bankDetails: BankDetails;
  walletId?: string;
}

export interface PersonContact extends ContactBase {
  type: 'person';
  documentType: 'national_id' | 'passport';
  documentNumber: string;
}

export interface BusinessContact extends ContactBase {
  type: 'business';
  nationalIdentificationNumber: string;
  companyAddress: string;
}

export type Contact = PersonContact | BusinessContact;

// ----------- API CLIENT ------------

class AresAPI {
  private client: ReturnType<typeof axios.create>;
  private token: string | null = null;
  
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Attach token to every request if available
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${this.token}`;
      }
      return config;
    });
  }
  
  // ---- Auth Token Methods ----
  
  setToken(token: string) {
    this.token = token;
  }
  
  getToken(): string | null {
    return this.token;
  }
  
  clearToken() {
    this.token = null;
  }
  
  // ---- OTP ----
  
  async requestOTP(phoneNumber: PhoneNumber): Promise<OTPRequestResponse> {
    try {
      const response = await this.client.post<OTPRequestResponse>('/auth/otp/request', { phoneNumber });
      return response.data;
    } catch (error: any) {      
      throw new Error(error.response?.data?.error || 'Failed requesting OTP');
    }
  }
  
  async verifyOTP(payload: OTPVerifyPayload): Promise<OTPVerifyResponse> {
    try {
      const response = await this.client.post<OTPVerifyResponse>('/auth/otp/verify', payload);      
      
      return response.data;
    } catch (error: any) {
      
      throw new Error(error.response?.data?.error || 'Failed verifying OTP');
    }
  }
  
  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
    } catch (err) {
      console.warn('Logout request failed:', err);
    } finally {
      this.clearToken();
    }
  }
  
  // ---- Contacts ----
  
  async listContacts(): Promise<Contact[]> {
    try {
      const response = await this.client.get<Contact[]>('/contacts');
      return response.data;
    } catch (error: any) {    
      throw new Error(error.response?.data?.error || 'Failed to fetch contacts');
    }
  }
  
  async createContact(contact: Contact): Promise<Contact> {
    try {
      const response = await this.client.post<Contact>('/contacts', { contact });
      return response.data;
    } catch (error: any) {      
      throw new Error(error.response?.data?.error || 'Failed to create contact');
    }
  }
  
  async editContact(contactId: string, contact: Contact): Promise<Contact> {
    try {
      const response = await this.client.post<Contact>(`/contacts/${contactId}`, { contact });
      return response.data;
    } catch (error: any) {      
      throw new Error(error.response?.data?.error || 'Failed to edit contact');
    }
  }
  
  async sendMoney(contactId: string, amountUSD: number): Promise<SendTransaction> {
    try {
      const payload = {
        amount: amountUSD        
      };
      const response = await this.client.post<SendTransaction>(`/contacts/${contactId}/send`, payload);
      return response.data;
    } catch (error: any) {      
      throw new Error(error.response?.data?.error || 'Failed to send money');
    }
  }
  
  // ---- Wallet ----
  
  async getWallet(): Promise<Wallet> {
    try {
      const response = await this.client.get<Wallet>('/wallet');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch wallet');
    }
  }
  
  // ---- Transactions ----
  
  async listTransactions(): Promise<Transaction[]> {
    try {
      const response = await this.client.get<Transaction[]>('/transactions');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch transactions');
    }
  }
  
  // ---- Country ----
  
  async listCountries(): Promise<Country[]> {
    try {
      const response = await this.client.get<Country[]>('/countries');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch countries');
    }
  }
  
  async getExchangeRate(countryCode: string): Promise<ExchangeRate> {
    try {
      const response = await this.client.get<ExchangeRate>(`/countries/${countryCode}/exchange-rate`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch exchange rate');
    }
  }
  
  // ---- Auth: Refresh Token ----
  
  async refreshToken(token: string): Promise<RefreshTokenResponse> {
    try {
      const response = await this.client.post<RefreshTokenResponse>('/auth/refresh', { token });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to refresh token');
    }
  }
}

// ----------- EXPORT ------------

let url = process.env.ARES_API_URL || "http://localhost:3001/api";
if (!url) {
  throw new Error("ARES_API_URL is not defined");
}

export const aresAPI = new AresAPI(url);