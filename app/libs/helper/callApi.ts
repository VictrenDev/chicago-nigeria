import axios, { isCancel } from "axios";
import { assertEnv } from "./assertEnv";
import { isObject } from "./typeHelper";
import { AppError } from "@/app/types";
import { toast } from "sonner";
import { initSession } from "@/app/store/useSession";

const baseURL = assertEnv(
	`${process.env.NEXT_PUBLIC_API_URL}`,
	"NEXT_PUBLIC_API_Url is not provided!",
);

const axiosinstance = axios.create({
	baseURL,
	withCredentials: true,
	timeout: 6000,
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
				"x-referer":
					process.env.NEXT_PUBLIC_FRONTEND_URL ||
					"http://localhost:3000",
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
					// logout user or redirect to login
					const { message, success } = error.response
						.data as AppError;

					void initSession().actions.clearSession();
					toast.error(success, {
						description: message,
					});
				}

				if (
					error.response.status === 423 &&
					error.response.data.message ===
						"Your email is yet to be verified"
				) {
					// verify email pages are not created yet
					// just redirect user to email verification page
					//   const currentPageUrl = window?.location?.pathname;
					//   window.location.replace("/signin");
				}

				err = {
					success: "Error",
					message:
						(error.response.data as any)?.message ||
						"There was an error, please try again",
				};
			}
		}

		return { error: err };
	}
};
