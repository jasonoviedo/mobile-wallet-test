"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useI18n } from "@/lib/i18n/i18n-context"
import type { UserData } from "@/lib/types"

interface ProfileInfoProps {
  userData: UserData
}

export function ProfileInfo({ userData }: ProfileInfoProps) {
  const { t } = useI18n()

  // For demo purposes, we'll use hardcoded profile data
  // In a real app, this would come from the user's profile in the database
  const profileData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phoneNumber: "+1 (555) 123-4567",
    // Use the Solana address from userData
    solanaAddress: userData.solanaAddress,
  }

  // Get initials for the avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Format the Solana address for display
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Avatar */}
        <div className="flex flex-col items-center justify-center py-4">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {getInitials(profileData.name)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{profileData.name}</h2>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-sm">{profileData.email}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
            <p className="text-sm">{profileData.phoneNumber}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Wallet Address</p>
            <p className="text-sm font-mono">{formatAddress(profileData.solanaAddress)}</p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            To update your profile information, please contact customer support.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

