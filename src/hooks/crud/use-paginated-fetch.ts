import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";


// Generic type for paginated response
interface PaginatedResponse<T> {
    users: T[];
    total: number;
    limit: number;
    skip: number;
  }
  

const usePaginatedFetch = <T = any>(urlEndpoint:string,limit:number=5,skip:number=0) => {
  const [data, setData] = useState<PaginatedResponse<T> | null>(null); // Use ApiResponse or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchPaginatedData = async () => {
      try {
         // Construct query parameters
         const params = new URLSearchParams({
            limit: limit.toString(),
            skip: skip.toString(),
          });

          // Comprehensive axios configuration
        const response: AxiosResponse<PaginatedResponse<T>> = await axios.get(
            `${baseUrl}/${urlEndpoint}`, 
            {
              params,
              headers: {
                'Content-Type': 'application/json',
                // ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                // ...config.headers
              },
            }
          );
        setData(response.data); // Assuming response.data is an ApiResponse
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    if (urlEndpoint) {
        fetchPaginatedData();
      }
  
  }, [urlEndpoint, limit, skip,]);

  return { data, loading, error };
};

export default usePaginatedFetch;
