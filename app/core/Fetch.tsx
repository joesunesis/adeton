import { useCallback, useState } from "react";

interface UseFetch {
  loading: boolean;
  error: object | null | unknown;
  getData: (url: string, options?: object) => Promise<any | null>;
}

export default function UseFetch(): UseFetch {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null | unknown>(null);

  const getData = useCallback(async (url: string, options?: object) => {
    const uri = `http://localhost:5001/api/${url}`;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(uri, options);
      if (!res.ok) 
        throw new Error(`Request failed with status ${res.status}. Message: ${await res.text()}`);
      const result = await res.json();
      return result;
    } catch (err) {
      console.error('Fetch Error: ', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getData };
}