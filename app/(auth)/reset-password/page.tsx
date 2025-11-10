"use client";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { callApi } from "@/app/libs/helper/callApi";
import { ApiResponse, AppError, IUser } from "@/app/types";
import { useSession } from "@/app/store/useSession";
import { API_BASE_URL } from "@/app/libs/dals/utils";
import { FormValues } from "@/app/libs/types/user";
import FormFieldErrorMessage from "@/app/components/fieldError";

type password = Pick<FormValues, "password">;
export default function ResetPassword() {
	const { updateUser } = useSession((state) => state.actions);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<password>();

	const onSubmit = async (formData: password) => {
		try {
			const { data, error } = await callApi<ApiResponse<IUser>>(
				`${API_BASE_URL}/auth/password/reset`,
				"POST",
				formData,
			);
			if (error) throw error;
			if (!data?.data) {
				throw new Error("could not signin!");
			}
			toast.success(data?.message);
			updateUser(data?.data as IUser);
		} catch (error) {
			const castErr = error as AppError;
			toast.error(
				castErr.message ?? "Invalid credentials or server error",
			);
		}
	};

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

				{/* Heading */}
				<h1 className="text-lg font-semibold text-center mb-1">
					Create New Password
				</h1>

				{/* Email */}
				<label className="block text-sm font-medium mb-1">
					New Password
				</label>
				<input
					type="email"
					{...register("password", {
						required: "Email is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Invalid email",
						},
					})}
					placeholder="Enter your email"
					className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none mb-2"
				/>
				<FormFieldErrorMessage error={errors.password}/>
				{/* Email */}
				<label className="block text-sm font-medium mb-1">
					Confirm New Password
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
				{/* Sign in button */}
				<button
					disabled={isSubmitting}
					type="submit"
					className={` ${isSubmitting ? "bg-[var(--primary-color)]/90" : "bg-[var(--primary-color)]"} hover:bg-[var(--primary-color)]/90 cursor-pointer text-white w-full py-3 rounded-lg font-medium transition-all`}
				>
					{isSubmitting ? (
						<span className="flex justify-center ">
							<Loader2 className="w-5 h-5 text-grary-200 mr-1 animate-spin" />{" "}
							Sending reset link to email...
						</span>
					) : (
						"Send reset password link"
					)}
				</button>
			</form>
		</section>
	);
}
