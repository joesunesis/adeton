import { useCallback, useState } from "react";
import { supabase } from "../../lib/supabase";

interface UseFetch {
  loading: boolean;
  error: object | null | unknown;
  getData: (table: string, options?: FetchOptions) => Promise<any | null>;
  insertData: (table: string, data: any) => Promise<any | null>;
  updateData: (table: string, data: any, match: object) => Promise<any | null>;
  deleteData: (table: string, match: object) => Promise<any | null>;
}

interface FetchOptions {
  select?: string;
  match?: object;
  limit?: number;
  order?: { column: string; ascending?: boolean };
}

export default function UseFetch(): UseFetch {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null | unknown>(null);

  const getData = useCallback(async (table: string, options?: FetchOptions) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from(table).select(options?.select || '*');

      if (options?.match) {
        query = query.match(options.match);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.order) {
        query = query.order(options.order.column, {
          ascending: options.order.ascending ?? true
        });
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;
      return data;
    } catch (err) {
      console.error('Fetch Error: ', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const insertData = useCallback(async (table: string, data: any) => {
    setLoading(true);
    setError(null);

    try {
      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .insert(data)
        .select();

      if (supabaseError) throw supabaseError;
      return result;
    } catch (err) {
      console.error('Insert Error: ', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = useCallback(async (table: string, data: any, match: object) => {
    setLoading(true);
    setError(null);

    try {
      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .update(data)
        .match(match)
        .select();

      if (supabaseError) throw supabaseError;
      return result;
    } catch (err) {
      console.error('Update Error: ', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteData = useCallback(async (table: string, match: object) => {
    setLoading(true);
    setError(null);

    try {
      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .delete()
        .match(match)
        .select();

      if (supabaseError) throw supabaseError;
      return result;
    } catch (err) {
      console.error('Delete Error: ', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getData, insertData, updateData, deleteData };
}