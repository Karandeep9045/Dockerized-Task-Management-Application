## Task Management App

React + TypeScript app using Redux Toolkit, React Router, Tailwind CSS, and Mock Service Worker (MSW). It simulates user auth and task CRUD using a mocked API persisted to localStorage.

### Run with Docker

1. Build the Docker image:

```powershell
docker build -t task-mgmt .
```

2. Run the container:

```powershell
docker run -p 4173:4173 task-mgmt
```

3. Open in your browser:

```
http://localhost:4173
```

Login with username: `test`, password: `test123`.

---

- Data persists in localStorage under `mock_tasks`.

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

### Tech

- Vite + React + TypeScript
- Redux Toolkit, React Redux
- React Router
- Tailwind CSS v4 (using `@import "tailwindcss"` in `src/index.css`)
- Mock Service Worker (MSW)

### Endpoints (mocked)

- POST /api/login
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
