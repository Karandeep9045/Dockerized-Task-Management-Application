# Task Manager - Run Instructions

## 1. Run with Docker (Recommended for Production)

**Prerequisites:**
- Ensure Docker Desktop or Docker Engine is running on your system.
- Make sure port `4173` is free (or change the port mapping as needed).

**Steps:**
1. **Build the Docker image:**
   ```sh
   docker build -t myapp:latest .
   ```
2. **Run the Docker container:**
   ```sh
   docker run -p 4173:4173 myapp:latest
   ```
3. **Open the app in your browser:**
   - Visit: [http://localhost:4173](http://localhost:4173)

**Notes:**
- If you change the port, update the `-p` flag accordingly.
- Stop any other service using port 4173 to avoid conflicts.
- To stop the container, use `Ctrl+C` or `docker stop <container_id>`.

---

## 2. Run Locally (Development Mode)

**Prerequisites:**
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

**Steps:**
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev -- --host
   ```
   - The `--host` flag allows access from other devices or Docker containers (optional for local-only use).
3. **Open the app in your browser:**
   - Visit: [http://localhost:5173](http://localhost:5173)

**For Production Build (without Docker):**
1. **Build the app:**
   ```sh
   npm run build
   ```
2. **Preview the production build:**
   ```sh
   npm run preview -- --host
   ```
   - Visit: [http://localhost:4173](http://localhost:4173)

**Suggestions:**
- Always use the production build (`npm run build` + `npm run preview`) for best performance.
- For development, use `npm run dev` for hot-reload and fast feedback.
- If you face issues, check your Node.js and npm versions, and ensure no other app is using the required ports.

---

For any issues, check the terminal output for errors or contact the maintainer.
