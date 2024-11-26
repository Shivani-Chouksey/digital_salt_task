import axios from "axios";
import { useState } from "react";

type ApiResponse<T = any> = {
  data: T;
  message?: string;
  status?: number;
};

const useCreateResource = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const createResource = async (urlEndpoint: string, data: any,token:string) => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        `${baseUrl}/${urlEndpoint}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        }
      );
      if (response.status === 201) {
        setSuccess(response.data.message || "Resource created successfully.");
      }
      return response.data; // Return data for further usage
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the resource.");
      throw err; // Rethrow error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  };

  return { createResource, loading, error, success };
};

export default useCreateResource;
