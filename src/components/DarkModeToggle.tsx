import { useEffect, useState } from 'react'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('theme')
  if (stored) return stored
  return 'dark'
}

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(getInitialTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full p-2 bg-white/70 dark:bg-black/40 shadow border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      style={{ position: 'absolute', top: 24, right: 24, zIndex: 50 }}
    >
      {theme === 'dark' ? (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M17.657 16.243A8 8 0 0 1 7.757 6.343 8.001 8.001 0 1 0 17.657 16.243Z" stroke="#fbbf24" strokeWidth="2"/></svg>
      ) : (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="#f59e42" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#f59e42" strokeWidth="2"/></svg>
      )}
    </button>
  )
}