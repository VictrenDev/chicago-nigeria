import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className=" ">
            <nav className="shadow-[0_4px_46px_-14px_#00000040] py-1">
                <div className="container-custom mx-auto flex w-full justify-between items-center">
                    <Image src={"/chicago-nigeria-logo-1.png"} alt="logo" height={17} width={113} />
                    <ul className="flex">
                        <li>
                            <Link className="px-4 py-8 inline-block" href={"/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="px-4 py-8 inline-block" href={"/"}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link className="px-4 py-8 inline-block" href={"/"}>
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link className="px-4 py-8 inline-block" href={"/"}>
                                Event/Ticketing
                            </Link>
                        </li>
                        <li>
                            <Link className="px-4 py-8 inline-block" href={"/"}>
                                News/Trending
                            </Link>
                        </li>
                        <li>
                            <Link className="px-4 py-8 inline-block" href={"/"}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                    <Link className="bg-linear-to-r from-[#037244] to-[#04C977] text-white inline-block px-4 py-1 rounded-lg" href={"/community"}>
                        Join Us +
                    </Link>
                </div>
            </nav>
            <header className="bg-linear-60 from-[#DCFFF0] to-[#FFF3F3] pt-4">
                <section className="container-custom mx-auto grid grid-cols-2 items-center gap-8">
                    <div>
                        <p className="font-bold text-5xl leading-13">
                            <span className="text-[var(--primary-color)] ">Connecting Nigerians in Chicago </span> - Socially & Professionally.
                        </p>
                        <p className="mt-4 text-[20px] font-normal leading-6">
                            Join the fastest-growing Nigerian professional network in Chicago. Connect, collaborate, and celebrate your heritage while
                            building your future.
                        </p>
                        <div className="flex gap-2 mt-8">
                            <Link
                                className="bg-linear-to-r from-[#037244] to-[#04C977] text-white inline-block px-4 py-1 rounded-lg"
                                href={"/community"}>
                                Join our community
                            </Link>
                            <Link className=" inline-block px-4 py-1 rounded-lg border-1 border-gray-800" href={"/community"}>
                                Explore Marketplace
                            </Link>
                        </div>
                        <div className="mt-14 flex gap-4">
                            <p className="flex gap-1">
                                <Image src={"/icons/star-icon.png"} height={24} width={24} alt="icon" />
                                4.5/5.0 rating
                            </p>
                            <p className="flex gap-1">
                                <Image src={"/icons/trend-icon.png"} height={24} width={24} alt="icon" />
                                Growing fast
                            </p>
                            <p className="flex gap-1">
                                <Image src={"/icons/heart-icon.png"} height={24} width={24} alt="icon" />
                                Community loved
                            </p>
                        </div>
                    </div>
                    <div className="justify-self-end">
                        <Image src={"/hero-image.png"} alt="hero image" width={521} height={592} />
                    </div>
                </section>

                <section className="flex justify-around items-center w-[90%] mx-auto py-12">
                    {[
                        {
                            number: 500,
                            icon: "/icons/people.png",
                            name: "Active Members",
                            color: "var(--primary-color)",
                        },
                        {
                            number: 50,
                            icon: "/icons/calender.png",
                            name: "Active Members",
                            color: "var(--orange-color)",
                        },
                        {
                            number: 50,
                            icon: "/icons/marketplace.png",
                            name: "Active Members",
                            color: "var(--blue)",
                        },
                    ].map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2 min-h-50 min-w-70 bg-white justify-center items-center p-4 rounded-md">
                                <p>
                                    <Image src={`${item.icon}`} alt="icon" height={32} width={32} />
                                </p>
                                <p className={`text-6xl font-extrabold text-[${item.color}]`}>{item.number}+</p>
                                <p>{item.name}</p>
                            </div>
                        );
                    })}
                </section>
            </header>
            {/* what we offer  */}
            <section className="container-custom py-20">
                <div className="text-center">
                    <h2 className="font-semibold text-5xl">
                        What We <span className="text-[var(--primary-color)] ">Offer</span>
                    </h2>
                    <p className="mt-4">Everything you need to connect, grow, and thrive in the Chicago Nigerian community</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
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
                            description: "Stay updated with the latest news from Nigeria and cultural happenings in the Chicago Nigerian community.",
                        },
                    ].map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col min-h-72 w-70 p-4 justify-center items-center shadow-[0_4px_46px_-14px_#00000040] rounded-md">
                                <p className="mb-4">
                                    <Image src={`${item.icon}`} alt="icon" height={32} width={32} />
                                </p>
                                <h3 className="text-2xl mb-8 text-center">{item.title}</h3>
                                <p className="text-gray-400 text-center">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* why join  */}
            <section className="container-custom grid grid-cols-2 gap-20 py-20">
                <div>
                    <h2 className="font-semibold text-5xl">
                        Why Join <br />
                        <span className="text-[var(--primary-color)] ">Chicago Nigerians</span>?
                    </h2>
                    <p className="mt-4 lg:max-w-140">
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
                            <li key={index} className="flex gap-1 items-center">
                                <Image src={"/tick-icon.png"} alt="tick-icon" height={30} width={30} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="bg-linear-60 from-[#DCFFF0] to-[#FFF3F3] bg-center bg-cover p-4 rounded-2xl mt-8 font-light">
                        <h4 className="mb-4 font-semibold">Premium Membership</h4>
                        <p>Unlock exclusive features and enhanced networking opportunities for just $20/month.</p>
                        <ul className="list-disc list-inside ">
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
                <div className="justify-self-end">
                    <Image src={"/why-join-chicago-nigerians-img.png"} width={589} height={717} alt="why join chicago nigerians image" />
                </div>
            </section>
            {/* business and culture  */}
            <section className="bg-[url('/landing-latest-event.jpg')] bg-cover bg-center">
                <div className="container-custom grid grid-cols-2 gap-20 py-20">
                    <div>
                        <Image src={"/landing-event-img.png"} alt="landing event image" height={560} width={652} />
                        <div className="flex w-[70%] gap-4 mx-auto mt-4">
                            <Image src={"/landing-event-1.png"} alt="landing event image" height={141} width={128} />
                            <Image src={"/landing-event-2.png"} alt="landing event image" height={130} width={118} />
                            <Image src={"/landing-event-3.png"} alt="landing event image" height={130} width={118} />
                        </div>
                    </div>
                    <div className="justify-self-end">
                        <h2 className="font-semibold text-5xl">
                            <span className="text-[var(--primary-color)] ">Nigeria @ 65</span>
                            <br /> Business & Culture Exhibition.
                        </h2>
                        <p className="text-[var(--primary-color)] py-3 font-bold text-[20px]">Celebrate Independence Day in style!</p>
                        <p className=" lg:max-w-140">
                            join us for a lively showcase of local businesses and cultural experiences where you can discover new favorites, support
                            local entrepreneurs, and enjoy a fun-filled day with music, food, and vibrant connections.
                        </p>

                        <ul className="list-none mt-8 flex flex-col gap-4">
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
            <section className="container-custom py-20 ">
                <div className="text-center">
                    <h2 className="font-semibold text-5xl">
                        What Our
                        <span className="text-[var(--primary-color)] "> Community</span>Says
                    </h2>
                    <p className="mt-4">Join hundreds of Nigerians who have found their community in Chicago</p>
                </div>
                <div className="mt-20">
                    <div className="flex gap-4 justify-center">
                        {[
                            {
                                reviewerName: "James Adewale",
                                reviewerJobDescription: "Business Owner",
                                reviewerImage: "/reviewer-image-1.png",
                                reviewText:
                                    "This platform helped me grow my network in Chicago! I've connected with amazing professionals and found new clients for my consulting business.",
                                reviewRating: 1,
                            },
                            {
                                reviewerName: "James Adewale",
                                reviewerJobDescription: "Business Owner",
                                reviewerImage: "/reviewer-image-1.png",
                                reviewText:
                                    "This platform helped me grow my network in Chicago! I've connected with amazing professionals and found new clients for my consulting business.",
                                reviewRating: 1,
                            },
                            {
                                reviewerName: "James Adewale",
                                reviewerJobDescription: "Business Owner",
                                reviewerImage: "/reviewer-image-1.png",
                                reviewText:
                                    "This platform helped me grow my network in Chicago! I've connected with amazing professionals and found new clients for my consulting business.",
                                reviewRating: 1,
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col gap-8 max-w-80 p-4 rounded-lg shadow-[0_4px_46px_-14px_#00000040]">
                                {/* star rating  */}
                                <div>
                                    <Image src={"/rating.png"} alt="rating image" height={30} width={116} />
                                </div>

                                {/* review text  */}
                                <p className="text-sm text-gray-400 font-light">{item.reviewText}</p>

                                {/* reviewer profile details  */}
                                <div className="flex gap-4 items-center">
                                    <div className="rounded-full bg-gray-300 w-14 h-14">
                                        <Image src={item.reviewerImage} height={61.7} width={61.7} alt="reviewer image 1" />
                                    </div>
                                    <div>
                                        <p className="font-bold">{item.reviewerName}</p>
                                        <p className="">{item.reviewerJobDescription}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className=" py-40 text-center relative bg-[url('/banner.png')] bg-cover bg-center text-white overflow-clip">
                <div className="absolute inset-0 bg-[#02331FF2]"></div>
                <div className="absolute bg-[#0A8E5740] h-150 w-150 rounded-full -top-20 -left-100"></div>
                <div className="absolute bg-[#0A8E5740] h-90 w-90 rounded-full bottom-0 -right-45"></div>
                <div className="relative container-custom max-w-200 space-y-8">
                    <h2 className=" text-6xl font-bold">
                        Ready to join your <br /> <span className="text-[#00FF95]">Chicago Nigerian Family</span>?
                    </h2>
                    <p>Don&apos;t wait! Start connecting, networking, and growing with the most vibrant Nigerian community in Chicago. </p>
                    <div className="flex gap-2 justify-center mt-8">
                        <Link className="bg-linear-to-r from-[#037244] to-[#04C977] text-white inline-block px-4 py-1 rounded-lg" href={"/community"}>
                            Join our community
                        </Link>
                        <Link className=" inline-block px-4 py-1 rounded-lg border-1 border-gray-800 text-black bg-white" href={"/community"}>
                            Explore Marketplace
                        </Link>
                    </div>
                    <ul className="flex justify-center space-x-8">
                        <li>Free to join.</li>
                        <li>500+ active members</li>
                        <li>Events every week </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
