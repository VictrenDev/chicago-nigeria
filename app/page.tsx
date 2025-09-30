import Image from "next/image";
import Link from "next/link";
import Navbar from "./navigation";
import ReviewsSection from "./reviews";

export default function Home() {
    return (
        <>
            <main className=" ">
                <Navbar />
                <header className="bg-linear-60 from-[#DCFFF0] to-[#FFF3F3] pt-12">
                    <section className="container-custom mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div>
                            <p className="font-bold text-4xl md:text-5xl md:leading-13">
                                <span className="text-[var(--primary-color)] ">Connecting Nigerians in Chicago </span> - Socially & Professionally.
                            </p>
                            <p className="mt-8 text-sm md:text-[20px] font-normal leading-6">
                                Join the fastest-growing Nigerian professional network in Chicago. Connect, collaborate, and celebrate your heritage
                                while building your future.
                            </p>
                            <div className="flex gap-2 mt-12">
                                <Link
                                    className="bg-linear-to-r from-[#037244] to-[#04C977] text-white text-xs md:text-base inline-block px-4 py-2 md:py-1 rounded-lg"
                                    href={"/community"}>
                                    Join our community
                                </Link>
                                <Link
                                    className=" inline-block text-xs md:text-base px-4 py-2 md:py-1 rounded-lg border-1 border-gray-800"
                                    href={"/community"}>
                                    Explore Marketplace
                                </Link>
                            </div>
                            <div className="mt-14 flex gap-2 md:gap-4">
                                <p className="flex gap-1 items-center text-xs md:text-base">
                                    <Image className="w-4 h-4 md:w-6 md:h-6  object-cover" src={"/icons/star-icon.png"} height={16} width={24} alt="icon" />
                                    4.5/5.0 rating
                                </p>
                                <p className="flex gap-1 items-center text-xs md:text-base">
                                    <Image className="w-4 h-4 md:w-6 md:h-6  object-cover" src={"/icons/trend-icon.png"} height={16} width={16} alt="icon" />
                                    Growing fast
                                </p>
                                <p className="flex gap-1 items-center text-xs md:text-base">
                                    <Image className="w-4 h-4 md:w-6 md:h-6  object-cover" src={"/icons/heart-icon.png"} height={16} width={24} alt="icon" />
                                    Community loved
                                </p>
                            </div>
                        </div>
                        <div className="justify-self-end hidden md:block relative shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]">
                            <Image src={"/hero-image.png"} alt="hero image" width={521} height={592} />
                            <div className="absolute top-10 -left-20 bg-white py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]">
                                <Image src={"/octicon_people-24.png"} alt="hero image" width={16} height={16} />
                                <p>Network</p>
                            </div>
                            <div className="absolute top-20 -right-18 bg-white py-4 px-6  rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]">
                                <Image src={"/circum_globe.png"} alt="hero image" width={16} height={16} />
                                <p>Culture</p>
                            </div>
                            <div className="absolute bottom-10 -right-12 bg-white py-4 px-6  rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]">
                                <Image src={"/material-symbols-light_event-outline-sharp.png"} alt="hero image" width={16} height={16} />
                                <p>Events</p>
                            </div>
                            <div className="absolute -bottom-6 -left-10 bg-white py-4 px-6  rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_59.1px_0_rgba(0, 0, 0, 0.25)]">
                                <Image src={"/lsicon_marketplace-outline.png"} alt="hero image" width={16} height={16} />
                                <p>Business</p>
                            </div>
                          
                        </div>
                    </section>

                    <section className="flex flex-wrap gap-4 justify-around items-center w-[90%] mx-auto pt-18 py-12">
                        <div className="flex flex-col gap-2 min-h-50 md:min-h-50 min-w-full md:min-w-70 bg-white justify-center items-center p-4 rounded-md">
                            <p>
                                <Image src={"/icons/people.png"} alt="icon" height={32} width={32} />
                            </p>
                            <p className={`text-4xl md:text-6xl font-extrabold text-[var(--primary-color)]`}>500+</p>
                            <p className="text-sm md:text-base">Active Members</p>
                        </div>
                        <div className="flex flex-col gap-2 min-h-50 md:min-h-50 min-w-full md:min-w-70 bg-white justify-center items-center p-4 rounded-md">
                            <p>
                                <Image src={"/icons/calender.png"} alt="icon" height={32} width={32} />
                            </p>
                            <p className={"text-4xl md:text-6xl font-extrabold text-[var(--orange-color)]"}>50+</p>
                            <p className="text-sm md:text-base">Active Members</p>
                        </div>
                        <div className="flex flex-col gap-2 min-h-50 md:min-h-50 min-w-full md:min-w-70 bg-white justify-center items-center p-4 rounded-md">
                            <p>
                                <Image src={"/icons/marketplace.png"} alt="icon" height={32} width={32} />
                            </p>
                            <p className={"text-4xl md:text-6xl font-extrabold text-[var(--blue-color)]"}>50+</p>
                            <p className="text-sm md:text-base">Active Members</p>
                        </div>
                    </section>
                </header>
                {/* what we offer  */}
                <section className="container-custom py-20">
                    <div className="text-center">
                        <h2 className="font-semibold text-4xl md:text-5xl">
                            What We <span className="text-[var(--primary-color)] ">Offer</span>
                        </h2>
                        <p className="mt-4 text-sm md:text-base">
                            Everything you need to connect, grow, and thrive in the Chicago Nigerian community
                        </p>
                    </div>
                    <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
                        {[
                            {
                                icon: "/icons/people.png",
                                title: "Networking Feed",
                                description: "Connect with fellow Nigerians professionally and socially through our networking platform.",
                            },
                            {
                                icon: "/icons/calender.png",
                                title: "Events & Ticketing",
                                description: "Discover, host, and attend Nigerian cultural events, business meetups, and community gatherings.",
                            },
                            {
                                icon: "/icons/marketplace.png",
                                title: "Marketplace",
                                description: "Buy and sell products and services within the Nigerian community. Support local Nigerian businesses.",
                            },
                            {
                                icon: "/icons/globe.png",
                                title: "News & Culture Update",
                                description:
                                    "Stay updated with the latest news from Nigeria and cultural happenings in the Chicago Nigerian community.",
                            },
                        ].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col min-h-72 w-full md:w-70 p-4 justify-center items-center shadow-[0_4px_46px_-14px_#00000040] rounded-md">
                                    <p className="mb-4">
                                        <Image src={`${item.icon}`} alt="icon" height={32} width={32} />
                                    </p>
                                    <h3 className="text-xl md:text-2xl mb-4 md:mb-8 text-center">{item.title}</h3>
                                    <p className="text-gray-400 text-center text-sm md:text-base">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
                {/* why join  */}
                <section className="container-custom grid grid-cols-1 md:grid-cols-2 gap-20 py-20">
                    <div>
                        <h2 className="font-semibold text-4xl md:text-5xl">
                            Why Join
                            <span className="text-[var(--primary-color)] "> Chicago Nigerians</span>?
                        </h2>
                        <p className="mt-4 lg:max-w-140 text-sm md:text-base">
                            Be part of a thriving community that celebrates Nigerian culture while fostering professional growth and meaningful
                            connections in the heart of Chicago.
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
                                <li key={index} className="flex gap-1 items-center text-sm md:text-base">
                                    <Image src={"/tick-icon.png"} alt="tick-icon" height={30} width={30} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="bg-linear-60 from-[#DCFFF0] to-[#FFF3F3] bg-center bg-cover p-4 rounded-2xl mt-8 font-light">
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
                        </div>
                        <Link
                            className="bg-linear-to-r from-[#037244] to-[#04C977] text-white inline-block px-4 py-1 rounded-lg mt-12"
                            href={"/community"}>
                            Join our community
                        </Link>
                    </div>
                    <div className="justify-self-end hidden md:block">
                        <Image src={"/why-join-chicago-nigerians-img.png"} width={589} height={717} alt="why join chicago nigerians image" />
                    </div>
                </section>
                {/* business and culture  */}
                <section className="bg-[url('/landing-latest-event.jpg')] bg-cover bg-center">
                    <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-20 py-20">
                        <div className="hidden md:block">
                            <Image src={"/landing-event-img.png"} alt="landing event image" height={560} width={652} />
                            <div className="flex w-[70%] gap-4 mx-auto mt-4">
                                <Image src={"/landing-event-1.png"} alt="landing event image" height={141} width={128} />
                                <Image src={"/landing-event-2.png"} alt="landing event image" height={130} width={118} />
                                <Image src={"/landing-event-3.png"} alt="landing event image" height={130} width={118} />
                            </div>
                        </div>
                        <div className="justify-self-end">
                            <h2 className="font-semibold text-4xl md:text-5xl">
                                <span className="text-[var(--primary-color)] ">Nigeria @ 65</span>
                                <br /> Business & Culture Exhibition.
                            </h2>
                            <p className="text-[var(--primary-color)] py-3 font-bold text-[20px]">Celebrate Independence Day in style!</p>
                            <p className=" lg:max-w-140 text-sm md:text-base">
                                join us for a lively showcase of local businesses and cultural experiences where you can discover new favorites,
                                support local entrepreneurs, and enjoy a fun-filled day with music, food, and vibrant connections.
                            </p>

                            <ul className="list-none mt-12 flex flex-col gap-4">
                                {[
                                    {
                                        title: "Discover and Celebrate",
                                        description: "Meet vendors, make new connections and enjoy the best of our community - all in one place.",
                                    },
                                    {
                                        title: "Explore Diverse Businesses",
                                        description:
                                            "Shop fashion & beauty, try services, and connect with pros in finance, real estate, legal and more.",
                                    },
                                    {
                                        title: "Early Bird Perks",
                                        description: "First 100 registered guests get a special swag bag. Register now and enjoy the rewards!",
                                    },
                                ].map((item, index) => (
                                    <li key={index} className="flex gap-2 items-start px-2 py-4 border-1 bg-white rounded-lg">
                                        <Image src={"/tick-icon.png"} alt="tick-icon" height={30} width={30} />
                                        <div>
                                            <h3 className="font-bold">{item.title}</h3>
                                            <p className="text-sm font-light">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                className="bg-linear-to-r from-[#037244] to-[#04C977] text-white inline-block px-4 py-1 rounded-lg mt-12"
                                href={"/community"}>
                                Get your free ticket
                            </Link>
                        </div>
                    </div>
                </section>
                {/* what our community says  */}
                <ReviewsSection />

                <section className=" py-40 text-center relative bg-[url('/banner.png')] bg-cover bg-center text-white overflow-clip">
                    <div className="absolute inset-0 bg-[#02331FF2]"></div>
                    <div className="absolute bg-[#0A8E5740] h-60 w-60 md:h-150 md:w-150 rounded-full -top-20 -left-20 md:-top-20 md:-left-100"></div>
                    <div className="absolute bg-[#0A8E5740] h-40 w-40 md:h-90 md:w-90 rounded-full bottom-0 -right-15 md:bottom-0 md:-right-45"></div>
                    <div className="relative container-custom max-w-200 space-y-8">
                        <h2 className=" text-4xl md:text-6xl font-bold">
                            Ready to join your <br /> <span className="text-[#00FF95]">Chicago Nigerian Family</span>?
                        </h2>
                        <p className="text-sm md:text-base">
                            Don&apos;t wait! Start connecting, networking, and growing with the most vibrant Nigerian community in Chicago. 
                        </p>
                        <div className="flex gap-2 justify-center mt-8">
                            <Link
                                className="bg-linear-to-r from-[#037244] to-[#04C977] text-white text-xs md:text-base inline-block px-4 py-2 md:py-1 rounded-lg"
                                href={"/community"}>
                                Join our community
                            </Link>
                            <Link
                                className=" inline-block px-4 py-2 md:py-1 rounded-lg border-1 border-gray-800 text-black bg-white text-xs md:text-base"
                                href={"/community"}>
                                Explore Marketplace
                            </Link>
                        </div>
                        <ul className="flex justify-center md:space-x-8 text-sm md:text-base">
                            <li>Free to join.</li>
                            <li>500+ active members</li>
                            <li>Events every week </li>
                        </ul>
                    </div>
                </section>
            </main>
            <footer className="container-custom py-20 ">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div className="space-y-8">
                        <Image src={"/chicago-nigeria-logo-1.png"} alt="logo" height={67} width={163} />

                        <p className="">
                            Connecting Nigerians in Chicago through culture, community, and commerce. Building bridges between tradition and
                            opportunity.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-2xl mb-2">Quick Links</h2>
                        <ul className="space-y-2 ">
                            <li>
                                <Link className="" href={"/"}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="" href={"/"}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link className="" href={"/"}>
                                    Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link className="" href={"/"}>
                                    Event/Ticketing
                                </Link>
                            </li>
                            <li>
                                <Link className="" href={"/"}>
                                    News/Trending
                                </Link>
                            </li>
                            <li>
                                <Link className="" href={"/"}>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold text-2xl mb-2">Get In Touch</h2>
                        <ul className="space-y-2">
                            <li className="">
                                <p className="font-semibold">Email:</p>
                                <Link className="text-gray-400" href={"/"}>
                                    info@chicagonigeria.com
                                </Link>
                            </li>
                            <li className="">
                                <p className="font-semibold">Phone:</p>
                                <Link className="text-gray-400" href={"/"}>
                                    info@chicagonigeria.com
                                </Link>
                            </li>
                            <li className="">
                                <p className="font-semibold">Address:</p>
                                <Link className="text-gray-400" href={"/"}>
                                    Chicago IL
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
                <hr className="my-8 block bg-gray-400 border border-gray-200" />
                <section className="flex justify-between flex-wrap gap-8 text-sm">
                    <p>&copy; 2025 Chicago Nigeria, All Rights Reserved</p>
                    <div className="space-x-4">
                        <Link href={"/"}>Privacy Policy</Link>
                        <Link href={"/"}>Terms of Service</Link>
                        <Link href={"/"}>Cookie Policy</Link>
                    </div>
                </section>
            </footer>
        </>
    );
}
