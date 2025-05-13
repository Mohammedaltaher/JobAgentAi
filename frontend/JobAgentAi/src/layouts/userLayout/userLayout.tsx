import { Outlet } from 'react-router-dom'
import { UserHeader } from './UserHeader'
import { UserSidebar } from './UserSidebar'
import { UserFooter } from './UserFooter'

export function UserLayout() {
//   const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      <div className="flex">
        <UserSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <UserFooter />
    </div>
  )
}
