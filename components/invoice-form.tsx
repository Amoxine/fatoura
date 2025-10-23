"use client"

import type React from "react"

import type { DocumentData, LineItem } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Upload } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface InvoiceFormProps {
  documentData: DocumentData
  setDocumentData: (data: DocumentData) => void
}

export function InvoiceForm({ documentData, setDocumentData }: InvoiceFormProps) {
  const updateField = (field: keyof DocumentData, value: string) => {
    setDocumentData({ ...documentData, [field]: value })
  }

  const updateTemplate = (field: keyof DocumentData["template"], value: string | number | boolean) => {
    setDocumentData({
      ...documentData,
      template: { ...documentData.template, [field]: value },
    })
  }

  const updateLabel = (field: keyof DocumentData["template"]["labels"], value: string) => {
    setDocumentData({
      ...documentData,
      template: {
        ...documentData.template,
        labels: { ...documentData.template.labels, [field]: value },
      },
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateTemplate("logoUrl", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    setDocumentData({
      ...documentData,
      items: [...documentData.items, newItem],
    })
  }

  const removeLineItem = (id: string) => {
    setDocumentData({
      ...documentData,
      items: documentData.items.filter((item) => item.id !== id),
    })
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    const updatedItems = documentData.items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        if (field === "quantity" || field === "rate") {
          updated.amount = updated.quantity * updated.rate
        }
        return updated
      }
      return item
    })
    setDocumentData({ ...documentData, items: updatedItems })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Template Customization</CardTitle>
          <CardDescription>Customize colors, fonts, and branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="logoUpload">Company Logo</Label>
            <div className="flex gap-2 items-center mt-2">
              <Input id="logoUpload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("logoUpload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
            </div>
            <Input
              value={documentData.template.logoUrl}
              onChange={(e) => updateTemplate("logoUrl", e.target.value)}
              placeholder="Or paste image URL"
              className="mt-2"
            />
            {documentData.template.logoUrl && (
              <div className="mt-2 p-2 border rounded">
                <img
                  src={documentData.template.logoUrl || "/placeholder.svg"}
                  alt="Logo preview"
                  className="h-16 object-contain"
                />
              </div>
            )}
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={documentData.template.primaryColor}
                  onChange={(e) => updateTemplate("primaryColor", e.target.value)}
                  className="w-16 h-10 cursor-pointer"
                />
                <Input
                  value={documentData.template.primaryColor}
                  onChange={(e) => updateTemplate("primaryColor", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="accentColor"
                  type="color"
                  value={documentData.template.accentColor}
                  onChange={(e) => updateTemplate("accentColor", e.target.value)}
                  className="w-16 h-10 cursor-pointer"
                />
                <Input
                  value={documentData.template.accentColor}
                  onChange={(e) => updateTemplate("accentColor", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select
                value={documentData.template.fontFamily}
                onValueChange={(value) => updateTemplate("fontFamily", value)}
              >
                <SelectTrigger id="fontFamily" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans-serif">Sans Serif</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <Select
                value={documentData.template.fontSize}
                onValueChange={(value) => updateTemplate("fontSize", value)}
              >
                <SelectTrigger id="fontSize" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="base">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={documentData.template.currency}
                onValueChange={(value) => updateTemplate("currency", value)}
              >
                <SelectTrigger id="currency" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">$ USD</SelectItem>
                  <SelectItem value="€">€ EUR</SelectItem>
                  <SelectItem value="£">£ GBP</SelectItem>
                  <SelectItem value="¥">¥ JPY</SelectItem>
                  <SelectItem value="₹">₹ INR</SelectItem>
                  <SelectItem value="R$">R$ BRL</SelectItem>
                  <SelectItem value="C$">C$ CAD</SelectItem>
                  <SelectItem value="A$">A$ AUD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={documentData.template.taxRate}
                onChange={(e) => updateTemplate("taxRate", Number.parseFloat(e.target.value) || 0)}
                className="mt-2"
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2 h-10">
                <Switch
                  id="showTax"
                  checked={documentData.template.showTax}
                  onCheckedChange={(checked) => updateTemplate("showTax", checked)}
                />
                <Label htmlFor="showTax" className="cursor-pointer">
                  Show Tax
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customize Labels</CardTitle>
          <CardDescription>Edit all text labels and field names</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documentTitle">Document Title</Label>
              <Input
                id="documentTitle"
                value={documentData.template.labels.documentTitle}
                onChange={(e) => updateLabel("documentTitle", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="documentNumberLabel">
                {documentData.type === "invoice" ? "Invoice" : "PO"} Number Label
              </Label>
              <Input
                id="documentNumberLabel"
                value={documentData.template.labels.documentNumberLabel}
                onChange={(e) => updateLabel("documentNumberLabel", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dateLabel">Date Label</Label>
              <Input
                id="dateLabel"
                value={documentData.template.labels.dateLabel}
                onChange={(e) => updateLabel("dateLabel", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dueDateLabel">
                {documentData.type === "invoice" ? "Due/Delivery" : "Delivery"} Date Label
              </Label>
              <Input
                id="dueDateLabel"
                value={documentData.template.labels.dueDateLabel}
                onChange={(e) => updateLabel("dueDateLabel", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromLabel">{documentData.type === "invoice" ? "From/Buyer" : "Buyer"} Label</Label>
              <Input
                id="fromLabel"
                value={documentData.template.labels.fromLabel}
                onChange={(e) => updateLabel("fromLabel", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="toLabel">{documentData.type === "invoice" ? "To/Vendor" : "Vendor"} Label</Label>
              <Input
                id="toLabel"
                value={documentData.template.labels.toLabel}
                onChange={(e) => updateLabel("toLabel", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-3">Table Headers</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="descriptionLabel">Description Label</Label>
                <Input
                  id="descriptionLabel"
                  value={documentData.template.labels.descriptionLabel}
                  onChange={(e) => updateLabel("descriptionLabel", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="quantityLabel">Quantity Label</Label>
                <Input
                  id="quantityLabel"
                  value={documentData.template.labels.quantityLabel}
                  onChange={(e) => updateLabel("quantityLabel", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="rateLabel">Rate/Price Label</Label>
                <Input
                  id="rateLabel"
                  value={documentData.template.labels.rateLabel}
                  onChange={(e) => updateLabel("rateLabel", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="amountLabel">Amount Label</Label>
                <Input
                  id="amountLabel"
                  value={documentData.template.labels.amountLabel}
                  onChange={(e) => updateLabel("amountLabel", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-3">Total Section Labels</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="subtotalLabel">Subtotal Label</Label>
                <Input
                  id="subtotalLabel"
                  value={documentData.template.labels.subtotalLabel}
                  onChange={(e) => updateLabel("subtotalLabel", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="taxLabel">Tax Label</Label>
                <Input
                  id="taxLabel"
                  value={documentData.template.labels.taxLabel}
                  onChange={(e) => updateLabel("taxLabel", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="totalLabel">Total Label</Label>
                <Input
                  id="totalLabel"
                  value={documentData.template.labels.totalLabel}
                  onChange={(e) => updateLabel("totalLabel", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-3">Notes & Terms Labels</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="notesLabel">{documentData.template.labels.notesLabel}</Label>
                  <Input
                    id="notesLabel"
                    value={documentData.template.labels.notesLabel}
                    onChange={(e) => updateLabel("notesLabel", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="termsLabel">{documentData.template.labels.termsLabel}</Label>
                  <Input
                    id="termsLabel"
                    value={documentData.template.labels.termsLabel}
                    onChange={(e) => updateLabel("termsLabel", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notesPlaceholder">Default Notes Text</Label>
                <Textarea
                  id="notesPlaceholder"
                  value={documentData.template.labels.notesPlaceholder}
                  onChange={(e) => updateLabel("notesPlaceholder", e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="termsPlaceholder">Default Terms Text</Label>
                <Textarea
                  id="termsPlaceholder"
                  value={documentData.template.labels.termsPlaceholder}
                  onChange={(e) => updateLabel("termsPlaceholder", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documentNumber">{documentData.type === "invoice" ? "Invoice" : "PO"} Number</Label>
              <Input
                id="documentNumber"
                value={documentData.documentNumber}
                onChange={(e) => updateField("documentNumber", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={documentData.date}
                onChange={(e) => updateField("date", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="dueDate">{documentData.type === "invoice" ? "Due Date" : "Delivery Date"}</Label>
              <Input
                id="dueDate"
                type="date"
                value={documentData.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{documentData.type === "invoice" ? "From (Your Company)" : "Buyer Information"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fromCompany">Company Name</Label>
            <Input
              id="fromCompany"
              value={documentData.fromCompany}
              onChange={(e) => updateField("fromCompany", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="fromAddress">Address</Label>
            <Textarea
              id="fromAddress"
              value={documentData.fromAddress}
              onChange={(e) => updateField("fromAddress", e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromEmail">Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={documentData.fromEmail}
                onChange={(e) => updateField("fromEmail", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fromPhone">Phone</Label>
              <Input
                id="fromPhone"
                value={documentData.fromPhone}
                onChange={(e) => updateField("fromPhone", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{documentData.type === "invoice" ? "Bill To" : "Vendor Information"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="toCompany">Company Name</Label>
            <Input
              id="toCompany"
              value={documentData.toCompany}
              onChange={(e) => updateField("toCompany", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="toAddress">Address</Label>
            <Textarea
              id="toAddress"
              value={documentData.toAddress}
              onChange={(e) => updateField("toAddress", e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="toEmail">Email</Label>
              <Input
                id="toEmail"
                type="email"
                value={documentData.toEmail}
                onChange={(e) => updateField("toEmail", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="toPhone">Phone</Label>
              <Input
                id="toPhone"
                value={documentData.toPhone}
                onChange={(e) => updateField("toPhone", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
          <Button onClick={addLineItem} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {documentData.items.map((item, index) => (
            <div key={item.id} className="p-4 border bg-secondary rounded space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold">Item {index + 1}</span>
                {documentData.items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLineItem(item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                  placeholder="Item description"
                />
              </div>
              <div className="grid grid-cols-5 gap-3">
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Rate</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => updateLineItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select
                    value={item.currency || documentData.template.currency}
                    onValueChange={(value) => updateLineItem(item.id, "currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$">$</SelectItem>
                      <SelectItem value="€">€</SelectItem>
                      <SelectItem value="£">£</SelectItem>
                      <SelectItem value="¥">¥</SelectItem>
                      <SelectItem value="₹">₹</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tax %</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={item.taxRate ?? documentData.template.taxRate}
                    onChange={(e) => updateLineItem(item.id, "taxRate", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input type="number" value={item.amount.toFixed(2)} readOnly />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes">{documentData.template.labels.notesLabel}</Label>
            <Textarea
              id="notes"
              value={documentData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={3}
              placeholder={documentData.template.labels.notesPlaceholder}
            />
          </div>
          <div>
            <Label htmlFor="terms">{documentData.template.labels.termsLabel}</Label>
            <Textarea
              id="terms"
              value={documentData.terms}
              onChange={(e) => updateField("terms", e.target.value)}
              rows={3}
              placeholder={documentData.template.labels.termsPlaceholder}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
