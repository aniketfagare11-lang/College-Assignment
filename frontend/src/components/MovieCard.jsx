import { Link } from 'react-router-dom';
import { Heart, Bookmark, Star } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  const { isFavourite, inWatchlist, toggleFavourite, toggleWatchlist } = useMovieContext();
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-primary/50 relative group">
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl} alt={movie.title} className="w-full h-80 object-cover" />
      </Link>
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => toggleFavourite(movie)}
          className={`p-2 rounded-full bg-black/60 hover:bg-black/80 transition ${isFavourite(movie.id) ? 'text-accent' : 'text-white'}`}
        >
          <Heart fill={isFavourite(movie.id) ? 'currentColor' : 'none'} className="w-5 h-5" />
        </button>
        <button 
          onClick={() => toggleWatchlist(movie)}
          className={`p-2 rounded-full bg-black/60 hover:bg-black/80 transition ${inWatchlist(movie.id) ? 'text-blue-400' : 'text-white'}`}
        >
          <Bookmark fill={inWatchlist(movie.id) ? 'currentColor' : 'none'} className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
          <span>{movie.release_date?.substring(0, 4) || 'N/A'}</span>
          <span className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
