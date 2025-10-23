"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getBrowserLocale, getPageTranslations, type Locale } from "@/lib/translations"

export default function SignUpPage() {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    setLocale(getBrowserLocale())
  }, [])

  const t = getPageTranslations(locale)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t.auth.signUp}</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
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
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" className="mt-2" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">{t.auth.signUp}</Button>
          <p className="text-sm text-center text-muted-foreground">
            {t.auth.haveAccount}{" "}
            <Link href="/signin" className="text-primary hover:underline">
              {t.auth.signIn}
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
