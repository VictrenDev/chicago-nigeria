"use client";
import useSWRMutation from "swr/mutation";
import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	Briefcase,
	Camera,
	Check,
	Globe2,
	Heart,
	Landmark,
	Lock,
	MapPin,
	Music,
	PartyPopper,
	Store,
	User,
	Users,
	UsersRound,
	Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import { CheckIcon, UserTick } from "@/app/components/icons";

type FormValues = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	countryCode: string;
	currentCity: string;
	neighborhood?: string;
	stateOfOrigin: string;
	profession: string;
	business?: string;
	brandName?: string;
	company: string;
	bio?: string;
	password: string;
	confirmPassword: string;
};
const interestsList = [
	{ id: 1, label: "Professional Networking", icon: <Briefcase size={18} /> },
	{ id: 2, label: "Business & Entrepreneurship", icon: <Users size={18} /> },
	{ id: 3, label: "Nigerian culture & Heritage", icon: <Landmark size={18} /> },
	{ id: 4, label: "Education & Learning", icon: <BookOpen size={18} /> },
	{ id: 5, label: "Social Events & Parties", icon: <PartyPopper size={18} /> },
	{ id: 6, label: "Music & Entertainment", icon: <Music size={18} /> },
	{ id: 7, label: "Travel & Tourism", icon: <Globe2 size={18} /> },
	{ id: 8, label: "Food and Dining", icon: <Utensils size={18} /> },
];
async function postUser(url: string, { arg }: { arg: FormValues }) {
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(arg),
	});

	if (!res.ok) throw new Error("Failed to save user");

	return res.json();
}

