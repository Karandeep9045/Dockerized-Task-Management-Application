import { http, HttpResponse } from 'msw'

type Task = { id: string; title: string; description?: string; status: 'todo' | 'in-progress' | 'done' }

const STORAGE_KEY = 'mock_tasks'
const USER = { id: '1', username: 'test' }
const PASSWORD = 'test123'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as { username: string; password: string }
    if (body.username === USER.username && body.password === PASSWORD) {
      return HttpResponse.json({ token: 'fake-jwt-token', user: USER })
    }
    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }),

  http.get('/api/tasks', () => {
    return HttpResponse.json(loadTasks())
  }),

  http.post('/api/tasks', async ({ request }) => {
    const task = (await request.json()) as Omit<Task, 'id'>
    const tasks = loadTasks()
    const newTask: Task = { id: crypto.randomUUID(), ...task }
    tasks.push(newTask)
    saveTasks(tasks)
    return HttpResponse.json(newTask, { status: 201 })
  }),

  http.put('/api/tasks/:id', async ({ params, request }) => {
    const payload = (await request.json()) as Task
    const tasks = loadTasks()
    const idx = tasks.findIndex((t) => t.id === params.id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    tasks[idx] = payload
    saveTasks(tasks)
    return HttpResponse.json(payload)
  }),

  http.delete('/api/tasks/:id', ({ params }) => {
    const tasks = loadTasks()
    const next = tasks.filter((t) => t.id !== params.id)
    saveTasks(next)
    return new HttpResponse(null, { status: 204 })
  }),
]
