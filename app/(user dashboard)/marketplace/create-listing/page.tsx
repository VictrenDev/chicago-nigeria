"use client";
import { useState, useCallback, useEffect } from "react";
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
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomPhotoInput } from "./upload";
import Link from "next/link";
import CustomSelectButton from "../../components/customSelect";
import { callApi } from "@/app/libs/helper/callApi";

// Enhanced types
type PriceType = "fixed" | "negotiable";
type Condition = "Used - Good" | "Used - Like New" | "New" | "Used - Fair";

type Product = {
	title: string;
	category: string;
	price: string;
	priceType: PriceType;
	condition: Condition;
	description: string;
	currency?: "NGN" | "USD";
	location: string;
	photo?: FileList;
	video?: FileList;
	tags: string[];
};

// Validation schema
const validationSchema = {
	title: {
		required: "Title is required",
		minLength: { value: 5, message: "Title must be at least 5 characters" },
	},
	price: {
		required: "Price is required",
		pattern: {
			value: /^\d+(\.\d{1,2})?$/,
			message: "Please enter a valid price",
		},
	},
	category: { required: "Category is required" },
	condition: { required: "Condition is required" },
	description: {
		required: "Description is required",
		minLength: {
			value: 10,
			message: "Description must be at least 10 characters",
		},
	},
	photo: {
		required: "At least one photo is required",
		validate: {
			maxFiles: (files: FileList) =>
				!files || files.length <= 8 || "Maximum 8 files allowed",
			fileSize: (files: FileList) => {
				if (!files) return true;
				for (let i = 0; i < files.length; i++) {
					if (files[i].size > 10 * 1024 * 1024) {
						return "File size should be less than 10MB";
					}
				}
				return true;
			},
		},
	},
};

