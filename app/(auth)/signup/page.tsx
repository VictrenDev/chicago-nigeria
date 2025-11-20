"use client";
import useSWRMutation from "swr/mutation";
import {
	ArrowLeft,
	ArrowRight,
	Camera,
	Loader2,
	Lock,
	MapPin,
	Store,
	User,
	UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckIcon, UserTick } from "@/app/components/icons";
import { createUser } from "@/app/libs/dals/users";
import { FormValues } from "@/app/libs/types/user";
import { API_BASE_URL } from "@/app/libs/dals/utils";
import FormFieldErrorMessage from "@/app/components/fieldError";
import {
	createUserSchema,
	CreateUserSchema,
} from "@/app/libs/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { callApi } from "@/app/libs/helper/callApi";
import { ApiResponse, IUser } from "@/app/types";

export default function Form() {
	const [step, setStep] = useState(1);
	const [direction, setDirection] = useState<"left" | "right">("right");
	const [registrationType, setRegistrationType] = useState<
		"regular" | "vendor"
	>("regular");
	const [isAnimating, setIsAnimating] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		trigger,
		watch,
		setError,
	} = useForm<FormValues>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			// Use empty values for production
			// firstName: "",
			// lastName: "",
			// email: "",
			// DOB: "",
			// phone: "",
			// gender: "male",
			// countryCode: "+1",
			// currentCity: "",
			// neighborhood: "",
			// stateOfOrigin: "",
			// profession: "",
			// company: "",
			// business: "",
			// brandName: "",
			// bio: "",
			// password: "",
			// confirmPassword: "",
			// isTermAndConditionAccepted: false,
			firstName: "Victor",
			lastName: "Odoi",
			email: "victorodoi90@gmail.com",
			DOB: "1997-04-12",
			phone: "09079125326",
			gender: "male",
			countryCode: "+234",
			currentCity: "Lagos",
			neighborhood: "Lekki Phase 1",
			stateOfOrigin: "Akwa Ibom",
			profession: "Software Developer",
			company: "AnyLoad Technologies",
			business: "Smart Home & IoT Solutions",
			brandName: "Odoi Tech",
			bio: "Software developer focused on IoT, automation, and scalable web technologies. Passionate about building smart systems that improve everyday living.",
			password: "Victor@12345",
			confirmPassword: "Victor@12345",
			isTermAndConditionAccepted: true,
		},
	});

	const password = watch("password", "");
	const isMinLength = password.length >= 8;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasNumber = /[0-9]/.test(password);

	const onSubmit = async (formdata: FormValues) => {
		console.log("🏁 Form submission started");

		console.log("Form data:", formdata);

		try {
			// Create proper payload structure
			const payload = {
				firstName: formdata.firstName,
				lastName: formdata.lastName,
				email: formdata.email,
				DOB: formdata.DOB,
				phone: formdata.phone,
				gender: formdata.gender,
				fullPhoneNumber: `${formdata.countryCode}${formdata.phone}`,
				currentCity: formdata.currentCity,
				neighborhood: formdata.neighborhood || "", // Handle optional
				stateOfOrigin: formdata.stateOfOrigin,
				profession: formdata.profession,
				company: formdata.company,
				business: formdata.business || "", // Handle optional
				brandName: formdata.brandName || "", // Handle optional
				bio: formdata.bio || "", // Handle optional
				password: formdata.password,
				confirmPassword: formdata.confirmPassword,
				isTermAndConditionAccepted: formdata.isTermAndConditionAccepted,
			};

			console.log("📤 Sending payload:", payload);

			const { data, error } = await callApi<ApiResponse<IUser>>(
				"/auth/signup",
				"POST",
				payload,
			);

			console.log("✅ API Response:", { data, error });

			if (error) {
				console.error("❌ API Error:", error);
				// Handle specific error cases
				if (
					error.message?.includes("email") ||
					error.message?.includes("Email")
				) {
					toast.error("Email already exists or is invalid");
					setError("email", {
						type: "manual",
						message: "Email already exists",
					});
				} else if (
					error.message?.includes("phone") ||
					error.message?.includes("Phone")
				) {
					toast.error("Phone number already exists or is invalid");
					setError("phone", {
						type: "manual",
						message: "Phone number already exists",
					});
				} else {
					toast.error(
						error.message ||
							"Registration failed. Please try again.",
					);
				}
				return;
			}

			if (data?.success) {
				toast.success(
					"Account created successfully! Please check your email for verification.",
				);
				// Optional: Redirect to login or confirmation page
				// router.push('/login');

				// Reset form or redirect after successful submission
				console.log("🎉 Registration successful!");
			} else {
				toast.error(
					data?.message || "Registration failed. Please try again.",
				);
			}
		} catch (error: any) {
			console.error("💥 Submission error:", error);
			if (error instanceof Error) {
				toast.error(
					error.message || "Something went wrong. Please try again.",
				);
			} else {
				toast.error(
					"Network error. Please check your connection and try again.",
				);
			}
		}
	};

	const next = async () => {
		if (isAnimating || step >= 5) return;

		let fieldsToValidate: (keyof FormValues)[] = [];

		if (step === 1) {
			fieldsToValidate = [
				"firstName",
				"lastName",
				"email",
				"phone",
				"DOB",
				"gender",
			];
		} else if (step === 2) {
			fieldsToValidate = ["currentCity", "stateOfOrigin"];
		} else if (step === 3) {
			fieldsToValidate = ["profession", "company"];
		} else if (step === 4 && registrationType === "vendor") {
			fieldsToValidate = ["business", "brandName"];
		} else if (step === 5) {
			fieldsToValidate = [
				"password",
				"confirmPassword",
				"isTermAndConditionAccepted",
			];
		}

		const isStepValid = await trigger(fieldsToValidate);

		if (isStepValid) {
			setIsAnimating(true);
			setDirection("right");
			setTimeout(() => {
				setStep((current) => current + 1);
				setIsAnimating(false);
			}, 300);
		} else {
			toast.error("Please fix the errors before continuing");
		}
	};

	const prev = () => {
		if (isAnimating || step <= 1) return;
		setIsAnimating(true);
		setDirection("left");
		setTimeout(() => {
			setStep((current) => current - 1);
			setIsAnimating(false);
		}, 300);
	};

	// Animation classes based on direction
	const getStepAnimationClass = () => {
		if (direction === "right") {
			return isAnimating
				? "animate-slide-out-left"
				: "animate-slide-in-right";
		} else {
			return isAnimating
				? "animate-slide-out-right"
				: "animate-slide-in-left";
		}
	};

	return (
		<section className="w-screen h-screen bg-white/10 flex items-center justify-center px-4 pt-12">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white px-4 py-8 md:px-8 rounded-xl md:w-120 text-sm relative signup-form overflow-hidden"
			>
				{step > 1 && (
					<button
						type="button"
						onClick={prev}
						className="absolute top-6 left-2 cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>Back</span>
					</button>
				)}

				<Image
					src={"/chicago-nigeria-logo-1.png"}
					alt="logo"
					height={67}
					width={163}
					className="w-20 mx-auto"
				/>

				{/* PROGRESS STEPS */}
				<div className="flex justify-between items-center relative py-14">
					<div className="absolute top-[50%] left-0 w-full h-[2px] bg-gray-200"></div>
					<div
						className="absolute top-[50%] left-0 h-[2px] bg-[var(--primary-color)] transition-all duration-500"
						style={{
							width: `${((step - 1) / 4) * 100}%`,
						}}
					></div>

					{[1, 2, 3, 4, 5].map((n) => {
						const isCompleted = step > n;
						const isCurrent = step === n;

						return (
							<div
								key={n}
								className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 text-xs md:text-sm
          ${
				isCompleted
					? "bg-[var(--primary-color)] text-white border-[var(--primary-color)] shadow-lg scale-110"
					: isCurrent
						? "border-2 border-[var(--primary-color)] bg-white text-[var(--primary-color)] font-bold shadow-md scale-110"
						: "border border-gray-300 bg-white text-gray-400"
			}`}
							>
								{n}
							</div>
						);
					})}
				</div>

				{/* STEP CONTENT CONTAINER */}
				<div className="relative min-h-[400px] overflow-hidden px-2">
					{/* STEP 1 */}
					{step === 1 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<User className="w-10 h-10 text-[var(--primary-color)]" />
								<h1 className="text-2xl font-medium">
									Personal Information
								</h1>
								<p className="text-gray-400 text-center">
									Lets start with the basics
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div className="flex flex-col sm:flex-row sm:gap-2 gap-4">
									<div className="flex-1">
										<label className="block text-sm font-medium mb-1">
											First Name
										</label>
										<input
											type="text"
											{...register("firstName")}
											className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Enter your first name"
										/>
										<FormFieldErrorMessage
											error={errors.firstName}
										/>
									</div>
									<div className="flex-1">
										<label className="block text-sm font-medium mb-1">
											Last Name
										</label>
										<input
											type="text"
											{...register("lastName")}
											className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Enter your last name"
										/>
										<FormFieldErrorMessage
											error={errors.lastName}
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Gender
									</label>
									<select
										{...register("gender")}
										className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
									>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</select>
									<FormFieldErrorMessage
										error={errors.gender}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Email Address
									</label>
									<input
										type="email"
										{...register("email")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your email address"
									/>
									<FormFieldErrorMessage
										error={errors.email}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Date of Birth
									</label>
									<input
										type="date"
										{...register("DOB")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200 text-gray-600"
									/>
									<FormFieldErrorMessage error={errors.DOB} />
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Phone Number
									</label>
									<div className="flex rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[var(--primary-color)]/20 focus-within:border-[var(--primary-color)] border border-gray-300 transition-all duration-200 bg-white">
										<select
											{...register("countryCode")}
											className="bg-white px-3 py-3 text-sm text-gray-700 focus:outline-none border-r border-gray-300"
										>
											<option value="+1">+1 (US)</option>
											<option value="+44">
												+44 (UK)
											</option>
											<option value="+234">
												+234 (NG)
											</option>
											<option value="+91">
												+91 (IN)
											</option>
										</select>
										<input
											type="text"
											{...register("phone")}
											className="flex-1 px-3 py-3 text-sm sm:text-base focus:outline-none"
											placeholder="Enter your phone number"
										/>
									</div>
									<FormFieldErrorMessage
										error={errors.phone}
									/>
								</div>
							</fieldset>
							<CommonButton
								next={next}
								isAnimating={isAnimating}
							/>
							<p className="text-center mx-auto text-sm mt-4">
								Not ready to sign up?{" "}
								<Link
									href={"/"}
									className="text-[var(--primary-color)] hover:underline transition-colors"
								>
									Return to main page
								</Link>
							</p>
						</div>
					)}

					{/* STEP 2-4 remain the same as your original code */}
					{/* STEP 2 */}
					{step === 2 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<MapPin className="w-10 h-10 text-[var(--primary-color)]" />
								<h1 className="text-2xl font-medium">
									Location Details
								</h1>
								<p className="text-gray-400 text-center">
									Help us connect you with nearby community
									members
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div>
									<label className="block text-sm font-medium mb-1">
										Current City
									</label>
									<input
										type="text"
										{...register("currentCity")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your current city"
									/>
									<FormFieldErrorMessage
										error={errors.currentCity}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Neighborhood (Optional)
									</label>
									<input
										type="text"
										{...register("neighborhood")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your neighborhood"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Nigerian State of Origin
									</label>
									<input
										type="text"
										{...register("stateOfOrigin")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your state of origin"
									/>
									<FormFieldErrorMessage
										error={errors.stateOfOrigin}
									/>
								</div>
							</fieldset>
							<CommonButton
								next={next}
								isAnimating={isAnimating}
							/>
						</div>
					)}

					{/* STEP 3 */}
					{step === 3 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<Camera className="w-10 h-10 text-[var(--primary-color)]" />
								<h1 className="text-2xl font-medium">
									Profile Details
								</h1>
								<p className="text-gray-400 text-center">
									Tell us about your professional background
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div>
									<label className="block text-sm font-medium mb-1">
										Professional Job Title
									</label>
									<input
										type="text"
										{...register("profession")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="e.g. Software Engineer"
									/>
									<FormFieldErrorMessage
										error={errors.profession}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Company/Organization
									</label>
									<input
										type="text"
										{...register("company")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Microsoft"
									/>
									<FormFieldErrorMessage
										error={errors.company}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Bio (Optional)
									</label>
									<textarea
										{...register("bio")}
										className="min-h-24 w-full rounded-lg border border-gray-300 bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200 resize-none mt-1 p-3"
										placeholder="Tell us a bit about yourself, your interests, and what you're looking for in the community..."
									/>
								</div>
							</fieldset>
							<CommonButton
								next={next}
								isAnimating={isAnimating}
							/>
						</div>
					)}

					{/* STEP 4 */}
					{step === 4 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<UserTick />
								<h1 className="text-2xl font-medium">
									Registration Type
								</h1>
								<p className="text-gray-400 text-center">
									How do you wan&apos;t to use chicago
									nigeria?
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div
									onClick={() =>
										setRegistrationType("regular")
									}
									className="flex gap-6 border border-[var(--primary-color)] py-4 px-8 rounded-lg relative cursor-pointer"
								>
									<div
										className={`${
											registrationType === "regular"
												? "bg-[var(--primary-color)]"
												: "bg-gray-300"
										} flex items-center justify-center w-10 h-10 shrink-0 rounded-md`}
									>
										<UsersRound
											size={20}
											className={`${
												registrationType === "regular"
													? "stroke-white"
													: "stroke-gray-00"
											}`}
										/>
									</div>
									{registrationType === "regular" && (
										<CheckIcon className="absolute right-4 top-2" />
									)}
									<div>
										<h2 className="font-semibold">
											Regular Member
										</h2>
										<p className="text-gray-500">
											Connect with people and explore
											opportunities
										</p>
									</div>
								</div>
								<div
									onClick={() =>
										setRegistrationType("vendor")
									}
									className="flex gap-6 border border-[var(--primary-color)] py-4 px-8 rounded-lg relative cursor-pointer"
								>
									<div
										className={`${
											registrationType === "vendor"
												? "bg-[var(--primary-color)]"
												: "bg-gray-300"
										} flex items-center justify-center w-10 h-10 shrink-0 rounded-md`}
									>
										<Store
											size={20}
											className={`${
												registrationType === "vendor"
													? "stroke-white"
													: "stroke-gray-00"
											}`}
										/>
									</div>
									{registrationType === "vendor" && (
										<CheckIcon className="absolute right-4 top-2" />
									)}
									<div>
										<h2 className="font-semibold">
											Vendor/Business Owners
										</h2>
										<p className="text-gray-500">
											Sell products or services in the
											marketplace
										</p>
									</div>
								</div>
								{registrationType === "vendor" && (
									<fieldset className="space-y-4 mt-8">
										<div>
											<label className="block text-sm font-medium mb-1">
												Business/Brand Name
											</label>
											<input
												type="text"
												{...register("business")}
												className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												placeholder="Enter your business name"
											/>
											<FormFieldErrorMessage
												error={errors.business}
											/>
										</div>
										<div>
											<label className="block text-sm font-medium mb-1">
												Business Category
											</label>
											<input
												type="text"
												{...register("brandName")}
												className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												placeholder="Enter business category"
											/>
											<FormFieldErrorMessage
												error={errors.brandName}
											/>
										</div>
									</fieldset>
								)}
							</fieldset>
							<CommonButton
								next={next}
								isAnimating={isAnimating}
							/>
						</div>
					)}

					{/* STEP 5 - FIXED SUBMIT BUTTON */}
					{step === 5 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<Lock className="w-10 h-10 text-[var(--primary-color)]" />
								<h1 className="text-2xl font-medium">
									Secure your account
								</h1>
								<p className="text-gray-400 text-center">
									Create a strong password to protect your
									profile
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div>
									<label className="block text-sm font-medium mb-1">
										Password
									</label>
									<input
										type="password"
										{...register("password")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Create a strong password"
									/>
									<FormFieldErrorMessage
										error={errors.password}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Confirm Password
									</label>
									<input
										type="password"
										{...register("confirmPassword")}
										className="w-full rounded-lg border border-gray-300 p-3 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Confirm your password"
									/>
									<FormFieldErrorMessage
										error={errors.confirmPassword}
									/>
								</div>
								<div className="bg-gray-50 rounded-lg p-4 mt-4">
									<h3 className="text-base font-medium mb-2">
										Password Requirements
									</h3>
									<ul className="text-sm text-gray-600 space-y-1">
										<PasswordValidationCriteria
											criteria={isMinLength}
										>
											At least 8 characters
										</PasswordValidationCriteria>
										<PasswordValidationCriteria
											criteria={hasUpperCase}
										>
											One uppercase character
										</PasswordValidationCriteria>
										<PasswordValidationCriteria
											criteria={hasNumber}
										>
											One number
										</PasswordValidationCriteria>
									</ul>
								</div>
								<div className="mt-4">
									<label className="flex space-x-2">
										<input
											type="checkbox"
											{...register(
												"isTermAndConditionAccepted",
											)}
											className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
										/>
										<span className="text-sm text-gray-700">
											By checking the box, you have agreed
											to our{" "}
											<Link
												href="/terms-and-conditions"
												className="text-blue-600 underline hover:text-blue-700"
												target="_blank"
											>
												Terms and Conditions
											</Link>
										</span>
									</label>
									<FormFieldErrorMessage
										error={
											errors.isTermAndConditionAccepted
										}
									/>
								</div>
							</fieldset>

							<button
								type="submit"
								disabled={isSubmitting}
								className={`${
									isSubmitting
										? "bg-[var(--primary-color)]/80"
										: "bg-[var(--primary-color)]"
								} text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="animate-spin stroke-white w-5 h-5" />
										<span>Creating Account...</span>
									</>
								) : (
									<>
										<span>Create Account</span>
										<ArrowRight className="w-4 h-4" />
									</>
								)}
							</button>
						</div>
					)}
				</div>
			</form>
		</section>
	);
}

export function CommonButton({
	next,
	isAnimating,
}: {
	next: () => void;
	isAnimating: boolean;
}) {
	return (
		<button
			type="button"
			onClick={next}
			disabled={isAnimating}
			className="bg-[var(--primary-color)] text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
		>
			<span>Continue</span>
			<ArrowRight className="w-4 h-4" />
		</button>
	);
}

type validationCriteriaType = {
	children: React.ReactNode;
	criteria: boolean;
};

export function PasswordValidationCriteria({
	children,
	criteria,
}: validationCriteriaType) {
	return (
		<li className="flex items-center gap-2">
			<div
				className={`${
					criteria
						? "bg-green-500 w-2 h-2 outline outline-green-500 outline-offset-4"
						: "bg-gray-400 w-1.5 h-1.5"
				} rounded-full transition-colors duration-200 mr-1`}
			></div>
			<span className={criteria ? "text-green-700" : "text-gray-600"}>
				{children}
			</span>
		</li>
	);
}
