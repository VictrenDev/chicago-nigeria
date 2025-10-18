"use client";
import { useState } from "react";
import { Event } from "@/app/types";
import EventStatusCard from "./eventStatusCard";

type Props = { events: Event[] };
type MyEventTypes = "hosted" | "attending" | "past";

export default function EventStatusTabs({ events }: Props) {
	const [active, setActive] = useState<MyEventTypes>("hosted");

	function filteredEvents() {
		switch (active) {
			case "hosted":
				return events;
			case "attending":
				return [];
			case "past":
				return [];
			default:
				return [];
		}
	}

	return (
		<>
			<nav className="flex gap-8 justify-center  [&>button]:rounded-sm [&>button]:hover:cursor-pointer  [&>button]:py-1  [&>button]:px-2 [&>button]:hover:bg-gray-200 ">
				<button onClick={() => setActive("attending")} className={active === "attending" ? "bg-gray-200" :""}>Attending</button>
				<button onClick={() => setActive("hosted")} className={active === "hosted" ? "bg-gray-200" :""}>Hosted</button>
				<button onClick={() => setActive("past")} className={active === "past" ? "bg-gray-200" :""}>Past</button>
			</nav>

			<div className="space-y-2 mt-4">
				{filteredEvents().map((event, i) => (
					<EventStatusCard key={i} {...event} />
				))}
			</div>
		</>
	);
}
