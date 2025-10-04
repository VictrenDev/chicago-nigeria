"use client";
import { ArrowLeft, ArrowRight, Camera, Lock, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	countryCode: string;
	currentCity: string;
	neighborhood?: string;
	stateOfOrigin: string;
	profession: string;
	company: string;
	bio?: string;
	password: string;
	confirmPassword: string;
};

export default function Form() {
	const [step, setStep] = useState(1);

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues, trigger,
	} = useForm<FormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			countryCode: "+234",
			currentCity: "",
			neighborhood: "",
			stateOfOrigin: "",
			profession: "",
			company: "",
			bio: "",
			password: "",
			confirmPassword: "",
		},
	});

	if (step > 4) setStep(4);
	if (step < 1) setStep(1);

	const onSubmit = (data: FormValues) => {
		console.log("Form submitted:", data);
	};

	const next = async () => {
  let fieldsToValidate: (keyof FormValues)[] = [];

  if (step === 1) {
    fieldsToValidate = ["firstName", "lastName", "email", "phone"];
  } else if (step === 2) {
    fieldsToValidate = ["currentCity", "stateOfOrigin"];
  } else if (step === 3) {
    fieldsToValidate = ["profession", "company"];
  } else if (step === 4) {
    fieldsToValidate = ["password", "confirmPassword"];
  }

  const isStepValid = await trigger(fieldsToValidate);

  if (isStepValid) {
    setStep((current) => current + 1);
  } 
  // else -> errors will automatically show under inputs
};
	const prev = () => setStep((current) => current - 1);

	return (
		<section className="w-screen h-screen bg-white/10 flex items-center justify-center px-4">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white px-4 py-8 md:px-16 rounded-xl max-w-140 text-sm relative signup-form">
				<button
					type="button"
					onClick={prev}
					className="absolute top-6 left-10 cursor-pointer flex items-center gap-2 p-2">
					<ArrowLeft className="w-4 h-4" />
					<span>Back</span>
				</button>

				<Image
					src={"/chicago-nigeria-logo-1.png"}
					alt="logo"
					height={67}
					width={163}
					className="w-20 mx-auto"
				/>

				{/* PROGRESS STEPS */}
				<div className="flex justify-between items-center relative py-14">
					{/* Background line */}
					<div className="absolute top-[50%] left-0 w-full h-[2px] bg-gray-200"></div>

					{/* Filled line */}
					<div
						className="absolute top-[50%] left-0 h-[2px] bg-[var(--primary-color)] transition-all duration-500"
						style={{ width: `${((step - 1) / (4 - 1)) * 100}%` }}></div>

					{[1, 2, 3, 4].map((n) => {
						const isCompleted = step > n;
						const isCurrent = step === n;

						return (
							<div
								key={n}
								className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10
          ${
						isCompleted
							? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
							: isCurrent
							? "border-2 border-[var(--primary-color)] bg-white text-[var(--primary-color)] font-bold"
							: "border border-gray-300 bg-white text-gray-400"
					}`}>
								{n}
							</div>
						);
					})}
				</div>

				{/* STEP 1 */}
				{step === 1 && (
					<>
						<div className="flex flex-col items-center space-y-1">
							<User className="w-10 h-10 text-[var(--primary-color)]" />
							<h1 className="text-2xl font-medium">Personal Information</h1>
							<p className="text-gray-400 text-center">Lets start with the basics</p>
						</div>
						<fieldset className="space-y-4 mt-8">
							<div className="flex flex-wrap gap-2">
								<div>
									<label htmlFor="firstName">First Name</label>
									<input
										type="text"
										{...register("firstName", { required: "First name is required" })}
										className="rounded p-2" placeholder="Enter your first name"
									/>
									{errors.firstName && (
										<p className="text-red-500 text-xs">{errors.firstName.message}</p>
									)}
								</div>
								<div>
									<label htmlFor="lastName">Last Name</label>
									<input
										type="text"
										{...register("lastName", { required: "Last name is required" })}
										className="rounded p-2" placeholder="Enter your last name"
									/>
									{errors.lastName && (
										<p className="text-red-500 text-xs">{errors.lastName.message}</p>
									)}
								</div>
							</div>

							<div>
								<label htmlFor="email">Email Address</label>
								<input
									type="email"
									{...register("email", {
										required: "Email is required",
										pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
									})}
									className="rounded p-2 w-full" placeholder="Enter your email address"
								/>
								{errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
							</div>

							<div>
								<label htmlFor="phone">Phone Number</label>
								<div className="flex flex-wrap gap-2">
									<div className="max-w-18">
										<input
											type="text"
											{...register("countryCode")}
											className="rounded p-2 w-full"
										/>
									</div>
									<div className="flex-1">
										<input
											type="text"
											{...register("phone", { required: "Phone number is required" })}
											className="rounded p-2 w-full" placeholder="Enter your phone number"
										/>
									</div>
								</div>
								{errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
							</div>
						</fieldset>
						<CommonButton next={next} />
						<p className="text-center mx-auto text-sm">
							Not ready to sign up?{" "}
							<Link href={"/"} className="text-[var(--primary-color)]">
								Return to main page
							</Link>
						</p>
					</>
				)}

				{/* STEP 2 */}
				{step === 2 && (
					<>
						<div className="flex flex-col items-center space-y-1">
							<MapPin className="w-10 h-10 text-[var(--primary-color)]" />
							<h1 className="text-2xl font-medium">Location Details</h1>
							<p className="text-gray-400 text-center">
								Help us connect you with nearby community members
							</p>
						</div>
						<fieldset className="space-y-4 mt-8">
							<div>
								<label>Current City</label>
								<input
									type="text"
									{...register("currentCity", { required: "City is required" })}
									className="rounded p-2 w-full" placeholder="Enter your current city"
								/>
								{errors.currentCity && (
									<p className="text-red-500 text-xs">{errors.currentCity.message}</p>
								)}
							</div>
							<div>
								<label>Neighborhood (Optional)</label>
								<input type="text" {...register("neighborhood")} className="rounded p-2 w-full" placeholder="enter your neighborhood" />
							</div>
							<div>
								<label>Nigerian State of Origin</label>
								<input
									type="text"
									{...register("stateOfOrigin", { required: "State is required" })}
									className="rounded p-2 w-full" placeholder="Enter your state of origin"
								/>
								{errors.stateOfOrigin && (
									<p className="text-red-500 text-xs">{errors.stateOfOrigin.message}</p>
								)}
							</div>
						</fieldset>
						<CommonButton next={next} />
					</>
				)}

				{/* STEP 3 */}
				{step === 3 && (
					<>
						<div className="flex flex-col items-center space-y-1">
							<Camera className="w-10 h-10 text-[var(--primary-color)]" />
							<h1 className="text-2xl font-medium">Profile Details</h1>
							<p className="text-gray-400 text-center">
								Tell us about your professional background
							</p>
						</div>
						<fieldset className="space-y-4 mt-8">
							<div>
								<label>Professional Job Title</label>
								<input
									type="text"
									{...register("profession", { required: "Profession is required" })}
									className="rounded p-2 w-full" placeholder="e.g. Software Engineer"
								/>
							</div>
							<div>
								<label>Company/Organization</label>
								<input
									type="text"
									{...register("company", { required: "Company is required" })}
									className="rounded p-2 w-full" placeholder="Microsoft"
								/>
							</div>
							<div>
								<label>Bio (Optional)</label>
								<textarea
									{...register("bio")}
									className="min-h-20 w-full bg-gray-200 resize-none rounded-lg mt-1 p-2" placeholder="Tell us a bit about yourself, your interests, and what you’re looking for in the community..."
								/>
							</div>
							<div>
								<h3>Paassword Requirements</h3>
								<ul className="[&>*]:text-xs [&>*]:text-gray-400 ml-4">
									<li>At least 8 characters</li>
								</ul>
							</div>
						</fieldset>
						<CommonButton next={next} />
					</>
				)}

				{/* STEP 4 */}
				{step === 4 && (
					<>
						<div className="flex flex-col items-center space-y-1">
							<Lock className="w-10 h-10 text-[var(--primary-color)]" />
							<h1 className="text-2xl font-medium">Secure your account</h1>
							<p className="text-gray-400 text-center">
								Create a strong password to protect your profile
							</p>
						</div>
						<fieldset className="space-y-4 mt-8">
							<div>
								<label>Password</label>
								<input
									type="password"
									{...register("password", {
										required: "Password is required",
										minLength: { value: 6, message: "At least 6 characters" },
									})}
									className="rounded p-2 w-full" placeholder="Create a strong password"
								/>
								{errors.password && (
									<p className="text-red-500 text-xs">{errors.password.message}</p>
								)}
							</div>
							<div>
								<label>Confirm Password</label>
								<input
									type="password"
									{...register("confirmPassword", {
										validate: (value) =>
											value === getValues("password") || "Passwords do not match",
									})}
									className="rounded p-2 w-full" placeholder="Confirm your password"
								/>
								{errors.confirmPassword && (
									<p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
								)}
							</div>
														<div>
								<h3 className="text-base font-regular">Password Requirements</h3>
								<ul className="[&>*]:text-xs [&>*]:text-gray-400 list-disc list-inside ml-4">
									<li>At least 8 characters</li>
									<li>One uppercase character</li>
									<li>One number</li>
								</ul>
							</div>
						</fieldset>
						<button
							type="submit"
							className="bg-[var(--primary-color)] text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4">
							<span>Submit</span>
							<ArrowRight className="w-4 h-4" />
						</button>
					</>
				)}
			</form>
		</section>
	);
}

export function CommonButton({ next }: { next: () => void }) {
	return (
		<button
			type="button"
			onClick={next}
			className="bg-[var(--primary-color)] text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4">
			<span>Continue</span> <ArrowRight className="w-4 h-4" />
		</button>
	);
}
