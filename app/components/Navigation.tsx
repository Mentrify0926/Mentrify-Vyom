"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "backdrop-blur-md bg-white/70 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/6-removebg-preview.png"
              alt="Mentrify"
              width={50}
              height={50}
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Mentrify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { href: "/mentors", label: "Find Mentors" },
              { href: "/become-mentor", label: "Become a Mentor" },
              { href: "/about", label: "About" },
              { href: "/support", label: "Support" },
            ].map((item) => (
              <Link
                href={item.href}
                className="relative text-sm font-medium text-gray-900 group"
              >
                <span
                  className="
                    relative inline-block transition-all duration-300
                    text-gray-900
                    group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600
                    group-hover:bg-clip-text group-hover:text-transparent
                  "
                >
                  {item.label}
                </span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/signin"
              className="relative text-sm font-medium text-gray-900 group"
            >
              <span className="relative inline-block transition-all duration-300 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-[length:200%_100%] bg-left text-gray-900 group-hover:bg-right group-hover:text-transparent">
                Sign In
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/mentors">
              <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-all shadow-sm">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-md bg-white/80 border-t border-gray-200 shadow-sm">
          <div className="px-6 py-6 space-y-4">
            {[
              { href: "/mentors", label: "Find Mentors" },
              { href: "/become-mentor", label: "Become a Mentor" },
              { href: "/about", label: "About" },
              { href: "/support", label: "Support" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative block font-medium text-gray-900 group"
              >
                <span className="relative inline-block transition-all duration-300 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-[length:200%_100%] bg-left text-gray-900 group-hover:bg-right group-hover:text-transparent">
                  {item.label}
                </span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/signin"
                className="relative block font-medium text-gray-900 group"
              >
                <span className="relative inline-block transition-all duration-300 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-[length:200%_100%] bg-left text-gray-900 group-hover:bg-right group-hover:text-transparent">
                  Sign In
                </span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/mentors" className="block mt-4">
                <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition shadow-sm">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
