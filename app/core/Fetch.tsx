import { useCallback, useState } from "react";

interface UseFetch {
  loading: boolean;
  error: any;
  getData: (url: string, options?: object) => Promise<any | null>; 
}

export default function UseFetch(): UseFetch {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const getData = useCallback(async (url: string, options?: object) => {
    const uri = `http://localhost:5001/api/${url}`;
    setLoading(true);
    
    try {
      const res = await fetch(uri, options);
      if (!res.ok) 
        throw new Error(`Request failed with status ${res.status}. Message: ${await res.text()}`);
      const result = await res.json();
      return await result;
    } catch (err) {
      console.error('Error: ', err);
      setError(err); 
      return null; 
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getData };
}