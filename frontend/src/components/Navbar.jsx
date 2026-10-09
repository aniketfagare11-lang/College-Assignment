import { Link } from 'react-router-dom';
import { Film, Heart, Bookmark, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-card py-4 sticky top-0 z-50 shadow-md border-b border-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Film className="w-8 h-8" />
          <span>CineScope</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Search className="w-4 h-4" /> Discover
          </Link>
          <Link to="/favourites" className="hover:text-accent transition-colors flex items-center gap-1">
            <Heart className="w-4 h-4" /> Favourites
          </Link>
          <Link to="/watchlist" className="hover:text-blue-400 transition-colors flex items-center gap-1">
            <Bookmark className="w-4 h-4" /> Watchlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
