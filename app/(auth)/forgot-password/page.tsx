"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { callApi } from "@/app/libs/helper/callApi";
import { ApiResponse, AppError, IUser } from "@/app/types";
import { FormValues } from "@/app/libs/types/user";
import { useSession } from "@/app/store/useSession";

type EmailOnly = Pick<FormValues, "email">;

// Move the main form logic to a separate component that uses useSearchParams
function ForgotPasswordForm() {
	const TIMER_DURATION = 20; // seconds

	const [timer, setTimer] = useState<number | null>(null);
	const [canResend, setCanResend] = useState(true);

	const searchParams = useSearchParams();
	const emailParam = searchParams.get("email");
	const { updateUser } = useSession((state) => state.actions);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailOnly>({
		defaultValues: { email: emailParam ?? "" },
	});

	// Countdown logic
	useEffect(() => {
		if (timer === null || canResend) return;

		if (timer <= 0) {
			setTimer(0);
			setCanResend(true);
			return;
		}

		const countdown = setTimeout(() => {
			setTimer((prev) => (prev !== null ? prev - 1 : 0));
		}, 1000);

		return () => clearTimeout(countdown);
	}, [timer, canResend]);

	const onSubmit = async (formData: EmailOnly) => {
		try {
			const { data, error } = await callApi<ApiResponse<IUser>>(
				`api/v1/auth/forgot-password`,
				"POST",
				formData,
			);

			if (error) throw error;
			if (!data?.data) throw new Error("Could not send reset email");

			toast.success(data.message);
			updateUser(data.data as IUser);
			// Start countdown
			setCanResend(false);
			setTimer(TIMER_DURATION);
		} catch (err) {
			const castErr = err as AppError;
			toast.error(
				castErr.message ?? "Invalid credentials or server error",
			);
		}
	};

	const isButtonDisabled = isSubmitting || !canResend;

	return (
		<section className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg text-sm"
			>
				{/* Logo */}
				<div className="flex justify-center mb-4">
					<Image
						src="/chicago-nigeria-logo-1.png"
						alt="logo"
						width={140}
						height={40}
						className="h-10 object-contain"
					/>
				</div>

				{/* Timer Display */}
				{timer !== null && timer > 0 && (
					<p className="my-1 text-gray-500 text-center">
						Resend verification link in 00:
						{timer.toString().padStart(2, "0")}
					</p>
				)}
				{/* Heading */}
				<h1 className="text-lg font-semibold text-center mb-1">
					Forgot Password
				</h1>

				{/* Email */}
				<label className="block text-sm font-medium mb-1">
					Email Address
				</label>
				<input
					type="email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Invalid email",
						},
					})}
					placeholder="Enter your email"
					className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none mb-2"
				/>
				{errors.email && (
					<p className="text-red-500 text-xs mb-2">
						{errors.email.message}
					</p>
				)}

				{/* Submit Button */}
				<button
					disabled={isButtonDisabled}
					type="submit"
					className={`${
						isButtonDisabled
							? "bg-[var(--primary-color)]/70 cursor-not-allowed"
							: "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90"
					} text-white w-full py-3 rounded-lg font-medium transition-all`}
				>
					{isSubmitting ? (
						<span className="flex justify-center items-center">
							<Loader2 className="w-5 h-5 mr-2 animate-spin" />
							Sending reset link...
						</span>
					) : canResend ? (
						"Send reset password link"
					) : (
						"Resend link available soon..."
					)}
				</button>
			</form>
		</section>
	);
}

// Main page component with Suspense boundary
export default function ForgotPassword() {
	return (
		<Suspense fallback={
			<div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
				<div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg text-sm text-center">
					Loading...
				</div>
			</div>
		}>
			<ForgotPasswordForm />
		</Suspense>
	);
}