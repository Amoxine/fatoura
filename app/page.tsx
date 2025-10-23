"use client"

import { useEffect } from "react"
import { InvoicePreview } from "@/components/invoice/invoice-preview"
import { QuickEditForm } from "@/components/forms/quick-edit-form"
import { ActionBar } from "@/components/layout/action-bar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Receipt,
  DollarSign,
  PenTool,
  HelpCircle,
  Share2,
  Moon,
  Sun,
  Menu,
  Download,
  Settings,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useInvoiceStore } from "@/store/invoice-store"
import { useTheme } from "@/hooks/use-theme"
import { getBrowserLocale } from "@/lib/translations"
import Link from "next/link"

export default function Home() {
  const store = useInvoiceStore()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const browserLocale = getBrowserLocale()
    if (store.locale === "en") {
      store.setLocale(browserLocale)
    }
  }, [])

  const handlePrint = () => {
    setTimeout(() => {
      window.print()
    }, 100)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Floating Action Button */}
      <div className="no-print fixed bottom-6 right-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="lg" className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow">
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handlePrint}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => store.setShowSettings(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Header */}
      <div className="no-print border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Invoice Generator</h1>
              <p className="text-sm text-muted-foreground">Create professional invoices and purchase orders</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              <Link href="/pricing">
                <Button variant="outline" size="sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pricing
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <PenTool className="w-4 h-4 mr-2" />
                Sign
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Link href="/faq">
                <Button variant="outline" size="sm">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Document Type Selector */}
      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={store.documentData.type}
          onValueChange={(value) => store.setDocumentType(value as any)}
          className="no-print mb-4"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="invoice">
              <FileText className="w-4 h-4 mr-2" />
              Invoice
            </TabsTrigger>
            <TabsTrigger value="purchase-order">
              <Receipt className="w-4 h-4 mr-2" />
              Purchase Order
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Top Action Bar */}
        <ActionBar onPrint={handlePrint} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start mt-6">
          <div className="min-w-0 w-full">
            <InvoicePreview />
          </div>

          <div className="no-print lg:sticky lg:top-6 w-full">
            <QuickEditForm />
          </div>
        </div>

        {/* Bottom Action Bar */}
        <ActionBar onPrint={handlePrint} sticky />
      </div>
    </main>
  )
}
