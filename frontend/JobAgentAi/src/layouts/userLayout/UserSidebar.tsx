import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  Settings,
  CreditCard,
  Briefcase,
  FileText,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Resumes', href: '/resumes', icon: FileText },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function UserSidebar() {
  const location = useLocation()

  return (
    <div className="w-64 bg-white border-r min-h-[calc(100vh-4rem)]">
      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-gray-900' : 'text-gray-400'
                }`}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 