import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../lib/api'

export interface User { id: string; username: string }
interface AuthState {
  user: User | null
  status: 'idle' | 'loading' | 'failed'
  error?: string
}

const initialState: AuthState = { user: null, status: 'idle' }

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    const { data } = await api.post('/login', credentials)
    localStorage.setItem('token', data.token)
    return data.user as User
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token')
  return true
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'idle'
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export default authSlice.reducer
