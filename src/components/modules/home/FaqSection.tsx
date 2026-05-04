'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "How do I find the right tutor?",
    answer: "You can use our advanced search filters to find tutors based on subject, price range, ratings, and availability. We also offer introductory sessions so you can ensure it's a good match before committing.",
  },
  {
    question: "How does the payment process work?",
    answer: "Payments are processed securely through our platform using Stripe. You can pay per session or purchase a package. Funds are held in escrow and released to the tutor only after the session is successfully completed.",
  },
  {
    question: "Can I reschedule or cancel a session?",
    answer: "Yes, you can reschedule or cancel a session up to 24 hours before the scheduled time without any penalty. Late cancellations may incur a fee depending on the tutor's policy.",
  },
  {
    question: "Are the tutors verified?",
    answer: "Absolutely. All our tutors go through a rigorous vetting process that includes identity verification, background checks, and evaluation of their academic credentials and teaching experience.",
  },
  {
    question: "What equipment do I need for online classes?",
    answer: "You'll need a stable internet connection, a computer or tablet, a webcam, and a microphone. We recommend using headphones for better audio quality during sessions.",
  }
];

export function FaqSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about SkillBridge and how it works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="mb-4 border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left text-lg font-semibold py-4 hover:no-underline hover:text-primary transition-colors cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
