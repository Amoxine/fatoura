"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Download, Settings } from "lucide-react"
import { useInvoiceStore } from "@/store/invoice-store"
import { InvoiceForm } from "@/components/forms/invoice-form"
import type { PaperSize, TemplateType, Locale } from "@/types/invoice"

interface ActionBarProps {
  onPrint: () => void
  sticky?: boolean
}

export function ActionBar({ onPrint, sticky = false }: ActionBarProps) {
  const store = useInvoiceStore()

  return (
    <div
      className={`no-print flex items-center justify-between gap-4 bg-card p-4 rounded-lg shadow-sm border ${
        sticky ? "fixed bottom-0 left-0 right-0 z-40 rounded-none" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Locale:</label>
          <Select value={store.locale} onValueChange={(value) => store.setLocale(value as Locale)}>
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
          <Select value={store.templateType} onValueChange={(value) => store.setTemplateType(value as TemplateType)}>
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
          <Select value={store.paperSize} onValueChange={(value) => store.setPaperSize(value as PaperSize)}>
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
        <Button variant="default" size="sm" onClick={onPrint}>
          <Download className="w-4 h-4 mr-2" />
          Preview / Download
        </Button>

        <Sheet open={store.showSettings} onOpenChange={(open) => store.setShowSettings(open)}>
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
              <InvoiceForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