export default function Form() {
	const [step, setStep] = useState<number>(1);
	const [direction, setDirection] = useState<"left" | "right">("right");
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [selectedTags, setSelectedTags] = useState<string[]>(["desk", "wood", "furniture"]);

	const methods = useForm<Product>({
		defaultValues: {
			title: "Vintage Wooden Desk",
			category: "Furniture",
			price: "120",
			priceType: "fixed",
			condition: "New",
			currency: "USD",
			description:
				"Sturdy wooden desk with minor scratches. Perfect for home offices or study rooms.",
			tags: ["desk", "wood", "furniture"],
			location: "Chicago",
		},
		mode: "onChange",
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		watch,
		setValue,
	} = methods;

	// Sync selectedTags with form state
	useEffect(() => {
		setValue("tags", selectedTags);
	}, [selectedTags, setValue]);

	// Prevent step from going out of bounds
	if (step > 3) setStep(3);
	if (step < 1) setStep(1);

	const listingTitle = watch("title");
	const listingCategory = watch("category");
	const listingPrice = watch("price");
	const listingDescription = watch("description");
	const listingLocation = watch("location");
	const listingCondition = watch("condition");
	const listingPhoto = watch("photo");

	// Tag handlers
	const handleTagClick = (tag: string) => {
		setSelectedTags(prev => {
			if (prev.includes(tag)) {
				// Remove tag if already selected
				return prev.filter(t => t !== tag);
			} else {
				// Add tag if not selected (limit to 8 tags)
				return prev.length < 8 ? [...prev, tag] : prev;
			}
		});
	};

	const removeTag = (tagToRemove: string) => {
		setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
	};

	const onSubmit = async (data: Product) => {
		setIsSubmitting(true);
		try {
			// Create FormData object
			const formData = new FormData();

			// Append all form fields
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("category", data.category);
			formData.append("price", data.price);
			formData.append("location", data.location);
			// Append tags as JSON array
			formData.append("tags", JSON.stringify(data.tags));
			
			// Append photo files
			if (data.photo && data.photo.length > 0) {
				for (let i = 0; i < data.photo.length; i++) {
					formData.append("photos", data.photo[i]);
				}
			}

			// Append video files if any
			if (data.video && data.video.length > 0) {
				for (let i = 0; i < data.video.length; i++) {
					formData.append("videos", data.video[i]);
				}
			}

			const { data: response, error } = await callApi(
				"/listing",
				"POST",
				formData,
			);

			if (error) {
				throw new Error(error.message || "Failed to create listing");
			}

			console.log("Posted:", response);
			toast.success("Listing created successfully");
			// Optional: Reset form after successful submission
			// methods.reset();
			// setStep(1);
		} catch (err) {
			console.error(err);
			const errorMessage =
				err instanceof Error ? err.message : "Something went wrong";
			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleStepTransition = useCallback(
		(dir: "left" | "right") => {
			if (isAnimating) return;

			setIsAnimating(true);
			setDirection(dir);
			setTimeout(() => {
				if (dir === "right") {
					setStep((current) => Math.min(current + 1, 3));
				} else {
					setStep((current) => Math.max(current - 1, 1));
				}
				setIsAnimating(false);
			}, 300);
		},
		[isAnimating],
	);

	const next = useCallback(async () => {
		if (isAnimating) return;

		let fieldsToValidate: (keyof Product)[] = [];
		let isValid = false;

		if (step === 1) {
			fieldsToValidate = [
				"title",
				"price",
				"priceType",
				"category",
				"condition",
			];
			isValid = await trigger(fieldsToValidate);
		} else if (step === 2) {
			fieldsToValidate = ["description", "photo"];
			isValid = await trigger(fieldsToValidate);
			// Additional check for photo
			if (isValid && (!watch("photo") || watch("photo")?.length === 0)) {
				toast.error("Please add at least one photo");
				return;
			}
		}

		if (isValid) {
			handleStepTransition("right");
		}
	}, [isAnimating, step, trigger, watch, handleStepTransition]);

	const prev = useCallback(() => {
		handleStepTransition("left");
	}, [handleStepTransition]);

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

	// Predefined categories
	const CATEGORIES = [
		"Fashion & Clothing",
		"Electronics",
		"Home & Garden",
		"Furniture",
		"Vehicles",
		"Property",
		"Jobs & Services",
		"Food & Agriculture",
	];

	return (
		<section className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12">
			<section className=" bg-white/10 space-y-4 px-2">
				{/* PROGRESS STEPS */}
				<div className="bg-white px-3 md:px-12 py-6 md:py-14">
					<div
						className="
      flex justify-between items-center gap-2 relative
      overflow-x-auto no-scrollbar scroll-smooth
    "
					>
						{[
							{
								id: 1,
								title: "Basic Info",
								description: "Title, category, and price",
							},
							{
								id: 2,
								title: "Product Media",
								description: "Upload photos and videos",
							},
							{
								id: 3,
								title: "Review & Submit",
								description: "Final review before submitting",
							},
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
					? "border border-[var(--primary-color)] bg-[var(--primary-color)]/5 text-[var(--primary-color)]"
					: isCurrent
						? "border-2 border-[var(--primary-color)] bg-white shadow-md text-[var(--primary-color)]"
						: "border border-gray-300 bg-white text-gray-400"
			}
          `}
								>
									{/* Step number */}
									<p
										className="
              w-6 h-6 md:w-8 md:h-8 bg-[var(--primary-color)]
              text-white rounded-full flex items-center justify-center mb-2
              font-semibold text-sm md:text-base
            "
									>
										{id}
									</p>

									{/* Step title */}
									<p className="font-semibold text-xs md:text-sm text-gray-700 whitespace-nowrap">
										{title}
									</p>

									{/* Step description */}
									<p className="hidden md:block text-gray-500 text-xs max-w-28">
										{description}
									</p>
								</div>
							);
						})}
					</div>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className=" md:px-8 bg-white rounded-xl w-full py-4 text-sm relative signup-form"
					encType="multipart/form-data"
				>
					{/* STEP CONTENT CONTAINER */}
					<div className="relative min-h-[400px] px-2 ">
						{/* STEP 1 Basic Info*/}
						{step === 1 && (
							<div
								className={`${getStepAnimationClass()} w-full `}
							>
								<fieldset className="space-y-4 mt-8 pb-4 ">
									<div>
										<label
											htmlFor="title"
											className="block text-sm md:text-base font-semibold mb-1"
										>
											Listing Title
										</label>
										<p className="text-gray-400 text-xs my-1">
											Write a clear, descriptive title
											that highlights the key features
										</p>
										<input
											type="text"
											{...register(
												"title",
												validationSchema.title,
											)}
											className="w-full rounded-lg p-3 focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="e.g. Authentic Nigerian Ankara Dresses - Made to order"
										/>
										{errors.title && (
											<p className="text-red-500 text-xs mt-1">
												{errors.title.message}
											</p>
										)}
									</div>
									<div>
										<label
											htmlFor="category"
											className="block text-sm md:text-base font-semibold mb-1"
										>
											Category
										</label>
										<p className="text-gray-400 text-xs my-1">
											Choose the category that best
											describes your item or service
										</p>
										<select
											{...register(
												"category",
												validationSchema.category,
											)}
											className="bg-gray-100 w-full rounded-lg p-3  focus:ring-2 focus:ring-[var(--primary-color)]/80 transition-all duration-200"
										>
											<option value="">
												Choose a category
											</option>
											{CATEGORIES.map((category) => (
												<option
													key={category}
													value={category}
												>
													{category}
												</option>
											))}
										</select>
										{errors.category && (
											<p className="text-red-500 text-xs mt-1">
												{errors.category.message}
											</p>
										)}
									</div>
									<div className="flex flex-col sm:flex-row sm:gap-8 gap-4">
										<div>
											<label
												htmlFor="price"
												className="block text-sm md:text-base font-semibold mb-1"
											>
												Price
											</label>
											<div className="flex rounded-lg overflow-hidden focus-within:blue-700  focus-within:ring-2 focus-within:ring-blue-700 transition-all duration-200 bg-gray-100">
											
												<select
													{...register("currency")}
													className="bg-gray-100 px-3 py-3 text-sm text-gray-700 focus:outline-none max-w-16"
												>
													<option value="USD">
														USD
													</option>
													<option value="NGN">
														NGN
													</option>
												</select>

												<input
													type="text"
													{...register(
														"price",
														validationSchema.price,
													)}
													className="flex-1 px-3 py-3 text-sm sm:text-base focus:outline-none "
													placeholder=""
												/>
												{errors.price && (
													<p className="text-red-500 text-xs mt-1">
														{errors.price.message}
													</p>
												)}
											</div>
										</div>
										<div className="shrink-0 flex-1">
											<label
												htmlFor="priceType"
												className="block text-sm md:text-base font-semibold mb-1"
											>
												Price Type
											</label>
											<CustomSelectButton
												{...register("priceType")}
												className="w-full text-left rounded-lg py-2.5 px-3 bg-gray-100 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
												name="priceType"
												label="Fixed Price"
												options={[
													"Fixed",
													"Negotiable",
												]}
											/>
											{errors.priceType && (
												<p className="text-red-500 text-xs mt-1">
													{errors.priceType.message}
												</p>
											)}
										</div>
									</div>

									<div>
										<label
											htmlFor="condition"
											className="block text-sm md:text-base font-semibold mb-1"
										>
											Condition
										</label>
										<p className="text-gray-400 text-xs my-1">
											What condition is your product in?
										</p>
										<CustomSelectButton
											{...register(
												"condition",
												validationSchema.condition,
											)}
											className="w-full text-left rounded-lg p-3 bg-gray-100 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											name="condition"
											label="Select Condition"
											options={[
												"New",
												"Used - Like New",
												"Used - Good",
												"Used - Fair",
											]}
										/>
										{errors.condition && (
											<p className="text-red-500 text-xs mt-1">
												{errors.condition.message}
											</p>
										)}
									</div>
								</fieldset>
							</div>
						)}

						{/* STEP 2 Product Media*/}
						{step === 2 && (
							<div
								className={`${getStepAnimationClass()} w-full`}
							>
								<div className="flex flex-col items-center space-y-1"></div>
								<fieldset className="space-y-4 mt-8 bg-white">
									<div>
										<label
											htmlFor="description"
											className="block text-sm md:text-base font-semibold mb-1"
										>
											Description
										</label>
										<p className="text-gray-400 text-xs my-1">
											Write a clear, descriptive title
											that highlights the key features
										</p>
										<textarea
											{...register(
												"description",
												validationSchema.description,
											)}
											className="w-full rounded-lg resize-none min-h-30 bg-gray-200 p-3 border border-gray-300 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all duration-200"
											placeholder="Write a description for your product"
										/>
										{errors.description && (
											<p className="text-red-500 text-xs mt-1">
												{errors.description.message}
											</p>
										)}
									</div>
									<div>
										<label
											htmlFor="photo"
											className="block text-sm md:text-base font-semibold mb-1"
										>
											Photos
										</label>
										<p className="text-gray-400 text-xs my-1">
											Add up to 8 photos. First photo will
											be your main listing image.
										</p>

										<FormProvider {...methods}>
											<CustomPhotoInput
												name="photo"
												multiple={true}
											/>
											{errors.photo && (
												<p className="text-red-500 text-xs mt-1">
													{errors.photo.message}
												</p>
											)}
										</FormProvider>
										{listingPhoto &&
											listingPhoto.length > 0 && (
												<p className="text-green-600 text-xs mt-1">
													{listingPhoto.length}{" "}
													photo(s) selected
												</p>
											)}
									</div>

									{/* Selected Tags */}
									<div className="mb-4">
										<label className="block text-sm md:text-base font-semibold mb-2">
											Selected Tags
										</label>
										<div className="flex flex-wrap gap-2 mb-3 min-h-10">
											{selectedTags.length === 0 ? (
												<p className="text-gray-400 text-sm">No tags selected yet</p>
											) : (
												selectedTags.map((tag) => (
													<div
														key={tag}
														className="bg-green-100 text-green-700 text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1"
													>
														{tag}
														<button
															type="button"
															onClick={() => removeTag(tag)}
															className="ml-1 hover:text-green-900 focus:outline-none"
														>
															×
														</button>
													</div>
												))
											)}
										</div>
										<p className="text-gray-500 text-xs">
											{selectedTags.length}/8 tags selected
										</p>
									</div>

									{/* Suggested Tags */}
									<div className="mb-6">
										<label className="block text-sm md:text-base font-semibold mb-2">
											Suggested Tags
										</label>
										<p className="text-gray-400 text-xs mb-3">
											Click to add tags that describe your product
										</p>
										<div className="flex flex-wrap gap-2">
											{[
												"Handmade", "Nigerian", "Custom", "Authentic", "Premium",
												"Traditional", "Modern", "Vintage", "Organic", "Imported",
												"Local", "Eco-Friendly", "Luxury", "Affordable", "Unique",
												"Handcrafted", "Artisanal", "Cultural", "Sustainable"
											].map((tag) => (
												<Tag 
													key={tag} 
													label={tag} 
													active={selectedTags.includes(tag)}
													onClick={() => handleTagClick(tag)}
												/>
											))}
										</div>
									</div>
								</fieldset>
							</div>
						)}

						{/* STEP 3 Review and Submit*/}
						{step === 3 && (
							<div className="space-y-4">
								{/* Review & Submit Section */}
								<section className="rounded-lg py-6">
									<h2 className="font-semibold text-gray-800 mb-3">
										Review & Submit
									</h2>
									<div className="flex items-start gap-3 border border-green-400 bg-green-50 rounded-md p-4">
										<CheckCircle
											className="text-green-500 mt-0.5"
											size={20}
										/>
										<div>
											<h3 className="text-green-600 font-medium">
												Almost Done!
											</h3>
											<p className="text-gray-600 text-sm">
												Review your listing details
												below and submit for approval
											</p>
										</div>
									</div>
								</section>
								<div className="mx-auto bg-white rounded-2xl">
									{/* Title & Price */}
									<div className="flex justify-between items-start mb-4">
										<Link
											href="#"
											className="text-[var(--primary-color)] font-semibold hover:underline"
										>
											{listingTitle}
										</Link>
										<p className="text-xl font-bold text-green-600">
											${listingPrice}
										</p>
									</div>

									{/* Category, Condition, Location, Contact */}
									<div className="space-y-1 text-sm">
										<p>
											<span className="font-medium text-gray-600">
												Category:
											</span>{" "}
											<span className="text-gray-800">
												{listingCategory}
											</span>
										</p>
										<p>
											<span className="font-medium text-gray-600">
												Condition:
											</span>{" "}
											<span className="text-gray-800">
												{listingCondition}
											</span>
										</p>
										<p>
											<span className="font-medium text-gray-600">
												Location:
											</span>{" "}
											<span className="text-gray-800">
												{listingLocation}
											</span>
										</p>
										<p>
											<span className="font-medium text-gray-600">
												Contact:
											</span>{" "}
											<span className="text-gray-800">
												3 method(s)
											</span>
										</p>
										<p>
											<span className="font-medium text-gray-600">
												Photos:
											</span>{" "}
											<span className="text-gray-800">
												{listingPhoto
													? listingPhoto.length
													: 0}{" "}
												uploaded
											</span>
										</p>
									</div>

									<hr className="my-4" />

									{/* Description */}
									<div className="mb-4">
										<h3 className="font-semibold text-gray-700 mb-1">
											Description
										</h3>
										<p className="text-gray-600 text-sm leading-relaxed">
											{listingDescription}
										</p>
									</div>

									{/* Tags */}
									<div className="mb-6">
										<h3 className="font-semibold text-gray-700 mb-2">
											Tags
										</h3>
										<div className="flex flex-wrap gap-2">
											{selectedTags.length === 0 ? (
												<p className="text-gray-400 text-sm">No tags selected</p>
											) : (
												selectedTags.map((tag) => (
													<span 
														key={tag} 
														className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
													>
														{tag}
													</span>
												))
											)}
										</div>
									</div>

									{/* Review Process Notice */}
									<div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm p-4 rounded-lg mb-6">
										<AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-600" />
										<div>
											<p className="font-semibold">
												Review Process
											</p>
											<p>
												Your listing will be reviewed by
												our team within 24 hours.
												You&apos;ll receive an email
												notification once it&apos;s
												approved and live.
											</p>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					<CommonButton
						step={step}
						next={next}
						prev={prev}
						isAnimating={isAnimating}
						isSubmitting={isSubmitting}
					/>
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

interface CommonButtonProps {
	next: () => void;
	prev: () => void;
	step: number;
	isAnimating: boolean;
	isSubmitting?: boolean;
}

export function CommonButton({
	next,
	prev,
	isAnimating,
	step,
	isSubmitting = false,
}: CommonButtonProps) {
	return (
		<div className="flex justify-end gap-2 pt-8 mb-4 text-xs md:text-sm">
			<button
				type="button"
				onClick={prev}
				disabled={isAnimating || isSubmitting}
				className="w-fit mr-auto py-3 px-4 border hover:text-white rounded-lg flex justify-center items-center gap-2 hover:bg-[var(--primary-color)]/90 cursor-pointer disabled:opacity-50 transition-all duration-200"
			>
				<ArrowLeft className="w-4 h-4" />
				<span>Previous</span>
			</button>

			<button
				type="button"
				disabled={isSubmitting}
				className="w-fit py-3 px-4 border hover:text-white rounded-lg flex justify-center items-center gap-2 hover:bg-[var(--primary-color)]/90 cursor-pointer disabled:opacity-50 transition-all duration-200"
			>
				Save Draft
			</button>
			<button
				type={step === 3 ? "submit" : "button"}
				onClick={step === 3 ? undefined : next}
				disabled={isAnimating || isSubmitting}
				className="w-fit py-3 px-4 text-white rounded-lg flex justify-center items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 cursor-pointer disabled:opacity-50 transition-all duration-200"
			>
				<span>
					{isSubmitting
						? "Creating..."
						: step === 3
							? "Create Product"
							: "Next"}
				</span>
				{!isSubmitting && step !== 3 && (
					<ArrowRight className="w-4 h-4" />
				)}
			</button>
		</div>
	);
}

type TagProps = {
	label: string;
	active?: boolean;
	onClick: () => void;
};

function Tag({ label, active, onClick }: TagProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border transition ${
				active
					? "bg-green-100 text-green-700 border-green-400"
					: "text-gray-600 border-gray-300 hover:bg-gray-100"
			}`}
		>
			<TagIcon className="w-4 h-4" />
			{label}
		</button>
	);
}