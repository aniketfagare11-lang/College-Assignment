import { useState, useEffect } from 'react';
import { movieApi } from '../services/api';
import MovieCard from '../components/MovieCard';
import { Search } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    movieApi.getGenres().then(res => setGenres(res.data.data.genres || []));
    fetchMovies();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMovies();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query, selectedGenre]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let res;
      if (query) {
        res = await movieApi.searchMovies(query);
      } else if (selectedGenre) {
        res = await movieApi.discoverMovies(selectedGenre);
      } else {
        res = await movieApi.getTrending();
      }
      if (res?.data?.success) {
        setMovies(res.data.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
        <select 
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-card rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Genres</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>

      <h1 className="text-3xl font-bold mb-8">
        {query ? 'Search Results' : selectedGenre ? 'Genre Results' : 'Trending Movies'}
      </h1>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse bg-card h-80 rounded-xl"></div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No movies found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  );
}
