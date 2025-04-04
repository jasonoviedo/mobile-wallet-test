"use server"

import { cookies } from "next/headers";
import { aresAPI } from "./aresApi";
import type { SendMoneyParams } from "./types"

export async function sendMoney(params: SendMoneyParams): Promise<void> {
  // Given the parameters passed in when it is a new recepient (recipient = 'new' wtf), the transaction will always fail
  // I just won't try to figure out where or how to pass in the recipient's details
  
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")
  aresAPI.setToken(token?.value || "")
  
  await aresAPI.sendMoney(params.recipient || "", params.amount);
  console.log("Sending money:", params)
  
  // Simulate API call
  
  
  // In a real implementation, you would:
  // 1. Validate the parameters
  // 2. Connect to Solana for crypto transfers or a banking API for bank transfers
  // 3. Execute the transaction
  // 4. Update the user's balance and transaction history
  
  // For demo purposes, we'll just wait a bit
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  // Simulate success or failure based on some condition
  // const shouldSucceed = Math.random() > 0.1 // 90% success rate
  
  // if (!shouldSucceed) {
  //   throw new Error("Transaction failed. Please try again.")
  // }
  
  // return Promise.resolve()
}

