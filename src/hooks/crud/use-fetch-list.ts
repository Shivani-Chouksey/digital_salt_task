import axios from "axios";
import { useEffect, useState } from "react";

// Define the type of response expected from the API
type ApiResponse ={
  users: any[];
}


const useFetchList = (urlEndpoint: string,token:string) => {
  const [data, setData] = useState<ApiResponse | null>(null); // Use ApiResponse or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${baseUrl}/${urlEndpoint}`,{
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        }); // Type the response
        setData(response.data); // Assuming response.data is an ApiResponse
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlEndpoint]);

  return { data, loading, error };
};

export default useFetchList;
