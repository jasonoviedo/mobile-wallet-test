"use client"

import { useRouter, usePathname } from "next/navigation"
import { Home, ArrowUpRight, ArrowDownLeft, HelpCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

export function AppFooter() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useI18n()

  const isActive = (path: string) => pathname === path

  const navItems = [
    {
      label: t("home"),
      icon: Home,
      path: "/dashboard",
      action: () => router.push("/dashboard"),
    },
    {
      label: t("send"),
      icon: ArrowUpRight,
      path: "/send",
      action: () => router.push("/send"),
    },
    {
      label: t("receive"),
      icon: ArrowDownLeft,
      path: "/receive",
      action: () => router.push("/receive"),
    },
    {
      label: t("help"),
      icon: HelpCircle,
      path: "/help",
      action: () => router.push("/help"),
    },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t z-10">
      <div className="container mx-auto px-4 max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="grid grid-cols-4 h-16 md:h-20">
          {navItems.map((item) => {
            const active = isActive(item.path)
            return (
              <button
                key={item.path}
                onClick={item.action}
                className={`relative flex flex-col items-center justify-center w-full h-full transition-all duration-200 ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* Icon with active state styling */}
                <div className={`relative ${active ? "scale-110" : ""}`}>
                  <item.icon className={`h-5 w-5 mb-1 md:h-6 md:w-6 ${active ? "stroke-[2.5px]" : "stroke-[1.5px]"}`} />

                  {/* Background glow effect for active icon */}
                  {active && <span className="absolute inset-0 bg-primary/10 rounded-full blur-md -z-10" />}
                </div>

                {/* Label with active state styling */}
                <span className={`text-xs md:text-sm ${active ? "font-medium" : "font-normal"}`}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
      {/* Add safe area padding for mobile devices */}
      <div className="h-safe-area-bottom bg-background" />
    </footer>
  )
}

