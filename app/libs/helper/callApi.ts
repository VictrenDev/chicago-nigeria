// libs/helper/callApi.ts
import axios, { isCancel } from "axios";
import { isObject } from "./typeHelper";
import { AppError } from "@/app/types";
import { toast } from "sonner";

// Use your environment variables directly
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

// Debug log to verify environment variables (remove in production)
if (typeof window !== 'undefined') {
  console.log('API Base URL:', baseURL);
  console.log('Frontend URL:', frontendURL);
}

const axiosinstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000, // Increased timeout for render.com
});

export const callApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  payload?: Record<string, unknown> | FormData,
): Promise<{ data?: T; error?: AppError }> => {
  const source = axios.CancelToken.source();

  try {
    const response = await axiosinstance.request<T>({
      url: endpoint,
      method,
      ...(payload && { data: payload }),
      headers: {
        ...(isObject(payload)
          ? {
              "Content-Type": "application/json",
              Accept: "application/json",
            }
          : {
              "Content-Type": "multipart/form-data",
            }),
        "x-referer": frontendURL,
      },
      cancelToken: source.token,
    });

    return { data: response.data };
  } catch (error) {
    let err: AppError | undefined;

    if (axios.isAxiosError(error)) {
      if (isCancel(error)) {
        err = {
          success: "Error",
          message: "Request cancelled",
        };
        return { error: err };
      }

      if (error.response && error.response.data) {
        if (error.response.status === 401) {
          const { message, success } = error.response.data as AppError;

          // toast.error(success, {
          //   description: message,
          // });
          
          // Set a flag for auth provider to handle
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('shouldLogout', 'true');
          }
        }

        if (
          error.response.status === 423 &&
          error.response.data.message === "Your email is yet to be verified"
        ) {
          // Handle email verification redirect if needed
        }

        err = {
          success: "Error",
          message:
            (error.response.data as any)?.message ||
            "There was an error, please try again",
        };
      } else if (error.code === 'ECONNABORTED') {
        err = {
          success: "Error", 
          message: "Request timeout - please try again",
        };
      } else if (!error.response) {
        err = {
          success: "Error",
          message: "Network error - please check your connection",
        };
      }
    }

    return { error: err };
  }
};