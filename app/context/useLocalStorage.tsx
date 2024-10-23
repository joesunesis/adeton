import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>();

  useEffect(() => {
    const getItem = () => {
      try {
        const item = localStorage.getItem(key);
        console.log(item);
        
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
      setStoredValue(undefined as unknown as T);
    } catch (error) {
      console.log('Error removing localStorage:', error);
    }
  };

  return [storedValue, setItem, removeItem] as const;
}