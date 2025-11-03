import { FormValues } from "@/app/types/user";
import axios from "axios";

export async function createUser(url: string, { arg }: { arg: FormValues }) {
	try {
		const res = await axios.post(url, arg, {
			headers: { "Content-Type": "application/json" },
			timeout: 10000, // 10 seconds
		});
		return res.data;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			if (err.code === "ECONNABORTED") {
				throw new Error(
					"Request timed out. Please check your internet connection.",
				);
			} else if (err.response) {
				throw new Error(
					`Server error (${err.response.status}): ${
						(err.response.data as any)?.message ||
						"Failed to save user"
					}`,
				);
			} else if (err.request) {
				throw new Error("Network error: No response from server.");
			} else {
				throw new Error("Unexpected Axios error occurred.");
			}
		} else if (err instanceof Error) {
			throw err; // rethrow normal JS errors
		} else {
			throw new Error("Unknown error occurred.");
		}
	}
}
