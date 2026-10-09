import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Favourites() {
  const { favourites } = useMovieContext();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-accent flex items-center gap-2">
        Your Favourites
      </h1>
      {favourites.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">You have no favourite movies yet.</p>
          <p className="mt-2">Start exploring and save some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favourites.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  );
}
