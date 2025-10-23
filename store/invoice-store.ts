import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { DocumentData, DocumentType, PaperSize, TemplateType, Locale } from "@/types/invoice"
import { getLocalizedLabels } from "@/lib/translations"

interface InvoiceStore {
  documentData: DocumentData
  paperSize: PaperSize
  templateType: TemplateType
  locale: Locale
  theme: "light" | "dark"
  showSettings: boolean

  // Document actions
  setDocumentData: (data: DocumentData) => void
  updateDocumentField: (field: keyof DocumentData, value: any) => void
  updateTemplateField: (field: keyof DocumentData["template"], value: any) => void
  updateLabelField: (field: keyof DocumentData["template"]["labels"], value: string) => void

  // UI actions
  setPaperSize: (size: PaperSize) => void
  setTemplateType: (type: TemplateType) => void
  setLocale: (locale: Locale) => void
  setTheme: (theme: "light" | "dark") => void
  setShowSettings: (show: boolean) => void
  setDocumentType: (type: DocumentType) => void
}

const getDefaultDocumentData = (): DocumentData => ({
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

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      documentData: getDefaultDocumentData(),
      paperSize: "A4",
      templateType: "standard",
      locale: "en",
      theme: "light",
      showSettings: false,

      setDocumentData: (data) => set({ documentData: data }),

      updateDocumentField: (field, value) =>
        set((state) => ({
          documentData: { ...state.documentData, [field]: value },
        })),

      updateTemplateField: (field, value) =>
        set((state) => ({
          documentData: {
            ...state.documentData,
            template: { ...state.documentData.template, [field]: value },
          },
        })),

      updateLabelField: (field, value) =>
        set((state) => ({
          documentData: {
            ...state.documentData,
            template: {
              ...state.documentData.template,
              labels: { ...state.documentData.template.labels, [field]: value },
            },
          },
        })),

      setPaperSize: (size) => set({ paperSize: size }),

      setTemplateType: (type) =>
        set((state) => ({
          templateType: type,
          documentData: {
            ...state.documentData,
            template: { ...state.documentData.template, templateType: type },
          },
        })),

      setLocale: (locale) =>
        set((state) => ({
          locale,
          documentData: {
            ...state.documentData,
            locale,
            template: {
              ...state.documentData.template,
              labels: getLocalizedLabels(locale, state.documentData.type),
            },
          },
        })),

      setTheme: (theme) => set({ theme }),

      setShowSettings: (show) => set({ showSettings: show }),

      setDocumentType: (type) =>
        set((state) => ({
          documentData: {
            ...state.documentData,
            type,
            documentNumber: type === "invoice" ? "INV-001" : "PO-001",
            template: {
              ...state.documentData.template,
              labels: getLocalizedLabels(state.locale, type),
            },
          },
        })),
    }),
    {
      name: "invoice-store",
      partialize: (state) => ({
        documentData: state.documentData,
        paperSize: state.paperSize,
        templateType: state.templateType,
        locale: state.locale,
        theme: state.theme,
      }),
    },
  ),
)
