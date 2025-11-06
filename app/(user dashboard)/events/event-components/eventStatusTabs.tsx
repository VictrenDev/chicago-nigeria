"use client";
import { useState } from "react";
import {
	EventStatusAttendedCard,
	EventStatusHostedCard,
	EventStatusPastCard,
} from "./eventStatusCard";
import { AttendingEvent, HostedEvent, PastEvent } from "@/app/types";
type Props = {
	hostedEvents?: HostedEvent[];
	pastEvents?: PastEvent[];
	attendingEvents?: AttendingEvent[];
};
type MyEventTypes = "hosted" | "attending" | "past";
const navigation: MyEventTypes[] = ["attending","hosted", "past"];

export default function EventStatusTabs({
	attendingEvents,
	pastEvents,
	hostedEvents,
}: Props) {
	const [active, setActive] = useState<MyEventTypes>("hosted");
	function filteredEvents() {
		switch (active) {
			case "hosted":
				return <EventStatusHostedCard events={hostedEvents} />;
			case "attending":
				return <EventStatusAttendedCard events={attendingEvents} />;
			case "past":
				return <EventStatusPastCard events={pastEvents} />;
			default:
				return <EventStatusHostedCard events={hostedEvents} />;
		}
	}

	return (
		<>
			{/* Events Status Navigation Bar */}
			<nav className="flex gap-8 justify-center  [&>button]:rounded-sm [&>button]:hover:cursor-pointer  [&>button]:py-1  [&>button]:px-2 [&>butto]:hover:bg-gray-200 ">
				{navigation.map((item, id) => (
					<button
						key={id}
						onClick={() => setActive(item)}
						className={active === item ? "bg-gray-200" : ""}
					>
						{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
					</button>
				))}
			</nav>

			<div className="space-y-2 mt-4">{filteredEvents()}</div>
		</>
	);
}
