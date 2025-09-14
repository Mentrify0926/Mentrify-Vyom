"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Users, Award, TrendingUp, Star, DollarSign, CheckCircle } from "lucide-react"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

export default function BecomeMentorPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    year: "",
    linkedin: "",
    motivation: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Your Journey. <br />
            <span className="apple-gradient-text">Shape Someone’s Future.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Become a verified mentor and turn your college experience into guidance for the next generation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="apple-button text-lg px-8 py-4">
              Start Application <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="apple-button-secondary text-lg px-8 py-4">Learn More</button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: DollarSign, number: "₹100", label: "Per Session", color: "bg-green-500" },
            { icon: Users, number: "1000+", label: "Students Helped", color: "bg-blue-500" },
            { icon: Star, number: "4.9", label: "Avg. Rating", color: "bg-yellow-500" },
            { icon: TrendingUp, number: "98%", label: "Success Rate", color: "bg-purple-500" },
          ].map((stat, i) => (
            <div key={i}>
              <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Mentor with Mentrify?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Make an impact, grow your personal brand, and earn while helping juniors.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Verified Certificate",
                desc: "Get a mentor certificate to showcase on LinkedIn and resumes.",
                color: "bg-blue-500",
              },
              {
                icon: TrendingUp,
                title: "Build Your Brand",
                desc: "Position yourself as a thought leader among your peers.",
                color: "bg-purple-500",
              },
              {
                icon: Users,
                title: "Impact Students",
                desc: "Provide authentic guidance that helps juniors succeed.",
                color: "bg-green-500",
              },
            ].map((b, i) => (
              <div key={i} className="p-8 rounded-3xl border border-gray-100 hover:shadow-md transition">
                <div className={`w-14 h-14 ${b.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <b.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{b.title}</h3>
                <p className="text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your Next Steps</h2>
            <p className="text-lg text-gray-600 mb-10">
              Becoming a mentor is simple — just apply, get verified, and start guiding.
            </p>
            <ul className="space-y-6 text-gray-700">
              {[
                "Quick 5-min application",
                "Profile verified within 24 hours",
                "Earn ₹100 per session",
                "Flexible scheduling",
              ].map((point, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Mentor Application</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Full Name", field: "name", type: "text", required: true },
                { label: "College Email", field: "email", type: "email", required: true },
                { label: "College/University", field: "college", type: "text", required: true },
                { label: "Course/Program", field: "course", type: "text", required: true },
              ].map((input, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{input.label} *</label>
                  <input
                    type={input.type}
                    value={formData[input.field as keyof typeof formData]}
                    onChange={(e) => handleInputChange(input.field, e.target.value)}
                    required={input.required}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study *</label>
                <select
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>5th Year</option>
                  <option>Final Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to mentor? *</label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => handleInputChange("motivation", e.target.value)}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
              <button type="submit" className="apple-button w-full text-lg py-4">
                Submit Application <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-white">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Start Mentoring?</h2>
        <p className="text-lg text-gray-600 mb-8">Help juniors. Build your brand. Earn along the way.</p>
        <button className="apple-button text-lg px-8 py-4">Apply Now</button>
      </section>

      <Footer />
    </div>
  )
}
