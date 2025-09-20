"use client"

import { useState, useEffect } from 'react'
import { getUser, isAuthenticated } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, User, TrendingUp, BookOpen, Star } from 'lucide-react'
import type { User as UserType } from '@/lib/auth'

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin')
      return
    }
    
    const currentUser = getUser()
    setUser(currentUser)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
          <button 
            onClick={() => router.push('/signin')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your {user.role === 'mentor' ? 'mentoring' : 'learning'} journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === 'mentor' ? (
            <>
              <StatCard 
                icon={<User className="h-6 w-6" />}
                title="Total Mentees"
                value="24"
                change="+3 this month"
                changeType="positive"
              />
              <StatCard 
                icon={<Calendar className="h-6 w-6" />}
                title="Sessions Completed"
                value={user.total_sessions?.toString() || "0"}
                change="+12 this month"
                changeType="positive"
              />
              <StatCard 
                icon={<Star className="h-6 w-6" />}
                title="Average Rating"
                value={user.rating?.toString() || "0"}
                change="↗ 0.2 this month"
                changeType="positive"
              />
              <StatCard 
                icon={<TrendingUp className="h-6 w-6" />}
                title="Monthly Earnings"
                value={`₹${((user.session_cost || 0) * 12).toLocaleString()}`}
                change="+₹3,600"
                changeType="positive"
              />
            </>
          ) : (
            <>
              <StatCard 
                icon={<BookOpen className="h-6 w-6" />}
                title="Sessions Attended"
                value="18"
                change="+4 this month"
                changeType="positive"
              />
              <StatCard 
                icon={<User className="h-6 w-6" />}
                title="Active Mentors"
                value="3"
                change="No change"
                changeType="neutral"
              />
              <StatCard 
                icon={<Clock className="h-6 w-6" />}
                title="Learning Hours"
                value="36"
                change="+8 this month"
                changeType="positive"
              />
              <StatCard 
                icon={<TrendingUp className="h-6 w-6" />}
                title="Progress Score"
                value="87%"
                change="+12% this month"
                changeType="positive"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {user.role === 'mentor' ? (
                <>
                  <ActivityItem 
                    title="Session with Alex completed"
                    subtitle="System Design Fundamentals"
                    time="2 hours ago"
                    type="session"
                  />
                  <ActivityItem 
                    title="New mentee request from Sarah"
                    subtitle="JavaScript & React Development"
                    time="5 hours ago"
                    type="request"
                  />
                  <ActivityItem 
                    title="Rating received: 5 stars"
                    subtitle="From Mike - 'Excellent mentor!'"
                    time="1 day ago"
                    type="rating"
                  />
                </>
              ) : (
                <>
                  <ActivityItem 
                    title="Session with John scheduled"
                    subtitle="Tomorrow at 3:00 PM"
                    time="Just now"
                    type="session"
                  />
                  <ActivityItem 
                    title="Completed: React Hooks session"
                    subtitle="With mentor Sarah"
                    time="2 days ago"
                    type="completed"
                  />
                  <ActivityItem 
                    title="New learning path assigned"
                    subtitle="Advanced JavaScript Concepts"
                    time="3 days ago"
                    type="assignment"
                  />
                </>
              )}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {user.role === 'mentor' ? (
                <>
                  <SessionItem 
                    title="1-on-1 with Emma"
                    topic="Data Structures & Algorithms"
                    time="Today, 4:00 PM"
                    duration="1 hour"
                  />
                  <SessionItem 
                    title="Group Session: System Design"
                    topic="Building Scalable Applications"
                    time="Tomorrow, 2:00 PM"
                    duration="1.5 hours"
                  />
                  <SessionItem 
                    title="1-on-1 with David"
                    topic="Interview Preparation"
                    time="Friday, 10:00 AM"
                    duration="1 hour"
                  />
                </>
              ) : (
                <>
                  <SessionItem 
                    title="React Advanced Patterns"
                    topic="With mentor John"
                    time="Tomorrow, 3:00 PM"
                    duration="1 hour"
                  />
                  <SessionItem 
                    title="System Design Basics"
                    topic="With mentor Sarah"
                    time="Thursday, 5:00 PM"
                    duration="1.5 hours"
                  />
                  <SessionItem 
                    title="Mock Interview"
                    topic="With mentor Alex"
                    time="Saturday, 11:00 AM"
                    duration="1 hour"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}

function StatCard({ icon, title, value, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className="p-2 bg-blue-100 rounded-lg">
          <div className="text-blue-600">{icon}</div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm mt-1 ${
            changeType === 'positive' ? 'text-green-600' :
            changeType === 'negative' ? 'text-red-600' :
            'text-gray-500'
          }`}>
            {change}
          </p>
        </div>
      </div>
    </div>
  )
}

interface ActivityItemProps {
  title: string
  subtitle: string
  time: string
  type: string
}

function ActivityItem({ title, subtitle, time, type }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-full ${
        type === 'session' ? 'bg-blue-100' :
        type === 'request' ? 'bg-yellow-100' :
        type === 'rating' ? 'bg-green-100' :
        type === 'completed' ? 'bg-green-100' :
        'bg-purple-100'
      }`}>
        {type === 'session' && <Calendar className="h-4 w-4 text-blue-600" />}
        {type === 'request' && <User className="h-4 w-4 text-yellow-600" />}
        {type === 'rating' && <Star className="h-4 w-4 text-green-600" />}
        {type === 'completed' && <BookOpen className="h-4 w-4 text-green-600" />}
        {type === 'assignment' && <TrendingUp className="h-4 w-4 text-purple-600" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
}

interface SessionItemProps {
  title: string
  topic: string
  time: string
  duration: string
}

function SessionItem({ title, topic, time, duration }: SessionItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{topic}</p>
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {time} • {duration}
        </div>
      </div>
      <div className="ml-4">
        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
          Join
        </button>
      </div>
    </div>
  )
}
