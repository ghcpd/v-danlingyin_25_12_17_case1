/**
 * useLocalStorage hook - Persist state to localStorage
 */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // Get from local storage then parse stored json or if none return initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = React.useState<T>(readValue);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

import * as React from 'react';

/**
 * useDebounce hook - Debounce a value
 */
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * useMount hook - Run effect on mount only
 */
export const useMount = (callback: () => void) => {
  React.useEffect(() => {
    callback();
  }, []);
};

/**
 * useUnmount hook - Run effect on unmount only
 */
export const useUnmount = (callback: () => void) => {
  React.useEffect(
    () => () => {
      callback();
    },
    []
  );
};

/**
 * usePrevious hook - Get previous value
 */
export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/**
 * useAsync hook - Handle async operations
 */
interface UseAsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
}

export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): UseAsyncState<T> => {
  const [state, setState] = React.useState<UseAsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const execute = React.useCallback(async () => {
    setState({ status: 'pending', data: null, error: null });
    try {
      const response = await asyncFunction();
      setState({ status: 'success', data: response, error: null });
      return response;
    } catch (error) {
      setState({
        status: 'error',
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }, [asyncFunction]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return state;
};
