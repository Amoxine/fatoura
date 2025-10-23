"use client"

import { useState, useEffect } from "react"
import { InvoiceForm } from "@/components/invoice-form"
import { QuickEditForm } from "@/components/quick-edit-form"
import { InvoicePreview } from "@/components/invoice-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Receipt,
  Settings,
  DollarSign,
  PenTool,
  HelpCircle,
  Share2,
  Download,
  Menu,
  Moon,
  Sun,
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getBrowserLocale, getLocalizedLabels, type Locale } from "@/lib/translations"
import Link from "next/link"

export type DocumentType = "invoice" | "purchase-order"
export type PaperSize = "A4" | "A3" | "Letter" | "Custom"
export type TemplateType = "standard" | "compact"

export interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
  currency?: string
  taxRate?: number
}

export interface TemplateLabels {
  documentTitle: string
  documentNumberLabel: string
  dateLabel: string
  dueDateLabel: string
  fromLabel: string
  toLabel: string
  descriptionLabel: string
  quantityLabel: string
  rateLabel: string
  amountLabel: string
  subtotalLabel: string
  taxLabel: string
  totalLabel: string
  notesLabel: string
  termsLabel: string
  notesPlaceholder: string
  termsPlaceholder: string
  footerLabel: string
  footerPlaceholder: string
}

export interface TemplateSettings {
  logoUrl: string
  primaryColor: string
  accentColor: string
  taxRate: number
  showTax: boolean
  currency: string
  fontFamily: string
  fontSize: "small" | "base" | "large"
  labels: TemplateLabels
  templateType: TemplateType
}

export interface DocumentData {
  type: DocumentType
  documentNumber: string
  date: string
  dueDate: string
  fromCompany: string
  fromAddress: string
  fromEmail: string
  fromPhone: string
  toCompany: string
  toAddress: string
  toEmail: string
  toPhone: string
  items: LineItem[]
  notes: string
  terms: string
  footer: string
  locale: Locale
  template: TemplateSettings
}

export default function Home() {
  const [documentType, setDocumentType] = useState<DocumentType>("invoice")
  const [showSettings, setShowSettings] = useState(false)
  const [paperSize, setPaperSize] = useState<PaperSize>("A4")
  const [templateType, setTemplateType] = useState<TemplateType>("standard")
  const [locale, setLocale] = useState<Locale>("en")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const browserLocale = getBrowserLocale()
    setLocale(browserLocale)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const [documentData, setDocumentData] = useState<DocumentData>({
    type: "invoice",
    documentNumber: "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    fromCompany: "",
    fromAddress: "",
    fromEmail: "",
    fromPhone: "",
    toCompany: "",
    toAddress: "",
    toEmail: "",
    toPhone: "",
    items: [{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }],
    notes: "",
    terms: "",
    footer: "",
    locale: "en",
    template: {
      logoUrl: "",
      primaryColor: "#1e3a5f",
      accentColor: "#ff6b6b",
      taxRate: 10,
      showTax: true,
      currency: "$",
      fontFamily: "sans-serif",
      fontSize: "base",
      labels: getLocalizedLabels("en", "invoice"),
      templateType: "standard",
    },
  })

  useEffect(() => {
    const newLabels = getLocalizedLabels(locale, documentType)
    setDocumentData((prev) => ({
      ...prev,
      locale,
      template: {
        ...prev.template,
        labels: newLabels,
      },
    }))
  }, [locale, documentType])

  const handlePrint = () => {
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const handleDocumentTypeChange = (type: DocumentType) => {
    setDocumentType(type)
    const newLabels = getLocalizedLabels(locale, type)
    setDocumentData((prev) => ({
      ...prev,
      type,
      documentNumber: type === "invoice" ? "INV-001" : "PO-001",
      template: {
        ...prev.template,
        labels: newLabels,
      },
    }))
  }

  return (
    <main className="min-h-screen bg-background">
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
            <DropdownMenuItem onClick={() => setShowSettings(true)}>
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

      <div className="no-print border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Invoice Generator</h1>
              <p className="text-sm text-muted-foreground">Create professional invoices and purchase orders</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
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

      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={documentType}
          onValueChange={(value) => handleDocumentTypeChange(value as DocumentType)}
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

        <div className="no-print sticky top-0 z-40 mb-4 flex items-center justify-between gap-4 bg-card p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Locale:</label>
              <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Template:</label>
              <Select
                value={documentData.template.templateType}
                onValueChange={(value) => {
                  setTemplateType(value as TemplateType)
                  setDocumentData({
                    ...documentData,
                    template: { ...documentData.template, templateType: value as TemplateType },
                  })
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Paper Size:</label>
              <Select value={paperSize} onValueChange={(value) => setPaperSize(value as PaperSize)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A4">A4</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                  <SelectItem value="Letter">Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={handlePrint}>
              <Download className="w-4 h-4 mr-2" />
              Preview / Download
            </Button>
            <Sheet open={showSettings} onOpenChange={setShowSettings}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize Template
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Template Settings</SheetTitle>
                  <SheetDescription>Customize your invoice template, colors, and labels</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <InvoiceForm documentData={documentData} setDocumentData={setDocumentData} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
          <div className="min-w-0 w-full">
            <InvoicePreview documentData={documentData} setDocumentData={setDocumentData} paperSize={paperSize} />
          </div>

          <div className="no-print lg:sticky lg:top-6 w-full">
            <QuickEditForm documentData={documentData} setDocumentData={setDocumentData} />
          </div>
        </div>

        <div className="no-print sticky bottom-0 z-40 mt-6 flex items-center justify-between gap-4 bg-card p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Locale:</label>
              <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Template:</label>
              <Select
                value={documentData.template.templateType}
                onValueChange={(value) => {
                  setTemplateType(value as TemplateType)
                  setDocumentData({
                    ...documentData,
                    template: { ...documentData.template, templateType: value as TemplateType },
                  })
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Paper Size:</label>
              <Select value={paperSize} onValueChange={(value) => setPaperSize(value as PaperSize)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A4">A4</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                  <SelectItem value="Letter">Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={handlePrint}>
              <Download className="w-4 h-4 mr-2" />
              Preview / Download
            </Button>
            <Sheet open={showSettings} onOpenChange={setShowSettings}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize Template
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Template Settings</SheetTitle>
                  <SheetDescription>Customize your invoice template, colors, and labels</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <InvoiceForm documentData={documentData} setDocumentData={setDocumentData} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </main>
  )
}
