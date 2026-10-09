const axios = require('axios');
require('dotenv').config();

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
  },
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

module.exports = tmdbClient;
