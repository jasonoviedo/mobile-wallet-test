"use server"

import { cookies } from "next/headers"
import { aresAPI, PhoneNumber } from "./aresApi"

// In a real app, you would integrate with an SMS service like Twilio
// export async function requestOTP(phoneNumber: string): Promise<void> {
export async function requestOTP(phoneNumber: PhoneNumber): Promise<void> {
  // Simulate API call to send OTP
  console.log(`Sending OTP to ${phoneNumber}`)
  
  // In a real implementation, you would:
  // 1. Validate the phone number
  // 2. Generate a random OTP
  // 3. Store the OTP with the phone number in a database with an expiration
  // 4. Send the OTP via SMS
  
  // For demo purposes, we'll just wait a bit
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  
  // In a real app, you'd return success/failure based on the SMS service response
  // return Promise.resolve()
  
  let otpRequest = await aresAPI.requestOTP(phoneNumber)
  
  console.log(otpRequest);
  // return otpRequest;
}

export async function verifyOTP(phoneNumber: PhoneNumber, otp: string): Promise<void> {
  // export async function verifyOTP(phoneNumber: string, otp: string): Promise<void> {
  // Simulate API call to verify OTP
  console.log(`Verifying OTP ${otp} for ${phoneNumber}`)
  
  // In a real implementation, you would:
  // 1. Check if the OTP matches what was stored for this phone number
  // 2. Check if the OTP is still valid (not expired)
  // 3. If valid, create a session for the user
  
  // For demo purposes, we'll just wait a bit and accept any 6-digit OTP
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  
  // if (otp.length !== 6 || !/^\d+$/.test(otp)) {
  //   return Promise.reject(new Error("Invalid OTP"))
  // }
  
  // // Set an authentication cookie
  
  // return Promise.resolve()
  
  let {token} = await aresAPI.verifyOTP({phoneNumber, otp})
  let cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
  
}

export async function logout(): Promise<void> {
  let cookieStore = await cookies();
  cookieStore.delete("auth-token")
  return Promise.resolve()
}

export async function isAuthenticated(): Promise<boolean> {
  let cookieStore = await cookies();
  return cookieStore.has("auth-token")
}

