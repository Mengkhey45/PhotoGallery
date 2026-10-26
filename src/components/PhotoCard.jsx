import React, { memo } from 'react';

/**
 * PhotoCard component renders an individual photo card
 * displaying the photo, author name, and an interactive heart icon button.
 */
function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Use Picsum 600x400 sized URL for optimized gallery rendering
  const imageUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200/80 flex flex-col">
      {/* Photo container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Fallback to original download_url if resized URL fails
            if (photo.download_url && e.currentTarget.src !== photo.download_url) {
              e.currentTarget.src = photo.download_url;
            }
          }}
        />
      </div>

      {/* Card Details: Author & Heart Toggle Button */}
      <div className="p-4 flex items-center justify-between gap-3 bg-white">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Author
          </p>
          <h2
            className="text-sm font-medium text-slate-800 truncate"
            title={photo.author}
          >
            {photo.author}
          </h2>
        </div>

        {/* Heart Icon Button */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author}'s photo from favourites` : `Add ${photo.author}'s photo to favourites`}
          aria-pressed={isFavourite}
          className={`p-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 active:scale-90 ${
            isFavourite
              ? 'bg-red-50 text-red-500 hover:bg-red-100'
              : 'bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-slate-100'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 transition-transform duration-200"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourite ? '0' : '2'}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default memo(PhotoCard);
