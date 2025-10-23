export type Locale = "en" | "fr" | "es" | "de" | "it" | "pt"

export interface LocalizedLabels {
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

export interface PageTranslations {
  pricing: {
    title: string
    subtitle: string
    free: string
    pro: string
    enterprise: string
  }
  auth: {
    signIn: string
    signUp: string
    email: string
    password: string
    forgotPassword: string
    noAccount: string
    haveAccount: string
  }
  faq: {
    title: string
    subtitle: string
  }
}

export const translations: Record<Locale, { invoice: LocalizedLabels; purchaseOrder: LocalizedLabels }> = {
  en: {
    invoice: {
      documentTitle: "INVOICE",
      documentNumberLabel: "Invoice Number",
      dateLabel: "Date",
      dueDateLabel: "Due Date",
      fromLabel: "FROM",
      toLabel: "BILL TO",
      descriptionLabel: "Description",
      quantityLabel: "Quantity",
      rateLabel: "Rate",
      amountLabel: "Amount",
      subtotalLabel: "Subtotal",
      taxLabel: "Tax",
      totalLabel: "Total",
      notesLabel: "Notes",
      termsLabel: "Terms & Conditions",
      notesPlaceholder: "Thank you for your business!",
      termsPlaceholder: "Payment is due within 30 days.",
      footerLabel: "Footer",
      footerPlaceholder: "Company Name | Address | Phone | Email",
    },
    purchaseOrder: {
      documentTitle: "PURCHASE ORDER",
      documentNumberLabel: "PO Number",
      dateLabel: "Date",
      dueDateLabel: "Delivery Date",
      fromLabel: "BUYER",
      toLabel: "VENDOR",
      descriptionLabel: "Description",
      quantityLabel: "Quantity",
      rateLabel: "Unit Price",
      amountLabel: "Total",
      subtotalLabel: "Subtotal",
      taxLabel: "Tax",
      totalLabel: "Total Amount",
      notesLabel: "Special Instructions",
      termsLabel: "Terms & Conditions",
      notesPlaceholder: "Please deliver to the address specified above.",
      termsPlaceholder: "All items must be delivered by the specified delivery date.",
      footerLabel: "Footer",
      footerPlaceholder: "Company Name | Address | Phone | Email",
    },
  },
  fr: {
    invoice: {
      documentTitle: "FACTURE",
      documentNumberLabel: "Numéro de facture",
      dateLabel: "Date",
      dueDateLabel: "Date d'échéance",
      fromLabel: "DE",
      toLabel: "FACTURER À",
      descriptionLabel: "Désignation",
      quantityLabel: "Qté",
      rateLabel: "P.U. HT",
      amountLabel: "Total HT",
      subtotalLabel: "Sous-total",
      taxLabel: "TVA",
      totalLabel: "Total TTC",
      notesLabel: "Notes",
      termsLabel: "Conditions",
      notesPlaceholder: "Merci pour votre confiance!",
      termsPlaceholder: "Paiement sous 30 jours.",
      footerLabel: "Pied de page",
      footerPlaceholder: "Nom de l'entreprise | Adresse | Téléphone | Email",
    },
    purchaseOrder: {
      documentTitle: "BON DE COMMANDE",
      documentNumberLabel: "Numéro BC",
      dateLabel: "Date",
      dueDateLabel: "Date de livraison",
      fromLabel: "ACHETEUR",
      toLabel: "FOURNISSEUR",
      descriptionLabel: "Désignation",
      quantityLabel: "Qté",
      rateLabel: "Prix unitaire",
      amountLabel: "Total",
      subtotalLabel: "Sous-total",
      taxLabel: "TVA",
      totalLabel: "Montant total",
      notesLabel: "Instructions",
      termsLabel: "Conditions",
      notesPlaceholder: "Veuillez livrer à l'adresse indiquée.",
      termsPlaceholder: "Tous les articles doivent être livrés à la date spécifiée.",
      footerLabel: "Pied de page",
      footerPlaceholder: "Nom de l'entreprise | Adresse | Téléphone | Email",
    },
  },
  es: {
    invoice: {
      documentTitle: "FACTURA",
      documentNumberLabel: "Número de factura",
      dateLabel: "Fecha",
      dueDateLabel: "Fecha de vencimiento",
      fromLabel: "DE",
      toLabel: "FACTURAR A",
      descriptionLabel: "Descripción",
      quantityLabel: "Cantidad",
      rateLabel: "Precio",
      amountLabel: "Importe",
      subtotalLabel: "Subtotal",
      taxLabel: "IVA",
      totalLabel: "Total",
      notesLabel: "Notas",
      termsLabel: "Términos y condiciones",
      notesPlaceholder: "¡Gracias por su negocio!",
      termsPlaceholder: "El pago vence en 30 días.",
      footerLabel: "Pie de página",
      footerPlaceholder: "Nombre de la empresa | Dirección | Teléfono | Email",
    },
    purchaseOrder: {
      documentTitle: "ORDEN DE COMPRA",
      documentNumberLabel: "Número OC",
      dateLabel: "Fecha",
      dueDateLabel: "Fecha de entrega",
      fromLabel: "COMPRADOR",
      toLabel: "PROVEEDOR",
      descriptionLabel: "Descripción",
      quantityLabel: "Cantidad",
      rateLabel: "Precio unitario",
      amountLabel: "Total",
      subtotalLabel: "Subtotal",
      taxLabel: "IVA",
      totalLabel: "Importe total",
      notesLabel: "Instrucciones",
      termsLabel: "Términos y condiciones",
      notesPlaceholder: "Por favor entregar en la dirección especificada.",
      termsPlaceholder: "Todos los artículos deben entregarse en la fecha especificada.",
      footerLabel: "Pie de página",
      footerPlaceholder: "Nombre de la empresa | Dirección | Teléfono | Email",
    },
  },
  de: {
    invoice: {
      documentTitle: "RECHNUNG",
      documentNumberLabel: "Rechnungsnummer",
      dateLabel: "Datum",
      dueDateLabel: "Fälligkeitsdatum",
      fromLabel: "VON",
      toLabel: "RECHNUNG AN",
      descriptionLabel: "Beschreibung",
      quantityLabel: "Menge",
      rateLabel: "Preis",
      amountLabel: "Betrag",
      subtotalLabel: "Zwischensumme",
      taxLabel: "MwSt",
      totalLabel: "Gesamt",
      notesLabel: "Notizen",
      termsLabel: "Geschäftsbedingungen",
      notesPlaceholder: "Vielen Dank für Ihr Geschäft!",
      termsPlaceholder: "Zahlung fällig innerhalb von 30 Tagen.",
      footerLabel: "Fußzeile",
      footerPlaceholder: "Firmenname | Adresse | Telefon | E-Mail",
    },
    purchaseOrder: {
      documentTitle: "BESTELLUNG",
      documentNumberLabel: "Bestellnummer",
      dateLabel: "Datum",
      dueDateLabel: "Lieferdatum",
      fromLabel: "KÄUFER",
      toLabel: "LIEFERANT",
      descriptionLabel: "Beschreibung",
      quantityLabel: "Menge",
      rateLabel: "Stückpreis",
      amountLabel: "Gesamt",
      subtotalLabel: "Zwischensumme",
      taxLabel: "MwSt",
      totalLabel: "Gesamtbetrag",
      notesLabel: "Anweisungen",
      termsLabel: "Geschäftsbedingungen",
      notesPlaceholder: "Bitte an die angegebene Adresse liefern.",
      termsPlaceholder: "Alle Artikel müssen bis zum angegebenen Datum geliefert werden.",
      footerLabel: "Fußzeile",
      footerPlaceholder: "Firmenname | Adresse | Telefon | E-Mail",
    },
  },
  it: {
    invoice: {
      documentTitle: "FATTURA",
      documentNumberLabel: "Numero fattura",
      dateLabel: "Data",
      dueDateLabel: "Data di scadenza",
      fromLabel: "DA",
      toLabel: "FATTURARE A",
      descriptionLabel: "Descrizione",
      quantityLabel: "Quantità",
      rateLabel: "Prezzo",
      amountLabel: "Importo",
      subtotalLabel: "Subtotale",
      taxLabel: "IVA",
      totalLabel: "Totale",
      notesLabel: "Note",
      termsLabel: "Termini e condizioni",
      notesPlaceholder: "Grazie per il vostro business!",
      termsPlaceholder: "Il pagamento è dovuto entro 30 giorni.",
      footerLabel: "Piè di pagina",
      footerPlaceholder: "Nome azienda | Indirizzo | Telefono | Email",
    },
    purchaseOrder: {
      documentTitle: "ORDINE DI ACQUISTO",
      documentNumberLabel: "Numero OA",
      dateLabel: "Data",
      dueDateLabel: "Data di consegna",
      fromLabel: "ACQUIRENTE",
      toLabel: "FORNITORE",
      descriptionLabel: "Descrizione",
      quantityLabel: "Quantità",
      rateLabel: "Prezzo unitario",
      amountLabel: "Totale",
      subtotalLabel: "Subtotale",
      taxLabel: "IVA",
      totalLabel: "Importo totale",
      notesLabel: "Istruzioni",
      termsLabel: "Termini e condizioni",
      notesPlaceholder: "Si prega di consegnare all'indirizzo specificato.",
      termsPlaceholder: "Tutti gli articoli devono essere consegnati entro la data specificata.",
      footerLabel: "Piè di pagina",
      footerPlaceholder: "Nome azienda | Indirizzo | Telefono | Email",
    },
  },
  pt: {
    invoice: {
      documentTitle: "FATURA",
      documentNumberLabel: "Número da fatura",
      dateLabel: "Data",
      dueDateLabel: "Data de vencimento",
      fromLabel: "DE",
      toLabel: "FATURAR PARA",
      descriptionLabel: "Descrição",
      quantityLabel: "Quantidade",
      rateLabel: "Preço",
      amountLabel: "Valor",
      subtotalLabel: "Subtotal",
      taxLabel: "IVA",
      totalLabel: "Total",
      notesLabel: "Notas",
      termsLabel: "Termos e condições",
      notesPlaceholder: "Obrigado pelo seu negócio!",
      termsPlaceholder: "O pagamento é devido em 30 dias.",
      footerLabel: "Rodapé",
      footerPlaceholder: "Nome da empresa | Endereço | Telefone | Email",
    },
    purchaseOrder: {
      documentTitle: "ORDEM DE COMPRA",
      documentNumberLabel: "Número OC",
      dateLabel: "Data",
      dueDateLabel: "Data de entrega",
      fromLabel: "COMPRADOR",
      toLabel: "FORNECEDOR",
      descriptionLabel: "Descrição",
      quantityLabel: "Quantidade",
      rateLabel: "Preço unitário",
      amountLabel: "Total",
      subtotalLabel: "Subtotal",
      taxLabel: "IVA",
      totalLabel: "Valor total",
      notesLabel: "Instruções",
      termsLabel: "Termos e condições",
      notesPlaceholder: "Por favor, entregar no endereço especificado.",
      termsPlaceholder: "Todos os itens devem ser entregues na data especificada.",
      footerLabel: "Rodapé",
      footerPlaceholder: "Nome da empresa | Endereço | Telefone | Email",
    },
  },
}

export const pageTranslations: Record<Locale, PageTranslations> = {
  en: {
    pricing: {
      title: "Pricing Plans",
      subtitle: "Choose the perfect plan for your business",
      free: "Free",
      pro: "Pro",
      enterprise: "Enterprise",
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
    },
  },
  fr: {
    pricing: {
      title: "Plans tarifaires",
      subtitle: "Choisissez le plan parfait pour votre entreprise",
      free: "Gratuit",
      pro: "Pro",
      enterprise: "Entreprise",
    },
    auth: {
      signIn: "Se connecter",
      signUp: "S'inscrire",
      email: "Email",
      password: "Mot de passe",
      forgotPassword: "Mot de passe oublié?",
      noAccount: "Pas de compte?",
      haveAccount: "Vous avez déjà un compte?",
    },
    faq: {
      title: "Questions fréquentes",
      subtitle: "Trouvez des réponses aux questions courantes",
    },
  },
  es: {
    pricing: {
      title: "Planes de precios",
      subtitle: "Elija el plan perfecto para su negocio",
      free: "Gratis",
      pro: "Pro",
      enterprise: "Empresa",
    },
    auth: {
      signIn: "Iniciar sesión",
      signUp: "Registrarse",
      email: "Correo electrónico",
      password: "Contraseña",
      forgotPassword: "¿Olvidó su contraseña?",
      noAccount: "¿No tiene cuenta?",
      haveAccount: "¿Ya tiene cuenta?",
    },
    faq: {
      title: "Preguntas frecuentes",
      subtitle: "Encuentre respuestas a preguntas comunes",
    },
  },
  de: {
    pricing: {
      title: "Preispläne",
      subtitle: "Wählen Sie den perfekten Plan für Ihr Unternehmen",
      free: "Kostenlos",
      pro: "Pro",
      enterprise: "Unternehmen",
    },
    auth: {
      signIn: "Anmelden",
      signUp: "Registrieren",
      email: "E-Mail",
      password: "Passwort",
      forgotPassword: "Passwort vergessen?",
      noAccount: "Kein Konto?",
      haveAccount: "Haben Sie bereits ein Konto?",
    },
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Finden Sie Antworten auf häufige Fragen",
    },
  },
  it: {
    pricing: {
      title: "Piani tariffari",
      subtitle: "Scegli il piano perfetto per la tua azienda",
      free: "Gratuito",
      pro: "Pro",
      enterprise: "Impresa",
    },
    auth: {
      signIn: "Accedi",
      signUp: "Registrati",
      email: "Email",
      password: "Password",
      forgotPassword: "Password dimenticata?",
      noAccount: "Non hai un account?",
      haveAccount: "Hai già un account?",
    },
    faq: {
      title: "Domande frequenti",
      subtitle: "Trova risposte alle domande comuni",
    },
  },
  pt: {
    pricing: {
      title: "Planos de preços",
      subtitle: "Escolha o plano perfeito para o seu negócio",
      free: "Grátis",
      pro: "Pro",
      enterprise: "Empresa",
    },
    auth: {
      signIn: "Entrar",
      signUp: "Registrar",
      email: "Email",
      password: "Senha",
      forgotPassword: "Esqueceu a senha?",
      noAccount: "Não tem conta?",
      haveAccount: "Já tem conta?",
    },
    faq: {
      title: "Perguntas frequentes",
      subtitle: "Encontre respostas para perguntas comuns",
    },
  },
}

export function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language.split("-")[0]
  const supportedLocales: Locale[] = ["en", "fr", "es", "de", "it", "pt"]

  return supportedLocales.includes(browserLang as Locale) ? (browserLang as Locale) : "en"
}

export function getLocalizedLabels(locale: Locale, documentType: "invoice" | "purchase-order"): LocalizedLabels {
  return documentType === "invoice" ? translations[locale].invoice : translations[locale].purchaseOrder
}

export function getPageTranslations(locale: Locale): PageTranslations {
  return pageTranslations[locale]
}
