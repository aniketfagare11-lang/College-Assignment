const tmdbClient = require('../config/tmdb');

const getTrending = async () => {
  const response = await tmdbClient.get('/trending/movie/day');
  return response.data;
};

const getPopular = async () => {
  const response = await tmdbClient.get('/movie/popular');
  return response.data;
};

const getTopRated = async () => {
  const response = await tmdbClient.get('/movie/top_rated');
  return response.data;
};

const searchMovies = async (query, page = 1) => {
  const response = await tmdbClient.get('/search/movie', {
    params: { query, page }
  });
  return response.data;
};

const getGenres = async () => {
  const response = await tmdbClient.get('/genre/movie/list');
  return response.data;
};

const discoverMovies = async (genreId, page = 1) => {
  const response = await tmdbClient.get('/discover/movie', {
    params: { with_genres: genreId, page }
  });
  return response.data;
};

const getMovieDetails = async (id) => {
  const response = await tmdbClient.get(`/movie/${id}`);
  return response.data;
};

const getMovieCredits = async (id) => {
  const response = await tmdbClient.get(`/movie/${id}/credits`);
  return response.data;
};

const getRecommendations = async (genreIdsStr) => {
    // If genres are provided from watchlist/favorites
    if (genreIdsStr) {
        const response = await tmdbClient.get('/discover/movie', {
            params: { with_genres: genreIdsStr, sort_by: 'popularity.desc' }
        });
        return response.data;
    }
    // Fallback to popular
    const response = await tmdbClient.get('/movie/popular');
    return response.data;
}


module.exports = {
  getTrending,
  getPopular,
  getTopRated,
  searchMovies,
  getGenres,
  discoverMovies,
  getMovieDetails,
  getMovieCredits,
  getRecommendations
};
