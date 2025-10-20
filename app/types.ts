export type EventStatus = "active" | "ongoing" | "completed";
export type Event = {
	eventName: string;
	eventStatus?: EventStatus;
	numberOfAttendees: number;
	daysOfWeek: string;
	date: string;
};
export type HostedEvent = Omit<Event, "date">;
export type PastEvent = Omit<Event, "eventStatus" | "daysOfWeek">;
export type AttendingEvent = Omit<
	Event,
	"eventStatus" | "daysOfWeek" | "numberOfAttending"
>;
export type EventCardData = {
	imageSrc: string;
	title: string;
	description: string;
	date: string;
	time: string;
	location: string;
	host: string;
	attending: number;
	spotsLeft: number;
	price: string | "Free";
	tag?: string;
};

export type postDetailsType = {
	id: number;
	tag: string;
	price: number;
	image: string;
	name: string;
	userImage: string;
	userName: string;
	location: string;
	viewCount: number;
	likeCount: number;
	verifiedRatingCount: number;
	starRating: number;
};
