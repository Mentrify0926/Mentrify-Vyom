import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "12th Pass Student",
    college: "Now at AIIMS Delhi",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "My mentor's guidance was invaluable in choosing the right medical college. The insights about campus life and preparation strategies helped me make an informed decision that changed my life.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Mentor",
    college: "IIT Delhi, 4th Year",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Mentoring through Mentrify has been incredibly rewarding. Seeing students make confident decisions about their future while earning from my experience feels amazing.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "12th Pass Student",
    college: "Now at NIT Trichy",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The honest advice about engineering entrance exams and college life was exactly what I needed. My mentor helped me avoid common mistakes and focus on what really matters.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-100 to-cream-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full text-black text-sm font-bold mb-12 shadow-xl border border-cream-300">
            <Star className="w-6 h-6 mr-4 fill-current text-orange-500" />
            Student Success Stories
          </div>
          <h2 className="text-6xl sm:text-7xl font-black text-black mb-10">What Our Community Says</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Real feedback from students and mentors who've experienced the transformative power of authentic guidance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-3xl rounded-3xl bg-white hover:shadow-4xl transition-all duration-500 hover:-translate-y-4 group"
            >
              <CardContent className="p-12">
                <div className="flex items-center mb-10">
                  <Quote className="h-12 w-12 text-orange-500 opacity-60" />
                </div>

                <div className="flex items-center mb-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-7 w-7 text-orange-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-12 leading-relaxed text-lg italic font-medium">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <div className="relative">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-2xl mr-6"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h4 className="font-black text-black text-xl">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                    <p className="text-sm text-orange-600 font-bold">{testimonial.college}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
