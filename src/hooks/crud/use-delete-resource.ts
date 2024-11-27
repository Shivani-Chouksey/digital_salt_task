import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

// Define types for API response and parameters
type ApiResponse = {
  message?: string;
  status?: number;
};

type DeleteResourceParams = {
  urlEndpoint: string;
  id: number;
  token: string;
};

// Hook for deleting a resource
const useDeleteResource = () => {
  // React state to manage messages
  const [deleteReponseMessage, setdeleteReponseMessage] = useState<
    string | null
  >(null);
  const [isDeleteReponseError, setIsDeleteReponseError] =
    useState<boolean>(false);
  const [isDeleteReponseLoading, setIsDeleteReponseLoading] =
    useState<boolean>(false);
  const [isDeleteReponseSuccess, setIsDeleteReponseSuccess] =
    useState<boolean>(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Mutation function for deleting the resource
  const deleteResource = async ({
    urlEndpoint,
    id,
    token,
  }: DeleteResourceParams): Promise<ApiResponse> => {
    try {
      setIsDeleteReponseLoading(true); // Start loading before the request

      const response = await axios.delete<ApiResponse>(
        `${baseUrl}/${urlEndpoint}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      return response.data;
    } catch (err: any) {
      throw err; // Throw error for handling in onError
    } finally {
      setIsDeleteReponseLoading(false);
      // Set loading to false after request is completed
    }
  };

  // UseMutation hook with proper typing and dynamic message handling
  const mutation = useMutation<ApiResponse, AxiosError, DeleteResourceParams>({
    mutationFn: deleteResource, // Pass deleteResource function
    onSuccess: (data) => {
      setdeleteReponseMessage(data.message || "Resource deleted successfully!");
      setIsDeleteReponseError(false);
      setIsDeleteReponseSuccess(true);
    },
    onError: (error: AxiosError) => {
      setdeleteReponseMessage(error.message || "Error deleting resource.");
      setIsDeleteReponseError(true); // Set error state on failure
    },
  });

  return {
    ...mutation,
    deleteReponseMessage,
    isDeleteReponseError,
    isDeleteReponseLoading,
    isDeleteReponseSuccess,
  };
};

export default useDeleteResource;
