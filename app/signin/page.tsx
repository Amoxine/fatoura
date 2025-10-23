"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getBrowserLocale, getPageTranslations, type Locale } from "@/lib/translations"

export default function SignInPage() {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    setLocale(getBrowserLocale())
  }, [])

  const t = getPageTranslations(locale)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t.auth.signIn}</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="password">{t.auth.password}</Label>
            <Input id="password" type="password" className="mt-2" />
          </div>
          <div className="text-right">
            <Link href="#" className="text-sm text-primary hover:underline">
              {t.auth.forgotPassword}
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">{t.auth.signIn}</Button>
          <p className="text-sm text-center text-muted-foreground">
            {t.auth.noAccount}{" "}
            <Link href="/signup" className="text-primary hover:underline">
              {t.auth.signUp}
            </Link>
          </p>
          <Link href="/" className="text-sm text-center text-muted-foreground hover:underline">
            Back to Invoice Generator
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
