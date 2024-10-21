// import { promises as fs } from "fs";
import { useCallback, useState } from "react";

interface UseFetch {
  data: null;
  loading: boolean;
  error: any;
  getData: (url: string, options?: object) => void;
}

export default function UseFetch() : UseFetch {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  
  const getData = useCallback(async (url: string, options?: object) => {
    setLoading(true);
    try {
      const uri = `http://localhost:5001/api/${url}`
      const res = await fetch(uri, options);
      if (!res.ok) 
        throw new Error('Request failed with status' + res.status + ". Message: " + res.text);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Error: ', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [data, loading, error]);

  return { data, loading, error, getData }
}