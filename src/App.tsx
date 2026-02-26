import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Layout } from '@/components/common/Layout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { RegistrationDesk } from '@/pages/RegistrationDesk'
import { Settings } from '@/pages/Settings'

// A small wrapper to use Layout with Outlet
const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
)

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registration" element={<RegistrationDesk />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
