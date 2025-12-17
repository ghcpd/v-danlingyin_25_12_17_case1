import { useEffect, useState } from 'react';

/**
 * Basic wrapper around localStorage with state synchronization.
 * Stores JSON-serialized values.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn('useLocalStorage parse error', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('useLocalStorage save error', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
