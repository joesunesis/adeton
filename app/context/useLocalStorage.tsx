'use client'
import { useEffect, useState } from 'react';


export function useLocalStorage(key: string, initialValue: any) {

  useEffect(() => {
    const getItem = () => {
      try {
        const item = window.localStorage.getItem(key)
        console.log(item)
        if (!item ) return;
        return JSON.parse(item)
      } catch (error) {
        console.log('error', error);
        return initialValue;
      }
    }
      const item  = getItem()
      setStoredValue(item)
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState();

  const setItem = (value: any) => {
    try {
      const valueToStore = JSON.stringify(value)
      window?.localStorage.setItem(key, valueToStore)
      setStoredValue(value)
      console.log("im runninig");
      
    } catch (error) {
      console.log("serror setting value", error);
    }
  }


  // const useStorage = useCallback((key: string, initialValue?: any) => {
  //   // if (typeof window === 'undefined') {
  //   //   return initialValue;
  //   // }

  //   try {
  //     const item = localStorage.getItem(key);

  //     if (item == undefined || item == null) {
  //       localStorage.setItem(key, JSON.stringify(initialValue));
  //     } else {
  //       console.log(item);

  //       return JSON.parse(item);
  //     }
  //   } catch (error) {
  //     console.error('Error reading localStorage:', error);
  //     return initialValue;
  //   }
  // }, []);

  // const updateLocalStorageValue = (key: string, value: any) => {
  //   try {
  //     const valueToStore = value instanceof Function ? value(storedValue) : value;
  //     setStoredValue(valueToStore);

  //     if (typeof window !== 'undefined') {
  //       localStorage.setItem(key, JSON.stringify(valueToStore));
  //     }
  //   } catch (error) {
  //     console.error('Error setting localStorage:', error);
  //   }
  // };

  // // Sync with localStorage if the key changes (optional)
  // // useEffect(() => {
  // //   if (typeof window === 'undefined') return;

  // //   try {
  // //     const item = localStorage.getItem(key);
  // //     if (item) setStoredValue(JSON.parse(item));
  // //   } catch (error) {
  // //     console.error('Error reading localStorage:', error);
  // //   }
  // // }, [key]);

  // return { storedValue, useStorage , updateLocalStorageValue };


  return [storedValue, setItem]

}