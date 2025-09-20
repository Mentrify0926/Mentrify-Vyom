"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X, User, LogOut, Settings, BarChart3, UserCircle } from "lucide-react"
import { getUser, logout, isAuthenticated } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState(getUser())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const currentUser = getUser()
    setUser(currentUser)
    setIsAuthenticated(!!currentUser)
  }, [])

  const handleLogout = async () => {
    await logout()
    setUser(null)
    setIsAuthenticated(false)
    router.push('/')
  }

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

          {/* CTA Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2 px-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium">{user?.name || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Signed in as</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.name || 'Demo User'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user?.id}`} className="flex items-center">
                      <UserCircle className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
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
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">Signed in as</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link href={`/profile/${user?.id}`} className="flex items-center text-sm text-gray-700 hover:text-blue-600">
                      <UserCircle className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                    <Link href="/dashboard" className="flex items-center text-sm text-gray-700 hover:text-blue-600">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link href="/settings" className="flex items-center text-sm text-gray-700 hover:text-blue-600">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="flex items-center text-sm text-red-600 hover:text-red-700">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
