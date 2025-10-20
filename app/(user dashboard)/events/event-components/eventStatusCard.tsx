import { Calendar, UsersRound } from "lucide-react";
import type { AttendingEvent, HostedEvent, PastEvent } from "@/app/types";

export function EventStatusHostedCard({ events }: { events?: HostedEvent[] }) {
	if (!events) {
		return <p>No hosted events</p>;
	}
	return (
		<>
			{events.map(
				({ eventStatus, eventName, daysOfWeek, numberOfAttendees }, i) => (
					<div
						key={i}
						className="grid grid-cols-[4fr_1fr] gap-2 p-4 rounded-lg border border-gray-300"
					>
						<h3 className="font-semibold">{eventName}</h3>
						<p
							className={`${
								eventStatus === "active"
									? "text-green-500 bg-green-100"
									: eventStatus === "ongoing"
										? "text-gray-500 bg-gray-100"
										: eventStatus === "completed"
											? "text-purple-500 bg-purple-100"
											: ""
							} p-1 text-center text-xs font-medium rounded-sm`}
						>
							{eventStatus === "active"
								? "Active"
								: eventStatus === "ongoing"
									? "Ongoing"
									: eventStatus === "completed"
										? "Completed"
										: ""}
						</p>
						<p className="text-sm text-gray-500 ">{daysOfWeek}</p>
						<p className="flex justify-end gap-0.5 text-sm text-gray-500 items-center">
							<UsersRound size={14} />
							{numberOfAttendees}
						</p>
					</div>
				),
			)}
		</>
	);
}

export function EventStatusAttendedCard({
	events,
}: {
	events?: AttendingEvent[];
}) {
	if (!events) {
		return <p>No attending events</p>;
	}
	return (
		<>
			{events.map(({ date, eventName }, i) => {
				return (
					<div
						key={i}
						className="p-4 rounded-lg border border-gray-300 space-y-2"
					>
						<h3 className="font-semibold">{eventName}</h3>
						<p className="text-sm text-gray-500 inline-flex justify-center items-center gap-2">
							<Calendar size={16} /> {date}
						</p>
					</div>
				);
			})}
		</>
	);
}
export function EventStatusPastCard({ events }: { events?: PastEvent[] }) {
	if (!events) {
		return <p>No Past Events Available</p>;
	}
	return (
		<>
			{events.map(({ eventName, date, numberOfAttendees }, i) => (
				<div
					key={i}
					className="p-4 rounded-lg border border-gray-300 space-y-2"
				>
					<h3 className="font-semibold">{eventName}</h3>
					<div className="flex justify-between ">
						<p className="text-sm text-gray-500 inline-flex justify-center items-center gap-2">
							<Calendar size={16} /> {date}
						</p>
						<p className="inline-flex justify-end gap-0.5 text-sm text-gray-500 items-center">
							<UsersRound size={14} />
							{numberOfAttendees}
						</p>
					</div>
				</div>
			))}
		</>
	);
}
