"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Why should I pay for mentorship when free advice is available online?",
    answer:
      "Our mentors provide personalized, experience-based guidance that you can't get from generic online content. They've recently been through the exact challenges you're facing and can offer current, relevant insights about specific colleges, courses, and career paths. The fee ensures quality sessions and compensates mentors for their valuable time.",
  },
  {
    question: "How do you verify your mentors?",
    answer:
      "We have a rigorous 3-step verification process: college email verification, student ID validation, and LinkedIn profile review. Each mentor also goes through a screening interview to ensure they can provide valuable guidance and maintain our quality standards.",
  },
  {
    question: "What happens if my mentor misses our scheduled session?",
    answer:
      "If a mentor misses a session, you'll receive an immediate full refund or can reschedule with the same mentor at no extra cost. We also maintain a backup mentor system for urgent cases and have a 24/7 support team to resolve any issues quickly.",
  },
  {
    question: "Can I choose mentors from specific colleges or courses?",
    answer:
      "Our advanced filtering system lets you search by college, course, year of study, specialization, language preferences, and even specific topics like placements, research, or campus life. This ensures you find the perfect mentor match for your needs.",
  },
  {
    question: "How long are the mentorship sessions and what do they include?",
    answer:
      "Standard sessions are 45 minutes long, providing ample time for meaningful conversation, Q&A, and actionable advice. Sessions can include college selection guidance, course insights, career planning, study strategies, and campus life discussions. Extended sessions can be arranged directly with mentors.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes! We offer a 100% satisfaction guarantee. If you're not completely satisfied with your session, we'll provide a full refund within 24 hours, no questions asked. Your success and satisfaction are our top priorities.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-8 py-4 bg-cream-100 rounded-full text-black text-sm font-bold mb-12 border border-cream-300 shadow-lg">
            <HelpCircle className="w-6 h-6 mr-4 text-orange-500" />
            Got Questions?
          </div>
          <h2 className="text-6xl sm:text-7xl font-black text-black mb-10">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Everything you need to know about Mentrify and how we're revolutionizing student mentorship
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`border-0 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "shadow-3xl bg-gradient-to-r from-cream-50 to-cream-100"
                  : "hover:shadow-3xl bg-white"
              }`}
            >
              <CardContent className="p-0">
                <button
                  className="w-full text-left p-10 hover:bg-cream-50 transition-colors group"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-black text-black pr-10 leading-relaxed group-hover:text-orange-600 transition-colors">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 ml-6">
                      {openIndex === index ? (
                        <ChevronUp className="h-8 w-8 text-orange-600" />
                      ) : (
                        <ChevronDown className="h-8 w-8 text-gray-400 group-hover:text-orange-600 transition-colors" />
                      )}
                    </div>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-10 pb-10">
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-burgundy-500 mb-8 rounded-full"></div>
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-24">
          <p className="text-gray-600 mb-10 text-xl font-medium">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg">
              Contact Support
            </button>
            <button className="px-12 py-5 border-3 border-black text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 text-lg">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
