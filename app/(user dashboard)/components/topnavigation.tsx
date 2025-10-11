"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Menu, Search, X } from "lucide-react";
import Badge from "./badge";

export default function TopNavigation() {
	const [mobileOpen, setMobileOpen] = useState(false);
	// const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

	// const toggleDropdown = (name: string) => {
	//     setDropdownOpen(dropdownOpen === name ? null : name);
	// };

	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = "hidden"; // disable scroll
		} else {
			document.body.style.overflow = ""; // reset
		}
		return () => {
			document.body.style.overflow = ""; // cleanup when unmount
		};
	}, [mobileOpen]);

	return (
		<nav className="shadow-[0_4px_46px_-14px_#00000040] bg-white py-3 relative top-0">
			<div className="container-custom mx-auto flex w-full justify-between items-center gap-8">
				{/* Logo */}
				<Link href={"/"}>
					<Image
						className="w-20"
						src="/chicago-nigeria-logo-1.png"
						alt="logo"
						height={17}
						width={113}
					/>
				</Link>

				<form
					action=""
					className="hidden w-full max-w-140 py-1 rounded-lg bg-gray-200 focus-within:ring-2 ring-blue-400 ring-offset-2 md:flex items-center gap-2">
					<button className="cursor-pointer py-2 pl-4">
						<Search className="w-6 h-6 stroke-gray-600" />
					</button>
					<input
						type="text"
						className="py-1 px-2 w-full focus-visible:outline-none text-sm"
						placeholder="Search for people, post, events..."
					/>
				</form>

				<div className="flex items-center gap-8">
					<div className="relative">
						<Bell className="w-5 h-5" />
						<Badge className="absolute -top-3 -right-2 text-[10px]" value={20} />
					</div>
					<button className="w-10 aspect-square rounded-full">
						<Image
							className="w-full object-cover object-center"
							src="/reviewer-image-2.webp"
							alt={"profile image"}
							width={61}
							height={62}
						/>
					</button>
				</div>

				{/* Mobile menu button */}
				{/* <button
					aria-label="open mobile navigation"
					className="md:hidden"
					onClick={() => setMobileOpen(true)}>
					<Menu size={28} />
				</button> */}
			</div>

			{/* Overlay */}
			{mobileOpen && (
				<div
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
					onClick={() => setMobileOpen(false)}
				/>
			)}

			{/* Mobile drawer */}
			<div
				className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
					mobileOpen ? "translate-x-0" : "translate-x-full"
				}`}>
				<div className="flex justify-between items-center p-4 border-b">
					<Image src="/chicago-nigeria-logo-1.png" alt="logo" height={17} width={113} />
					<button onClick={() => setMobileOpen(false)}>
						<X size={24} />
					</button>
				</div>

				<ul className="flex flex-col">
					<li>
						<Link className="px-6 py-3 block" href="/" onClick={() => setMobileOpen(false)}>
							Home
						</Link>
					</li>
					<li>
						<Link className="px-6 py-3 block" href="/about" onClick={() => setMobileOpen(false)}>
							About
						</Link>
					</li>

					{/* Dropdown inside drawer */}
					{/* <li>
                        <button className="w-full flex justify-between items-center px-6 py-3" onClick={() => toggleDropdown("about")}>
                            Marketplace <ChevronDown size={16} />
                        </button>
                        {dropdownOpen === "about" && (
                            <ul className="pl-10 bg-gray-50">
                                <li>
                                    <Link className="block py-2" href="/team">Fashion & Accessories</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/mission">Food & Catering</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/housing">Housing and Accommodation</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/mission">Services Education & learning</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/mission">Entertainment & Events</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/mission">Travel & Shipping</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/mission">Baby & Kids</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/mission">Jobs & Gigs</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/mission">Buy & Sell (Classifieds)</Link>
                                </li>
                                <li>
                                    <Link className="block py-2" href="/mission">others</Link>
                                </li>
                            </ul>
                        )}
                    </li> */}

					<li>
						<Link
							className="px-6 py-3 block"
							href="/marketplace"
							onClick={() => setMobileOpen(false)}>
							Marketplace
						</Link>
					</li>
					<li>
						<Link
							className="px-6 py-3 block"
							href="/upcoming-events"
							onClick={() => setMobileOpen(false)}>
							Event/Ticketing
						</Link>
					</li>
					<li>
						<Link className="px-6 py-3 block" href="/news" onClick={() => setMobileOpen(false)}>
							News/Trending
						</Link>
					</li>
					<li>
						<Link className="px-6 py-3 block" href="/contact" onClick={() => setMobileOpen(false)}>
							Contact Us
						</Link>
					</li>
				</ul>

				<div className="p-6">
					<Link
						className="w-full text-center bg-gradient-to-r from-[#037244] to-[#04C977] text-white px-4 py-2 rounded-lg block"
						href="/signup"
						onClick={() => setMobileOpen(false)}>
						Join Us +
					</Link>
				</div>
			</div>
		</nav>
	);
}
