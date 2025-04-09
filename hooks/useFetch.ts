'use client'
import { useState, useEffect, useTransition } from 'react';

/**
 * useFetch Custom Hook
 * 
 * A versatile data fetching hook that handles loading states, errors, and data caching.
 * Supports React concurrent features through useTransition for smoother UI updates.
 * 
 * @template T - The type of the data expected from the fetch operation
 * @param {() => Promise<{ data: T }>} fetchFunction - Async function that returns data
 * @param {any[]} [dependencies=[]] - Dependency array to trigger refetch (similar to useEffect)
 * @returns {Object} An object containing:
 *   - data: The fetched data (T | null)
 *   - loading: Combined loading state (boolean)
 *   - error: Error object if fetch failed (Error | null)
 *   - reload: Function to manually trigger refetch
 *   - setLoading: Function to manually set loading state
 */
function useFetch<T>(
  fetchFunction: () => Promise<{ data: T }>,
  dependencies: any[] = []
) {
  // State management for data, loading, and errors
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Concurrent mode transition for smoother UI updates
  const [isPending, startTransition] = useTransition();

  /**
   * Reload function - Manually triggers data fetching
   * Wrapped in startTransition for concurrent rendering
   */
  const reload = () => {
    startTransition(async () => {
      try {
        setLoading(true);
        const result = await fetchFunction();
        setData(result.data);
        setError(null);
      } catch (err) {
        // Ensure error is properly typed
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    });
  };

  /**
   * Effect hook to automatically fetch data:
   * - Runs on initial mount
   * - Re-runs when dependencies change
   */
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { 
    data, 
    loading: isPending || loading, // Combined loading state
    error, 
    reload, 
    setLoading // Expose setLoading for manual control
  };
}

export default useFetch;