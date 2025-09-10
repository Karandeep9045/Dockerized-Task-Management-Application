## Task Management App (Frontend-only)

React + TypeScript app using Redux Toolkit, React Router, Tailwind CSS, and Mock Service Worker (MSW). It simulates user auth and task CRUD using a mocked API persisted to localStorage.

### Tech
- Vite + React + TypeScript
- Redux Toolkit, React Redux
- React Router
- Tailwind CSS v4 (using `@import "tailwindcss"` in `src/index.css`)
- Mock Service Worker (MSW)

### Run locally
1. Install deps
```powershell
npm install
```
2. Ensure the MSW worker is present (done once)
```powershell
npx msw init public --save
```
3. Start dev server
```powershell
npm run dev
```

Open http://localhost:5173, login with username: `test`, password: `test123`.

### Endpoints (mocked)
- POST /api/login
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

### Notes
- Data persists in localStorage under `mock_tasks`.
