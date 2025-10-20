export type EventStatus = "active" | "ongoing" | "completed";
export type Event = {
	eventName: string;
	eventStatus?: EventStatus;
	numberOfAttendees: number;
	daysOfWeek: string;
};
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
