import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import UserType from "../../utils/types/user-detail-type";

// Define types for the response and parameters
type ApiResponse = {
  data: UserType;
  message?: string;
  status?: number;
};

type UpdateResourceParams = {
  urlEndpoint: string;
  data: any;
  id: number;
  token: string;
};

// Hook for updating a resource using React Query's `useMutation`
const useUpdateResource = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // React state to manage messages and loading status
  const [updateResponseMessage, setUpdateResponseMessage] = useState<
    string | null
  >(null);
  const [isUpdateError, setIsUpdateError] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);

  // Function for updating the resource (API call)
  const updateResource = async ({
    urlEndpoint,
    data,
    id,
    token,
  }: UpdateResourceParams): Promise<ApiResponse> => {
    setIsUpdateLoading(true); // Start loading before the request
    try {
      const response = await axios.patch<ApiResponse>(
        `${baseUrl}/${urlEndpoint}/${id}`,
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
      throw err; // Throw error for handling in `onError`
    } finally {
      setIsUpdateLoading(false); // Set loading to false after request is completed
    }
  };

  // React Query's `useMutation` hook to handle the API call
  const mutation = useMutation<ApiResponse, AxiosError, UpdateResourceParams>({
    mutationFn: updateResource, // Mutation function
    onSuccess: (data) => {
      setUpdateResponseMessage(
        data.message || "Resource updated successfully!"
      );
      setIsUpdateSuccess(true); // Set success state
      setIsUpdateError(false); // Reset error state
    },
    onError: (error: AxiosError) => {
      setUpdateResponseMessage(error.message || "Error updating resource.");
      setIsUpdateError(true); // Set error state on failure
      setIsUpdateSuccess(false); // Reset success state
    },
    onSettled: () => {
      console.log("Update operation finished.");
    },
  });

  return {
    ...mutation,
    updateResponseMessage,
    isUpdateError,
    isUpdateLoading,
    isUpdateSuccess,
  };
};

export default useUpdateResource;
