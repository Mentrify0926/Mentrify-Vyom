"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Users, Target, Lightbulb, Rocket } from "lucide-react"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

export default function AboutPage() {
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
      <section className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden bg-white">
        {/* gradient accents */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl"></div>

        <div ref={(el) => (sectionsRef.current[0] = el)} className="relative z-10 px-6 max-w-3xl opacity-0">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="apple-gradient-text">Mentrify</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Empowering students with <span className="text-gray-900 font-medium">real mentorship</span> from verified
            college seniors.  
            We help you make smarter choices about academics, campus life, and careers.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="py-20 bg-gray-50 opacity-0">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At Mentrify, we believe that the best guidance comes from those who’ve already walked the path.  
              Our mission is to bridge the gap between **aspiring students** and **experienced seniors**, making
              mentorship accessible, trustworthy, and impactful.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <Users className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                Build a community of verified mentors across top colleges
              </li>
              <li className="flex items-start">
                <Target className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                Help students make informed academic & career decisions
              </li>
              <li className="flex items-start">
                <Lightbulb className="h-5 w-5 text-indigo-600 mt-1 mr-3" />
                Share honest, real-world insights that matter
              </li>
            </ul>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 -right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl"></div>
            <img
              src="/6-removebg-preview.png"
              alt="Mentorship illustration"
              className="relative z-10 w-full max-w-md object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="py-20 bg-white opacity-0">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Authenticity",
                desc: "All our mentors are verified seniors — no fake promises, only real experiences.",
              },
              {
                icon: Lightbulb,
                title: "Clarity",
                desc: "We cut through the noise with honest, practical insights tailored to your journey.",
              },
              {
                icon: Rocket,
                title: "Growth",
                desc: "Our goal is to help students unlock their true potential through mentorship.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-xl flex items-center justify-center apple-gradient-blue text-white shadow-sm">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={(el) => (sectionsRef.current[3] = el)} className="py-20 bg-gray-50 text-center opacity-0">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Join the Future of Mentorship</h2>
          <p className="text-lg text-gray-600 mb-8">
            Thousands of students are already discovering clarity with Mentrify.  
            Whether you want to learn or guide, there’s a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentors">
              <button className="apple-button text-lg px-8 py-4">Find a Mentor</button>
            </Link>
            <Link href="/become-mentor">
              <button className="apple-button-secondary text-lg px-8 py-4">
                Become a Mentor
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
