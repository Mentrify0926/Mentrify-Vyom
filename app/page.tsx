"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

export default function HomePage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.15 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
        {/* Futuristic animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-100">
          <div className="absolute inset-0">
            {/* moving gradient orbs */}
            <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
            {/* subtle lines / grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
          </div>
        </div>

        <div ref={(el) => { sectionsRef.current[0] = el }} className="relative z-10 max-w-3xl px-6 opacity-0">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Find Your Path <br />
            <span className="apple-gradient-text">With Someone Who’s Walked It</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Mentrify connects you with verified college seniors for{" "}
            <span className="font-medium text-gray-900">1-on-1 mentorship</span>. Honest insights about courses, campus
            life, and careers — from those who’ve lived it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentors">
              <button className="apple-button text-lg px-8 py-4 flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link href="/about">
              <button className="apple-button-secondary text-lg px-8 py-4">Learn More</button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-500">
            {["Verified mentors", "Instant booking", "Money-back guarantee"].map((item, i) => (
              <div key={i} className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={(el) => { sectionsRef.current[1] = el }} className="py-4 bg-white border-t border-gray-100 opacity-0">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "100+", label: "Mentors" },
            { number: "1,000+", label: "Sessions" },
            { number: "50+", label: "Top Colleges" },
            { number: "98%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-3xl font-semibold text-gray-900">{stat.number}</h3>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section ref={(el) => { sectionsRef.current[2] = el }} className="py-16 bg-gray-50 opacity-0">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Choose", description: "Browse verified mentors. Filter by course & expertise." },
              { title: "Book", description: "Pick a convenient slot. Simple, smart scheduling." },
              { title: "Connect", description: "Get real 1-on-1 guidance. Honest, practical advice." },
            ].map((step, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={(el) => { sectionsRef.current[3] = el }} className="py-20 bg-gray-900 text-white text-center opacity-0">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Mentor?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Thousands of students trust Mentrify to guide their academic journey. Join them today.
          </p>
          <Link href="/mentors">
            <button className="apple-button text-lg px-8 py-4">Get Started</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
