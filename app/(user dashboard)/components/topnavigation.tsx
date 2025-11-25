"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Menu, Search, X } from "lucide-react";
import Badge from "./badge";

const NAV_LINKS = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Marketplace", href: "/marketplace" },
	{ name: "Event/Ticketing", href: "/upcoming-events" },
	{ name: "News/Trending", href: "/news" },
	{ name: "Contact Us", href: "/contact" },
];

export default function TopNavigation() {
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	return (
		<nav className="bg-white shadow-[0_4px_46px_-14px_#00000040] py-3 relative">
			<div className="container-custom mx-auto flex items-center justify-between gap-8">
				{/* Logo */}
				<Link href="/" className="flex-shrink-0">
					<Image
						src="/chicago-nigeria-logo-1.png"
						alt="Chicago Nigeria Logo"
						width={113}
						height={17}
						className="w-20 md:w-28"
						priority
					/>
				</Link>

				{/* Search bar (Desktop only) */}
				<form
					className="hidden md:flex items-center gap-2 w-full max-w-md bg-gray-200 rounded-lg py-1 focus-within:ring-2 ring-blue-400 ring-offset-2"
					action="#"
				>
					<button
						type="submit"
						className="py-2 pl-4 cursor-pointer"
						aria-label="Search"
					>
						<Search className="w-6 h-6 stroke-gray-600" />
					</button>
					<input
						type="text"
						placeholder="Search for people, post, events..."
						className="w-full px-2 py-1 text-sm bg-transparent focus-visible:outline-none"
					/>
				</form>

				{/* Actions */}
				<div className="flex items-center gap-4 md:gap-8">
					{/* Notification */}
					<div className="relative">
						<Bell className="w-5 h-5" aria-label="Notifications" />
						<Badge
							className="absolute -top-3 -right-2 text-[10px]"
							value={20}
						/>
					</div>

					{/* Profile image */}
					<button
						className="w-10 h-10 rounded-full overflow-hidden"
						aria-label="Profile"
					>
						<Image
							src="/reviewer-image-2.webp"
							alt="Profile picture"
							width={61}
							height={62}
							className="object-cover w-full h-full"
						/>
					</button>
				</div>
			</div>
		</nav>
	);
}
