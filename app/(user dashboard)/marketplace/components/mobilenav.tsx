"use client";

import { Bell, Home, MessageCircle, ShoppingBag, Users } from "lucide-react";
import Badge from "./badge";

export default function MobileNavigation({
	currentPage,
	onPageChange,
}: {
	currentPage: string;
	onPageChange: React.Dispatch<React.SetStateAction<string>>;
}) {
	const navItems = [
		{ key: "feed", icon: Home, label: "Feeds" },
		{ key: "marketplace", icon: ShoppingBag, label: "Marketplace" },
		{ key: "messages", icon: MessageCircle, label: "Messages", badge: 2 },
		{ key: "groups", icon: Users, label: "Groups" },
		{ key: "notifications", icon: Bell, label: "Notifications", badge: 12 },
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 safe-area-bottom">
			<div className="flex justify-between items-center">
				{navItems.map((item) => {
					const IconComponent = item.icon;
					const isActive = currentPage === item.key;

					return (
						<button
							key={item.key}
							onClick={() => onPageChange(item.key)}
							className={`flex flex-col items-center px-2 py-3 w-full transition-colors duration-200 ${
								isActive ? "text-[var(--primary-color)]" : "text-gray-600 hover:text-gray-900"
							}`}>
							<div className="relative">
								<IconComponent className="w-6 h-6" />
								{item.badge && (
									<span className="absolute -top-2 -right-2">
										<Badge value={item.badge} />
									</span>
								)}
							</div>
							<span className="text-xs mt-1 font-medium">{item.label}</span>

							{/* Active indicator dot */}
							{isActive && (
								<div className="w-1 h-1 bg-[var(--primary-color)] rounded-full mt-1"></div>
							)}
						</button>
					);
				})}
			</div>
		</nav>
	);
}
