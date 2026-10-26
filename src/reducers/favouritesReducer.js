export const STORAGE_KEY = 'photo_gallery_favourites';

export const FAVOURITES_ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
};

/**
 * Lazy initializer function for useReducer.
 * Safely retrieves stored favourite photo IDs from localStorage.
 */
export function getInitialFavourites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load favourites from localStorage:', error);
    return [];
  }
}

/**
 * Reducer function to manage favourite photos.
 * Handles toggling favourites on and off.
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      const isAlreadyFavourite = state.includes(photoId);

      if (isAlreadyFavourite) {
        // Remove from favourites
        return state.filter((id) => id !== photoId);
      } else {
        // Add to favourites
        return [...state, photoId];
      }
    }
    default:
      return state;
  }
}
