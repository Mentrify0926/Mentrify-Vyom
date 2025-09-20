"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { register, RegisterData } from '@/lib/auth'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, X, GraduationCap, Users, Phone, Calendar, FileText, CheckCircle, ArrowRight, Star, Target, BookOpen, Award } from 'lucide-react'

type SignupStep = 'role-selection' | 'role-benefits' | 'form'

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState<SignupStep>('role-selection')
  const [selectedRole, setSelectedRole] = useState<'mentee' | 'mentor' | null>(null)
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'mentee',
    brief: '',
    dob: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleRoleSelect = (role: 'mentee' | 'mentor') => {
    setSelectedRole(role)
    setFormData(prev => ({ ...prev, role }))
    setCurrentStep('role-benefits')
  }

  const handleContinueToForm = () => {
    setCurrentStep('form')
  }

  const handleBackToRoleSelection = () => {
    setCurrentStep('role-selection')
    setSelectedRole(null)
  }

  const handleBackToBenefits = () => {
    setCurrentStep('role-benefits')
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('Please enter your first name')
      return false
    }
    
    if (!formData.lastName.trim()) {
      setError('Please enter your last name')
      return false
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email address')
      return false
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    
    if (!formData.username.trim()) {
      setError('Please enter a username')
      return false
    }
    
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long')
      return false
    }
    
    if (!formData.phone.trim()) {
      setError('Please enter your phone number')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }

    if (formData.role === 'mentor') {
      if (!formData.brief?.trim()) {
        setError('Please enter a brief description about yourself')
        return false
      }
      
      if (!formData.dob?.trim()) {
        setError('Please enter your date of birth')
        return false
      }
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setError('')

    try {
      const result = await register(formData)
      
      if (result.success) {
        // Redirect to profile or home page
        router.push('/')
      } else {
        setError(result.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation */}
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="block sm:hidden mb-6">
            {/* Mobile Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              {currentStep !== 'role-selection' && (
                <Button
                  onClick={currentStep === 'form' ? handleBackToBenefits : handleBackToRoleSelection}
                  variant="outline"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
            
            {/* Mobile Timeline */}
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep === 'role-selection' 
                    ? 'bg-blue-600 text-white' 
                    : currentStep === 'role-benefits' || currentStep === 'form'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep === 'role-benefits' || currentStep === 'form' ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <span className="text-xs font-semibold">1</span>
                  )}
                </div>
                <div className={`w-8 h-0.5 transition-all duration-300 ${
                  currentStep === 'role-benefits' || currentStep === 'form' ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep === 'role-benefits' 
                    ? 'bg-blue-600 text-white' 
                    : currentStep === 'form'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep === 'form' ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <span className="text-xs font-semibold">2</span>
                  )}
                </div>
                <div className={`w-8 h-0.5 transition-all duration-300 ${
                  currentStep === 'form' ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep === 'form' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <span className="text-xs font-semibold">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between mb-8">
            {/* Left Side - Navigation */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              {currentStep !== 'role-selection' && (
                <Button
                  onClick={currentStep === 'form' ? handleBackToBenefits : handleBackToRoleSelection}
                  variant="outline"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>

            {/* Right Side - Timeline Steps */}
            <div className="flex items-center">
              {/* Step 1 */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep === 'role-selection' 
                    ? 'bg-blue-600 text-white' 
                    : currentStep === 'role-benefits' || currentStep === 'form'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep === 'role-benefits' || currentStep === 'form' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-semibold">1</span>
                  )}
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-900">Choose Role</p>
                </div>
              </div>

              {/* Connector */}
              <div className={`w-12 h-0.5 mx-3 transition-all duration-300 ${
                currentStep === 'role-benefits' || currentStep === 'form' ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>

              {/* Step 2 */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep === 'role-benefits' 
                    ? 'bg-blue-600 text-white' 
                    : currentStep === 'form'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep === 'form' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-semibold">2</span>
                  )}
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-900">Learn Benefits</p>
                </div>
              </div>

              {/* Connector */}
              <div className={`w-12 h-0.5 mx-3 transition-all duration-300 ${
                currentStep === 'form' ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>

              {/* Step 3 */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep === 'form' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <span className="text-xs font-semibold">3</span>
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-900">Register</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="flex items-center justify-center px-4 sm:px-6 pb-12">
        <div className="w-full max-w-6xl">
          {/* Dynamic Content Based on Step */}
          <div className="transition-all duration-500 ease-in-out">
            {currentStep === 'role-selection' && (
              <div className="animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Join Mentrify</h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed px-4">
                    Choose how you'd like to participate
                  </p>
                </div>

                {/* Role Selection Cards - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                  {/* Mentee Card */}
                  <div 
                    onClick={() => handleRoleSelect('mentee')}
                    className="p-8 border border-gray-200 rounded-3xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <GraduationCap className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">I'm a Mentee</h3>
                      <p className="text-gray-600 mb-6">Looking for guidance and mentorship from experienced students</p>
                      <div className="text-blue-600 font-medium group-hover:text-blue-700">
                        Get Started →
                      </div>
                    </div>
                  </div>

                  {/* Mentor Card */}
                  <div 
                    onClick={() => handleRoleSelect('mentor')}
                    className="p-8 border border-gray-200 rounded-3xl hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">I'm a Mentor</h3>
                      <p className="text-gray-600 mb-6">Share your experience and help guide other students</p>
                      <div className="text-purple-600 font-medium group-hover:text-purple-700">
                        Get Started →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'role-benefits' && selectedRole && (
              <div className="animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                    {selectedRole === 'mentee' ? 'Mentee Benefits' : 'Mentor Benefits'}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 px-4">
                    What you'll get as a {selectedRole} on Mentrify
                  </p>
                </div>

                {/* Benefits List - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-5xl mx-auto">
                  {selectedRole === 'mentee' ? (
                    <>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Mentors</h3>
                        <p className="text-gray-600">Connect with experienced college seniors from top universities</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Target className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Guidance</h3>
                        <p className="text-gray-600">Get 1-on-1 mentorship tailored to your goals and challenges</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Resources</h3>
                        <p className="text-gray-600">Access study materials, course recommendations, and insider tips</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Help Students Succeed</h3>
                        <p className="text-gray-600">Make a meaningful impact by guiding the next generation</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Your Network</h3>
                        <p className="text-gray-600">Connect with ambitious students and expand your professional network</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn Recognition</h3>
                        <p className="text-gray-600">Get featured as a verified mentor and build your reputation</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Continue Button */}
                <div className="text-center">
                  <Button
                    onClick={handleContinueToForm}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
                  >
                    Continue to Registration
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'form' && selectedRole && (
              <div className="animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                    {selectedRole === 'mentee' ? 'Mentee Registration' : 'Mentor Registration'}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 px-4">
                    Complete your registration to join as a {selectedRole}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 sm:mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl max-w-2xl mx-auto">
                    <p className="text-sm text-red-700 text-center">{error}</p>
                  </div>
                )}

                {/* Form - Responsive Layout */}
                <div className="max-w-4xl mx-auto px-4 sm:px-0">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {/* First Name Field */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              {/* Last Name Field */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
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

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-medium">@</span>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Mentor-specific fields */}
              {selectedRole === 'mentor' && (
                <>
                  {/* Brief Field */}
                  <div>
                    <label htmlFor="brief" className="block text-sm font-medium text-gray-700 mb-2">
                      Brief Description
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="brief"
                        name="brief"
                        required
                        value={formData.brief}
                        onChange={handleInputChange}
                        rows={3}
                        className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about yourself and your expertise..."
                      />
                    </div>
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        required
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                </>
              )}

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
                    placeholder="Create a password"
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

                    {/* Submit Button - Full Width */}
                    <div className="sm:col-span-2">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Creating Account...
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </div>
                  </form>

                  {/* Terms and Privacy */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                      By creating an account, you agree to our{' '}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sign In Link */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/signin" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
