export type DocumentType = "invoice" | "purchase-order"
export type PaperSize = "A4" | "A3" | "Letter" | "Custom"
export type TemplateType = "standard" | "compact"
export type Locale = "en" | "fr" | "es" | "de" | "it" | "pt"

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
