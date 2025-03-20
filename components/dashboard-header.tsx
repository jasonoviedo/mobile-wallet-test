"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"
import { logout } from "@/lib/auth"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/lib/i18n/i18n-context"

export function DashboardHeader() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { t } = useI18n()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-tight text-primary md:text-2xl">AresPay</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:h-10 md:w-10">
                <Avatar className="h-8 w-8 md:h-9 md:w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4 md:h-5 md:w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                {t("profile")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? t("loggingOut") : t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

