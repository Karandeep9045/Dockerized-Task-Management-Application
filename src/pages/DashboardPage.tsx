import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { deleteTask, fetchTasks, addTask, updateTask } from '../features/tasks/tasksSlice'
import type { Task } from '../features/tasks/tasksSlice'
import { logout } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'
import DarkModeToggle from '../components/DarkModeToggle'

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((s) => s.auth)
  const { items, status } = useAppSelector((s) => s.tasks)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (user) dispatch(fetchTasks())
  }, [dispatch, user])

  if (!user) return <Navigate to="/login" replace />

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    dispatch(addTask({ title, description, status: 'todo' }))
    setTitle('')
    setDescription('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <DarkModeToggle />
      <div className="bg-shape bg-shape1" />
      <div className="bg-shape bg-shape2" />
      <div className="max-w-5xl mx-auto w-full space-y-8 relative z-10">
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md border border-blue-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white grid place-items-center font-bold text-lg shadow">TM</div>
            <h1 className="text-xl font-semibold tracking-tight">Hi, {user.username}</h1>
          </div>
          <button className="btn transition-transform hover:scale-105" onClick={() => dispatch(logout())}>Logout</button>
        </header>

        <form className="card p-6 space-y-4 shadow-xl" onSubmit={onSubmit}>
          <h2 className="font-medium text-lg mb-2">Create Task</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="input sm:col-span-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className="input sm:col-span-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button className="btn w-fit transition-transform hover:scale-105 active:scale-95 shadow-lg">Add</button>
        </form>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-lg">Your Tasks</h2>
            {status === 'loading' && <span className="text-sm text-gray-600 animate-pulse">Loading…</span>}
          </div>
          {items.length === 0 && status === 'idle' && (
            <div className="card p-10 text-center text-gray-600 flex flex-col items-center gap-4 shadow-inner">
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#e0e7ff"/><path d="M20 32h24M20 40h24M20 24h24" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/></svg>
              <p className="text-base">No tasks yet. Create your first task above.</p>
            </div>
          )}
          <ul className="grid md:grid-cols-2 gap-5">
            {items.map((t) => (
              <li key={t.id} className="card p-6 flex flex-col gap-3 shadow-lg transition-transform hover:scale-[1.03] hover:shadow-2xl border-2 border-transparent hover:border-fuchsia-200 animate-fadein">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-lg text-gray-800 truncate max-w-[70%]">{t.title}</p>
                  <span className={`badge ${t.status} flex items-center gap-1`}>
                    {t.status === 'done' && <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#bbf7d0"/><path d="M5 8.5l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/></svg>}
                    {t.status === 'in-progress' && <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fef9c3"/><path d="M8 4v4l2.5 2.5" stroke="#a16207" strokeWidth="2" strokeLinecap="round"/></svg>}
                    {t.status === 'todo' && <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#e0e7ff"/><circle cx="8" cy="8" r="3" fill="#6366f1"/></svg>}
                    {t.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                </div>
                {t.description && <p className="text-sm text-gray-600 mb-2 break-words whitespace-pre-line">{t.description}</p>}
                <div className="flex items-center gap-2 mt-auto">
                  <select
                    className="input w-auto text-xs py-1 px-2"
                    value={t.status}
                    onChange={(e) => dispatch(updateTask({ ...t, status: e.target.value as Task['status'] }))}
                  >
                    <option value="todo">To do</option>
                    <option value="in-progress">In progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button className="btn ml-auto bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-pink-500 transition-colors px-3 py-1 text-xs shadow" onClick={() => dispatch(deleteTask(t.id))}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
