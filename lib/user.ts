"use server"

import { cookies } from "next/headers"
import { aresAPI, SendTransaction, ReceiveTransaction } from "./aresApi"
import type { UserData, Contact } from "./types"

// In a real app, this would fetch data from a database or API
export async function getUserData(): Promise<UserData> {
  const cookieStore = await cookies()
  
  const token = cookieStore.get("auth-token")

  aresAPI.setToken(token?.value || "")

  let apiContacts = await aresAPI.listContacts();
  let apiTransactions = await aresAPI.listTransactions();
  let apiWallet = await aresAPI.getWallet();
  let transactions = apiTransactions.map((transaction) => {
    const sendTransaction = transaction.type === "send" ? transaction as SendTransaction : null
    const receiveTransaction = transaction.type === "receive" ? transaction as ReceiveTransaction : null

    return {
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      date: new Date(transaction.date).toISOString(),
      status: transaction.status,
      sender: receiveTransaction?.sender,
      recipient: sendTransaction?.recipient,
      destinationCountry: sendTransaction?.destinationCountry,
      localCurrency: sendTransaction?.localCurrency,
      localAmount: sendTransaction?.localAmount,
    }
  })
  let contacts = apiContacts.map((contact) => {
    
    return {
      id: contact.id,
      name: contact.name,
      accountType: contact.bankDetails.accountType,
      bankName: contact.bankDetails.bankName,        // This is the bank code, not the full name
      accountNumber: contact.bankDetails.accountNumber,
      country: contact.country,
      hasDetails: true,
    } as Contact;
  });

  return {
    balance: apiWallet.balance,
    solanaAddress: apiWallet.walletAddress,
    transactions: transactions,
    contacts
  }
}

// [
//   {
//     id: "tx1",
//     type: "receive",
//     amount: 500,
//     description: "Carlos Mendez",
//     date: "2025-03-10T14:30:00Z",
//     status: "completed",
//     sender: "5xGrLDKQvPdvajFm9SxzgrLmKPfnGFPyfSLSBwjgNsQP",
//   },
//   {
//     id: "tx2",
//     type: "send",
//     amount: 120.5,
//     description: "Banco de México",
//     date: "2025-03-05T10:15:00Z",
//     status: "completed",
//     recipient: "Account ****4567",
//     destinationCountry: "mx",
//     localCurrency: "MXN",
//     localAmount: 2016.4, // 120 * 16.8 (exchange rate)
//   },
//   {
//     id: "tx3",
//     type: "receive",
//     amount: 750,
//     description: "Maria Silva",
//     date: "2025-02-28T16:45:00Z",
//     status: "completed",
//     sender: "7zJkR4U9JmvTY2sjZZeYiKxhLyBrJbj4TvQQFKRXWEHd",
//   },
//   {
//     id: "tx4",
//     type: "send",
//     amount: 85.25,
//     description: "Nubank",
//     date: "2025-02-20T09:30:00Z",
//     status: "completed",
//     recipient: "Account ****9012",
//     destinationCountry: "br",
//     localCurrency: "BRL",
//     localAmount: 427.51, // 84.75 * 5.05 (exchange rate)
//   },
//   {
//     id: "tx5",
//     type: "send",
//     amount: 200,
//     description: "Mercado Pago",
//     date: "2025-02-15T13:20:00Z",
//     status: "pending",
//     recipient: "Account ****3456",
//     destinationCountry: "ar",
//     localCurrency: "ARS",
//     localAmount: 173565, // 199.5 * 870 (exchange rate)
//   },
// ]


// return {
//   balance: 1250.75,
//   solanaAddress: "8xyt4ck7Xc9RWPHnMVYqiUNr1Y6iqTYC5aahLTQDmAMp",
//   transactions: [
//     {
//       id: "tx1",
//       type: "receive",
//       amount: 500,
//       description: "Carlos Mendez",
//       date: "2025-03-10T14:30:00Z",
//       status: "completed",
//       sender: "5xGrLDKQvPdvajFm9SxzgrLmKPfnGFPyfSLSBwjgNsQP",
//     },
//     {
//       id: "tx2",
//       type: "send",
//       amount: 120.5,
//       description: "Banco de México",
//       date: "2025-03-05T10:15:00Z",
//       status: "completed",
//       recipient: "Account ****4567",
//       destinationCountry: "mx",
//       localCurrency: "MXN",
//       localAmount: 2016.4, // 120 * 16.8 (exchange rate)
//     },
//     {
//       id: "tx3",
//       type: "receive",
//       amount: 750,
//       description: "Maria Silva",
//       date: "2025-02-28T16:45:00Z",
//       status: "completed",
//       sender: "7zJkR4U9JmvTY2sjZZeYiKxhLyBrJbj4TvQQFKRXWEHd",
//     },
//     {
//       id: "tx4",
//       type: "send",
//       amount: 85.25,
//       description: "Nubank",
//       date: "2025-02-20T09:30:00Z",
//       status: "completed",
//       recipient: "Account ****9012",
//       destinationCountry: "br",
//       localCurrency: "BRL",
//       localAmount: 427.51, // 84.75 * 5.05 (exchange rate)
//     },
//     {
//       id: "tx5",
//       type: "send",
//       amount: 200,
//       description: "Mercado Pago",
//       date: "2025-02-15T13:20:00Z",
//       status: "pending",
//       recipient: "Account ****3456",
//       destinationCountry: "ar",
//       localCurrency: "ARS",
//       localAmount: 173565, // 199.5 * 870 (exchange rate)
//     },
//   ],
//   contacts: [
//     {
//       id: "contact1",
//       name: "Abhishek Kumar",
//       accountType: "individual",
//       bankName: "Banco do Brasil",
//       accountNumber: "47686790",
//       country: "br",
//       hasDetails: true,
//     },
//     {
//       id: "contact2",
//       name: "Camilo Jimenez",
//       accountType: "individual",
//       bankName: "Bancolombia",
//       accountNumber: "40735688",
//       country: "co",
//       hasDetails: true,
//     },
//     {
//       id: "contact3",
//       name: "Dhruv Sarin",
//       accountType: "individual",
//       bankName: "BBVA",
//       accountNumber: "38291047",
//       country: "mx",
//       hasDetails: true,
//     },
//     {
//       id: "contact4",
//       name: "Tecnologías Avanzadas S.A.",
//       accountType: "company",
//       bankName: "Santander",
//       accountNumber: "59274610",
//       country: "ar",
//       hasDetails: true,
//     },
//     {
//       id: "contact5",
//       name: "Grupo Financiero Latam",
//       accountType: "company",
//       bankName: "Itaú",
//       accountNumber: "68392014",
//       country: "cl",
//       hasDetails: true,
//     },
//   ],
// }

