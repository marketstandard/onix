import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

/* 
  This hook is like a useState() hook, but it will store the state in LocalStorage.
  If a value exists in LocalStorage, it will be returned as the initial value when
  this hook is run for the first time. Because this hook uses LocalStorage, it can 
  only use values that can be serialized to and from JSON.
*/

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
}

export function useLocalStorageState<T>({ key, initialState }: { key: string; initialState?: T }) {
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      return initialState;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) || initialState : initialState;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialState;
    }
  }, [initialState, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, []);

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue] as const;
}
