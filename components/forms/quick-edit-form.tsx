"use client"

import type { DocumentData, LineItem } from "@/types/invoice"
import { useInvoiceStore } from "@/store/invoice-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

export function QuickEditForm() {
  const documentData = useInvoiceStore((state) => state.documentData)
  const updateDocumentData = useInvoiceStore((state) => state.updateDocumentData)
  const updateLineItem = useInvoiceStore((state) => state.updateLineItem)
  const addLineItem = useInvoiceStore((state) => state.addLineItem)
  const removeLineItem = useInvoiceStore((state) => state.removeLineItem)

  const updateField = (field: keyof DocumentData, value: string) => {
    updateDocumentData({ ...documentData, [field]: value })
  }

  const handleAddLineItem = () => {
    addLineItem()
  }

  const handleRemoveLineItem = (id: string) => {
    if (documentData.items.length > 1) {
      removeLineItem(id)
    }
  }

  const handleUpdateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    updateLineItem(id, field, value)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-white">
        <h3 className="font-semibold mb-3 text-sm">Document Info</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="documentNumber" className="text-xs">
              {documentData.type === "invoice" ? "Invoice" : "PO"} Number
            </Label>
            <Input
              id="documentNumber"
              value={documentData.documentNumber}
              onChange={(e) => updateField("documentNumber", e.target.value)}
              className="h-9"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="date" className="text-xs">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={documentData.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="h-9"
              />
            </div>
            <div>
              <Label htmlFor="dueDate" className="text-xs">
                {documentData.type === "invoice" ? "Due Date" : "Delivery Date"}
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={documentData.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
                className="h-9"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <h3 className="font-semibold mb-3 text-sm">From</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="fromCompany" className="text-xs">
              Company Name
            </Label>
            <Input
              id="fromCompany"
              value={documentData.fromCompany}
              onChange={(e) => updateField("fromCompany", e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <Label htmlFor="fromAddress" className="text-xs">
              Address
            </Label>
            <Textarea
              id="fromAddress"
              value={documentData.fromAddress}
              onChange={(e) => updateField("fromAddress", e.target.value)}
              className="min-h-[60px] text-sm"
              rows={2}
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <h3 className="font-semibold mb-3 text-sm">To</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="toCompany" className="text-xs">
              Company Name
            </Label>
            <Input
              id="toCompany"
              value={documentData.toCompany}
              onChange={(e) => updateField("toCompany", e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <Label htmlFor="toAddress" className="text-xs">
              Address
            </Label>
            <Textarea
              id="toAddress"
              value={documentData.toAddress}
              onChange={(e) => updateField("toAddress", e.target.value)}
              className="min-h-[60px] text-sm"
              rows={2}
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Line Items</h3>
          <Button onClick={handleAddLineItem} size="sm" variant="outline" className="h-8 bg-transparent">
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {documentData.items.map((item, index) => (
            <div key={item.id} className="p-3 border rounded-lg bg-secondary/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Item {index + 1}</span>
                {documentData.items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLineItem(item.id)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => handleUpdateLineItem(item.id, "description", e.target.value)}
                  className="h-8 text-sm"
                  placeholder="Item description"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs">Qty</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateLineItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Rate</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => handleUpdateLineItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Currency</Label>
                  <Select
                    value={item.currency || documentData.template.currency}
                    onValueChange={(value) => handleUpdateLineItem(item.id, "currency", value)}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$">$ USD</SelectItem>
                      <SelectItem value="€">€ EUR</SelectItem>
                      <SelectItem value="£">£ GBP</SelectItem>
                      <SelectItem value="¥">¥ JPY</SelectItem>
                      <SelectItem value="₹">₹ INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs">Tax %</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={item.taxRate ?? documentData.template.taxRate}
                    onChange={(e) => handleUpdateLineItem(item.id, "taxRate", Number.parseFloat(e.target.value) || 0)}
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Amount</Label>
                  <Input type="number" value={item.amount.toFixed(2)} readOnly className="h-8 text-sm bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <h3 className="font-semibold mb-3 text-sm">Additional Info</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="notes" className="text-xs">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={documentData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="min-h-[60px] text-sm"
              rows={2}
              placeholder={documentData.template.labels.notesPlaceholder}
            />
          </div>
          <div>
            <Label htmlFor="terms" className="text-xs">
              Terms
            </Label>
            <Textarea
              id="terms"
              value={documentData.terms}
              onChange={(e) => updateField("terms", e.target.value)}
              className="min-h-[60px] text-sm"
              rows={2}
              placeholder={documentData.template.labels.termsPlaceholder}
            />
          </div>
          <div>
            <Label htmlFor="footer" className="text-xs">
              Footer
            </Label>
            <Textarea
              id="footer"
              value={documentData.footer}
              onChange={(e) => updateField("footer", e.target.value)}
              className="min-h-[40px] text-sm"
              rows={1}
              placeholder={documentData.template.labels.footerPlaceholder}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
