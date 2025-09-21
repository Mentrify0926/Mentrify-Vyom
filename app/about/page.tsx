"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Eye, Target, Users, Heart, Unlock, Globe } from "lucide-react"
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
      <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden bg-white">
        {/* Enhanced gradient accents */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-200/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>

        <div ref={(el) => (sectionsRef.current[0] = el)} className="relative z-10 px-6 max-w-4xl opacity-0">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            About <span className="apple-gradient-text">Mentrify</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {/* Connecting <span className="text-gray-900 font-semibold">12th-grade students</span> with mentors who understand their journey.
            Built by students, for students. */}
            We're <span className="text-gray-900 font-semibold">revolutionizing mentorship</span> by connecting students with <span className="text-gray-900 font-semibold">seniors</span> who truly understand their journey. Real experiences, honest guidance, authentic connections.
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="py-24 bg-gray-50 opacity-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center apple-gradient-blue text-white shadow-lg">
                  <Eye className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 ml-4">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Mentrify, our vision is to make mentorship a part of every student's journey. We aim to 
                empower young learners with the right guidance, helping them make informed choices, 
                build confidence, and unlock opportunities for a brighter future.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center apple-gradient text-white shadow-lg">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 ml-4">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to connect students with mentors who understand their challenges and aspirations. 
                By creating a platform where knowledge, experiences, and guidance are shared, we strive to bridge 
                the gap between academics and real-world decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Team Section */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="py-24 bg-white opacity-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">About Our Team</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Mentrify is built by a passionate team of <span className="text-gray-900 font-semibold">graduating students</span> who 
                  know firsthand the challenges that come with academic transitions and career choices.
                </p>
                <p>
                  Having recently gone through the same journey, we understand the struggles, doubts, and aspirations 
                  of 12th-grade students. Our shared experiences drive us to create a supportive ecosystem where 
                  mentorship is not just advice but a <span className="text-gray-900 font-semibold">relatable and impactful exchange</span> of knowledge.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-gray-100">
                <div className="text-center">
                  <Users className="h-20 w-20 mx-auto mb-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Students Helping Students</h3>
                  <p className="text-gray-600">Built with empathy, designed for impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section ref={(el) => (sectionsRef.current[3] = el)} className="py-24 bg-gray-50 opacity-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We connect 12th-grade students with mentors who can guide them in academics, career paths, and personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Direct Mentorship",
                desc: "Access to relatable, real-world insights from students who have recently navigated the same stage.",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                title: "Resource Sharing",
                desc: "Comprehensive resources and guidance materials to support your academic and career decisions.",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                title: "Community Support",
                desc: "Join a network of learners and mentors who grow, share, and succeed together.",
                gradient: "from-indigo-500 to-indigo-600"
              }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Heart className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={(el) => (sectionsRef.current[4] = el)} className="py-24 bg-white opacity-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Mentrify
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Accessibility",
                desc: "Making mentorship easy to access for every student, regardless of background.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: Heart,
                title: "Relatability",
                desc: "Ensuring guidance comes from mentors who truly understand the student experience.",
                color: "text-red-600",
                bg: "bg-red-50"
              },
              {
                icon: Target,
                title: "Impact",
                desc: "Focusing on creating meaningful change in students' academic and career journeys.",
                color: "text-green-600",
                bg: "bg-green-50"
              },
              {
                icon: Users,
                title: "Community",
                desc: "Building a network of learners and mentors who grow, share, and succeed together.",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                icon: Unlock,
                title: "Empowerment",
                desc: "Giving students the tools, clarity, and confidence to make their own informed choices.",
                color: "text-indigo-600",
                bg: "bg-indigo-50"
              }
            ].map((value, i) => (
              <div key={i} className={`${i === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''} group`}>
                <div className="bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 p-8 text-center transition-all duration-300 hover:shadow-lg h-full">
                  <div className={`w-16 h-16 ${value.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section ref={(el) => (sectionsRef.current[5] = el)} className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 text-center opacity-0 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
            Join the Future of <span className="apple-gradient-text">Mentorship</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Thousands of students are already discovering clarity with Mentrify. Whether you want to learn or guide, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/mentors">
              <button className="apple-button text-xl px-12 py-5 transform hover:scale-105 transition-all duration-200">
                Find a Mentor
              </button>
            </Link>
            <Link href="/become-mentor">
              <button className="apple-button-secondary text-xl px-12 py-5 transform hover:scale-105 transition-all duration-200">
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