import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'

async function enableMocking() {
  if (import.meta.env.PROD) return
  const { worker } = await import('./mocks/browser')
  await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } })
}

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
])

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
})
