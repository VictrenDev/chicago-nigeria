"use client";
import useSWRMutation from "swr/mutation";
import {
	AlertTriangle,
	ArrowLeft,
	ArrowRight,
	BriefcaseConveyorBelt,
	ChartNoAxesColumnIncreasing,
	CheckCircle,
	MapPin,
	TagIcon,
	UsersRound,
} from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomPhotoInput } from "./upload";
import Link from "next/link";
type Product = {
	title: string;
	category: string;
	price: string;
	priceType: string;
	condition: string;
	description: string;
	photo: string;
	video: string;
	tags: string;
};
async function postUser(url: string, { arg }: { arg: Product }) {
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(arg),
	});

	if (!res.ok) throw new Error("Failed to save user");

	return res.json();
}
export default function Form() {
	const [step, setStep] = useState(1);
	const [direction, setDirection] = useState<"left" | "right">("right");
	const [isAnimating, setIsAnimating] = useState(false);
	const { trigger: triggerSubmitForm } = useSWRMutation(
		"https://68e5269b8e116898997e96bc.mockapi.io/users/v1/Users",
		postUser
	);

	const methods = useForm<Product>({
		defaultValues: {
			title: "",
			category: "",
			price: "",
			priceType: "",
			condition: "",
			description: "",
			photo: "",
			video: "",
			tags: "",
		},
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
	} = methods;
	if (step > 3) setStep(3);
	if (step < 1) setStep(1);

	const onSubmit = async (data: Product) => {
		try {
			// hash password before sending

			const newUser = await triggerSubmitForm({
				...data,
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

		let fieldsToValidate: (keyof Product)[] = [];

		if (step === 1) {
			fieldsToValidate = ["title", "price", "priceType", "category", "condition"];
		} else if (step === 2) {
			fieldsToValidate = ["description", "photo", "video", "tags"];
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
		<section className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12">
			<section className=" bg-white/10 space-y-4 px-2">
				{/* PROGRESS STEPS */}
				<div className="bg-white px-3 md:px-12 py-6 md:py-14">
					<div
						className="
      flex justify-between items-center gap-2 relative 
      overflow-x-auto no-scrollbar scroll-smooth
    ">
						{[
							{ id: 1, title: "Basic Info", description: "Title, category, and price" },
							{ id: 2, title: "Product Media", description: "Upload photos and videos" },
							{ id: 3, title: "Review & Submit", description: "Final review before submitting" },
						].map(({ id, title, description }) => {
							const isCompleted = step > id;
							const isCurrent = step === id;

							return (
								<div
									key={id}
									className={`
            flex-shrink-0 flex flex-col justify-center items-center 
            p-3 md:p-4 text-center rounded-lg transition-all duration-300
            w-[110px] sm:w-[130px] md:w-auto
            ${
							isCompleted
								? "border border-[var(--primary-color)] bg-white text-[var(--primary-color)]"
								: isCurrent
								? "border-2 border-[var(--primary-color)] bg-white shadow-md text-[var(--primary-color)]"
								: "border border-gray-300 bg-white text-gray-400"
						}
          `}>
									{/* Step number */}
									<p
										className="
              w-6 h-6 md:w-8 md:h-8 bg-[var(--primary-color)] 
              text-white rounded-full flex items-center justify-center mb-2 
              font-semibold text-sm md:text-base
            ">
										{id}
									</p>

									{/* Step title */}
									<p className="font-semibold text-xs md:text-sm text-gray-700 whitespace-nowrap">
										{title}
									</p>

									{/* Step description */}
									<p className="hidden md:block text-gray-500 text-xs max-w-28">{description}</p>
								</div>
							);
						})}
					</div>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className=" md:px-8 bg-white rounded-xl w-full text-sm relative signup-form overflow-hidden">
					{/* STEP CONTENT CONTAINER */}
					<div className="relative min-h-[400px] overflow-hidden px-2 ">
						{/* STEP 1 */}
						{step === 1 && (
							<div className={`${getStepAnimationClass()} w-full `}>
								<fieldset className="space-y-4 mt-8 mb-4 ">
									<div>
										<label
											htmlFor="email"
											className="block text-sm md:text-base font-semibold mb-1">
											Listing Title
										</label>
										<p className="text-gray-400 text-xs my-1">
											Write a clear, descriptive title that highlights the key features
										</p>
										<input
											type="title"
											{...register("title", {
												required: "title is invalid",
											})}
											className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="e.g. Authentic Nigerian Ankara Dresses - Made to order"
										/>
										{errors.title && (
											<p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
										)}
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-sm md:text-base font-semibold mb-1">
											Category
										</label>
										<p className="text-gray-400 text-xs my-1">
											Choose the category that best describes your item or service
										</p>

										<input
											type="text"
											{...register("category", {
												required: "Select a category",
											})}
											className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Choose a category"
										/>
										{errors.category && (
											<p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
										)}
									</div>
									<div className="flex flex-col sm:flex-row sm:gap-8 gap-4">
										<div className="shrink-0">
											<label
												htmlFor="firstName"
												className="block text-sm md:text-base font-semibold mb-1">
												Price
											</label>
											<input
												type="text"
												{...register("price", { required: "price is required" })}
												className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												placeholder="$0.00"
											/>
											{errors.price && (
												<p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
											)}
										</div>
										<div className="shrink-0 ">
											<label
												htmlFor="lastName"
												className="block text-sm md:text-base font-semibold mb-1">
												Price Type
											</label>
											<input
												type="text"
												{...register("priceType")}
												className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												placeholder="Fixed Price"
											/>
											{errors.priceType && (
												<p className="text-red-500 text-xs mt-1">{errors.priceType.message}</p>
											)}
										</div>
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm md:text-base font-semibold mb-1">
											Category
										</label>
										<p className="text-gray-400 text-xs my-1">What condition is your product in?</p>
										<input
											type="text"
											{...register("condition")}
											className="w-full rounded-lg p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Select Condition"
										/>
										{errors.condition && (
											<p className="text-red-500 text-xs mt-1">{errors.condition.message}</p>
										)}
									</div>
								</fieldset>
							</div>
						)}

						{/* STEP 2 */}
						{step === 2 && (
							<div className={`${getStepAnimationClass()} w-full`}>
								<div className="flex flex-col items-center space-y-1"></div>
								<fieldset className="space-y-4 mt-8 bg-white">
									<div>
										<label
											htmlFor="email"
											className="block text-sm md:text-base font-semibold mb-1">
											Description
										</label>
										<p className="text-gray-400 text-xs my-1">
											Write a clear, descriptive title that highlights the key features
										</p>
										<textarea
											{...register("description", { required: "description is required" })}
											className="w-full rounded-lg resize-none min-h-30 bg-gray-200 p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Write a description for your product"
										/>
										{errors.description && (
											<p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
										)}
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-sm md:text-base font-semibold mb-1">
											Photos
										</label>
										<p className="text-gray-400 text-xs my-1">
											Add up to 8 photos. First photo will be your main listing image.
										</p>
										<FormProvider {...methods}>
											<CustomPhotoInput name="photo" />
											{errors.photo && (
												<p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>
											)}
										</FormProvider>
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-sm md:text-base font-semibold mb-1">
											Video (Premium Feature)
										</label>
										<p className="text-gray-400 text-xs my-1">
											Add a video to showcase your item better (available for paid members)
										</p>

										<FormProvider {...methods}>
											<CustomPhotoInput name="video" />
											{errors.video && (
												<p className="text-red-500 text-xs mt-1">{errors.video.message}</p>
											)}
										</FormProvider>
									</div>
									{/* Selected Tags */}
									<div className="flex flex-wrap gap-2 mb-6">
										<Tag label="Handmade" active />
										<Tag label="Nigerian" active />
									</div>

									{/* Suggested Tags */}
									<h3 className="font-medium text-gray-700 mb-3">Suggested tags:</h3>
									<div className="flex flex-wrap gap-2">
										{[
											"Handmade",
											"Nigerian",
											"Custom",
											"Authentic",
											"Premium",
											"Traditional",
											"Modern",
											"Vintage",
											"Organic",
											"Imported",
											"Local",
											"Eco-Friendly",
										].map((tag) => (
											<Tag key={tag} label={tag} />
										))}
									</div>
								</fieldset>
							</div>
						)}

						{/* STEP 3 */}
						{step === 3 && (
							<div className="space-y-4">
								{/* Review & Submit Section */}
								<section className="rounded-lg py-6">
									<h2 className="font-semibold text-gray-800 mb-3">Review & Submit</h2>
									<div className="flex items-start gap-3 border border-green-400 bg-green-50 rounded-md p-4">
										<CheckCircle className="text-green-500 mt-0.5" size={20} />
										<div>
											<h3 className="text-green-600 font-medium">Almost Done!</h3>
											<p className="text-gray-600 text-sm">
												Review your listing details below and submit for approval
											</p>
										</div>
									</div>
								</section>
								<div className="mx-auto bg-white rounded-2xl">
									{/* Title & Price */}
									<div className="flex justify-between items-start mb-4">
										<Link
											href="#"
											className="text-[var(--primary-color)] font-semibold hover:underline">
											Ankara Dress
										</Link>
										<p className="text-xl font-bold text-green-600">$30.00</p>
									</div>

									{/* Category, Condition, Location, Contact */}
									<div className="space-y-1 text-sm">
										<p>
											<span className="font-medium text-gray-600">Category:</span>{" "}
											<span className="text-gray-800">Housing</span>
										</p>
										<p>
											<span className="font-medium text-gray-600">Condition:</span>{" "}
											<span className="text-gray-800">New</span>
										</p>
										<p>
											<span className="font-medium text-gray-600">Location:</span>{" "}
											<span className="text-gray-800">North-Side</span>
										</p>
										<p>
											<span className="font-medium text-gray-600">Contact:</span>{" "}
											<span className="text-gray-800">3 method(s)</span>
										</p>
									</div>

									<hr className="my-4" />

									{/* Description */}
									<div className="mb-4">
										<h3 className="font-semibold text-gray-700 mb-1">Description</h3>
										<p className="text-gray-600 text-sm leading-relaxed">
											Beautiful, Authentic Nigerian Ankara Dresses made with high-quality fabric
											imported directly from Lagos. Each dress is custom-made to your measurements
											and preferences.
										</p>
									</div>

									{/* Tags */}
									<div className="mb-6">
										<h3 className="font-semibold text-gray-700 mb-2">Tags</h3>
										<div className="flex flex-wrap gap-2">
											<span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
												Handmade
											</span>
											<span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
												Nigerian
											</span>
										</div>
									</div>

									{/* Review Process Notice */}
									<div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm p-4 rounded-lg mb-6">
										<AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-600" />
										<div>
											<p className="font-semibold">Review Process</p>
											<p>
												Your listing will be reviewed by our team within 24 hours. You’ll receive an
												email notification once it’s approved and live.
											</p>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					<CommonButton step={step} next={next} prev={prev} isAnimating={isAnimating} />
				</form>
			</section>
			<section className="space-y-8 sticky top-0 h-screen pt-4 hidden md:block">
				<div className=" bg-white p-4 rounded-lg space-y-4">
					<h2 className="flex items-center gap-1">
						<span>Community stats</span>{" "}
						<ChartNoAxesColumnIncreasing className="w-6 h-6 text-[var(--primary-color)]" />
					</h2>
					<div className="space-y-3 community-stats-items">
						<div>
							<p>Active Members</p>
							<p>2,847</p>
						</div>
						<div>
							<p>Posts today</p>
							<p>127</p>
						</div>
						<div>
							<p>Events This Week</p>
							<p>8</p>
						</div>
					</div>
				</div>
				<div className=" bg-white p-4 rounded-lg space-y-4">
					<h2>Popular Categories</h2>
					<div className="space-y-3 community-stats-items">
						<div>
							<p>Fashion</p>
							<p>28</p>
						</div>
						<div>
							<p>Services</p>
							<p>34</p>
						</div>
						<div>
							<p>Food </p>
							<p>23</p>
						</div>
						<div>
							<p>Housing </p>
							<p>8</p>
						</div>
					</div>
					<hr className="border border-gray-200 my-4" />

					<div className="space-y-3 ">
						<h2>Quick Links</h2>
						<div className="ml-4 space-y-3 community-stats-items quick-actions">
							<div>
								<MapPin className="w-4 h-4" />
								<p>Find Local Events</p>
							</div>
							<div>
								<UsersRound className="w-4 h-4" />
								<p>Join Groups</p>
							</div>
							<div>
								<BriefcaseConveyorBelt className="w-4 h-4" />
								<p>Browse Jobs</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
}

export function CommonButton({
	next,
	prev,
	isAnimating,
	step,
}: {
	next: () => void;
	prev: () => void;
	step: number;
	isAnimating: boolean;
}) {
	return (
		<div className="flex justify-end gap-2 mt-8 mb-4 text-xs md:text-sm">
			<button
				type="button"
				onClick={prev}
				disabled={isAnimating}
				className="w-fit mr-auto py-3 px-4 border hover:text-white rounded-lg flex justify-center items-center gap-2 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 transition-all duration-200">
				<ArrowLeft className="w-4 h-4" />
				<span>Previous</span>
			</button>

			<button
				type="button"
				className="w-fit py-3 px-4 border hover:text-white rounded-lg flex justify-center items-center gap-2 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 transition-all duration-200">
				Save as Draft
			</button>
			<button
				type={step === 3 ? "submit" : "button"}
				onClick={next}
				disabled={isAnimating}
				className="w-fit py-3 px-4 text-white rounded-lg flex justify-center items-center gap-2 bg-[var(--primary-color)]/90 disabled:opacity-50 transition-all duration-200">
				<span>{step === 3 ? "Submit Review" : "Next"}</span>
				<ArrowRight className="w-4 h-4" />
			</button>
		</div>
	);
}

type TagProps = {
	label: string;
	active?: boolean;
};

function Tag({ label, active }: TagProps) {
	return (
		<button
			className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border transition ${
				active
					? "bg-green-100 text-green-700 border-green-400"
					: "text-gray-600 border-gray-300 hover:bg-gray-100"
			}`}>
			<TagIcon className="w-4 h-4" />
			{label}
		</button>
	);
}
