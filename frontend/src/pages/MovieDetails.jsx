import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieApi } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import { Heart, Bookmark, Star, Calendar, Clock, Globe } from 'lucide-react';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavourite, inWatchlist, toggleFavourite, toggleWatchlist } = useMovieContext();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await movieApi.getMovieDetails(id);
        if (res.data.success) {
          setMovie(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="animate-pulse h-96 bg-card rounded-xl"></div>;
  if (!movie) return <div>Movie not found.</div>;

  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  return (
    <div className="relative">
      {backdropUrl && (
        <div className="absolute top-0 left-0 w-full h-[50vh] opacity-20 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${backdropUrl})` }} />
      )}
      
      <div className="flex flex-col md:flex-row gap-8 pt-10">
        <img src={posterUrl} alt={movie.title} className="w-full md:w-1/3 rounded-xl shadow-2xl" />
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 italic mb-6">{movie.tagline}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-1 text-yellow-400 font-bold bg-card px-3 py-1 rounded-full">
              <Star className="w-5 h-5 fill-current" /> {movie.vote_average?.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 text-gray-300 bg-card px-3 py-1 rounded-full">
              <Calendar className="w-5 h-5" /> {movie.release_date}
            </div>
            <div className="flex items-center gap-1 text-gray-300 bg-card px-3 py-1 rounded-full">
              <Clock className="w-5 h-5" /> {movie.runtime} min
            </div>
            <div className="flex items-center gap-1 text-gray-300 bg-card px-3 py-1 rounded-full">
              <Globe className="w-5 h-5" /> {movie.original_language?.toUpperCase()}
            </div>
          </div>

          <div className="flex gap-2 mb-8">
            {movie.genres?.map(g => (
              <span key={g.id} className="border border-primary text-primary px-3 py-1 rounded-full text-sm">
                {g.name}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-2">Overview</h3>
          <p className="text-gray-300 leading-relaxed mb-8">{movie.overview}</p>

          <div className="flex gap-4">
            <button 
              onClick={() => toggleFavourite(movie)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${isFavourite(movie.id) ? 'bg-accent text-white hover:bg-red-700' : 'bg-card hover:bg-gray-800'}`}
            >
              <Heart fill={isFavourite(movie.id) ? 'currentColor' : 'none'} />
              {isFavourite(movie.id) ? 'Remove Favourite' : 'Add to Favourites'}
            </button>
            <button 
              onClick={() => toggleWatchlist(movie)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${inWatchlist(movie.id) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-card hover:bg-gray-800'}`}
            >
              <Bookmark fill={inWatchlist(movie.id) ? 'currentColor' : 'none'} />
              {inWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
