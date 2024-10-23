import { useCallback, useState } from "react";

interface UseFetch {
  loading: boolean;
  error: any;
  getData: (url: string, options?: object) => void;
}

export default function UseFetch() : UseFetch {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  
  const getData = useCallback(async (url: string, options?: object) => {
    setLoading(true);
    try {
      const uri = `http://localhost:5001/api/${url}`
      const res = await fetch(uri, options);
      if (!res.ok) 
        throw new Error('Request failed with status' + res.status + ". Message: " + res.text);
      const result = await res.json();
      return result
    } catch (err) {
      console.error('Error: ', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getData }
}