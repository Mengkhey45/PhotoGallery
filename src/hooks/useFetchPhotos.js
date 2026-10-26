import { useState, useEffect, useCallback } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to fetch photos from Picsum API
 * Returns { photos, loading, error, refetch }
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        const response = await fetch(PICSUM_API_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!isCancelled) {
          setPhotos(data);
        }
      } catch (err) {
        if (!isCancelled && err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred while fetching photos.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [retryTrigger]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setRetryTrigger((prev) => prev + 1);
  }, []);

  return { photos, loading, error, refetch };
}
