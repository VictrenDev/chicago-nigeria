"use client";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TickIcon, XIcon } from "./icons";
import { Heart, HeartIcon, Search, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants from framer motion
const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6 },
};

const slideInLeft = {
	initial: { opacity: 0, x: -100 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.7 },
};

const slideInRight = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.7 },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

export default function Index() {
	const landingPageForm = (e: React.FormEvent) => {
		e.preventDefault();
	};
	return (
		<>
			<main>
				{/* hero section */}
				<header className="bg-linear-60 from-[#DCFFF0] to-[#FFF3F3]">
					<section className="text-white md:text-black relative  md:bg-none bg-[url(/hero-image.webp)] bg-center bg-cover bg-no-repeat py-12">
						{/* dark overlay for image in mobile view  */}
						<div className="absolute inset-0 bg-black/78 md:hidden"></div>
						<div className="container-custom grid grid-cols-1 md:grid-cols-2 items-center gap-8 ">
							{/* text section  */}
							<motion.div
								className="relative mx-auto"
								initial={{ opacity: 0, x: -100 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}>
								<p className="font-bold text-4xl md:text-5xl md:leading-13">
									<span className="text-[#00FF95] md:text-[var(--primary-color)] ">
										Connecting Nigerians in Chicago{" "}
									</span>{" "}
									- Socially & Professionally.
								</p>
								<motion.p
									className="mt-8 text-sm md:text-[20px] font-normal leading-6"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3, duration: 0.8 }}>
									Join the fastest-growing Nigerian community in Chicago. Connect, collaborate, and
									celebrate your heritage while building your future.
								</motion.p>
								<motion.div
									className="flex gap-2 mt-12"
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5, duration: 0.6 }}>
									<Link
										className="bg-linear-to-r from-[#037244] to-[#04C977] text-white text-xs md:text-base inline-block px-4 py-2 md:py-1 rounded-lg"
										href={"/signup"}>
										Join our community
									</Link>
									<Link
										className=" inline-block text-xs md:text-base px-4 py-2 md:py-1 rounded-lg border-1 border-white bg-white md:bg-transparent  text-black md:border-gray-800"
										href={"/marketplace"}>
										Explore Marketplace
									</Link>
								</motion.div>
								<motion.div
									className="mt-14 flex items-center gap-2 md:gap-4"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.7, duration: 0.6 }}>
									<p className="flex gap-1 items-center text-xs md:text-base">
										<Star className="w-6 h-6 fill-amber-300 text-amber-300" />
										<span> 4.5/5.0 rating</span>
									</p>
									<p className="flex gap-1 items-center text-xs md:text-base">
										<TrendingUp className="w-6 h-6 text-[var(--primary-color)]" />
										<span>Growing fast</span>
									</p>
									<p className="flex gap-1 items-center text-xs md:text-base">
										<HeartIcon className="w-6 h-6 fill-red-500 text-red-500" />
										<span>Community loved</span>
									</p>
								</motion.div>
							</motion.div>
							{/* image section  */}
							<motion.div
								className="mx-auto justify-self-end hidden md:block relative shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]"
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}>
								<Image src={"/hero-image.webp"} alt="hero image" width={521} height={592} />
								<motion.div
									className="absolute top-10 -left-20 bg-white py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]"
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 1, duration: 0.5 }}>
									<Image src={"/octicon-people-24.webp"} alt="hero image" width={16} height={16} />
									<p>Network</p>
								</motion.div>
								<motion.div
									className="absolute top-20 -right-18 bg-white py-4 px-6  rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]"
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 1.2, duration: 0.5 }}>
									<Image src={"/circum-globe.webp"} alt="hero image" width={16} height={16} />
									<p>Culture</p>
								</motion.div>
								<motion.div
									className="absolute bottom-10 -right-12 bg-white py-4 px-6  rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]"
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 1.4, duration: 0.5 }}>
									<Image
										src={"/material-symbols-light-event-outline-sharp.webp"}
										alt="hero image"
										width={16}
										height={16}
									/>
									<p>Events</p>
								</motion.div>
								<motion.div
									className="absolute -bottom-6 -left-10 bg-white py-4 px-6  rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]"
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 1.6, duration: 0.5 }}>
									<Image
										src={"/lsicon-marketplace-outline.webp"}
										alt="hero image"
										width={16}
										height={16}
									/>
									<p>Business</p>
								</motion.div>
							</motion.div>
						</div>
					</section>

					<motion.section
						className="flex flex-wrap gap-4 justify-around items-center w-[90%] mx-auto py-12"
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
						variants={staggerContainer}>
						<motion.div
							className="flex flex-col gap-2 min-h-50 md:min-h-50 min-w-full md:min-w-70 bg-white justify-center items-center p-4 rounded-md"
							variants={fadeInUp}>
							<p>
								<Image src={"/icons/people.webp"} alt="icon" height={32} width={32} />
							</p>
							<p className={`text-4xl md:text-6xl font-extrabold text-[var(--primary-color)]`}>
								500+
							</p>
							<p className="text-sm md:text-base">Active Members</p>
						</motion.div>
						<motion.div
							className="flex flex-col gap-2 min-h-50 md:min-h-50 min-w-full md:min-w-70 bg-white justify-center items-center p-4 rounded-md"
							variants={fadeInUp}>
							<p>
								<Image src={"/icons/calender.webp"} alt="icon" height={32} width={32} />
							</p>
							<p className={"text-4xl md:text-6xl font-extrabold text-[var(--orange-color)]"}>
								50+
							</p>
							<p className="text-sm md:text-base">Monthly Events</p>
						</motion.div>
						<motion.div
							className="flex flex-col gap-2 min-h-50 md:min-h-50 min-w-full md:min-w-70 bg-white justify-center items-center p-4 rounded-md"
							variants={fadeInUp}>
							<p>
								<Image src={"/icons/marketplace.webp"} alt="icon" height={32} width={32} />
							</p>
							<p className={"text-4xl md:text-6xl font-extrabold text-[var(--blue-color)]"}>50+</p>
							<p className="text-sm md:text-base">Local Businesses</p>
						</motion.div>
					</motion.section>
				</header>
				{/* what we offer  */}
				<motion.section
					className="container-custom py-20"
					initial="initial"
					whileInView="animate"
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}>
					<motion.div className="text-center" variants={fadeInUp}>
						<h2 className="font-semibold text-4xl md:text-5xl">
							What We <span className="text-[var(--primary-color)] ">Offer</span>
						</h2>
						<p className="mt-4 text-sm md:text-base">
							Everything you need to connect, grow, and thrive in the Chicago Nigerian community
						</p>
					</motion.div>
					{/* offer detail boxes  */}
					<motion.div
						className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
						variants={staggerContainer}>
						{[
							{
								icon: "/icons/people.webp",
								title: "Networking Feed",
								description:
									"Connect with fellow Nigerians professionally and socially through our networking platform.",
							},
							{
								icon: "/icons/calender.webp",
								title: "Events & Ticketing",
								description:
									"Discover, host, and attend Nigerian cultural events, business meetups, and community gatherings.",
							},
							{
								icon: "/icons/marketplace.webp",
								title: "Marketplace",
								description:
									"Buy and sell products and services within the Nigerian community. Support local Nigerian businesses.",
							},
							{
								icon: "/icons/globe.webp",
								title: "News & Culture Update",
								description:
									"Stay updated with the latest news from Nigeria and cultural happenings in the Chicago Nigerian community.",
							},
						].map((item, index) => {
							return (
								<motion.div
									key={index}
									className="flex flex-col min-h-72 w-full md:w-70 p-4 justify-center items-center shadow-[0_4px_46px_-14px_#00000040] rounded-md"
									variants={fadeInUp}
									whileHover={{ scale: 1.05 }}
									transition={{ type: "spring", stiffness: 300 }}>
									<p className="mb-4">
										<Image src={`${item.icon}`} alt="icon" height={32} width={32} />
									</p>
									<h3 className="text-xl md:text-2xl mb-4 md:mb-8 text-center">{item.title}</h3>
									<p className="text-gray-400 text-center text-sm md:text-base">
										{item.description}
									</p>
								</motion.div>
							);
						})}
					</motion.div>
				</motion.section>
				{/* why join  */}
				<motion.section
					className="container-custom grid grid-cols-1 md:grid-cols-2 gap-20 py-20"
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					variants={staggerContainer}>
					<motion.div variants={slideInLeft}>
						<h2 className="font-semibold text-4xl md:text-5xl">
							Why Join
							<span className="text-[var(--primary-color)] "> Chicago Nigerians</span>?
						</h2>
						<p className="mt-4 lg:max-w-140 text-sm md:text-base">
							Be part of a thriving community that celebrates Nigerian culture while fostering
							professional growth and meaningful connections in the heart of Chicago.
						</p>

						<ul className="list-none mt-8 flex flex-col gap-2">
							{[
								"Connect socially & professionally with fellow Nigerians",
								"Host & attend exclusive community events",
								"Discover Nigerian businesses near you",
								"Access premium networking features",
								"Get priority support for your business listings",
								"Join private groups and discussions",
							].map((item, index) => (
								<motion.li
									key={index}
									className="flex gap-1 items-center text-sm md:text-base"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									viewport={{ once: true }}>
									<TickIcon className="shrink-0" size={24} />
									{item}
								</motion.li>
							))}
						</ul>
						{/* premium membership section  */}
						<motion.div
							className="bg-linear-60 from-[#DCFFF0] to-[#FFF3F3] bg-center bg-cover p-4 rounded-2xl mt-8 font-light"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8 }}
							viewport={{ once: true }}>
							<h4 className="mb-4 font-semibold">Premium Membership</h4>
							<p className="text-sm md:text-base">
								Unlock exclusive features and enhanced networking opportunities for just $20/month.
							</p>
							<ul className="list-disc list-inside text-sm md:text-base">
								<li>Priority event access and early bird discounts</li>
								<li>Featured business listings in marketplace</li>
								<li>Access to exclusive networking events</li>
								<li>Advanced search and filtering options</li>
							</ul>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 1 }}
							viewport={{ once: true }}>
							<Link
								className="bg-linear-to-r from-[#037244] to-[#04C977] text-white inline-block px-4 py-1 rounded-lg mt-12"
								href={"/signup"}>
								Join our community
							</Link>
						</motion.div>
					</motion.div>
					<motion.div className="justify-self-end hidden md:block" variants={slideInRight}>
						<Image
							src={"/why-join-chicago-nigerians-img.webp"}
							width={589}
							height={717}
							alt="why join chicago nigerians image"
						/>
					</motion.div>
				</motion.section>
				{/* Chicago Nigerian Business Directory  */}
				<motion.section
					className="py-40 md:py-60 text-center relative overflow-clip"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}>
					<div className="hidden md:block absolute bg-[#0A8E5740] h-60 w-60 md:h-100 md:w-100 rounded-full -top-10 -left-10 md:top-20 md:-left-60"></div>
					<div className="absolute hidden md:block bg-[#0A8E5740] h-40 w-40 md:h-75 md:w-75 rounded-full bottom-0 -right-15 md:-top-10 md:-right-45"></div>
					<motion.div
						className="relative container-custom max-w-200 space-y-4 text-center"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						viewport={{ once: true }}>
						<h2 className=" text-3xl md:text-6xl font-bold">
							Chicago Nigerian{" "}
							<span className="text-[var(--primary-color)]">Business Directory?</span>
						</h2>
						<p className="text-sm md:text-base max-w-200 mx-auto">
							Your go-to guide for local Nigerian-owned businesses and services in Chicago. Find
							trusted professionals and businesses within the community.
						</p>

						<motion.form
							onSubmit={landingPageForm}
							className="mt-12"
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.3, duration: 0.6 }}
							viewport={{ once: true }}>
							<fieldset className="md:max-w-200 md:mx-auto px-2 flex items-center gap-2 bg-white border border-gray-300 focus-within:ring focus-within:ring-blue-300 rounded-lg">
								<input
									type="text"
									className="w-full p-4 focus-visible:outline-none"
									placeholder="Search for apartments, real estate, daycare, restaurants..."
								/>
								<button
									aria-label="search items"
									className="flex items-center gap-1 py-2 px-4 text-white bg-[var(--primary-color)] rounded-xl text-sm md:text-base">
									<Search className="w-4 h-4 md:w-6 md:h-6" /> <p>Submit</p>
								</button>
							</fieldset>
						</motion.form>
					</motion.div>
				</motion.section>
				{/* business and culture  */}
				<motion.section
					className="bg-[url('/landing-latest-event.webp')] bg-cover bg-center overflow-x-hidden"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}>
					<div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-20 py-20">
						<motion.div
							className="hidden md:block"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7 }}
							viewport={{ once: true }}>
							<Image
								src={"/landing-event-img.webp"}
								alt="landing event image"
								height={560}
								width={652}
							/>
							<div className="flex w-[70%] gap-4 mx-auto mt-4">
								<Image
									src={"/landing-event-1.webp"}
									alt="landing event image"
									height={141}
									width={128}
								/>
								<Image
									src={"/landing-event-2.webp"}
									alt="landing event image"
									height={130}
									width={118}
								/>
								<Image
									src={"/landing-event-3.webp"}
									alt="landing event image"
									height={130}
									width={118}
								/>
							</div>
						</motion.div>
						<motion.div
							className="justify-self-end"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7 }}
							viewport={{ once: true }}>
							<h2 className="font-semibold text-4xl md:text-5xl">
								<span className="text-[var(--primary-color)] ">Nigeria @ 65</span>
								<br /> Business & Culture Exhibition.
							</h2>
							<p className="text-[var(--primary-color)] py-3 font-bold text-[20px]">
								Celebrate Independence Day in style!
							</p>
							<p className=" lg:max-w-140 text-sm md:text-base">
								join us for a lively showcase of local businesses and cultural experiences where you
								can discover new favorites, support local entrepreneurs, and enjoy a fun-filled day
								with music, food, and vibrant connections.
							</p>

							<ul className="list-none mt-12 flex flex-col gap-4">
								{[
									{
										title: "Discover and Celebrate",
										description:
											"Meet vendors, make new connections and enjoy the best of our community - all in one place.",
									},
									{
										title: "Explore Diverse Businesses",
										description:
											"Shop fashion & beauty, try services, and connect with pros in finance, real estate, legal and more.",
									},
									{
										title: "Early Bird Perks",
										description:
											"First 100 registered guests get a special swag bag. Register now and enjoy the rewards!",
									},
								].map((item, index) => (
									<motion.li
										key={index}
										className="flex gap-2 items-start px-2 py-4 border-1 bg-white rounded-lg"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.2 }}
										viewport={{ once: true }}>
										<TickIcon className="shrink-0" size={26} />

										<div>
											<h3 className="font-bold">{item.title}</h3>
											<p className="text-sm font-light">{item.description}</p>
										</div>
									</motion.li>
								))}
							</ul>

							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 0.8 }}
								viewport={{ once: true }}>
								<Link
									className="bg-linear-to-r from-[#037244] to-[#04C977] text-white inline-block px-4 py-1 rounded-lg mt-12"
									href={"/free-ticket"}>
									Get your free ticket
								</Link>
							</motion.div>
						</motion.div>
					</div>
				</motion.section>
				{/* expand research, boost sales  */}
				<motion.section
					className="bg-[url(/layer3.webp)] bg-cover bg-center overflow-x-hidden"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}>
					<div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-20 py-20">
						<motion.div
							className="hidden md:block"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7 }}
							viewport={{ once: true }}>
							<Image
								src={"/african-american-woman-checking-social-media-phone.webp"}
								alt="landing event image"
								height={521}
								width={490}
							/>
						</motion.div>
						<motion.div
							className="md:justify-self-end"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7 }}
							viewport={{ once: true }}>
							<h2 className="font-semibold text-4xl md:text-5xl">
								Expand your reach.
								<br />
								<span className="text-[var(--primary-color)] ">Boost your Sales</span>
							</h2>
							<p className=" lg:max-w-140 text-sm md:text-lg  mt-2">
								For just <span className="text-[var(--primary-color)] ">$65/month</span> ,
								we&apos;ll manage your presence across Instagram, TikTok, Facebook, and LinkedIn.
							</p>

							<ul className="list-none mt-12 flex items-start flex-col gap-4">
								{[
									"Build your online brand",
									"Generate quality leads",
									"Turn clicks into customers",
								].map((item, index) => (
									<motion.li
										key={index}
										className="flex gap-2 items-start px-4 py-4 border-1 w-full md:max-w-100 bg-white rounded-lg"
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.2 }}
										viewport={{ once: true }}>
										<TickIcon size={24} />
										<div>
											<h3 className="font-bold">{item}</h3>
										</div>
									</motion.li>
								))}
							</ul>

							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 0.6 }}
								viewport={{ once: true }}>
								<Link
									className="bg-linear-to-r from-[#037244] to-[#04C977] text-white inline-block px-4 py-1 rounded-lg mt-12"
									href={"/vendors"}>
									Get started for $65/month
								</Link>
							</motion.div>
						</motion.div>
					</div>
				</motion.section>
				{/* ready to join chicago family */}
				<motion.section
					className=" py-40 text-center relative bg-[url('/banner.webp')] bg-cover bg-center text-white overflow-clip"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}>
					<div className="absolute inset-0 bg-[#02331FF2]"></div>
					<div className="absolute bg-[#0A8E5740] h-60 w-60 md:h-150 md:w-150 rounded-full -top-20 -left-20 md:-top-20 md:-left-100"></div>
					<div className="absolute bg-[#0A8E5740] h-40 w-40 md:h-90 md:w-90 rounded-full bottom-0 -right-15 md:bottom-0 md:-right-45"></div>
					<motion.div
						className="relative container-custom max-w-200 space-y-8"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						viewport={{ once: true }}>
						<div className="flex gap-2 items-center justify-center [&>*]:w-8 [&>*]:h-8 font-light">
							<Heart />
							<Users />
							<Heart />
						</div>
						<h2 className=" text-4xl md:text-6xl font-bold">
							Ready to join your <br />{" "}
							<span className="text-[#00FF95]">Chicago Nigerian Family</span>?
						</h2>
						<p className="text-sm md:text-base">
							Don&apos;t wait! Start connecting, networking, and growing with the most vibrant
							Nigerian community in Chicago. 
						</p>
						<motion.div
							className="flex gap-2 justify-center md:gap-8 mt-8"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
							viewport={{ once: true }}>
							<Link
								className="bg-linear-to-r from-[#037244] to-[#04C977] text-white text-xs md:text-base inline-block px-4 py-2 md:py-1 rounded-lg"
								href={"/signup"}>
								Join our community
							</Link>
							<Link
								className=" inline-block px-4 py-2 md:py-1 rounded-lg text-black bg-white text-xs md:text-base"
								href={"/marketplace"}>
								Explore Marketplace
							</Link>
						</motion.div>
						<motion.ul
							className="flex justify-center md:space-x-8 text-sm md:text-base"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 0.6, duration: 0.6 }}
							viewport={{ once: true }}>
							<li className="flex items-center md:gap-1">
								<TickIcon size={28} />
								<span>Free to join.</span>
							</li>
							<li className="flex items-center md:gap-1">
								<TickIcon size={28} />
								<span>500+ active members</span>
							</li>
							<li className="flex items-center md:gap-1">
								<TickIcon size={28} />
								<span>Events every week.</span>
							</li>
						</motion.ul>
					</motion.div>
				</motion.section>
			</main>
			{/* footer  */}
			<motion.footer
				className="container-custom py-20"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}>
				<section className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
					<motion.div
						className="space-y-8"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						viewport={{ once: true }}>
						<Image
							src={"/chicago-nigeria-logo-1.png"}
							className="w-24"
							alt="logo"
							height={67}
							width={163}
						/>

						<p className="">
							Connecting Nigerians in Chicago through culture, community, and commerce. Building
							bridges between tradition and opportunity.
						</p>
						<div className="flex gap-8 max-w-80 items-center">
							<Link href={"/"}>
								<FacebookIcon />
							</Link>
							<Link href={"/"}>
								<InstagramIcon />
							</Link>
							<Link href={"/"}>
								<LinkedInIcon />
							</Link>
							<Link href={"/"}>
								<XIcon />
							</Link>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						viewport={{ once: true }}>
						<h2 className="font-bold text-2xl mb-2">Quick Links</h2>
						<ul className="space-y-2 ">
							<li>
								<Link className="" href={"/"}>
									Home
								</Link>
							</li>
							<li>
								<Link className="" href={"/about"}>
									About Us
								</Link>
							</li>
							<li>
								<Link className="" href={"/marketplace"}>
									Marketplace
								</Link>
							</li>
							<li>
								<Link className="" href={"/events"}>
									Event/Ticketing
								</Link>
							</li>
							<li>
								<Link className="" href={"/news"}>
									News/Trending
								</Link>
							</li>
							<li>
								<Link className="" href={"/contacts"}>
									Contact Us
								</Link>
							</li>
						</ul>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						viewport={{ once: true }}>
						<h2 className="font-bold text-2xl mb-2">Get In Touch</h2>
						<ul className="space-y-2">
							<li className="">
								<p className="font-semibold">Email:</p>
								<Link className="text-gray-400" href={"mailto:info@chicagonigeria.com"}>
									info@chicagonigeria.com
								</Link>
							</li>
							<li className="">
								<p className="font-semibold">Phone:</p>
								<Link className="text-gray-400" href={"tel:+1(312)555-0123"}>
									+1 (312) 555-0123
								</Link>
							</li>
							<li className="">
								<p className="font-semibold">Address:</p>
								<Link className="text-gray-400" href={"/"}>
									Chicago IL
								</Link>
							</li>
						</ul>
					</motion.div>
				</section>
				<hr className="my-8 block bg-gray-400 border border-gray-200" />
				<motion.section
					className="flex justify-between flex-wrap gap-8 text-sm"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					viewport={{ once: true }}>
					<p>&copy; 2025 Chicago Nigeria, All Rights Reserved</p>
					<div className="space-x-4">
						<Link href={"/privacy-policy"}>Privacy Policy</Link>
						<Link href={"/terms-of-service"}>Terms of Service</Link>
						<Link href={"/cookies"}>Cookie Policy</Link>
					</div>
				</motion.section>
			</motion.footer>
		</>
	);
}
