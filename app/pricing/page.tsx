"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import { getBrowserLocale, getPageTranslations, type Locale } from "@/lib/translations"

export default function PricingPage() {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    setLocale(getBrowserLocale())
  }, [])

  const t = getPageTranslations(locale)

  const plans = [
    {
      name: t.pricing.free,
      price: "$0",
      features: ["5 invoices per month", "Basic templates", "Email support"],
    },
    {
      name: t.pricing.pro,
      price: "$19",
      features: ["Unlimited invoices", "All templates", "Priority support", "Custom branding"],
      popular: true,
    },
    {
      name: t.pricing.enterprise,
      price: "Custom",
      features: ["Everything in Pro", "API access", "Dedicated support", "Custom integrations"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t.pricing.title}</h1>
          <p className="text-xl text-muted-foreground">{t.pricing.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="ghost">Back to Invoice Generator</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
