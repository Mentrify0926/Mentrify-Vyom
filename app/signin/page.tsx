"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/auth'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, CheckCircle, Users, BookOpen, Target, Star } from 'lucide-react'

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        // Redirect to profile or home page
        router.push('/')
      } else {
        setError(result.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome back!</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Simplify your learning journey and boost your productivity with <span className="apple-gradient-text font-semibold">Mentrify</span>. Get started for free.
            </p>
          </div>

          {/* Demo Credentials */}
          {/* <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-200">
            <p className="text-sm text-green-700 font-medium mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Demo Credentials
            </p>
            <div className="text-xs text-green-600 space-y-2">
              <div className="flex justify-between">
                <span><strong>Mentee:</strong></span>
                <span>demo@example.com / demo123</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Mentor:</strong></span>
                <span>mentor@example.com / mentor123</span>
              </div>
            </div>
          </div> */}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:text-purple-600 font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <Button
              type="button"
              variant="outline"
              className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
            >
              <span className="text-lg font-bold text-gray-700">G</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
            >
              <span className="text-lg font-bold text-blue-600">f</span>
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Not a member?{' '}
              <Link 
                href="/signup" 
                className="text-blue-600 hover:text-purple-600 font-medium transition-colors"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustrative Graphics */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <Image
          src="/right-mentor.png"
          alt="mentorship"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
