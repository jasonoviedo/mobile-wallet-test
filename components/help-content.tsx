"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n/i18n-context"

export function HelpContent() {
  const { t } = useI18n()

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{t("helpAndSupport")}</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("frequentlyAskedQuestions")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">{t("howToSendMoney")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("howToSendMoneyAnswer")}</p>
            </div>

            <div>
              <h3 className="font-medium">{t("howToReceiveMoney")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("howToReceiveMoneyAnswer")}</p>
            </div>

            <div>
              <h3 className="font-medium">{t("whatAreFees")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("whatAreFeesAnswer")}</p>
            </div>

            <div>
              <h3 className="font-medium">{t("isMoneyafe")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("isMoneySafeAnswer")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("contactSupport")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{t("supportTeamAvailable")}</p>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium w-20">{t("emailLabel")}</span>
                <span>support@arespay.com</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-20">{t("phoneLabel")}</span>
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-20">{t("whatsappLabel")}</span>
                <span>+1 (800) 123-4567</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

