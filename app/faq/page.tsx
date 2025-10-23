"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { getBrowserLocale, getPageTranslations, type Locale } from "@/lib/translations"

export default function FAQPage() {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    setLocale(getBrowserLocale())
  }, [])

  const t = getPageTranslations(locale)

  const faqs = [
    {
      question: "How do I create an invoice?",
      answer: "Simply fill in the form fields on the main page, customize your template, and download as PDF.",
    },
    {
      question: "Can I customize the invoice template?",
      answer: "Yes! Click the 'Customize Template' button to change colors, fonts, logos, and all text labels.",
    },
    {
      question: "Is my data saved?",
      answer:
        "All data is stored locally in your browser. We don't store any of your invoice information on our servers.",
    },
    {
      question: "Can I use different currencies?",
      answer: "Yes, you can select from multiple currencies including USD, EUR, GBP, JPY, and more.",
    },
    {
      question: "How do I add my company logo?",
      answer: "In the Customize Template panel, you can upload a logo file or paste an image URL.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t.faq.title}</h1>
          <p className="text-xl text-muted-foreground">{t.faq.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="ghost">Back to Invoice Generator</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
