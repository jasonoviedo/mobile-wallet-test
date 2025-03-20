"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

interface LanguageSwitcherProps {
  variant?: "ghost" | "outline"
  size?: "default" | "sm" | "icon"
}

export function LanguageSwitcher({ variant = "ghost", size = "icon" }: LanguageSwitcherProps = {}) {
  const { language, setLanguage } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-muted" : ""}>
          <span className="mr-2">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")} className={language === "es" ? "bg-muted" : ""}>
          <span className="mr-2">🇪🇸</span> Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("pt")} className={language === "pt" ? "bg-muted" : ""}>
          <span className="mr-2">🇧🇷</span> Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

