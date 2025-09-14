import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Image src="/mentrify-logo.png" alt="Mentrify" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-semibold text-gray-900">Mentrify</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Connecting ambitious students with experienced college seniors for authentic guidance and mentorship.
            </p>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Mentrify. All rights reserved.</p>
          </div>

          {/* Navigation columns */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Students</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/mentors" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Mentors</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/become-mentor" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link href="/mentor-resources" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/mentor-community" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/earnings" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Earnings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
