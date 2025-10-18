import { Event } from "@/app/types";
import EventStatusTabs from "./eventStatusTabs";


const events:Event[] = [
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

export default async function EventStatus() {


	return (
		<section className="bg-white p-4 rounded-lg">
			<h2 className="mb-4">My Events</h2>
			{/* Pass server-fetched events to client tabs */}
			<EventStatusTabs events={events} />
		</section>
	);
}
