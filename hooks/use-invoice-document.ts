import { useInvoiceStore } from "@/store/invoice-store"
import type { LineItem } from "@/types/invoice"

export function useInvoiceDocument() {
  const store = useInvoiceStore()

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
      currency: store.documentData.template.currency,
      taxRate: store.documentData.template.taxRate,
    }
    store.setDocumentData({
      ...store.documentData,
      items: [...store.documentData.items, newItem],
    })
  }

  const removeLineItem = (id: string) => {
    if (store.documentData.items.length > 1) {
      store.setDocumentData({
        ...store.documentData,
        items: store.documentData.items.filter((item) => item.id !== id),
      })
    }
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    const updatedItems = store.documentData.items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        if (field === "quantity" || field === "rate") {
          updated.amount = updated.quantity * updated.rate
        }
        return updated
      }
      return item
    })
    store.setDocumentData({ ...store.documentData, items: updatedItems })
  }

  const calculateTotals = () => {
    const subtotal = store.documentData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = store.documentData.template.showTax ? subtotal * (store.documentData.template.taxRate / 100) : 0
    const total = subtotal + tax

    return { subtotal, tax, total }
  }

  return {
    documentData: store.documentData,
    addLineItem,
    removeLineItem,
    updateLineItem,
    calculateTotals,
    updateField: store.updateDocumentField,
    updateTemplateField: store.updateTemplateField,
    updateLabelField: store.updateLabelField,
  }
}
