import axios from "axios";
import { useState } from "react";

// Define a generic type for the response data
const useFetchByID = <T = any>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchDataById = async (
    urlEndpoint: string,
    id: string,
    token?: string
  ) => {
    if (!id) return null; // Guard clause to prevent fetch without an ID

    try {
      setLoading(true);
      setError(null);
      setData(null);
      const response = await axios.get<T>(`${baseUrl}/${urlEndpoint}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (response.status === 200) {
        setLoading(false);
        setData(response.data);
      }
      return response.data;
    } catch (err: any) {
      setData(null);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while fetching data."
      );
      setLoading(false);
      return null;
    }
  };

  return { fetchDataById, data, loading, error };
};

export default useFetchByID;
