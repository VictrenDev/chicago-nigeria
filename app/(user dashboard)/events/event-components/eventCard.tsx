import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { EventCardData } from "@/app/types";

const eventCards: EventCardData[] = [
	{
		imageSrc: "/post-img-1.webp",
		title: "Nigerian Professionals Networking Mixer",
		description:
			"Join Fellow Nigerian Professionals For An Evening Of Networking, Collaboration, And Community Building. Light Refreshments Will Be Served.",
		date: "Dec. 31, 2025",
		time: "6:00 PM - 9:00 PM",
		location: "The Loop, Chicago",
		host: "Adebayo Ogundimu",
		attending: 47,
		spotsLeft: 53,
		price: "Free",
	},
	{
		imageSrc: "/post-img-1.webp",
		title: "Tech Connect Lagos",
		description:
			"A meetup for Nigerian tech professionals and enthusiasts in Chicago to share ideas, opportunities, and connections.",
		date: "Jan. 15, 2026",
		time: "5:30 PM - 8:00 PM",
		location: "Downtown, Chicago",
		host: "Ifeoma Okonkwo",
		attending: 65,
		spotsLeft: 35,
		price: "$10",
	},
	{
		imageSrc: "/post-img-1.webp",
		title: "Nigerian Cultural Night",
		description:
			"Celebrate Nigerian heritage with music, dance, and cuisine. Open to everyone interested in our culture.",
		date: "Feb. 10, 2026",
		time: "7:00 PM - 11:00 PM",
		location: "Hyde Park, Chicago",
		host: "SEEES Chicago",
		attending: 100,
		spotsLeft: 20,
		price: "$25",
	},
];

export default async function EventCard() {
	return (
		<>
			{eventCards.map(
				(
					{
						imageSrc,
						title,
						description,
						date,
						time,
						location,
						host,
						attending,
						spotsLeft,
						price,
						tag = "Networking",
					},
					index
				) => (
					<div
						key={index}
						className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
						{/* Image Section */}
						<div className="relative h-48 md:h-80 w-full">
							<Image
								src={imageSrc}
								alt={title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 400px"
							/>
							{tag && (
								<span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-full">
									{tag}
								</span>
							)}
						</div>

						{/* Content Section */}
						<div className="p-5 space-y-3">
							<h2 className="text-lg font-semibold text-gray-900">{title}</h2>
							<p className="text-sm text-gray-600 leading-relaxed">{description}</p>

							{/* Event Details */}
							<div className="flex flex-wrap sm:gap-8 gap-2 text-sm text-gray-700">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4 text-gray-500" />
									<span>{date}</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4 text-gray-500" />
									<span>{time}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="w-4 h-4 text-gray-500" />
									<span>{location}</span>
								</div>
							</div>

							{/* Attendance Info */}
							<p className="text-sm text-gray-600">
								<span className="font-medium">{attending}</span> Attending •{" "}
								<span className="font-medium">{spotsLeft}</span> Spots Left
							</p>

							{/* Host & Footer */}
							<div className="flex items-center justify-between pt-3 border-t border-gray-200">
								<div className="text-sm text-gray-700">
									Hosted By <span className="font-medium">{host}</span>
								</div>
								<span className="text-green-600 font-semibold uppercase text-sm">{price}</span>
							</div>
						</div>
					</div>
				)
			)}
		</>
	);
}
