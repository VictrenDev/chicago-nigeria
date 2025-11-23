"use client";

import { API_BASE_URL } from "@/app/libs/dals/utils";
import { callApi } from "@/app/libs/helper/callApi";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

async function verifyTokenFetcher([url, token]: [string, string]) {
	try {
		const res = await axios.post(
			url,
			{ token }, // payload
			{
				headers: { "Content-Type": "application/json" },
				timeout: 10000, // 10 seconds
			},
		);
		return res.data;
	} catch (err: unknown) {
		if (axios.isAxiosError(err)) {
			if (err.code === "ECONNABORTED") {
				throw new Error(
					"Request timed out. Please check your internet connection.",
				);
			} else if (err.response) {
				const message =
					(err.response.data as any)?.message ||
					"Failed to confirm token";
				throw new Error(message);
			} else if (err.request) {
				throw new Error("Network error: No response from server.");
			} else {
				throw new Error("Unexpected Axios error occurred.");
			}
		} else if (err instanceof Error) {
			throw err;
		} else {
			throw new Error("Unknown error occurred.");
		}
	}
}

export default function VerifyTokenPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token") || "";

	// Only call SWR if token exists
	const { data, error, isLoading } = useSWR(
			token ? [`${API_BASE_URL}/auth/verify-email`, token] : null, // key is null if no token
			verifyTokenFetcher,
		);
	console.log(data)
	useEffect(() => {
		if (data) {
			// Redirect after success
			router.push("/signin");
		}
	}, [data, router]);
	return (
		<main className=" bg-gray-50 flex justify-center items-center min-h-screen">
			<section className="bg-white min-h-30 p-8 rounded-lg">
				{isLoading && (
					<p className="inline-flex justify-center items-center gap-4 text-3xl text-gray-500">
						<Loader2 className="w-8 h-8  animate-spin" /> Verifying
						your email. Please wait...{" "}
					</p>
				)}
				{data && (
					<p className="text-green-500 text-3xl text-center">
						Token verified successfully!
					</p>
				)}
				{error && (
					<p className="text-red-500 text-3xl">
						<X />
						{error.message}
					</p>
				)}
				{!token && (
					<p className="text-red-500 text-3xl">No token provided</p>
				)}
			</section>
		</main>
	);
}