export default function Form() {
	const [step, setStep] = useState(6);
	const [direction, setDirection] = useState<"left" | "right">("right");
	const [registrationType, setRegistrationType] = useState<"regular" | "vendor">("regular");
	const [isAnimating, setIsAnimating] = useState(false);
	const { trigger: triggerSubmitForm } = useSWRMutation(
		"https://68e5269b8e116898997e96bc.mockapi.io/users/v1/Users",
		postUser
	);
	const [selected, setSelected] = useState<number[]>([]);
	const toggleSelect = (id: number) => {
		setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		trigger,
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
			business: "",
			brandName: "",
			bio: "",
			password: "",
			confirmPassword: "",
		},
	});

	if (step > 7) setStep(7);
	if (step < 1) setStep(1);

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

	const next = async () => {
		if (isAnimating) return;

		let fieldsToValidate: (keyof FormValues)[] = [];

		if (step === 1) {
			fieldsToValidate = ["firstName", "lastName", "email", "phone"];
		} else if (step === 2) {
			fieldsToValidate = ["currentCity", "stateOfOrigin"];
		} else if (step === 3) {
			fieldsToValidate = ["profession", "company"];
		} else if (step === 4 && registrationType === "vendor") {
			fieldsToValidate = ["business", "brandName"];
		} else if (step === 5) {
			fieldsToValidate = ["password", "confirmPassword"];
		}

		const isStepValid = await trigger(fieldsToValidate);

		if (isStepValid) {
			setIsAnimating(true);
			setDirection("right");
			setTimeout(() => {
				setStep((current) => current + 1);
				setIsAnimating(false);
			}, 300);
		}
	};

	const prev = () => {
		if (isAnimating) return;

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
			return isAnimating ? "animate-slide-out-left" : "animate-slide-in-right";
		} else {
			return isAnimating ? "animate-slide-out-right" : "animate-slide-in-left";
		}
	};

	return (
		<section className="w-screen h-screen bg-white/10 flex items-center justify-center px-4 pt-12">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white px-4 py-8 md:px-8 rounded-xl md:w-120 text-sm relative signup-form overflow-hidden">
				<button
					type="button"
					onClick={prev}
					className="absolute top-6 left-2 cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
						style={{ width: `${((step - 1) / (7 - 1)) * 100}%` }}></div>

					{[1, 2, 3, 4, 5, 6, 7].map((n) => {
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
					}`}>
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
								<h1 className="text-2xl font-medium">Personal Information</h1>
								<p className="text-gray-400 text-center">Lets start with the basics</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div className="flex flex-col sm:flex-row sm:gap-2 gap-4">
									<div>
										<label htmlFor="firstName" className="block text-sm font-medium mb-1">
											First Name
										</label>
										<input
											type="text"
											{...register("firstName", { required: "First name is required" })}
											className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Enter your first name"
										/>
										{errors.firstName && (
											<p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
										)}
									</div>
									<div>
										<label htmlFor="lastName" className="block text-sm font-medium mb-1">
											Last Name
										</label>
										<input
											type="text"
											{...register("lastName", { required: "Last name is required" })}
											className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Enter your last name"
										/>
										{errors.lastName && (
											<p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
										)}
									</div>
								</div>

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

								<div>
									<label htmlFor="phone" className="block text-sm font-medium mb-1">
										Phone Number
									</label>
									<div className="flex flex-col sm:flex-row gap-2">
										<div className="sm:max-w-24">
											<input
												type="text"
												{...register("countryCode")}
												className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												placeholder="+234"
											/>
										</div>
										<div className="flex-1">
											<input
												type="text"
												{...register("phone", { required: "Phone number is required" })}
												className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												placeholder="Enter your phone number"
											/>
										</div>
									</div>
									{errors.phone && (
										<p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
									)}
								</div>
							</fieldset>
							<CommonButton next={next} isAnimating={isAnimating} />
							<p className="text-center mx-auto text-sm mt-4">
								Not ready to sign up?{" "}
								<Link
									href={"/"}
									className="text-[var(--primary-color)] hover:underline transition-colors">
									Return to main page
								</Link>
							</p>
						</div>
					)}

					{/* STEP 2 */}
					{step === 2 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<MapPin className="w-10 h-10 text-[var(--primary-color)]" />
								<h1 className="text-2xl font-medium">Location Details</h1>
								<p className="text-gray-400 text-center">
									Help us connect you with nearby community members
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div>
									<label className="block text-sm font-medium mb-1">Current City</label>
									<input
										type="text"
										{...register("currentCity", { required: "City is required" })}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your current city"
									/>
									{errors.currentCity && (
										<p className="text-red-500 text-xs mt-1">{errors.currentCity.message}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Neighborhood (Optional)</label>
									<input
										type="text"
										{...register("neighborhood")}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your neighborhood"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Nigerian State of Origin</label>
									<input
										type="text"
										{...register("stateOfOrigin", { required: "State is required" })}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your state of origin"
									/>
									{errors.stateOfOrigin && (
										<p className="text-red-500 text-xs mt-1">{errors.stateOfOrigin.message}</p>
									)}
								</div>
							</fieldset>
							<CommonButton next={next} isAnimating={isAnimating} />
						</div>
					)}

					{/* STEP 3 */}
					{step === 3 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<Camera className="w-10 h-10 text-[var(--primary-color)]" />
								<h1 className="text-2xl font-medium">Profile Details</h1>
								<p className="text-gray-400 text-center">
									Tell us about your professional background
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div>
									<label className="block text-sm font-medium mb-1">Professional Job Title</label>
									<input
										type="text"
										{...register("profession", { required: "Profession is required" })}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="e.g. Software Engineer"
									/>
									{errors.profession && (
										<p className="text-red-500 text-xs mt-1">{errors.profession.message}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Company/Organization</label>
									<input
										type="text"
										{...register("company", { required: "Company is required" })}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Microsoft"
									/>
									{errors.company && (
										<p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Bio (Optional)</label>
									<textarea
										{...register("bio")}
										className="min-h-24 w-full rounded-lg border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200 resize-none mt-1 p-3"
										placeholder="Tell us a bit about yourself, your interests, and what you're looking for in the community..."
									/>
								</div>
							</fieldset>
							<CommonButton next={next} isAnimating={isAnimating} />
						</div>
					)}

					{/* STEP 4 */}
					{step === 4 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<UserTick />
								<h1 className="text-2xl font-medium">Registration Type</h1>
								<p className="text-gray-400 text-center">
									How do you wan&apos;t to use chicago nigeria?
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div
									onClick={() => setRegistrationType("regular")}
									className="flex gap-6 border border-[var(--primary-color)] py-4 px-8 rounded-lg relative">
									<div
										className={`${
											registrationType === "regular" ? "bg-[var(--primary-color)]" : "bg-gray-300"
										} flex items-center justify-center w-10 h-10 shrink-0 rounded-md`}>
										<UsersRound
											size={20}
											className={`${
												registrationType === "regular" ? "stroke-white" : "stroke-gray-00"
											}`}
										/>
									</div>
									{registrationType === "regular" && (
										<CheckIcon className="absolute right-4 top-2" />
									)}

									<div>
										<h2 className="font-semibold">Regular Member</h2>
										<p className="text-gray-500">Connect with people and explore opportunities</p>
									</div>
								</div>
								<div
									onClick={() => setRegistrationType("vendor")}
									className="flex gap-6 border border-[var(--primary-color)] py-4 px-8 rounded-lg relative">
									<div
										className={`${
											registrationType === "vendor" ? "bg-[var(--primary-color)]" : "bg-gray-300"
										} flex items-center justify-center w-10 h-10 shrink-0 rounded-md`}>
										<Store
											size={20}
											className={`${
												registrationType === "vendor" ? "stroke-white" : "stroke-gray-00"
											}`}
										/>
									</div>
									{registrationType === "vendor" && (
										<CheckIcon className="absolute right-4 top-2" />
									)}
									<div>
										<h2 className="font-semibold">Vendor/Business Owners</h2>
										<p className="text-gray-500">Sell products or services in the marketplace</p>
									</div>
								</div>
								{registrationType === "vendor" && (
									<fieldset className="space-y-4 mt-8">
										<div>
											<label className="block text-sm font-medium mb-1">Business/Brand Name</label>
											<input
												type="text"
												{...register("business", { required: "Business is required" })}
												className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												placeholder="e.g. Software Engineer"
											/>
											{errors.business && (
												<p className="text-red-500 text-xs mt-1">{errors.business.message}</p>
											)}
										</div>
										<div>
											<label className="block text-sm font-medium mb-1">Business Category</label>
											<input
												type="text"
												{...register("brandName", { required: "Brand name is required" })}
												className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												placeholder="Microsoft"
											/>
											{errors.brandName && (
												<p className="text-red-500 text-xs mt-1">{errors.brandName.message}</p>
											)}
										</div>
									</fieldset>
								)}

								{/* <div>
									<label className="block text-sm font-medium mb-1">Password</label>
									<input
										type="password"
										{...register("password", {
											required: "Password is required",
											minLength: { value: 6, message: "At least 6 characters" },
										})}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Create a strong password"
									/>
									{errors.password && (
										<p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Confirm Password</label>
									<input
										type="password"
										{...register("confirmPassword", {
											validate: (value) =>
												value === getValues("password") || "Passwords do not match",
										})}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Confirm your password"
									/>
									{errors.confirmPassword && (
										<p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
									)}
								</div>
								<div className="bg-gray-50 rounded-lg p-4 mt-4">
									<h3 className="text-base font-medium mb-2">Password Requirements</h3>
									<ul className="text-sm text-gray-600 space-y-1">
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
											At least 8 characters
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
											One uppercase character
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
											One number
										</li>
									</ul>
								</div> */}
							</fieldset>
							<CommonButton next={next} isAnimating={isAnimating} />
						</div>
					)}

					{/* STEP 5 */}
					{step === 5 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<Lock className="w-10 h-10 text-[var(--primary-color)]" />
								<h1 className="text-2xl font-medium">Secure your account</h1>
								<p className="text-gray-400 text-center">
									Create a strong password to protect your profile
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div>
									<label className="block text-sm font-medium mb-1">Password</label>
									<input
										type="password"
										{...register("password", {
											required: "Password is required",
											minLength: { value: 6, message: "At least 6 characters" },
										})}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Create a strong password"
									/>
									{errors.password && (
										<p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Confirm Password</label>
									<input
										type="password"
										{...register("confirmPassword", {
											validate: (value) =>
												value === getValues("password") || "Passwords do not match",
										})}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Confirm your password"
									/>
									{errors.confirmPassword && (
										<p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
									)}
								</div>
								<div className="bg-gray-50 rounded-lg p-4 mt-4">
									<h3 className="text-base font-medium mb-2">Password Requirements</h3>
									<ul className="text-sm text-gray-600 space-y-1">
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
											At least 8 characters
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
											One uppercase character
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
											One number
										</li>
									</ul>
								</div>
							</fieldset>
							<button
								type="submit"
								disabled={isAnimating}
								className="bg-[var(--primary-color)] text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 transition-all duration-200">
								<span>Submit</span>
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>
					)}

					{/* STEP 6 */}
					{step === 6 && (
						<div className={`${getStepAnimationClass()} w-full`}>
							<div className="flex flex-col items-center space-y-1">
								<CheckIcon className="w-10 h-10 text-[var(--primary-color)]" />
								<h1 className="text-2xl font-medium">Verify your email</h1>
								<p className="text-gray-400 text-center">
									we&apos;ve sent a verification email to email@mail.com
								</p>
							</div>
							<fieldset className="space-y-4 mt-8">
								<div>
									<label className="block text-sm font-semibold mb-1">Verification Code</label>
									<input
										type="text"
										className="w-full text-center rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter 6 digit code"
									/>
								</div>
								<button type="button" className="text-gray-500 text-sm mt-1 text-center w-full">
									Didn&apos;t receive the code?
								</button>
								<button
									type="button"
									className="text-[var(--primary-color)] font-semibold text-sm text-center w-full">
									Resend Code
								</button>
							</fieldset>
							<CommonButton next={next} isAnimating={isAnimating} />
						</div>
					)}

					{step === 7 && (
						<div className="bg-white py-8 w-full text-center">
							{/* Header */}
							<div className="flex justify-center mb-3">
								<div className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center">
									<Heart className="stroke-[var(--primary-color)]" />
								</div>
							</div>

							<h1 className="text-lg font-semibold mb-1">What Interests you?</h1>
							<p className="text-gray-500 text-sm mb-8">
								Select interests to personalize your experience
							</p>

							{/* Interests grid */}
							<div className="grid md:grid-cols-2 gap-3 text-left">
								{interestsList.map((interest) => {
									const isActive = selected.includes(interest.id);
									return (
										<button
											key={interest.id}
											type="button"
											onClick={() => toggleSelect(interest.id)}
											className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition-all ${
												isActive
													? "border-green-600 bg-green-50 ring-1 ring-green-500"
													: "border-gray-200 hover:bg-gray-50"
											}`}>
											<div className="text-green-600">{interest.icon}</div>
											<span className="flex-1 text-left text-gray-700">{interest.label}</span>
											{isActive && <Check size={16} className="text-green-600 shrink-0" />}
										</button>
									);
								})}
							</div>

							{/* Footer text */}
							<p className="text-gray-500 text-xs mt-6">
								Selected {selected.length} interest{selected.length !== 1 && "s"}. You can change
								these later.
							</p>
							<button
								type="button"
								onClick={next}
								disabled={isAnimating}
								className="bg-[var(--primary-color)] text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 transition-all duration-200">
								<span>Complete Registration</span>
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>
					)}
				</div>
			</form>
		</section>
	);
}

export function CommonButton({ next, isAnimating }: { next: () => void; isAnimating: boolean }) {
	return (
		<button
			type="button"
			onClick={next}
			disabled={isAnimating}
			className="bg-[var(--primary-color)] text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 transition-all duration-200">
			<span>Continue</span>
			<ArrowRight className="w-4 h-4" />
		</button>
	);
}
