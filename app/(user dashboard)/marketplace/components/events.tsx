import { BookmarkIcon, Clock, EllipsisVertical, Heart, MessageCircle, Share2Icon } from "lucide-react";
import Image from "next/image";

export default function Events() {
    return (
        <main className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12">
            <section className="space-y-8 pt-4">
                <div className=" flex gap-2 items-center bg-white p-8 md:rounded-lg space-y-4 user-page-top">
                    <button>All Posts</button>
                    <button>Following</button>
                    <button>My Networks</button>
                    <button className="ml-auto px-4 py-2">Filters</button>
                </div>
                <div className="md:p-8 py-2 bg-white md:rounded-xl">
                    <div className="flex">
                        <div className="w-14 h-14 rounded-full bg-gray-100 mr-4 "></div>
                        <form action="" className="bg-red flex-1">
                            <label htmlFor="post" className="hidden">
                                Post
                            </label>
                            <textarea
                                className="min-h-17 w-full resize-none bg-gray-100 p-2 rounded-xl text-sm "
                                draggable="false"
                                name="post"
                                id="post"
                                placeholder="What's on your mind? Share with the community"></textarea>
                        </form>
                    </div>

                    <div className=" mt-12 border-t border-t-gray-200 flex gap-2 items-center bg-white py-4 space-y-4 user-page-top">
                        <button>Photo</button>
                        <button>Video</button>
                        <button>Event</button>
                        <button className="ml-auto px-4 py-2">post</button>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="md:p-8 py-2 md:rounded-lg bg-white">
                        <div className="flex">
                            <div className="w-14 h-14 rounded-full bg-gray-100 mr-4 "></div>
                            <div>
                                <p>Adebayo Ogundimu</p>
                                <p className="text-sm space-x-1 text-gray-400 font-light">
                                    <span>Tech Entrepreneur</span> <span>Chicago</span>
                                </p>
                                <p className="text-xs mt-1 text-gray-400 font-light flex items-center gap-2">
                                    <span className="inline-flex items-center gap-0.5">
                                        <Clock className="w-4 h-4" /> 2h
                                    </span>{" "}
                                    <span className="py-1 px-2 rounded-md border border-gray-400 text-black">Business</span>
                                </p>
                            </div>
                            <div className="ml-auto p-4 cursor-pointer">
                                <EllipsisVertical className="w-4 h-4 " />
                            </div>
                        </div>
                        <article className="mt-8 text-sm">
                            Excited to announce that our fintech startup just secured Series A funding! 🚀 Looking to hire Nigerian talent in Chicago.
                            DM me if you&apos;re interested in joining our team. #NigerianTech #ChicagoStartups
                        </article>

                        <div className=" mt-8 border-t border-t-gray-200 flex gap-4 items-center bg-white py-4 space-y-4  text-gray-400 feed-post-actions font-light text-sm">
                            <div>
                                <button>
                                    <Heart className="w-4 h-4" />
                                </button>{" "}
                                <span>8</span>
                            </div>
                            <div>
                                <button>
                                    <MessageCircle className="w-4 h-4" />
                                </button>{" "}
                                <span>27</span>
                            </div>
                            <div>
                                <button>
                                    <Share2Icon className="w-4 h-4" />
                                </button>{" "}
                                <span>8</span>
                            </div>
                            <button className="ml-auto">
                                <BookmarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <div className="md:p-8 py-2 mdLrounded-lg bg-white">
                        <div className="flex">
                            <div className="w-14 h-14 rounded-full bg-gray-100 mr-4 "></div>
                            <div>
                                <p>Adebayo Ogundimu</p>
                                <p className="text-sm space-x-1 text-gray-400 font-light">
                                    <span>Tech Entrepreneur</span> <span>Chicago</span>
                                </p>
                                <p className="text-xs mt-1 text-gray-400 font-light flex items-center gap-2">
                                    <span className="inline-flex items-center gap-0.5">
                                        <Clock className="w-4 h-4" /> 2h
                                    </span>{" "}
                                    <span className="py-1 px-2 rounded-md border border-gray-400 text-black">Business</span>
                                </p>
                            </div>
                            <div className="ml-auto p-4 cursor-pointer">
                                <EllipsisVertical className="w-4 h-4 " />
                            </div>
                        </div>
                        <article className="mt-8 text-sm">
                            <p>
                                Excited to announce that our fintech startup just secured Series A funding! 🚀 Looking to hire Nigerian talent in
                                Chicago. DM me if you&apos;re interested in joining our team. #NigerianTech #ChicagoStartups
                            </p>
                            <div className="md:min-h-80 w-full bg-gray-200 mt-4 rounded-xl overflow-clip">
                                <Image
                                    src="/post-image.png"
                                    alt="post-image"
                                    height={589}
                                    width={285}
                                    className="w-full object-cover object-center"
                                />
                            </div>
                        </article>

                        <div className=" mt-8 border-t border-t-gray-200 flex gap-4 items-center bg-white py-4 space-y-4  text-gray-400 feed-post-actions font-light text-sm">
                            <div>
                                <button>
                                    <Heart className="w-4 h-4" />
                                </button>{" "}
                                <span>8</span>
                            </div>
                            <div>
                                <button>
                                    <MessageCircle className="w-4 h-4" />
                                </button>{" "}
                                <span>27</span>
                            </div>
                            <div>
                                <button>
                                    <Share2Icon className="w-4 h-4" />
                                </button>{" "}
                                <span>8</span>
                            </div>
                            <button className="ml-auto">
                                <BookmarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-y-8 sticky top-0 h-screen pt-4 hidden md:block">
                <div className=" bg-white p-4 rounded-lg space-y-4">
                    <h2>Community stats</h2>
                    <div className="space-y-3 community-stats-items">
                        <div>
                            <p>Active Members</p>
                            <p>2,847</p>
                        </div>
                        <div>
                            <p>Posts today</p>
                            <p>127</p>
                        </div>
                        <div>
                            <p>Events This Week</p>
                            <p>8</p>
                        </div>
                    </div>
                </div>
                <div className=" bg-white p-4 rounded-lg space-y-4">
                    <h2>Trending Now</h2>
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-sm">Nigeria at 65 Celebration</h3>
                            <p className="text-xs text-gray-400">234 discussing</p>
                        </div>
                        <div>
                            <h3 className="text-sm">Chicago Tech Jobs</h3>
                            <p className="text-xs text-gray-400">234 discussing</p>
                        </div>
                        <div>
                            <h3 className="text-sm">Nigerian Business Network</h3>
                            <p className="text-xs text-gray-400">234 discussing</p>
                        </div>
                        <div>
                            <h3 className="text-sm">Cultural Heritage Month</h3>
                            <p className="text-xs text-gray-400">234 discussing</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
