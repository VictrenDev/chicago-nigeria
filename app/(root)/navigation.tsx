"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
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
		<nav className="shadow-[0_4px_46px_-14px_#00000040] py-1 relative z-50">
			<div className="container-custom mx-auto flex w-full justify-between py-1 items-center">
				{/* Logo */}
				<Link href={"/"}>
					<Image className="w-20" src="/chicago-nigeria-logo-1.png" alt="logo" height={17} width={113} />
				</Link>

				{/* Desktop menu */}
				<ul className="hidden md:flex ">
					<li>
						<Link className="px-4 py-8 inline-block" href={"/"}>
							Home
						</Link>
					</li>
					<li>
						<Link className="px-4 py-8 inline-block" href={"/about"}>
							About
						</Link>
					</li>
					{/* <li className="group/about relative">
                        <button className="px-4 py-8 inline-flex items-center gap-1" onClick={() => toggleDropdown("about")}>
                            Marketplace <ChevronDown size={16} />
                        </button>
                        <ul className="absolute hidden flex-col flex-wrap left-0 gap-4 group-hover/about:flex bg-white shadow-md rounded-md p-6 max-h-100 w-140 hover-effect-for-dropdown-links">
                            <li>
                                <Link href="/team">Fashion & Accessories</Link>
                            </li>
                            <li>
                                <Link href="/mission">Food & Catering</Link>
                            </li>
                            <li className="relative group/housing">
                                <button className="px-4 py-2 w-full items-center gap-1" onClick={() => toggleDropdown("housing")}>
                                    Housing and Accommodation <ChevronDown size={16} />
                                </button>
                                <ul className="absolute hidden top-0 left-[100%] gap-4 group-hover/housing:block bg-white shadow-md rounded-md p-2 max-h-100 w-full hover-effect-for-dropdown-links">
                                    <li>
                                        <Link href="/team">Short-term rentals (airbnb-style)</Link>
                                    </li>
                                    <li>
                                        <Link href="/mission">Roommate finder (Students, Newcomers)</Link>
                                    </li>
                                    <li>
                                        <Link href="/mission">Property Listings (Rent/Sale)</Link>
                                    </li>
                                    <li>
                                        <Link href="/mission">Real estate agents (Nigerian-owned or Nigeria-friendly)</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link href="/mission">Services Education & learning</Link>
                            </li>
                            <li>
                                <Link href="/mission">Entertainment & Events</Link>
                            </li>
                            <li>
                                <Link href="/mission">Travel & Shipping</Link>
                            </li>
                            <li>
                                <Link href="/mission">Baby & Kids</Link>
                            </li>
                            <li>
                                <Link href="/mission">Jobs & Gigs</Link>
                            </li>
                            <li>
                                <Link href="/mission">Buy & Sell (Classifieds)</Link>
                            </li>
                            <li>
                                <Link href="/mission">others</Link>
                            </li>
                        </ul>
                    </li> */}
					<li>
						<Link className="px-4 py-8 inline-block" href={"/marketplace"}>
							Marketplace
						</Link>
					</li>
					<li>
						<Link className="px-4 py-8 inline-block" href={"/upcoming-events"}>
							Event/Ticketing
						</Link>
					</li>
					<li>
						<Link className="px-4 py-8 inline-block" href={"/news"}>
							News/Trending
						</Link>
					</li>
					<li>
						<Link className="px-4 py-8 inline-block" href={"/contact"}>
							Contact Us
						</Link>
					</li>
				</ul>

				{/* CTA button */}
				<Link
					className="hidden md:inline-block bg-gradient-to-r from-[#037244] to-[#04C977] text-white px-4 py-1 rounded-lg"
					href="/signup">
					Join Us +
				</Link>

				{/* Mobile menu button */}
				<button
					aria-label="open mobile navigation"
					className="md:hidden"
					onClick={() => setMobileOpen(true)}>
					<Menu size={28} />
				</button>
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
						<Link className="px-6 py-3 block" href="/upcoming-events" onClick={() => setMobileOpen(false)}>
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
