import {
    BookmarkIcon,
    BriefcaseConveyorBelt,
    ChartNoAxesColumnIncreasing,
    ChevronLeft,
    ChevronRight,
    Clock,
    EllipsisVertical,
    Eye,
    Heart,
    MapPin,
    MessageCircle,
    Package,
    Plus,
    Share2Icon,
    Star,
    TrendingUp,
    Users,
    UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Marketplace() {
    return (
        <main className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12">
            <section className="space-y-4 pt-4">
                <div className=" flex gap-2 items-center justify-between bg-white px-8 py-4 md:rounded-lg space-y-4 user-page-top">
                    <div>
                        <h2 className="text-lg font-bold">Marketplace</h2>
                        <p className="text-sm">Discover amazing products and services from the Nigerian community</p>
                    </div>
                    <Link
                        href={"/marketplace"}
                        className="flex items-center gap-0.5 justify-center p-2 rounded-lg text-sm text-center border border-gray-200 bg-[var(--primary-color)] text-white">
                        <Plus className="w-6 h-6" />
                        <span className="whitespace-nowrap">Create Listing</span>
                    </Link>
                </div>
                <div className="py-2  md:rounded-xl">
                    <div className="flex justify-between">
                        <div className="p-6 rounded-lg bg-white flex items-center gap-8">
                            <div>
                                <p className="font-bold text-xl">156</p>
                                <p className="text-sm max-w-10">Active Listening</p>
                            </div>
                            <div className="bg-[var(--primary-color)]/10 p-2 rounded-xl">
                                <Package className="text-[var(--primary-color)] w-6 h-6 " />
                            </div>
                        </div>
                        <div className="p-6 rounded-lg bg-white flex items-center gap-8">
                            <div>
                                <p className="font-bold text-xl">12.4k</p>
                                <p className="text-sm max-w-10">Total Views</p>
                            </div>
                            <div className="bg-[var(--blue-color)]/10 p-2 rounded-xl">
                                <Eye className="text-[var(--blue-color)] w-6 h-6 " />
                            </div>
                        </div>
                        <div className="p-6 rounded-lg bg-white flex items-center gap-8">
                            <div>
                                <p className="font-bold text-xl">89</p>
                                <p className="text-sm max-w-10">Active Sellers</p>
                            </div>
                            <div className="bg-[var(--purple-color)]/10 p-2 rounded-xl">
                                <Users className="text-[var(--purple-color)] w-6 h-6 " />
                            </div>
                        </div>
                        <div className="p-6 rounded-lg bg-white flex items-center gap-8">
                            <div>
                                <p className="font-bold text-xl">2hrs</p>
                                <p className="text-sm max-w-10">Avg. Response</p>
                            </div>
                            <div className="bg-[var(--orange-color)]/10 p-2 rounded-xl">
                                <TrendingUp className="text-[var(--orange-color)] w-6 h-6 " />
                            </div>
                        </div>
                    </div>
                </div>
                {/* categories */}
                <div className="p-4 flex justify-between bg-white md:rounded-xl">
                    <button>
                        <ChevronLeft />
                    </button>
                    <div className="flex gap-2">
                        <div className="py-2 px-4 rounded-lg  bg-[var(--primary-color)] text-white flex items-center gap-1.5">
                            <p className="whitespace-nowrap">All Categories</p>
                            <p className="bg-[#0dd884] p-1 rounded-md text-sm">156</p>
                        </div>
                        <div className="py-2 px-4 rounded-lg border border-gray-300 flex items-center gap-1.5">
                            <p className="whitespace-nowrap">Fashion</p>
                            <p className="bg-gray-200 text-gray-700 rounded-md p-1 text-sm">23</p>
                        </div>
                        <div className="py-2 px-4 rounded-lg border border-gray-300 flex items-center gap-1.5">
                            <p className="whitespace-nowrap">Food</p>
                            <p className="bg-gray-200 text-gray-700 rounded-md p-1 text-sm">28</p>
                        </div>
                    </div>

                    <button>
                        <ChevronRight />
                    </button>
                </div>
                {/* filters  */}
                {/* <div className="p-4 flex justify-between bg-white md:rounded-xl">
                    <div className="flex gap-2">
                        <div className="py-2 px-4 rounded-lg  bg-[var(--primary-color)] text-white flex items-center gap-1.5">
                            <p className="whitespace-nowrap">All Categories</p>
                            <p className="bg-[#0dd884] p-1 rounded-md text-sm">156</p>
                        </div>
                        <div className="py-2 px-4 rounded-lg border border-gray-300 flex items-center gap-1.5">
                            <p className="whitespace-nowrap">Fashion</p>
                            <p className="bg-gray-200 text-gray-700 rounded-md p-1 text-sm">156</p>
                        </div>
                        <div className="py-2 px-4 rounded-lg border border-gray-300 flex items-center gap-1.5">
                            <p className="whitespace-nowrap">Food</p>
                            <p className="bg-gray-200 text-gray-700 rounded-md p-1 text-sm">156</p>
                        </div>
                    </div>
                </div> */}
                <div className="space-y-4 grid grid-col-1 md:grid-cols-2 gap-8">

                   
                    <div className="space-y-4 rounded-2xl overflow-clip border bg-white border-gray-200">
                        <div className="min-h-58 bg-gray-200 relative">
                            <button className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white">
                                <Heart className=""/>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 p-4 pt-0">
                            <p className="text-xs justify-self-start py-1 px-2 border border-gray-200 rounded-md">Fashion</p>
                            <p className="justify-self-end text-[var(--primary-color)]">$85</p>
                            <p className="col-span-2 max-w-55 text-sm font-medium">Authentic Nigerian Ankara Dresses - Made to Order</p>
                            <div className="flex">
                                <div className="w-10 h-10 rounded-full bg-gray-100 mr-2 shrink-0"></div>
                                <p className="text-sm w-full ">Adebayo Ogundimu</p>
                            </div>
                            <div className="justify-self-end items-center">
                                <div className="flex gap-0.5 justify-center">
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-gray-200 text-gray-200"/>
                                </div>
                                <p className="text-xs">127 verified ratings</p>
                            </div>
                            <div className="inline-flex gap-1 items-center text-xs text-gray-400 ">
                                {" "}
                                <MapPin className="w-4 h-4" /> <p>Chicago</p>
                            </div>
                            <div className="text-gray-400 flex gap-2 text-xs [&>*]:flex [&>*]:gap-1 [&>*]:items-center justify-self-end">
                                <div>
                                    <Eye className="w-4 h-4"/>
                                    <p>234</p>
                                </div>
                                <div>
                                    <Heart className="w-4 h-4"/>
                                    <p>18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="space-y-4 rounded-2xl overflow-clip border bg-white border-gray-200">
                        <div className="min-h-58 bg-gray-200 relative">
                            <button className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white">
                                <Heart className=""/>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 p-4 pt-0">
                            <p className="text-xs justify-self-start py-1 px-2 border border-gray-200 rounded-md">Fashion</p>
                            <p className="justify-self-end text-[var(--primary-color)]">$85</p>
                            <p className="col-span-2 max-w-55 text-sm font-medium">Authentic Nigerian Ankara Dresses - Made to Order</p>
                            <div className="flex">
                                <div className="w-10 h-10 rounded-full bg-gray-100 mr-2 shrink-0"></div>
                                <p className="text-sm w-full ">Adebayo Ogundimu</p>
                            </div>
                            <div className="justify-self-end items-center">
                                <div className="flex gap-0.5 justify-center">
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-gray-200 text-gray-200"/>
                                </div>
                                <p className="text-xs">127 verified ratings</p>
                            </div>
                            <div className="inline-flex gap-1 items-center text-xs text-gray-400 ">
                                {" "}
                                <MapPin className="w-4 h-4" /> <p>Chicago</p>
                            </div>
                            <div className="text-gray-400 flex gap-2 text-xs [&>*]:flex [&>*]:gap-1 [&>*]:items-center justify-self-end">
                                <div>
                                    <Eye className="w-4 h-4"/>
                                    <p>234</p>
                                </div>
                                <div>
                                    <Heart className="w-4 h-4"/>
                                    <p>18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="space-y-4 rounded-2xl overflow-clip border bg-white border-gray-200">
                        <div className="min-h-58 bg-gray-200 relative">
                            <button className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white">
                                <Heart className=""/>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 p-4 pt-0">
                            <p className="text-xs justify-self-start py-1 px-2 border border-gray-200 rounded-md">Fashion</p>
                            <p className="justify-self-end text-[var(--primary-color)]">$85</p>
                            <p className="col-span-2 max-w-55 text-sm font-medium">Authentic Nigerian Ankara Dresses - Made to Order</p>
                            <div className="flex">
                                <div className="w-10 h-10 rounded-full bg-gray-100 mr-2 shrink-0"></div>
                                <p className="text-sm w-full ">Adebayo Ogundimu</p>
                            </div>
                            <div className="justify-self-end items-center">
                                <div className="flex gap-0.5 justify-center">
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-gray-200 text-gray-200"/>
                                </div>
                                <p className="text-xs">127 verified ratings</p>
                            </div>
                            <div className="inline-flex gap-1 items-center text-xs text-gray-400 ">
                                {" "}
                                <MapPin className="w-4 h-4" /> <p>Chicago</p>
                            </div>
                            <div className="text-gray-400 flex gap-2 text-xs [&>*]:flex [&>*]:gap-1 [&>*]:items-center justify-self-end">
                                <div>
                                    <Eye className="w-4 h-4"/>
                                    <p>234</p>
                                </div>
                                <div>
                                    <Heart className="w-4 h-4"/>
                                    <p>18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="space-y-4 rounded-2xl overflow-clip border bg-white border-gray-200">
                        <div className="min-h-58 bg-gray-200 relative">
                            <button className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white">
                                <Heart className=""/>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 p-4 pt-0">
                            <p className="text-xs justify-self-start py-1 px-2 border border-gray-200 rounded-md">Fashion</p>
                            <p className="justify-self-end text-[var(--primary-color)]">$85</p>
                            <p className="col-span-2 max-w-55 text-sm font-medium">Authentic Nigerian Ankara Dresses - Made to Order</p>
                            <div className="flex">
                                <div className="w-10 h-10 rounded-full bg-gray-100 mr-2 shrink-0"></div>
                                <p className="text-sm w-full ">Adebayo Ogundimu</p>
                            </div>
                            <div className="justify-self-end items-center">
                                <div className="flex gap-0.5 justify-center">
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-gray-200 text-gray-200"/>
                                </div>
                                <p className="text-xs">127 verified ratings</p>
                            </div>
                            <div className="inline-flex gap-1 items-center text-xs text-gray-400 ">
                                {" "}
                                <MapPin className="w-4 h-4" /> <p>Chicago</p>
                            </div>
                            <div className="text-gray-400 flex gap-2 text-xs [&>*]:flex [&>*]:gap-1 [&>*]:items-center justify-self-end">
                                <div>
                                    <Eye className="w-4 h-4"/>
                                    <p>234</p>
                                </div>
                                <div>
                                    <Heart className="w-4 h-4"/>
                                    <p>18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="space-y-4 rounded-2xl overflow-clip border bg-white border-gray-200">
                        <div className="min-h-58 bg-gray-200 relative">
                            <button className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white">
                                <Heart className=""/>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 p-4 pt-0">
                            <p className="text-xs justify-self-start py-1 px-2 border border-gray-200 rounded-md">Fashion</p>
                            <p className="justify-self-end text-[var(--primary-color)]">$85</p>
                            <p className="col-span-2 max-w-55 text-sm font-medium">Authentic Nigerian Ankara Dresses - Made to Order</p>
                            <div className="flex">
                                <div className="w-10 h-10 rounded-full bg-gray-100 mr-2 shrink-0"></div>
                                <p className="text-sm w-full ">Adebayo Ogundimu</p>
                            </div>
                            <div className="justify-self-end items-center">
                                <div className="flex gap-0.5 justify-center">
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-amber-200 text-amber-200"/>
                                    <Star className="w-4 h-4 fill-gray-200 text-gray-200"/>
                                </div>
                                <p className="text-xs">127 verified ratings</p>
                            </div>
                            <div className="inline-flex gap-1 items-center text-xs text-gray-400 ">
                                {" "}
                                <MapPin className="w-4 h-4" /> <p>Chicago</p>
                            </div>
                            <div className="text-gray-400 flex gap-2 text-xs [&>*]:flex [&>*]:gap-1 [&>*]:items-center justify-self-end">
                                <div>
                                    <Eye className="w-4 h-4"/>
                                    <p>234</p>
                                </div>
                                <div>
                                    <Heart className="w-4 h-4"/>
                                    <p>18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </section>
            {/* marketplace right side bar  */}
            <section className="space-y-8 sticky top-0 h-screen pt-4 hidden md:block ">
                <div className=" bg-white p-4 rounded-lg space-y-4">
                    <h2>Quick Action</h2>
                    <div className="space-y-2">
                        <Link
                            href={"/marketplace"}
                            className="flex items-center gap-2 justify-center p-2 rounded-lg text-sm text-center border border-gray-200 bg-[var(--primary-color)] text-white">
                            <Plus className="w-6 h-6" />
                            <span>Create Listing</span>
                        </Link>
                        <Link
                            href={"/marketplace"}
                            className="flex items-center gap-2 justify-center p-2 rounded-lg text-sm text-center border border-gray-200">
                            <TrendingUp className="w-6 h-6 text-[var(--primary-color)]" />
                            <span>View Analytics</span>
                        </Link>
                    </div>
                </div>

                <div className=" bg-white p-4 rounded-lg space-y-4">
                    <h2 className="flex gap-2 items-center">
                        {" "}
                        <span>Community stats</span> <ChartNoAxesColumnIncreasing className="w-6 h-6 text-[var(--primary-color)]" />
                    </h2>
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
                    <h2>Popular Categories</h2>
                    <div className="space-y-3 community-stats-items">
                        <div>
                            <p>Fashion</p>
                            <p>28</p>
                        </div>
                        <div>
                            <p>Services</p>
                            <p>34</p>
                        </div>
                        <div>
                            <p>Food </p>
                            <p>23</p>
                        </div>
                        <div>
                            <p>Housing </p>
                            <p>8</p>
                        </div>
                    </div>
                    <hr className="border border-gray-200 my-4" />

                    <div className="space-y-3 ">
                        <h2>Quick Links</h2>
                        <div className="ml-4 space-y-3 community-stats-items quick-actions">
                            <div>
                                <MapPin className="w-4 h-4" />
                                <p>Find Local Events</p>
                            </div>
                            <div>
                                <UsersRound className="w-4 h-4" />
                                <p>Join Groups</p>
                            </div>
                            <div>
                                <BriefcaseConveyorBelt className="w-4 h-4" />
                                <p>Browse Jobs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
