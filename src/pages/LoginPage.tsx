import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { login } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'
import DarkModeToggle from '../components/DarkModeToggle'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const { user, status, error } = useAppSelector((s) => s.auth)
  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState('test123')

  if (user) return <Navigate to="/dashboard" replace />

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <DarkModeToggle />
      {/* Left branding panel */}
  <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-pink-400 dark:from-[#181c2b] dark:via-[#232946] dark:to-[#6d28d9] text-white p-10 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-extrabold shadow-lg border-2 border-white/30">TM</div>
            <span className="text-2xl font-bold tracking-tight drop-shadow">TaskManager</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-4 drop-shadow-lg">Welcome to your productivity hub</h2>
          <ul className="space-y-3 text-lg opacity-90">
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span> Organize tasks visually</li>
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span> Track progress in real time</li>
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span> Beautiful, distraction-free UI</li>
          </ul>
        </div>
        <div className="text-sm opacity-80 mt-10">&copy; {new Date().getFullYear()} TaskManager. All rights reserved.</div>
        {/* Decorative shapes */}
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      </div>
      {/* Right login form panel */}
      <div className="flex flex-1 items-center justify-center bg-white/60 backdrop-blur-lg p-6 min-h-screen">
        <form
          className="card w-full max-w-md p-10 space-y-6 shadow-2xl border-0 animate-fadein"
          onSubmit={(e) => {
            e.preventDefault()
            dispatch(login({ username, password }))
          }}
        >
          <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white grid place-items-center text-xl font-bold shadow">TM</div>
          <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text mb-2">Sign in to your account</h1>
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn w-full justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg" disabled={status==='loading'}>
            {status==='loading' ? 'Signing in...' : 'Sign in'}
          </button>
          <p className="text-xs text-gray-500 text-center">Use <b>test</b> / <b>test123</b></p>
        </form>
      </div>
    </div>
  )
}
