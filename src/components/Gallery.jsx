import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  getInitialFavourites,
  FAVOURITES_ACTIONS,
  STORAGE_KEY,
} from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';

export default function Gallery() {
  // Requirement 6: Custom Hook for fetching photos
  const { photos, loading, error, refetch } = useFetchPhotos();

  // Search filter query state
  const [searchTerm, setSearchTerm] = useState('');

  // Requirement 5: Manage favourites list using useReducer (persists to localStorage)
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getInitialFavourites
  );

  // Requirement 5: Persist favourites to localStorage whenever favourites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to persist favourites to localStorage:', err);
    }
  }, [favourites]);

  // Requirement 7: useCallback on search filter handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handler to clear search
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Memoized toggle favourite action handler
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({
      type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
      payload: photoId,
    });
  }, []);

  // Requirement 7: useMemo to compute filtered photo list in real-time without refetching
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Header & Search Area */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title & Stats */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <span>Photo Gallery</span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {photos.length} photos
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Explore photography from talented creators around the world.
              </p>
            </div>

            {/* Requirement 4: Search input at the top */}
            <div className="w-full md:w-80 relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  id="search-input"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Filter by author name..."
                  className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sub-bar with Active Filters / Favourites Count */}
          {!loading && !error && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div>
                {searchTerm ? (
                  <span>
                    Found <strong className="text-slate-700">{filteredPhotos.length}</strong> photo
                    {filteredPhotos.length === 1 ? '' : 's'} matching &ldquo;{searchTerm}&rdquo;
                  </span>
                ) : (
                  <span>Showing all {photos.length} photos</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-red-500"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>
                  <strong>{favourites.length}</strong> favourite{favourites.length === 1 ? '' : 's'} saved
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Requirement 2: Loading Spinner while fetching */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] py-16" role="status">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading 30 photos from Picsum API...
            </p>
          </div>
        )}

        {/* Requirement 2: Error message if fetch fails */}
        {!loading && error && (
          <div
            className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-xl text-center"
            role="alert"
          >
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-red-900 mb-1">
              Failed to load photos
            </h2>
            <p className="text-sm text-red-700 mb-4">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state when search matches no photos */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-base font-medium text-slate-800">
              No photos found
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              No photos matched the author &ldquo;{searchTerm}&rdquo;. Try another search keyword.
            </p>
            <button
              type="button"
              onClick={handleClearSearch}
              className="mt-4 px-3.5 py-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Requirement 3: Responsive Grid (desktop: 4 cols, tablet: 2 cols, mobile: 1 col) */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => {
              const isFav = favourites.includes(photo.id);
              return (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={isFav}
                  onToggleFavourite={handleToggleFavourite}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
