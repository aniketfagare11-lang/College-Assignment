# CineScope - Movie Search & Recommendation Application

## Problem Statement 14 (Feature Set C)

This is a complete, professional, responsive web application for movie discovery, search, favourites, and watchlists.

### Tech Stack
- Frontend: React.js, Vite, Tailwind CSS, Lucide React
- Backend: Node.js, Express.js
- Data: TMDB API
- Storage: localStorage (no database)

### How to Run

1. **Obtain TMDB API Key:**
   Go to [The Movie Database (TMDB)](https://www.themoviedb.org/) and create an API key.

2. **Configure Backend Environment:**
   In `backend/.env`, set your `TMDB_API_KEY`:
   ```env
   PORT=5000
   TMDB_API_KEY=your_actual_tmdb_api_key_here
   ```

3. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm start # or node server.js
   ```

4. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Features Implemented
- Clean modern UI with Tailwind CSS
- Movie Search (Debounced)
- Genre Filtering
- Favourites and Watchlist (persisted via LocalStorage using Custom Hooks and Context)
- Dynamic Movie Details and Rating display
