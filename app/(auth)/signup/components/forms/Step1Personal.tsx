"use client"

import { CommonButton } from "../../page";

export default function PersonalInformation({}){
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
	return <div className={`${getStepAnimationClass()} w-full`}>
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
									<div>
										<label
											htmlFor="firstName"
											className="block text-sm font-medium mb-1"
										>
											First Name
										</label>
										<input
											type="text"
											{...register("firstName", {
												required:
													"First name is required",
											})}
											className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Enter your first name"
										/>
										{errors.firstName && (
											<p className="text-red-500 text-xs mt-1">
												{errors.firstName.message}
											</p>
										)}
									</div>
									<div>
										<label
											htmlFor="lastName"
											className="block text-sm font-medium mb-1"
										>
											Last Name
										</label>
										<input
											type="text"
											{...register("lastName", {
												required:
													"Last name is required",
											})}
											className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Enter your last name"
										/>
										{errors.lastName && (
											<p className="text-red-500 text-xs mt-1">
												{errors.lastName.message}
											</p>
										)}
									</div>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium mb-1"
									>
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
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
										placeholder="Enter your email address"
									/>
									{errors.email && (
										<p className="text-red-500 text-xs mt-1">
											{errors.email.message}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium mb-1"
									>
										Date of Birth
									</label>
									<input
										type="date"
										{...register("DOB")}
										className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200 text-gray-600"
									/>
									{errors.email && (
										<p className="text-red-500 text-xs mt-1">
											{errors.email.message}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="phone"
										className="block text-sm font-medium mb-1"
									>
										Phone Number
									</label>

									<div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:blue-700  focus-within:ring-2 focus-within:ring-blue-700 transition-all duration-200 bg-gray-200">
										{/* Country Code */}
										<select
											{...register("countryCode")}
											defaultValue="+1"
											className="bg-gray-200 px-3 py-3 text-sm text-gray-700 focus:outline-none max-w-16"
										>
											<option value="+1">+1</option>
											<option value="+44">+44</option>
											<option value="+234">+234</option>
											<option value="+91">+91</option>
										</select>

										{/* Phone Number */}
										<input
											type="text"
											{...register("phone", {
												required:
													"Phone number is required",
											})}
											className="flex-1 px-3 py-3 text-sm sm:text-base focus:outline-none bg-white"
											placeholder="Enter your phone number"
										/>
									</div>

									{errors.phone && (
										<p className="text-red-500 text-xs mt-1">
											{errors.phone.message}
										</p>
									)}
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
