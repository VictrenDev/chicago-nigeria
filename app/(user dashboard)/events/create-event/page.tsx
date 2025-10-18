"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, MapPin } from "lucide-react";

// ✅ Zod Schema
const eventSchema = z.object({
	title: z.string().min(3, "Event title is required"),
	type: z.string().min(1, "Please select an event type"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	startDate: z.string().nonempty("Start date is required"),
	endDate: z.string().nonempty("End date is required"),
	startTime: z.string().nonempty("Start time is required"),
	endTime: z.string().nonempty("End time is required"),
	location: z.string().min(2, "Location name is required"),
	address: z.string().optional(),
	isPaid: z.boolean(),
	currency: z.string().optional(),
	ticketPrice: z.string().optional(),
	seats: z.string().optional(),
	visibility: z.string().nonempty("Visibility is required"),
	categories: z.array(z.string()).optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function CreateEventForm() {
	const [isPaid, setIsPaid] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<EventFormData>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			isPaid: false,
			categories: [],
		},
	});

	const onSubmit = (data: EventFormData) => {
		console.log("✅ Form Data:", data);
		alert("Event created successfully!");
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-4xl mx-auto bg-white rounded-xl p-6 space-y-8"
		>
			{/* Header */}
			<div>
				<h1 className="text-xl font-semibold text-gray-900">Create New Event</h1>
				<p className="text-sm text-gray-500">
					Share your event with the Chicago Nigerian community.
				</p>
			</div>

			{/* Event Details */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium text-gray-800">Event Details</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="text-sm font-medium text-gray-700">Event Title</label>
						<input
							type="text"
							{...register("title")}
							className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
							placeholder="e.g. Nigerian Professionals Networking Mixer"
						/>
						{errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700">Event Type</label>
						<select
							{...register("type")}
							className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
						>
							<option value="">Select event type</option>
							<option>Networking</option>
							<option>Workshop</option>
							<option>Conference</option>
						</select>
						{errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
					</div>
				</div>

				<div>
					<label className="text-sm font-medium text-gray-700">Short Description</label>
					<textarea
						rows={3}
						{...register("description")}
						className="w-full mt-1 resize-none border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
						placeholder="Describe your event briefly..."
					></textarea>
					{errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
				</div>
			</section>

			{/* Date & Time */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium text-gray-800">Date & Time</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="text-sm font-medium text-gray-700">Start Date</label>
						<input
							type="date"
							{...register("startDate")}
							className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500"
						/>
						{errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700">End Date</label>
						<input
							type="date"
							{...register("endDate")}
							className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500"
						/>
						{errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700">Start Time</label>
						<input
							type="time"
							{...register("startTime")}
							className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500"
						/>
						{errors.startTime && <p className="text-red-500 text-xs">{errors.startTime.message}</p>}
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700">End Time</label>
						<input
							type="time"
							{...register("endTime")}
							className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500"
						/>
						{errors.endTime && <p className="text-red-500 text-xs">{errors.endTime.message}</p>}
					</div>
				</div>
			</section>

			{/* Location */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium text-gray-800">Location</h2>
				<div>
					<label className="text-sm font-medium text-gray-700">Location Name</label>
					<input
						type="text"
						{...register("location")}
						className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500"
						placeholder="e.g. The Loop, Chicago"
					/>
					{errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
				</div>

				<div>
					<label className="text-sm font-medium text-gray-700">Address</label>
					<div className="border rounded-lg h-24 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
						<MapPin className="w-5 h-5 mb-1" />
						<p>Manually locate or use the address form</p>
					</div>
				</div>
			</section>

			{/* Event Media */}
			<section className="space-y-3">
				<h2 className="text-lg font-medium text-gray-800">Event Media</h2>
				<label className="text-sm font-medium text-gray-700">Event Banner</label>
				<div className="border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center text-gray-500 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
					<Upload className="w-5 h-5 mb-1" />
					<p>Drag or upload an image (max 4MB)</p>
					<span className="text-xs text-gray-400">PNG, JPG — Recommended 1200x600 pixels</span>
				</div>
			</section>

			{/* Tickets / Registration */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium text-gray-800">Tickets / Registration</h2>
				<div className="flex items-center gap-2">
					<label className="text-sm font-medium text-gray-700">Event Type</label>
					<button
						type="button"
						onClick={() => {
							setIsPaid(!isPaid);
						}}
						className={`ml-2 relative inline-flex h-6 w-11 items-center rounded-full transition ${
							isPaid ? "bg-emerald-600" : "bg-gray-300"
						}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
								isPaid ? "translate-x-6" : "translate-x-1"
							}`}
						/>
					</button>
					<span className="text-sm">{isPaid ? "Paid" : "Free"}</span>
				</div>

				{isPaid && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="text-sm font-medium text-gray-700">Currency</label>
							<select {...register("currency")} className="w-full mt-1 border rounded-lg p-2.5">
								<option value="">Select</option>
								<option>USD</option>
								<option>NGN</option>
								<option>GBP</option>
							</select>
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">Ticket Price</label>
							<input
								type="number"
								{...register("ticketPrice")}
								className="w-full mt-1 border rounded-lg p-2.5"
								placeholder="e.g. 50"
							/>
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">Number of Seats Available</label>
							<input
								type="number"
								{...register("seats")}
								className="w-full mt-1 border rounded-lg p-2.5"
								placeholder="e.g. 100"
							/>
						</div>
					</div>
				)}
			</section>

			{/* Visibility & Category */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium text-gray-800">Visibility & Category</h2>
				<div>
					<label className="text-sm font-medium text-gray-700">Visibility</label>
					<select
						{...register("visibility")}
						className="w-full mt-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500"
					>
						<option value="">Select visibility</option>
						<option>Public - Anyone can view and join</option>
						<option>Private - Invite only</option>
						<option>Unlisted - Hidden from public view</option>
					</select>
					{errors.visibility && <p className="text-red-500 text-xs">{errors.visibility.message}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
					<div className="flex flex-wrap gap-3">
						{["Culture", "Music", "Business", "Community", "Education"].map((cat) => (
							<label key={cat} className="flex items-center gap-2 text-sm text-gray-700">
								<input type="checkbox" value={cat} {...register("categories")} className="accent-emerald-600" />{" "}
								{cat}
							</label>
						))}
					</div>
				</div>
			</section>

			{/* Buttons */}
			<div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
				<button
					type="button"
					onClick={() => reset()}
					className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
				>
					Create Event
				</button>
			</div>
		</form>
	);
}
