const tmdbService = require('../services/tmdbService');

const handleRequest = async (req, res, serviceCall) => {
    try {
        if (!process.env.TMDB_API_KEY) {
            return res.status(500).json({ success: false, message: 'TMDB API key is missing' });
        }
        const data = await serviceCall();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.message,
            details: error.response?.data
        });
    }
};

const getTrending = (req, res) => handleRequest(req, res, () => tmdbService.getTrending());
const getPopular = (req, res) => handleRequest(req, res, () => tmdbService.getPopular());
const getTopRated = (req, res) => handleRequest(req, res, () => tmdbService.getTopRated());

const searchMovies = (req, res) => {
    const { query, page } = req.query;
    if (!query) {
        return res.status(400).json({ success: false, message: 'Query parameter is required' });
    }
    handleRequest(req, res, () => tmdbService.searchMovies(query, page));
};

const getGenres = (req, res) => handleRequest(req, res, () => tmdbService.getGenres());

const discoverMovies = (req, res) => {
    const { genre, page } = req.query;
    handleRequest(req, res, () => tmdbService.discoverMovies(genre, page));
};

const getMovieDetails = (req, res) => {
    const { id } = req.params;
    handleRequest(req, res, () => tmdbService.getMovieDetails(id));
};

const getMovieCredits = (req, res) => {
    const { id } = req.params;
    handleRequest(req, res, () => tmdbService.getMovieCredits(id));
};

const getRecommendations = (req, res) => {
    const { genre } = req.query;
    handleRequest(req, res, () => tmdbService.getRecommendations(genre));
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
