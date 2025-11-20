import axios, { isCancel } from "axios";
import { isObject } from "./typeHelper";
import { AppError } from "@/app/types";
import { toast } from "sonner";
import { initSession, useSession } from "@/app/store/useSession";
import { clearSessionAndRedirect } from "./sessionUtils";

// Use your environment variables directly
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const frontendURL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

// Debug log to verify environment variables (remove in production)
if (typeof window !== "undefined") {
  console.log("API Base URL:", baseURL);
  console.log("Frontend URL:", frontendURL);
}

const axiosinstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000, // Increased timeout for render.com
});

export const callApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  payload?: Record<string, unknown> | FormData
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

    if (axios.isCancel(error)) {
      err = {
        success: "Error",
        message: "Request cancelled",
      };

      return { error: err };
    }

    if (axios.isAxiosError(error) && error.response) {
      err = error.response.data as AppError;

      if (error.response.status === 401) {
        // toast.error("Request unauthorized, please login or signup!", {
        //   description: error.message,
        // });

        initSession().actions.clearSession();
        // clearSessionAndRedirect()
      }

      if (
        error.response.status === 423 &&
        error.response.data.message === "Your email is yet to be verified"
      ) {
        // Handle email verification redirect if needed
        // redirect to email page
        // Set a flag for auth provider to handle
        if (typeof window !== "undefined") {
          window.location.replace("/resend email page");
        }
      }

      if (error.response.status === 429) {
        toast.error("Too many requests!", {
          description: error.message,
        });
      }

      if (error.response.status === 500) {
        toast.error("Internal server error!", {
          description: error.message,
        });
      }

      if (!error.response) {
        err = {
          success: "Error",
          message: "Network error - please check your connection",
        };
      }

      if (error.code === "ECONNABORTED") {
        err = {
          success: "Error",
          message: "Request timeout - please try again",
        };
      }
    } else {
      if (error instanceof Error) {
        err = { message: error.message, success: "Error" };
      }
    }

    return { error: err };
  }
};
