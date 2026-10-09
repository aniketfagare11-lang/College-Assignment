import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Watchlist() {
  const { watchlist } = useMovieContext();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-blue-400 flex items-center gap-2">
        Your Watchlist
      </h1>
      {watchlist.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Your watchlist is empty.</p>
          <p className="mt-2">Add movies you want to watch later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  );
}
