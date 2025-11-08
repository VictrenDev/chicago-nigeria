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

export interface ApiResponse<T> {
  success: "Success" | "Error";
  data: T;
  message: string;
  error?: unknown;
}

export type AppError = Omit<ApiResponse<{}>, "data">;

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  email: string;
  phone: string;
  currentCity: string;
  neighborhood: string;
  stateOfOrigin: string;
  profession: string;
  company: string;
  bio: string;
  verificationMethod: string;
  isIdVerified: boolean;
  isMobileVerified: boolean;
  photo: string;
  blurHash: string;
  role: "user" | "admin";
  isProfileComplete: boolean;
  preference: string[];
  isEmailVerified: boolean;
  isTermAndConditionAccepted: boolean;
}
