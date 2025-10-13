"use client";
import {
	Bell,
	Calendar,
	Home,
	LucideIcon,
	MessageCircle,
	Settings,
	ShoppingBag,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Badge from "./badge";
import MobileNavigation from "./mobilenav";

export type NavItem = {
	href: string;
	label: string;
	icon: LucideIcon; // all lucide icons share this type
	badge?: number;
};
const navItems: NavItem[] = [
	{ href: "/feeds", label: "Feeds", icon: Home },
	{ href: "/events", label: "Events", icon: Calendar },
	{ href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
	{ href: "/messages", label: "Messages", icon: MessageCircle, badge: 200 },
	{ href: "/groups", label: "Groups", icon: Users },
	{ href: "/notifications", label: "Notifications", icon: Bell, badge: 12 },
	{ href: "/settings", label: "Settings", icon: Settings },
];
export default function SideNavigation({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<>
			<main className="container-custom grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-12 py-12 bg-gray-50">
				<aside className="sticky top-0 h-screen pt-4 lg:block hidden">
					<div className="space-y-8 w-full">
						<aside className="space-y-0.5 bg-white p-4 rounded-lg sidebar-buttons">
							{navItems.map(({ href, label, icon: Icon, badge }) => (
								<Link
									key={href}
									href={href}
									className={`${pathname.startsWith(href) ? "bg-[var(--primary-color)] text-white" : ""
										}`}>
									<Icon className="w-4 h-4" />
									<span>{label}</span>
									{badge && <Badge value={badge} />}
								</Link>
							))}
						</aside>
						<div className=" bg-white p-4 rounded-lg space-y-4">
							<h2 className="flex items-center gap-2">
								<TrendingUp className="text-[var(--primary-color)] w-6 h-6" />
								Trending Now
							</h2>
							<div className="space-y-3">
								<div>
									<h3 className="text-sm">Nigeria at 65 Celebration</h3>
									<p className="text-xs text-gray-400 font-light">234 discussing</p>
								</div>
								<div>
									<h3 className="text-sm">Chicago Tech Jobs</h3>
									<p className="text-xs text-gray-400 font-light">234 discussing</p>
								</div>
								<div>
									<h3 className="text-sm">Nigerian Business Network</h3>
									<p className="text-xs text-gray-400 font-light">234 discussing</p>
								</div>
								<div>
									<h3 className="text-sm">Cultural Heritage Month</h3>
									<p className="text-xs text-gray-400 font-light">234 discussing</p>
								</div>
							</div>
						</div>
					</div>
				</aside>
				<section className="bg-gray-50">{children}</section>
				<MobileNavigation navigationLinks={navItems} />
			</main>
		</>
	);
}
