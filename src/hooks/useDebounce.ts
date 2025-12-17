import { useEffect, useRef, useState } from 'react';

/**
 * Debounce a value by a specified delay.
 */
export function useDebounce<T>(value: T, delayMs = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const handlerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (handlerRef.current) clearTimeout(handlerRef.current);
    handlerRef.current = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => {
      if (handlerRef.current) clearTimeout(handlerRef.current);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
