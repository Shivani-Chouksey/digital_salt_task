import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

// Define types for the response and parameters
type UserType=any;
type ApiResponse= {
  data: UserType;
  message?: string;
  status?: number;
};

type CreateResourceParams = {
  urlEndpoint: string;
  data: UserType;
  token: string;
};

// Hook for creating a resource
const useCreateResource = () => {
  const baseUrl: string = import.meta.env.VITE_BASE_URL;

  // Define state to handle messages, loading, and error status
  const [createResponseMessage, setCreateResponseMessage] = useState<
    string | null
  >(null);
  const [isCreateResponseError, setIsCreateResponseError] =
    useState<boolean>(false);
  const [isCreateResponseLoading, setIsCreateResponseLoading] =
    useState<boolean>(false);
  const [isCreateResponseSuccess, setIsCreateResponseSuccess] =
    useState<boolean>(false);

  // Mutation function for creating the resource
  const createResource = async ({
    urlEndpoint,
    data,
    token,
  }: CreateResourceParams): Promise<ApiResponse> => {
    setIsCreateResponseLoading(true); // Start loading before the request
    try {
      const response = await axios.post<ApiResponse>(
        `${baseUrl}/${urlEndpoint}`,
        data,
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
      setIsCreateResponseLoading(false); // Set loading to false after request is completed
    }
  };

  // useMutation hook for creating resource with proper callbacks
  const mutation = useMutation<ApiResponse, AxiosError, CreateResourceParams>({
    mutationFn: createResource, // Pass createResource function
    onMutate: () => {
      console.log("Mutation started...");
    },
    onSuccess: (data) => {
      setCreateResponseMessage(
        data.message || "Resource created successfully!"
      );
      setIsCreateResponseError(false); // Reset error state on success
      setIsCreateResponseSuccess(true);
    },
    onError: (error: AxiosError) => {
      setCreateResponseMessage(error.message || "Error creating resource.");
      setIsCreateResponseError(true); // Set error state on failure
    },
    onSettled: () => {
      console.log("Mutation has finished.");
    },
  });

  return {
    ...mutation,
    createResponseMessage,
    isCreateResponseError,
    isCreateResponseLoading,
    isCreateResponseSuccess,
  };
};

export default useCreateResource;
