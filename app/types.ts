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
  tag?: string
};

