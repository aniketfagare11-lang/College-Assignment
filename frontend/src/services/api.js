import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const movieApi = {
  getTrending: () => api.get('/movies/trending'),
  getPopular: () => api.get('/movies/popular'),
  getTopRated: () => api.get('/movies/top-rated'),
  searchMovies: (query, page = 1) => api.get(`/movies/search`, { params: { query, page } }),
  getGenres: () => api.get('/movies/genres'),
  discoverMovies: (genreId, page = 1) => api.get('/movies/discover', { params: { genre: genreId, page } }),
  getMovieDetails: (id) => api.get(`/movies/${id}`),
  getMovieCredits: (id) => api.get(`/movies/${id}/credits`),
  getRecommendations: (genreIdsStr) => api.get('/movies/recommendations', { params: { genre: genreIdsStr } }),
};

export default api;
