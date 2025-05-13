// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import { UserLayout } from '../layouts/userLayout/userLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import AuthPage from '../pages/authPage'
import { Jobs } from '../pages/Jobs'
import { Settings } from '../pages/Settings'
import { Dashboard } from '@/pages/Dashboard'
import { Resumes } from '@/pages/Resumes'
import { Payments } from '@/pages/Payments'
import MainLayout from '@/layouts/mainLayout/MainLayout'
import Profile from '@/pages/Profile'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<AuthPage />} />

      {/* Main public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* User dashboard routes */}
      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
