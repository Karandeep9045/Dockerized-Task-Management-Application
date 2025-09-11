import { Link, Navigate } from 'react-router-dom'
import { useAppSelector } from './hooks.ts'
import type { RootState } from './app/store'
import DarkModeToggle from './components/DarkModeToggle'

export default function App() {
  const user = useAppSelector((s: RootState) => s.auth.user)
  if (user) return <Navigate to="/dashboard" replace />

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <DarkModeToggle />
      <div className="bg-shape bg-shape1" />
      <div className="bg-shape bg-shape2" />
      <div className="card max-w-2xl w-full p-10 text-center shadow-2xl border-0 relative z-10 animate-fadein">
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white grid place-items-center text-2xl font-bold shadow-lg">TM</div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text mb-2">Task Management</h1>
  <p className="text-lg text-gray-900 font-bold mb-6 dark:text-gray-500">Organize your work with style. Fast, beautiful, and secure.</p>
        <div className="mt-6 flex items-center justify-center">
          <Link to="/login" className="btn animate-bounce">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
