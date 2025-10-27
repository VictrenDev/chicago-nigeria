import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import EventCard from "./event-components/eventCard";
import EventStatusTabs from "./event-components/eventStatusTabs";
import { AttendingEvent, HostedEvent, PastEvent } from "@/app/types";
export default async function Events() {
	return (
		<>
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-4 sm:px-8 py-4 rounded-lg">
				<div className="flex-1">
					<h2 className="text-lg font-bold">Upcoming Events</h2>
					<p className="text-sm text-gray-600">
						Connect with the Nigerian community in Chicago.
					</p>
				</div>

				<Link
					href="/events/create-event"
					className="flex items-center gap-1 justify-center p-2 rounded-lg text-sm text-center border border-gray-200 bg-[var(--primary-color)] text-white w-full sm:w-auto hover:bg-[var(--primary-color)]/90 transition"
				>
					<Plus className="w-4 h-4 sm:w-6 sm:h-6" />
					<span className="whitespace-nowrap">Create Event</span>
				</Link>
			</div>

			{/* Main Layout */}
			<main className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12">
				{/* Suspense Boundary for Event Cards */}
				<Suspense fallback={<EventCardsSkeleton />}>
					<section className="space-y-8 pt-4">
						<div className="space-y-4">
							<EventCard />
						</div>
					</section>
				</Suspense>

				{/* Suspense Boundary for Event Status */}
				<Suspense fallback={<EventStatusSkeleton />}>
					<section className="space-y-8 sticky top-0 h-screen pt-4 hidden md:block">
						<EventStatus />
					</section>
				</Suspense>
			</main>
		</>
	);
}

async function EventStatus() {
	// Fetch all events and pass the data as props
	// Consider slow network and bad requests
	// Check for user authentication
	const hostedEvents: HostedEvent[] = [
		{
			eventName: "Morning Yoga",
			eventStatus: "active",
			numberOfAttendees: 25,
			daysOfWeek: "Friday",
		},
		{
			eventName: "Cooking Masterclass",
			eventStatus: "ongoing",
			numberOfAttendees: 40,
			daysOfWeek: "Thursday",
		},
		{
			eventName: "Weekend Tech Meetup",
			eventStatus: "completed",
			numberOfAttendees: 120,
			daysOfWeek: "Sunday",
		},
	];
	const attendingEvents: AttendingEvent[] = [
		{
			eventName: "Tech Networking Brunch",
			numberOfAttendees: 45,
			date: "Feb 15, 2025",
		},
		{
			eventName: "Fitness and Wellness Workshop",
			numberOfAttendees: 60,
			date: "May 22, 2025",
		},
	];

	const pastEvents: PastEvent[] = [
		{
			eventName: "Cultural Food Festival",
			numberOfAttendees: 120,
			date: "Jan 10, 2025",
		},
		{
			eventName: "Startup Demo Day",
			numberOfAttendees: 200,
			date: "Mar 8, 2025",
		},
		{
			eventName: "Summer Coding Bootcamp",
			numberOfAttendees: 85,
			date: "Jul 12, 2025",
		},
	];

	return (
		<section className="bg-white p-4 rounded-lg">
			<h2 className="mb-4">My Events</h2>
			<EventStatusTabs
				attendingEvents={attendingEvents}
				pastEvents={pastEvents}
				hostedEvents={hostedEvents}
			/>
		</section>
	);
}

// Skeleton for Event Cards (left side)
function EventCardsSkeleton() {
	return (
		<section className="space-y-4 pt-4 animate-pulse">
			{[...Array(3)].map((_, i) => (
				<div
					key={i}
					className="p-4 border border-gray-200 rounded-lg bg-gray-100 space-y-3"
				>
					<div className="h-40 w-full bg-gray-300 rounded-md" />
					<div className="h-4 bg-gray-300 w-3/4 rounded-md" />
					<div className="h-3 bg-gray-300 w-full rounded-md" />
					<div className="h-3 bg-gray-300 w-2/3 rounded-md" />
				</div>
			))}
		</section>
	);
}

// Skeleton for Event Status (right sidebar)
function EventStatusSkeleton() {
	return (
		<div className="space-y-4 animate-pulse p-4 border border-gray-200 rounded-lg bg-gray-100">
			<div className="h-5 w-1/3 bg-gray-300 rounded-md" />
			<div className="h-4 w-2/3 bg-gray-300 rounded-md" />
			<div className="h-4 w-1/2 bg-gray-300 rounded-md" />
			<div className="h-4 w-3/4 bg-gray-300 rounded-md" />
		</div>
	);
}
