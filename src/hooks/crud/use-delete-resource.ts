import axios from "axios";
import { useState } from "react";

type ApiResponse = {
  message?: string;
  status?: number;
};

const useDeleteResource = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const deleteResource = async (urlEndpoint: string, id: string,token:string) => {
    setLoading(true);
    try {
      const response = await axios.delete<ApiResponse>(
        `${baseUrl}/${urlEndpoint}/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        }
      );
      if (response.status === 200) {
        setSuccess(response.data.message || "Resource Deleted successfully.");
      }
        return response.data; // Return data for further usage
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the resource.");
      throw err; // Rethrow error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  };

  return { deleteResource, loading, error, success };
};

export default useDeleteResource;
