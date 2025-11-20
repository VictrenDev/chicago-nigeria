// import axios, { isCancel } from "axios";
// import { isObject } from "./typeHelper";
// import { AppError } from "@/app/types";
// import { toast } from "sonner";
// import { initSession, useSession } from "@/app/store/useSession";
// import { clearSessionAndRedirect } from "./sessionUtils";

// // Use your environment variables directly
// const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
// const frontendURL =
//   process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

// // Debug log to verify environment variables (remove in production)
// if (typeof window !== "undefined") {
//   console.log("API Base URL:", baseURL);
//   console.log("Frontend URL:", frontendURL);
// }

// const axiosinstance = axios.create({
//   baseURL,
//   withCredentials: true,
//   timeout: 10000, // Increased timeout for render.com
// });

// export const callApi = async <T>(
//   endpoint: string,
//   method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
//   payload?: Record<string, unknown> | FormData
// ): Promise<{ data?: T; error?: AppError }> => {
//   const source = axios.CancelToken.source();

//   try {
//     const response = await axiosinstance.request<T>({
//       url: endpoint,
//       method,
//       ...(payload && { data: payload }),
//       headers: {
//         ...(isObject(payload)
//           ? {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             }
//           : {
//               "Content-Type": "multipart/form-data",
//             }),
//         "x-referer": frontendURL,
//       },
//       cancelToken: source.token,
//     });

//     return { data: response.data };
//   } catch (error) {
//     let err: AppError | undefined;

//     if (axios.isCancel(error)) {
//       err = {
//         success: "Error",
//         message: "Request cancelled",
//       };

//       return { error: err };
//     }

//     if (axios.isAxiosError(error) && error.response) {
//       err = error.response.data as AppError;

//       if (error.response.status === 401) {
//         // toast.error("Request unauthorized, please login or signup!", {
//         //   description: error.message,
//         // });

//         initSession.getState().actions.clearSession();
//         // clearSessionAndRedirect()
//       }

//       if (
//         error.response.status === 423 &&
//         error.response.data.message === "Your email is yet to be verified"
//       ) {
//         // Handle email verification redirect if needed
//         // redirect to email page
//         // Set a flag for auth provider to handle
//         if (typeof window !== "undefined") {
//           window.location.replace("/resend email page");
//         }
//       }

//       if (error.response.status === 429) {
//         toast.error("Too many requests!", {
//           description: error.message,
//         });
//       }

//       if (error.response.status === 500) {
//         toast.error("Internal server error!", {
//           description: error.message,
//         });
//       }

//       if (!error.response) {
//         err = {
//           success: "Error",
//           message: "Network error - please check your connection",
//         };
//       }

//       if (error.code === "ECONNABORTED") {
//         err = {
//           success: "Error",
//           message: "Request timeout - please try again",
//         };
//       }
//     } else {
//       if (error instanceof Error) {
//         err = { message: error.message, success: "Error" };
//       }
//     }

//     return { error: err };
//   }
// };


import axios from "axios";
import { isObject } from "./typeHelper";
import { AppError } from "@/app/types";
import { toast } from "sonner";
import { initSession } from "@/app/store/useSession";

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
  timeout: 10000,
});

// Helper to get cookies for debugging
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const callApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  payload?: Record<string, unknown> | FormData
): Promise<{ data?: T; error?: AppError }> => {
  const source = axios.CancelToken.source();

  try {
    // Determine payload type
    const isFormData = payload instanceof FormData;
    const isJSONObject = isObject(payload) && !isFormData;

    // Debug logging
    console.log('🔧 API Call Debug:', {
      endpoint,
      method,
      isFormData,
      isJSONObject,
      hasPayload: !!payload,
      payloadType: payload?.constructor.name,
      accessToken: !!getCookie('accessToken'),
      refreshToken: !!getCookie('refreshToken')
    });

    // Build headers - CRITICAL: No Content-Type for FormData!
    const headers: Record<string, string> = {
      "x-referer": frontendURL,
    };

    // Only set Content-Type for JSON, NOT for FormData
    if (isJSONObject) {
      headers["Content-Type"] = "application/json";
      headers["Accept"] = "application/json";
    }
    // For FormData, let axios/browser set Content-Type automatically with boundary

    const config = {
      url: endpoint,
      method,
      data: payload,
      headers,
      withCredentials: true,
      cancelToken: source.token,
      // Optional: Add timeout specifically for file uploads
      ...(isFormData && { timeout: 30000 }), // 30 seconds for file uploads
    };

    const response = await axiosinstance.request<T>(config);
    
    console.log('✅ API Call Successful:', {
      endpoint,
      status: response.status,
      data: response.data
    });
    
    return { data: response.data };
  } catch (error) {
    // Enhanced error logging
    console.error('❌ API Call Failed:', {
      endpoint,
      method,
      error
    });

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

      // Detailed error logging
      console.error('🔍 Axios Error Details:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
        config: error.config?.headers?.['Content-Type']
      });

      if (error.response.status === 401) {
        console.error('🔐 401 Unauthorized - Token Debug:', {
          accessToken: getCookie('accessToken'),
          refreshToken: getCookie('refreshToken'),
          allCookies: document.cookie
        });

        toast.error("Session expired - please log in again");
        initSession.getState().actions.clearSession();
        
        // Optional: Redirect to login
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      }

      if (error.response.status === 423 && error.response.data.message === "Your email is yet to be verified") {
        if (typeof window !== "undefined") {
          window.location.replace("/verify-email");
        }
      }

      if (error.response.status === 429) {
        toast.error("Too many requests - please slow down");
      }

      if (error.response.status === 500) {
        toast.error("Server error - please try again later");
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
      } else {
        err = { message: "Unknown error occurred", success: "Error" };
      }
    }

    return { error: err };
  }
};