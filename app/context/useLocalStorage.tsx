import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | null>(null);

  useEffect(() => {
    const getItem = () => {
      try {
        const item = localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.log('Error accessing localStorage:', error);
        return initialValue;
      }
    }
    getItem();
  }, [key, initialValue]);

  const setItem = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.log('Error setting localStorage:', error);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing localStorage:', error);
    }
  };

  return [storedValue, setItem, removeItem] as const;
}