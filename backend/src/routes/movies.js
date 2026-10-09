const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/trending', movieController.getTrending);
router.get('/popular', movieController.getPopular);
router.get('/top-rated', movieController.getTopRated);
router.get('/search', movieController.searchMovies);
router.get('/genres', movieController.getGenres);
router.get('/discover', movieController.discoverMovies);
router.get('/recommendations', movieController.getRecommendations);
router.get('/:id', movieController.getMovieDetails);
router.get('/:id/credits', movieController.getMovieCredits);

module.exports = router;
