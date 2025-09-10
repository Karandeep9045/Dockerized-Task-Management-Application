import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../lib/api'

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'done'
}

interface TasksState {
  items: Task[]
  status: 'idle' | 'loading' | 'failed'
  error?: string
}

const initialState: TasksState = { items: [], status: 'idle' }

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const { data } = await api.get<Task[]>('/tasks')
  return data
})

export const addTask = createAsyncThunk(
  'tasks/add',
  async (payload: Omit<Task, 'id'>) => {
    const { data } = await api.post<Task>('/tasks', payload)
    return data
  }
)

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (payload: Task) => {
    const { data } = await api.put<Task>(`/tasks/${payload.id}`, payload)
    return data
  }
)

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await api.delete(`/tasks/${id}`)
  return id
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload)
      })
  },
})

export default tasksSlice.reducer
