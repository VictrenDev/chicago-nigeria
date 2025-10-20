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
			<nav className="flex gap-8 justify-center  [&>button]:rounded-sm [&>button]:hover:cursor-pointer  [&>button]:py-1  [&>button]:px-2 [&>butto]:hover:bg-gray-200 ">
				<button
					onClick={() => setActive("attending")}
					className={active === "attending" ? "bg-gray-200" : ""}
				>
					Attending
				</button>
				<button
					onClick={() => setActive("hosted")}
					className={active === "hosted" ? "bg-gray-200" : ""}
				>
					Hosted
				</button>
				<button
					onClick={() => setActive("past")}
					className={active === "past" ? "bg-gray-200" : ""}
				>
					Past
				</button>
			</nav>

			<div className="space-y-2 mt-4">{filteredEvents()}</div>
		</>
	);
}
