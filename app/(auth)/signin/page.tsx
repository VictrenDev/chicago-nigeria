"use client";
import useSWRMutation from "swr/mutation";
import { ArrowLeft, ArrowRight, Camera, Lock, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import { CheckIcon } from "@/app/components/icons";

type FormValues = {
	email: string;
	phone: string;

	password: string;
};

async function postUser(url: string, { arg }: { arg: FormValues }) {
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(arg),
	});

	if (!res.ok) throw new Error("Failed to save user");

	return res.json();
}
export default function SignIn() {
	const { trigger: triggerSubmitForm } = useSWRMutation(
		"https://68e5269b8e116898997e96bc.mockapi.io/users/v1/Users",
		postUser
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
			phone: "",

			password: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			// hash password before sending
			const hashedPassword = await bcrypt.hash(data.password, 10); // 10 = salt rounds

			const newUser = await triggerSubmitForm({
				...data,
				password: hashedPassword,
			});

			if (newUser) {
				toast.success("Form Submitted successfully. Check email for confirmation link.");
				console.log("Form submitted:", newUser);
			}
		} catch (error) {
			console.log(error);
			toast.error("Sorry! something went wrong");
		}
	};

	return (
		<section className="w-screen h-screen bg-white/10 flex items-center justify-center px-4 pt-12">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white px-4 py-8 md:px-8 rounded-xl md:w-120 text-sm relative signup-form overflow-hidden">
				<Image
					src={"/chicago-nigeria-logo-1.png"}
					alt="logo"
					height={67}
					width={163}
					className="w-20 mx-auto"
				/>

				{/* STEP CONTENT CONTAINER */}
				<div className="relative min-h-[400px] overflow-hidden px-2">
					<div className={` w-full`}>
						<div className="flex flex-col items-center space-y-1 mt-12">
							<h1 className=" text-xl font-medium">Sign in to your account</h1>
							<p className="text-gray-400 text-center">
								Connect with thousands of Nigerians in Chicago. Share your story, discover
								opportunities, and build meaningful relationships.
							</p>
						</div>
						<fieldset className="space-y-4 mt-8">
							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-1">
									Email Address
								</label>
								<input
									type="email"
									{...register("email", {
										required: "Email is required",
										pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
									})}
									className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
									placeholder="Enter your email address"
								/>
								{errors.email && (
									<p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
								)}
							</div>
							<div className="flex flex-col sm:flex-row sm:gap-2 gap-4">
								<div>
									<label htmlFor="password" className="block text-sm font-medium mb-1">
										Password
									</label>
									<input
										type="password"
										{...register("password", { required: "Last name is required" })}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your last name"
									/>
									{errors.password && (
										<p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
									)}
								</div>
							</div>
						</fieldset>
						<button
							type="submit"
							className="bg-[var(--primary-color)] text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 transition-all duration-200">
							<span>Continue</span>
							<ArrowRight className="w-4 h-4" />
						</button>
						<p className="text-center mx-auto text-sm mt-4">
							Not ready to sign up?{" "}
							<Link
								href={"/"}
								className="text-[var(--primary-color)] hover:underline transition-colors">
								Return to main page
							</Link>
						</p>
					</div>
				</div>
			</form>
		</section>
	);
}
