"use client"

import type React from "react"
import { useInvoiceStore } from "@/store/invoice-store"
import { useInvoiceDocument } from "@/hooks/use-invoice-document"

export function InvoiceForm() {
  const store = useInvoiceStore()
  const { addLineItem, removeLineItem, updateLineItem } = useInvoiceDocument()

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        store.updateTemplateField("logoUrl", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return <div className="space-y-6"></div>
}
