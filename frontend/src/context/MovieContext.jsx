import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage('cinescope_favourites', []);
  const [watchlist, setWatchlist] = useLocalStorage('cinescope_watchlist', []);

  const toggleFavourite = (movie) => {
    setFavourites((prev) => {
      const isFav = prev.find((m) => m.id === movie.id);
      if (isFav) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const inWatchlist = prev.find((m) => m.id === movie.id);
      if (inWatchlist) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  const isFavourite = (id) => !!favourites.find((m) => m.id === id);
  const inWatchlist = (id) => !!watchlist.find((m) => m.id === id);

  return (
    <MovieContext.Provider value={{ favourites, watchlist, toggleFavourite, toggleWatchlist, isFavourite, inWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
