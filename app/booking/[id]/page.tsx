"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Star, CheckCircle, ArrowLeft, Verified, MapPin, BookOpen } from "lucide-react"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"

const mentorData = {
  1: {
    name: "Vyom Padalia",
    college: "IIT Delhi",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    rating: 4.9,
    sessions: 45,
    image: "/placeholder.svg?height=120&width=120",
    bio: "Passionate about coding and helping juniors navigate their engineering journey. I've been through the ups and downs of IIT life and can share practical insights about academics, placements, and campus culture. My experience includes internships at top tech companies and research projects.",
    specialties: ["Engineering", "Coding", "Campus Life", "Placements"],
    languages: ["Hindi", "English"],
    location: "Delhi",
    verified: true,
  },
}

const timeSlots = [
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "04:00 PM", available: false },
  { time: "05:00 PM", available: true },
  { time: "06:00 PM", available: true },
]

const dates = [
  { date: "2024-01-15", day: "Mon", dayNum: 15, available: true },
  { date: "2024-01-16", day: "Tue", dayNum: 16, available: true },
  { date: "2024-01-17", day: "Wed", dayNum: 17, available: false },
  { date: "2024-01-18", day: "Thu", dayNum: 18, available: true },
  { date: "2024-01-19", day: "Fri", dayNum: 19, available: true },
  { date: "2024-01-20", day: "Sat", dayNum: 20, available: true },
  { date: "2024-01-21", day: "Sun", dayNum: 21, available: false },
]

export default function BookingPage() {
  const params = useParams()
  const mentorId = params.id as string
  const mentor = mentorData[mentorId as keyof typeof mentorData]

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [step, setStep] = useState(1)

  if (!mentor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mentor not found</h2>
          <Link href="/mentors">
            <button className="apple-button">Back to Mentors</button>
          </Link>
        </div>
      </div>
    )
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setStep(2)
    }
  }

  const handlePayment = () => {
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/mentors"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group font-medium transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Mentors
          </Link>

          {step === 1 && (
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Mentor Info */}
              <div className="lg:col-span-2">
                <div className="glass rounded-3xl p-8 sticky top-24">
                  <div className="text-center mb-8">
                    <div className="relative inline-block">
                      <Image
                        src={mentor.image || "/placeholder.svg"}
                        alt={mentor.name}
                        width={120}
                        height={120}
                        className="rounded-3xl mx-auto mb-6"
                      />
                      {mentor.verified && (
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                          <Verified className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{mentor.name}</h3>
                    <p className="text-gray-600 mb-1 font-medium">{mentor.college}</p>
                    <p className="text-blue-600 font-medium mb-6">
                      {mentor.course} • {mentor.year}
                    </p>

                    <div className="flex items-center justify-center space-x-6 mb-8">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold text-gray-900">{mentor.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{mentor.sessions} sessions</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{mentor.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">About</h4>
                    <p className="text-gray-600 leading-relaxed">{mentor.bio}</p>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Languages</h4>
                    <div className="flex gap-2">
                      {mentor.languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">Session Fee</span>
                        <div className="text-3xl font-semibold text-gray-900">₹100</div>
                        <span className="text-sm text-gray-500">45 minutes session</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600 font-medium mb-1">✓ Money-back guarantee</div>
                        <div className="text-sm text-green-600 font-medium">✓ Instant booking</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Calendar */}
              <div className="lg:col-span-3">
                <div className="glass rounded-3xl p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-2 flex items-center">
                      <Calendar className="h-8 w-8 mr-3 text-blue-600" />
                      Select Date & Time
                    </h2>
                    <p className="text-gray-600">Choose your preferred date and time for the mentorship session</p>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-12">
                    <h4 className="font-semibold text-gray-900 mb-6">Available Dates</h4>
                    <div className="grid grid-cols-7 gap-3">
                      {dates.map((dateObj) => (
                        <button
                          key={dateObj.date}
                          onClick={() => dateObj.available && setSelectedDate(dateObj.date)}
                          disabled={!dateObj.available}
                          className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                            selectedDate === dateObj.date
                              ? "apple-gradient-blue text-white shadow-lg scale-105"
                              : dateObj.available
                                ? "bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-900 hover:scale-105"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <div className="text-xs font-medium mb-1">{dateObj.day}</div>
                          <div className="text-lg font-semibold">{dateObj.dayNum}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="mb-12">
                      <h4 className="font-semibold text-gray-900 mb-6">Available Times</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                              selectedTime === slot.time
                                ? "apple-gradient-blue text-white shadow-lg scale-105"
                                : slot.available
                                  ? "bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-900 hover:scale-105"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Clock className="h-4 w-4 mx-auto mb-2" />
                            <div className="text-sm font-medium">{slot.time}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="bg-green-50 p-6 rounded-2xl mb-8">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                        <h4 className="font-semibold text-gray-900">Session Details</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <div className="font-semibold text-gray-900">
                            {new Date(selectedDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Time:</span>
                          <div className="font-semibold text-gray-900">{selectedTime}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <div className="font-semibold text-gray-900">45 minutes</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Fee:</span>
                          <div className="font-semibold text-gray-900">₹100</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <button onClick={handleBooking} className="apple-button w-full text-lg py-4">
                      Continue to Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              <div className="glass rounded-3xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-2">Confirm Your Booking</h2>
                  <p className="text-gray-600">Review your session details before payment</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <div className="flex items-center mb-6">
                    <Image
                      src={mentor.image || "/placeholder.svg"}
                      alt={mentor.name}
                      width={60}
                      height={60}
                      className="rounded-2xl mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{mentor.name}</h4>
                      <p className="text-gray-600 text-sm">{mentor.college}</p>
                      <p className="text-blue-600 text-sm font-medium">{mentor.course}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <div className="font-semibold text-gray-900">{new Date(selectedDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <div className="font-semibold text-gray-900">{selectedTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <div className="font-semibold text-gray-900">45 minutes</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Session Fee:</span>
                      <div className="font-semibold text-gray-900">₹100</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Amount:</span>
                    <span className="text-3xl font-semibold text-blue-600">₹100</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="apple-button-secondary flex-1 py-3">
                    Back
                  </button>
                  <button onClick={handlePayment} className="apple-button flex-1 py-3">
                    Pay & Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="glass rounded-3xl p-12">
                <div className="w-24 h-24 apple-gradient-blue rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Your mentorship session with <span className="font-semibold text-gray-900">{mentor.name}</span> has
                  been confirmed for{" "}
                  <span className="font-semibold text-gray-900">{new Date(selectedDate).toLocaleDateString()}</span> at{" "}
                  <span className="font-semibold text-gray-900">{selectedTime}</span>.
                </p>
                <div className="bg-blue-50 p-6 rounded-2xl mb-8">
                  <p className="text-blue-800 font-medium mb-4">What's Next?</p>
                  <ul className="text-blue-700 text-sm space-y-2">
                    <li>• You'll receive a confirmation email with meeting details</li>
                    <li>• Meeting link will be sent 30 minutes before the session</li>
                    <li>• Prepare your questions for maximum benefit</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="apple-button flex-1 py-3">View My Bookings</button>
                  <Link href="/mentors" className="flex-1">
                    <button className="apple-button-secondary w-full py-3">Book Another Session</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
