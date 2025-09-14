"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, MapPin, Calendar, Verified, Star } from "lucide-react"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

const mentors = [
  {
    id: 1,
    name: "Vyom Padalia",
    college: "IIT Delhi",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    rating: 4.9,
    sessions: 45,
    image: "/placeholder.svg?height=120&width=120",
    languages: ["Hindi", "English"],
    specialties: ["Engineering", "Coding", "Campus Life", "Placements"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Passionate about helping juniors navigate their engineering journey with practical insights.",
  },
  {
    id: 2,
    name: "Sneha Patel",
    college: "AIIMS Delhi",
    course: "MBBS",
    year: "4th Year",
    rating: 4.8,
    sessions: 32,
    image: "/placeholder.svg?height=120&width=120",
    languages: ["English", "Gujarati"],
    specialties: ["Medical", "NEET", "Study Tips", "Research"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Medical student passionate about guiding aspiring doctors through their journey.",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    college: "SRCC Delhi",
    course: "Economics (Hons)",
    year: "2nd Year",
    rating: 4.7,
    sessions: 28,
    image: "/placeholder.svg?height=120&width=120",
    languages: ["Hindi", "English"],
    specialties: ["Commerce", "Economics", "DU Life", "Finance"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Economics enthusiast helping students understand commerce and finance better.",
  },
  {
    id: 4,
    name: "Priya Singh",
    college: "NIT Trichy",
    course: "Mechanical Engineering",
    year: "3rd Year",
    rating: 4.9,
    sessions: 38,
    image: "/placeholder.svg?height=120&width=120",
    languages: ["English", "Tamil"],
    specialties: ["Engineering", "NIT Life", "Placements", "Research"],
    location: "Tamil Nadu",
    price: 100,
    verified: true,
    bio: "Mechanical engineering student with expertise in placements and research opportunities.",
  },
  {
    id: 5,
    name: "Karan Mehta",
    college: "IIM Ahmedabad",
    course: "MBA",
    year: "1st Year",
    rating: 4.6,
    sessions: 22,
    image: "/placeholder.svg?height=120&width=120",
    languages: ["English", "Hindi"],
    specialties: ["MBA", "CAT Prep", "Business", "Consulting"],
    location: "Gujarat",
    price: 100,
    verified: true,
    bio: "MBA student helping aspirants crack CAT and understand business school life.",
  },
  {
    id: 6,
    name: "Ananya Reddy",
    college: "BITS Pilani",
    course: "Electronics & Communication",
    year: "4th Year",
    rating: 4.8,
    sessions: 41,
    image: "/placeholder.svg?height=120&width=120",
    languages: ["English", "Telugu"],
    specialties: ["Engineering", "BITS Life", "Research", "Internships"],
    location: "Rajasthan",
    price: 100,
    verified: true,
    bio: "Final year student with extensive experience in research and internships.",
  },
]

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [streamFilter, setStreamFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in-up")
            }, index * 100)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".mentor-card")
      cards.forEach((card) => observer.observe(card))
    }

    return () => observer.disconnect()
  }, [])

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.course.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCollege = collegeFilter === "all" || mentor.college.includes(collegeFilter)
    const matchesStream =
      streamFilter === "all" ||
      mentor.specialties.some((specialty) => specialty.toLowerCase().includes(streamFilter.toLowerCase()))

    return matchesSearch && matchesCollege && matchesStream
  })

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium mb-8 glass">
            <Verified className="w-4 h-4 mr-2 text-green-600" />
            All Mentors Verified
          </div>
          <h1 className="apple-text-hero text-gray-900 mb-6">Find Your Perfect Mentor</h1>
          <p className="apple-text-body text-gray-600 max-w-3xl mx-auto mb-12">
            Connect with verified college seniors from India's top institutions. Get personalized guidance from students
            who've walked your path.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search mentors, colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors duration-300"
            >
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              <span className="font-medium text-gray-700">Filters</span>
            </button>

            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredMentors.length}</span> mentors found
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 p-6 glass rounded-2xl animate-scale-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College Type</label>
                  <select
                    value={collegeFilter}
                    onChange={(e) => setCollegeFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Colleges</option>
                    <option value="IIT">IIT</option>
                    <option value="NIT">NIT</option>
                    <option value="AIIMS">AIIMS</option>
                    <option value="IIM">IIM</option>
                    <option value="BITS">BITS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stream</label>
                  <select
                    value={streamFilter}
                    onChange={(e) => setStreamFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Streams</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Commerce">Commerce</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setCollegeFilter("all")
                      setStreamFilter("all")
                      setSearchTerm("")
                    }}
                    className="w-full px-4 py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {filteredMentors.length > 0 ? (
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="mentor-card opacity-0 glass rounded-3xl p-8 apple-hover group cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className="relative">
                        <Image
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          width={60}
                          height={60}
                          className="rounded-2xl"
                        />
                        {mentor.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <Verified className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-sm text-gray-500">{mentor.college}</p>
                        <p className="text-sm text-blue-600 font-medium">
                          {mentor.course} • {mentor.year}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rating & Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-900">{mentor.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{mentor.sessions} sessions</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{mentor.location}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">{mentor.bio}</p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                      {mentor.specialties.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          +{mentor.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-8">
                    <p className="text-xs text-gray-500 mb-2">Languages:</p>
                    <div className="flex gap-2">
                      {mentor.languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-semibold text-gray-900">₹{mentor.price}</span>
                      <span className="text-gray-500 text-sm ml-1">/session</span>
                    </div>
                    <Link href={`/booking/${mentor.id}`}>
                      <button className="apple-button px-6 py-2 text-sm">Book Session</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No mentors found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your filters or search terms to find more mentors.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setCollegeFilter("all")
                  setStreamFilter("all")
                }}
                className="apple-button"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
