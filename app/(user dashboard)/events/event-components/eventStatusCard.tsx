import { UsersRound } from "lucide-react";
import type { Event } from "@/app/types";
export default function EventStatusCard({eventName, eventStatus, daysOfWeek, numberOfAttendees}: Event) {
	
	return (
		<div className="grid grid-cols-[4fr_1fr] gap-2 p-4 rounded-lg border border-gray-300">
			<h3 className="font-semibold">{eventName}</h3>
			<p
				className={`${
					eventStatus === "active"
						? "text-green-500 bg-green-100"
						: eventStatus === "ongoing"
						? "text-gray-500 bg-gray-100"
						: eventStatus === "completed"? "text-purple-500 bg-purple-100" :""
				} p-1 text-center text-xs font-medium rounded-sm`}>
				{eventStatus === "active" ? "Active" : eventStatus === "ongoing" ? "Ongoing" : eventStatus === "completed"? "Completed": ""}
			</p>
			<p className="text-sm text-gray-500 ">{daysOfWeek}</p>
			<p className="flex justify-end gap-0.5 text-sm text-gray-500 items-center"><UsersRound size={14} />{numberOfAttendees}</p>
		</div>
	);
}
