"use client"

import type { DocumentData, LineItem, PaperSize } from "@/app/page"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, X } from "lucide-react"
import { useState } from "react"

interface InvoicePreviewProps {
  documentData: DocumentData
  setDocumentData?: (data: DocumentData) => void
  paperSize?: PaperSize
}

const getPaperDimensions = (size: PaperSize) => {
  switch (size) {
    case "A4":
      return { width: "210mm", height: "297mm" }
    case "A3":
      return { width: "297mm", height: "420mm" }
    case "Letter":
      return { width: "8.5in", height: "11in" }
    default:
      return { width: "210mm", height: "297mm" }
  }
}

export function InvoicePreview({ documentData, setDocumentData, paperSize = "A4" }: InvoicePreviewProps) {
  const [isEditing, setIsEditing] = useState(false)

  const subtotal = documentData.items.reduce((sum, item) => sum + item.amount, 0)
  const tax = documentData.template.showTax ? subtotal * (documentData.template.taxRate / 100) : 0
  const total = subtotal + tax

  const { currency, labels, fontFamily, fontSize } = documentData.template
  const dimensions = getPaperDimensions(paperSize)

  const fontSizeClass = fontSize === "small" ? "text-sm" : fontSize === "large" ? "text-lg" : "text-base"
  const fontFamilyClass = fontFamily === "serif" ? "font-serif" : fontFamily === "mono" ? "font-mono" : "font-sans"

  const updateField = (field: string, value: any) => {
    if (setDocumentData) {
      setDocumentData({ ...documentData, [field]: value })
    }
  }

  const clearField = (field: string) => {
    if (setDocumentData) {
      setDocumentData({ ...documentData, [field]: "" })
    }
  }

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    if (setDocumentData) {
      const newItems = [...documentData.items]
      newItems[index] = { ...newItems[index], [field]: value }

      if (field === "quantity" || field === "rate") {
        const qty = field === "quantity" ? Number(value) : newItems[index].quantity
        const rate = field === "rate" ? Number(value) : newItems[index].rate
        newItems[index].amount = qty * rate
      }

      setDocumentData({ ...documentData, items: newItems })
    }
  }

  const addItem = () => {
    if (setDocumentData) {
      const newItem: LineItem = {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      }
      setDocumentData({ ...documentData, items: [...documentData.items, newItem] })
    }
  }

  const removeItem = (index: number) => {
    if (setDocumentData && documentData.items.length > 1) {
      const newItems = documentData.items.filter((_, i) => i !== index)
      setDocumentData({ ...documentData, items: newItems })
    }
  }

  const updateLogo = (url: string) => {
    if (setDocumentData) {
      setDocumentData({
        ...documentData,
        template: { ...documentData.template, logoUrl: url },
      })
    }
  }

  if (documentData.template.templateType === "compact") {
    return <CompactTemplate documentData={documentData} setDocumentData={setDocumentData} dimensions={dimensions} />
  }

  return (
    <Card
      className="bg-white print-page mx-auto"
      style={{
        width: dimensions.width,
        minHeight: dimensions.height,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className={`flex flex-col h-full ${fontFamilyClass} ${fontSizeClass}`}
        style={{ minHeight: dimensions.height, padding: "0.5cm" }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {documentData.template.logoUrl && (
              <div className="relative group">
                <img
                  src={documentData.template.logoUrl || "/placeholder.svg"}
                  alt="Logo"
                  className="h-12 object-contain mb-2"
                />
                {setDocumentData && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateField("template", { ...documentData.template, logoUrl: "" })}
                    className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}

            {!documentData.template.logoUrl && setDocumentData && (
              <div
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground mb-2 no-print"
                onClick={() => {
                  const url = prompt("Enter logo URL:")
                  if (url) updateField("template", { ...documentData.template, logoUrl: url })
                }}
              >
                + Add Your Logo
              </div>
            )}

            {(documentData.fromCompany || setDocumentData) && (
              <div className="space-y-1">
                <div className="relative group">
                  {setDocumentData ? (
                    <Input
                      value={documentData.fromCompany}
                      onChange={(e) => updateField("fromCompany", e.target.value)}
                      placeholder="Who is this from?"
                      className="border-0 p-0 h-auto font-semibold text-base focus-visible:ring-0"
                    />
                  ) : (
                    documentData.fromCompany && (
                      <div className="font-semibold text-base">{documentData.fromCompany}</div>
                    )
                  )}
                  {documentData.fromCompany && setDocumentData && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearField("fromCompany")}
                      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                {(documentData.fromAddress || setDocumentData) && (
                  <div className="relative group">
                    {setDocumentData ? (
                      <Textarea
                        value={documentData.fromAddress}
                        onChange={(e) => updateField("fromAddress", e.target.value)}
                        placeholder="Company address"
                        className="border-0 p-0 h-auto text-sm text-muted-foreground resize-none focus-visible:ring-0 min-h-[50px]"
                      />
                    ) : (
                      documentData.fromAddress && (
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {documentData.fromAddress}
                        </div>
                      )
                    )}
                    {documentData.fromAddress && setDocumentData && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearField("fromAddress")}
                        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-right">
            <h1 className="text-3xl font-bold mb-2">{labels.documentTitle}</h1>
            <div className="space-y-1 text-sm">
              <div className="flex justify-end items-center gap-2">
                <span className="text-muted-foreground">#</span>
                {setDocumentData ? (
                  <Input
                    value={documentData.documentNumber}
                    onChange={(e) => updateField("documentNumber", e.target.value)}
                    className="border-0 border-b p-1 h-auto w-24 text-right focus-visible:ring-0"
                  />
                ) : (
                  <span>{documentData.documentNumber}</span>
                )}
              </div>
              {documentData.date && (
                <div className="flex justify-end items-center gap-2">
                  <span className="text-muted-foreground">{labels.dateLabel}:</span>
                  {setDocumentData ? (
                    <Input
                      type="date"
                      value={documentData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="border-0 border-b p-1 h-auto w-32 text-right focus-visible:ring-0"
                    />
                  ) : (
                    <span>{documentData.date}</span>
                  )}
                </div>
              )}
              {documentData.dueDate && (
                <div className="flex justify-end items-center gap-2">
                  <span className="text-muted-foreground">{labels.dueDateLabel}:</span>
                  {setDocumentData ? (
                    <Input
                      type="date"
                      value={documentData.dueDate}
                      onChange={(e) => updateField("dueDate", e.target.value)}
                      className="border-0 border-b p-1 h-auto w-32 text-right focus-visible:ring-0"
                    />
                  ) : (
                    <span>{documentData.dueDate}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        {(documentData.toCompany || setDocumentData) && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-1">{labels.toLabel}</h3>
            <div className="relative group">
              {setDocumentData ? (
                <Input
                  value={documentData.toCompany}
                  onChange={(e) => updateField("toCompany", e.target.value)}
                  placeholder="Who is this to?"
                  className="border-0 p-0 h-auto font-semibold mb-1 focus-visible:ring-0"
                />
              ) : (
                documentData.toCompany && <div className="font-semibold mb-1">{documentData.toCompany}</div>
              )}
              {documentData.toCompany && setDocumentData && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearField("toCompany")}
                  className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            {(documentData.toAddress || setDocumentData) && (
              <div className="relative group">
                {setDocumentData ? (
                  <Textarea
                    value={documentData.toAddress}
                    onChange={(e) => updateField("toAddress", e.target.value)}
                    placeholder="Client address"
                    className="border-0 p-0 h-auto text-sm text-muted-foreground resize-none focus-visible:ring-0 min-h-[50px]"
                  />
                ) : (
                  documentData.toAddress && (
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">{documentData.toAddress}</div>
                  )
                )}
                {documentData.toAddress && setDocumentData && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearField("toAddress")}
                    className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col mb-4 min-h-0">
          <div className="bg-[#1e293b] text-white grid grid-cols-12 gap-2 p-1.5 text-sm font-semibold">
            <div className="col-span-6">{labels.descriptionLabel}</div>
            <div className="col-span-2 text-right">{labels.quantityLabel}</div>
            <div className="col-span-2 text-right">{labels.rateLabel}</div>
            <div className="col-span-2 text-right">{labels.amountLabel}</div>
          </div>

          <div className="flex-1 overflow-hidden">
            {documentData.items.map((item, index) => {
              const itemCurrency = item.currency || currency
              return (
                <div key={item.id} className="grid grid-cols-12 gap-2 p-1.5 border-b items-center group">
                  <div className="col-span-6">
                    {setDocumentData ? (
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                        placeholder="Description of item/service..."
                        className="border-0 p-1 h-auto text-sm focus-visible:ring-0"
                      />
                    ) : (
                      item.description && <div className="text-sm">{item.description}</div>
                    )}
                  </div>
                  <div className="col-span-2">
                    {setDocumentData ? (
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", e.target.value)}
                        className="border-0 p-1 h-auto text-sm text-right focus-visible:ring-0"
                      />
                    ) : (
                      <div className="text-sm text-right">{item.quantity}</div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center justify-end">
                      <span className="text-sm mr-1">{itemCurrency}</span>
                      {setDocumentData ? (
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(index, "rate", e.target.value)}
                          className="border-0 p-1 h-auto text-sm text-right focus-visible:ring-0 w-20"
                        />
                      ) : (
                        <span className="text-sm">{item.rate.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <span className="text-sm font-semibold">
                      {itemCurrency}
                      {item.amount.toFixed(2)}
                    </span>
                    {documentData.items.length > 1 && setDocumentData && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {setDocumentData && (
            <Button
              variant="ghost"
              size="sm"
              onClick={addItem}
              className="mt-1 text-sm text-primary hover:text-primary no-print self-start"
            >
              <Plus className="h-4 w-4 mr-1" />
              Line Item
            </Button>
          )}
        </div>

        {/* Notes and Totals Section */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            {(documentData.notes || setDocumentData) && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-1">{labels.notesLabel}</h3>
                <div className="relative group">
                  {setDocumentData ? (
                    <Textarea
                      value={documentData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      placeholder={labels.notesPlaceholder}
                      className="border-0 p-0 h-auto text-sm text-muted-foreground resize-none focus-visible:ring-0 min-h-[40px]"
                    />
                  ) : (
                    documentData.notes && (
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">{documentData.notes}</div>
                    )
                  )}
                  {documentData.notes && setDocumentData && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearField("notes")}
                      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            )}
            {(documentData.terms || setDocumentData) && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-1">{labels.termsLabel}</h3>
                <div className="relative group">
                  {setDocumentData ? (
                    <Textarea
                      value={documentData.terms}
                      onChange={(e) => updateField("terms", e.target.value)}
                      placeholder={labels.termsPlaceholder}
                      className="border-0 p-0 h-auto text-sm text-muted-foreground resize-none focus-visible:ring-0 min-h-[40px]"
                    />
                  ) : (
                    documentData.terms && (
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">{documentData.terms}</div>
                    )
                  )}
                  {documentData.terms && setDocumentData && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearField("terms")}
                      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm py-1">
              <span className="text-muted-foreground">{labels.subtotalLabel}</span>
              <span className="font-semibold">
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </div>

            {documentData.template.showTax && (
              <div className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">
                  {labels.taxLabel} ({documentData.template.taxRate}%)
                </span>
                <span className="font-semibold">
                  {currency}
                  {tax.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold pt-1 border-t-2">
              <span>{labels.totalLabel}</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {(documentData.footer || setDocumentData) && (
          <div className="pt-2 border-t text-center mt-auto">
            <div className="relative group">
              {setDocumentData ? (
                <Textarea
                  value={documentData.footer}
                  onChange={(e) => updateField("footer", e.target.value)}
                  placeholder={labels.footerPlaceholder}
                  className="border-0 p-0 h-auto text-xs text-muted-foreground resize-none focus-visible:ring-0 min-h-[20px] text-center"
                />
              ) : (
                documentData.footer && (
                  <div className="text-xs text-muted-foreground whitespace-pre-wrap">{documentData.footer}</div>
                )
              )}
              {setDocumentData && documentData.footer && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearField("footer")}
                  className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 no-print"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

function CompactTemplate({
  documentData,
  setDocumentData,
  dimensions,
}: {
  documentData: DocumentData
  setDocumentData?: (data: DocumentData) => void
  dimensions: { width: string; height: string }
}) {
  const subtotal = documentData.items.reduce((sum, item) => sum + item.amount, 0)
  const tax = documentData.template.showTax ? subtotal * (documentData.template.taxRate / 100) : 0
  const discount = subtotal * 0.05 // 5% discount example
  const total = subtotal + tax - discount

  const { currency, labels } = documentData.template

  const updateField = (field: string, value: any) => {
    if (setDocumentData) {
      setDocumentData({ ...documentData, [field]: value })
    }
  }

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    if (setDocumentData) {
      const newItems = [...documentData.items]
      newItems[index] = { ...newItems[index], [field]: value }

      if (field === "quantity" || field === "rate") {
        const qty = field === "quantity" ? Number(value) : newItems[index].quantity
        const rate = field === "rate" ? Number(value) : newItems[index].rate
        newItems[index].amount = qty * rate
      }

      setDocumentData({ ...documentData, items: newItems })
    }
  }

  const addItem = () => {
    if (setDocumentData) {
      const newItem: LineItem = {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      }
      setDocumentData({ ...documentData, items: [...documentData.items, newItem] })
    }
  }

  const removeItem = (index: number) => {
    if (setDocumentData && documentData.items.length > 1) {
      const newItems = documentData.items.filter((_, i) => i !== index)
      setDocumentData({ ...documentData, items: newItems })
    }
  }

  return (
    <Card
      className="bg-white print-page mx-auto"
      style={{
        width: dimensions.width,
        minHeight: dimensions.height,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div className="flex flex-col" style={{ minHeight: dimensions.height, padding: "0.4cm" }}>
        <div className="flex justify-between items-start pb-1.5 border-b mb-2">
          <div>
            <Input
              value={documentData.fromCompany}
              onChange={(e) => updateField("fromCompany", e.target.value)}
              placeholder="Company name"
              className="border-0 p-0 h-auto font-bold text-lg focus-visible:ring-0"
            />
          </div>
          <div className="text-right space-y-1">
            <h1 className="text-xl font-bold">{labels.documentTitle}</h1>
            <div className="text-xs space-y-0.5">
              <div className="flex items-center gap-1 justify-end">
                <span className="text-muted-foreground">Réf:</span>
                <Input
                  value={documentData.documentNumber}
                  onChange={(e) => updateField("documentNumber", e.target.value)}
                  className="border-0 p-0 h-auto w-24 text-right focus-visible:ring-0 text-xs"
                />
              </div>
              {documentData.date && (
                <div className="text-muted-foreground">
                  Date: <span className="text-foreground">{documentData.date}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <div className="text-xs font-semibold mb-1">Émetteur:</div>
            <div className="bg-muted p-3 min-h-[80px]">
              <Input
                value={documentData.fromCompany}
                onChange={(e) => updateField("fromCompany", e.target.value)}
                placeholder="Company name"
                className="border-0 p-0 h-auto font-semibold mb-1 focus-visible:ring-0 text-sm bg-transparent"
              />
              <Textarea
                value={documentData.fromAddress}
                onChange={(e) => updateField("fromAddress", e.target.value)}
                placeholder="Address"
                className="border-0 p-0 h-auto text-xs resize-none focus-visible:ring-0 min-h-[40px] bg-transparent"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold mb-1">Adressé à:</div>
            <div className="border p-3 min-h-[80px]">
              <Input
                value={documentData.toCompany}
                onChange={(e) => updateField("toCompany", e.target.value)}
                placeholder="Client name"
                className="border-0 p-0 h-auto font-semibold mb-1 focus-visible:ring-0 text-sm"
              />
              <Textarea
                value={documentData.toAddress}
                onChange={(e) => updateField("toAddress", e.target.value)}
                placeholder="Address"
                className="border-0 p-0 h-auto text-xs resize-none focus-visible:ring-0 min-h-[40px]"
              />
            </div>
          </div>
        </div>

        <div className="border flex-1 flex flex-col mb-2">
          <div className="grid grid-cols-12 gap-1 bg-muted p-2 text-xs font-semibold border-b">
            <div className="col-span-4">Désignation</div>
            <div className="col-span-1 text-center">TVA</div>
            <div className="col-span-2 text-right">P.U. HT</div>
            <div className="col-span-1 text-center">Qté</div>
            <div className="col-span-2 text-right">Progression</div>
            <div className="col-span-2 text-right">Total HT</div>
          </div>

          <div className="flex-1">
            {documentData.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-1 p-2 border-b items-center group text-xs">
                <div className="col-span-4">
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    placeholder="Description..."
                    className="border-0 p-0 h-auto text-xs focus-visible:ring-0 resize-none min-h-[30px]"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-xs">{documentData.template.taxRate}%</span>
                </div>
                <div className="col-span-2 text-right">
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(index, "rate", e.target.value)}
                    className="border-0 p-0 h-auto text-xs text-right focus-visible:ring-0"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    className="border-0 p-0 h-auto text-xs text-center focus-visible:ring-0"
                  />
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs">20%</span>
                </div>
                <div className="col-span-2 text-right flex items-center justify-end gap-1">
                  <span className="text-xs font-semibold">{item.amount.toFixed(2)}</span>
                  {documentData.items.length > 1 && setDocumentData && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="opacity-0 group-hover:opacity-100 h-5 w-5 p-0 no-print"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {setDocumentData && (
            <div className="p-2 no-print">
              <Button variant="ghost" size="sm" onClick={addItem} className="h-6 text-xs">
                <Plus className="h-3 w-3 mr-1" />
                Ligne
              </Button>
            </div>
          )}

          <div className="border-t bg-muted/30 p-2 mt-auto">
            <div className="flex justify-between items-start">
              <div className="text-xs">
                <span className="font-semibold">Conditions de règlement:</span> À réception
              </div>
              <div className="text-xs space-y-1 min-w-[200px]">
                <div className="flex justify-between">
                  <span>Total HT</span>
                  <span className="font-semibold">{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total TVA {documentData.template.taxRate}%</span>
                  <span className="font-semibold">{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total TTC</span>
                  <span className="font-semibold">{(subtotal + tax).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>RG 5%</span>
                  <span className="font-semibold">-{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-1 font-bold">
                  <span>Montant à percevoir TTC</span>
                  <span>{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {documentData.footer && (
          <div className="pt-2 border-t text-center mt-auto">
            <Textarea
              value={documentData.footer}
              onChange={(e) => updateField("footer", e.target.value)}
              placeholder={labels.footerPlaceholder}
              className="border-0 p-0 h-auto text-xs text-muted-foreground resize-none focus-visible:ring-0 min-h-[20px] text-center"
            />
          </div>
        )}
      </div>
    </Card>
  )
}
