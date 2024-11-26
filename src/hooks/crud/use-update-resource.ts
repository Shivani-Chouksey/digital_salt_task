import axios from "axios";
import { useState } from "react";

type ApiResponse<T = any> = {
  data: T;
  message?: string;
  status?: number;
};

const useUpdateResource = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const updateResource = async (urlEndpoint: string, data: any, id: string,token:string) => {
    setLoading(true);
    try {
      const response = await axios.patch<ApiResponse>(
        `${baseUrl}/${urlEndpoint}/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        }
      );
      
      if (response.status === 200) {
        setSuccess(response.data.message || "Resource updated.");
      }
      return response.data; // Return data for further usage
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the resource.");
      throw err; // Rethrow error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  };

  return { updateResource, loading, error, success };
};

export default useUpdateResource;
