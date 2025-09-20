// Simple auth library for demo purposes
export interface User {
  id: string
  email: string
  name: string
  role: 'mentee' | 'mentor'
  username?: string
  firstName?: string
  lastName?: string
  phone?: string
  brief?: string
  dob?: string
  total_sessions?: number
  rating?: number
  session_cost?: number
}

export interface LoginResult {
  success: boolean
  error?: string
  user?: User
}

export interface RegisterData {
  username: string
  password: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: 'mentee' | 'mentor'
  brief?: string // Only for mentors
  dob?: string // Only for mentors
}

export interface RegisterResult {
  success: boolean
  error?: string
  user?: User
}

export async function login(email: string, password: string): Promise<LoginResult> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Demo credentials
  const demoUsers = {
    'demo@example.com': { password: 'demo123', name: 'Demo Student', role: 'mentee' as const },
    'mentor@example.com': { password: 'mentor123', name: 'Demo Mentor', role: 'mentor' as const }
  }

  const user = demoUsers[email as keyof typeof demoUsers]
  
  if (!user || user.password !== password) {
    return {
      success: false,
      error: 'Invalid email or password'
    }
  }

  const userData: User = {
    id: email,
    email,
    name: user.name,
    role: user.role,
    username: user.role === 'mentee' ? 'demo_student' : 'demo_mentor',
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1] || '',
    phone: '+1 (555) 123-4567',
    total_sessions: user.role === 'mentee' ? 18 : 24,
    rating: user.role === 'mentor' ? 4.8 : undefined,
    session_cost: user.role === 'mentor' ? 50 : undefined
  }

  // Save user to localStorage
  saveUser(userData)

  return {
    success: true,
    user: userData
  }
}

export async function register(data: RegisterData): Promise<RegisterResult> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Basic validation
  if (!data.email || !data.password || !data.username) {
    return {
      success: false,
      error: 'Please fill in all required fields'
    }
  }

  if (data.password.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters long'
    }
  }

  // Create user data
  const userData: User = {
    id: data.email,
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
    role: data.role,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    brief: data.brief,
    dob: data.dob,
    total_sessions: 0,
    rating: data.role === 'mentor' ? 0 : undefined,
    session_cost: data.role === 'mentor' ? 50 : undefined
  }

  // Save user to localStorage
  saveUser(userData)

  return {
    success: true,
    user: userData
  }
}

export async function logout(): Promise<void> {
  // Clear user data from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mentrify_user')
  }
  console.log('User logged out')
}

// Get current user from localStorage
export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userData = localStorage.getItem('mentrify_user')
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

// Save user to localStorage
export function saveUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mentrify_user', JSON.stringify(user))
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getUser() !== null
}
