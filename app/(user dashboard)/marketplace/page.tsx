import {
	BriefcaseConveyorBelt,
	ChartNoAxesColumnIncreasing,
	ChevronLeft,
	ChevronRight,
	Eye,
	Heart,
	MapPin,
	Package,
	Plus,
	Star,
	TrendingUp,
	Users,
	UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LikePost from "../components/likePost";

type postDetailsType = {
	id: number;
	tag: string;
	price: number;
	image: string;
	name: string;
	userImage: string;
	userName: string;
	location: string;
	viewCount: number;
	likeCount: number;
	verifiedRatingCount: number;
	starRating: number;
};
const postDetails: postDetailsType[] = [
	{
		id: 1,
		tag: "fashion",
		price: 85,
		image: "/post-img-1.webp",
		name: "Authentic Nigerian Ankara Dresses Made to Order",
		userImage: "/reviewer-image-1.webp",
		userName: "Adebayo Ogundimu",
		location: "chicago",
		viewCount: 234,
		likeCount: 18,
		verifiedRatingCount: 127,
		starRating: 4,
	},
	{
		id: 2,
		tag: "fashion",
		price: 85,
		image: "/post-img-2.webp",
		name: "Authentic Nigerian Ankara Dresses Made to Order",
		userImage: "/reviewer-image-1.webp",
		userName: "Adebayo Ogundimu",
		location: "chicago",
		viewCount: 234,
		likeCount: 18,
		verifiedRatingCount: 127,
		starRating: 4,
	},
	{
		id: 3,
		tag: "fashion",
		price: 85,
		image: "/post-img-3.webp",
		name: "Authentic Nigerian Ankara Dresses Made to Order",
		userImage: "/reviewer-image-1.webp",
		userName: "Adebayo Ogundimu",
		location: "chicago",
		viewCount: 234,
		likeCount: 18,
		verifiedRatingCount: 127,
		starRating: 4,
	},
	{
		id: 4,
		tag: "fashion",
		price: 85,
		image: "/post-img-4.webp",
		name: "Authentic Nigerian Ankara Dresses Made to Order",
		userImage: "/reviewer-image-1.webp",
		userName: "Adebayo Ogundimu",
		location: "chicago",
		viewCount: 234,
		likeCount: 18,
		verifiedRatingCount: 127,
		starRating: 4,
	},
];
export default function Marketplace() {
	return (
		<main className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 md:gap-12">
			<section className="space-y-4 md:pt-4">
				{/* Header Section - Mobile Optimized */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-4 sm:px-8 py-4 rounded-lg">
					<div className="flex-1">
						<h2 className="text-lg font-bold">Marketplace</h2>
						<p className="text-sm text-gray-600">
							Discover amazing products and services from the Nigerian community
						</p>
					</div>
					<Link
						href={"/marketplace/create-listing"}
						className="flex items-center gap-1 justify-center p-2 rounded-lg text-sm text-center border border-gray-200 bg-[var(--primary-color)] text-white w-full sm:w-auto">
						<Plus className="w-4 h-4 sm:w-6 sm:h-6" />
						<span className="whitespace-nowrap">Create Listing</span>
					</Link>
				</div>

				{/* Stats Section - Mobile Horizontal Scroll */}
				<div className="py-2">
					<div className="gap-3 md:min-w-0 grid grid-cols-2 lg:grid-cols-4 md:gap-4">
						<div className="p-4 rounded-lg bg-white flex items-center gap-4 min-w-[140px]">
							<div className="flex-1">
								<p className="font-bold text-lg">156</p>
								<p className="text-xs text-gray-600">Active Listings</p>
							</div>
							<div className="bg-[var(--primary-color)]/10 p-2 rounded-xl">
								<Package className="text-[var(--primary-color)] w-5 h-5" />
							</div>
						</div>
						<div className="p-4 rounded-lg bg-white flex items-center gap-4 min-w-[140px]">
							<div className="flex-1">
								<p className="font-bold text-lg">12.4k</p>
								<p className="text-xs text-gray-600">Total Views</p>
							</div>
							<div className="bg-[var(--blue-color)]/10 p-2 rounded-xl">
								<Eye className="text-[var(--blue-color)] w-5 h-5" />
							</div>
						</div>
						<div className="p-4 rounded-lg bg-white flex items-center gap-4 min-w-[140px]">
							<div className="flex-1">
								<p className="font-bold text-lg">89</p>
								<p className="text-xs text-gray-600">Active Sellers</p>
							</div>
							<div className="bg-[var(--purple-color)]/10 p-2 rounded-xl">
								<Users className="text-[var(--purple-color)] w-5 h-5" />
							</div>
						</div>
						<div className="p-4 rounded-lg bg-white flex items-center gap-4 min-w-[140px]">
							<div className="flex-1">
								<p className="font-bold text-lg">2hrs</p>
								<p className="text-xs text-gray-600">Avg. Response</p>
							</div>
							<div className="bg-[var(--orange-color)]/10 p-2 rounded-xl">
								<TrendingUp className="text-[var(--orange-color)] w-5 h-5" />
							</div>
						</div>
					</div>
				</div>

				{/* Categories Section - Mobile Optimized */}
				<div className="p-3 bg-white rounded-xl">
					<div className="flex items-center gap-2">
						<button className="p-1 rounded-lg hover:bg-gray-100">
							<ChevronLeft className="w-5 h-5" />
						</button>

						<div className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide">
							<div className="py-2 px-3 rounded-lg bg-[var(--primary-color)] text-white flex items-center gap-1.5 shrink-0">
								<p className="whitespace-nowrap text-sm">All Categories</p>
								<p className="bg-[#0dd884] px-1.5 py-0.5 rounded text-xs">156</p>
							</div>
							<div className="py-2 px-3 rounded-lg border border-gray-300 flex items-center gap-1.5 shrink-0">
								<p className="whitespace-nowrap text-sm">Fashion</p>
								<p className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs">23</p>
							</div>
							<div className="py-2 px-3 rounded-lg border border-gray-300 flex items-center gap-1.5 shrink-0">
								<p className="whitespace-nowrap text-sm">Food</p>
								<p className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs">28</p>
							</div>
							<div className="py-2 px-3 rounded-lg border border-gray-300 flex items-center gap-1.5 shrink-0">
								<p className="whitespace-nowrap text-sm">Electronics</p>
								<p className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs">15</p>
							</div>
						</div>

						<button className="p-1 rounded-lg hover:bg-gray-100">
							<ChevronRight className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Products Grid - Mobile Optimized */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
					{postDetails.map((post) => (
						<div
							key={post.id}
							className="rounded-xl overflow-hidden border bg-white border-gray-200 hover:shadow-md transition-shadow">
							<div className="h-48 bg-gray-200 relative">
								<Image
									className="object-cover object-center w-full h-full"
									src={post.image}
									height={400}
									width={300}
									alt={post.name}
									priority={post.id <= 2}
								/>
								<div className="absolute top-2 right-2">
									<LikePost />
								</div>
							</div>
							<div className="p-3 space-y-2">
								<div className="flex justify-between items-start gap-2">
									<span className="text-xs py-1 px-2 border border-gray-200 rounded-md bg-gray-50">
										{post.tag}
									</span>
									<p className="text-[var(--primary-color)] font-semibold text-sm">${post.price}</p>
								</div>

								<Link
									href={`/marketplace/${post.name.replace(/ /g, "-") + "-" + post.id}`}
									// prefetch={true}
									className="text-sm font-medium line-clamp-2 leading-tight">
									{post.name}
								</Link>

								<div className="flex items-center gap-2 pt-1">
									<div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
										<Image
											className="object-cover w-full h-full"
											src={post.userImage}
											height={32}
											width={32}
											alt={post.userName}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium truncate">{post.userName}</p>
										<div className="flex items-center gap-1 text-xs text-gray-500">
											<MapPin className="w-3 h-3" />
											<span className="truncate">{post.location}</span>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-between pt-1">
									<div className="flex items-center gap-1">
										<div className="flex gap-0.5">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-3 h-3 ${
														i < post.starRating
															? "fill-amber-400 text-amber-400"
															: "fill-gray-300 text-gray-300"
													}`}
												/>
											))}
										</div>
										<span className="text-xs text-gray-500 ml-1">({post.verifiedRatingCount})</span>
									</div>

									<div className="flex items-center gap-3 text-gray-500">
										<div className="flex items-center gap-1">
											<Eye className="w-3 h-3" />
											<span className="text-xs">{post.viewCount}</span>
										</div>
										<div className="flex items-center gap-1">
											<Heart className="w-3 h-3" />
											<span className="text-xs">{post.likeCount}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Right Sidebar - Hidden on Mobile */}
			<section className="space-y-8 sticky top-0 h-screen pt-4 hidden md:block">
				<div className="bg-white p-4 rounded-lg space-y-4">
					<h2 className="font-semibold">Quick Action</h2>
					<div className="space-y-2">
						<Link
							href={"/marketplace/create-listing"}
							className="flex items-center gap-2 justify-center p-2 rounded-lg text-sm text-center border border-gray-200 bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90 transition-colors">
							<Plus className="w-5 h-5" />
							<span>Create Listing</span>
						</Link>
						<Link
							href={"/marketplace"}
							className="flex items-center gap-2 justify-center p-2 rounded-lg text-sm text-center border border-gray-200 hover:bg-gray-50 transition-colors">
							<TrendingUp className="w-5 h-5 text-[var(--primary-color)]" />
							<span>View Analytics</span>
						</Link>
					</div>
				</div>

				<div className="bg-white p-4 rounded-lg space-y-4">
					<h2 className="flex gap-2 items-center font-semibold">
						<span>Community stats</span>
						<ChartNoAxesColumnIncreasing className="w-5 h-5 text-[var(--primary-color)]" />
					</h2>
					<div className="space-y-3">
						<div className="flex justify-between items-center py-2 border-b border-gray-100">
							<p className="text-sm">Active Members</p>
							<p className="font-semibold">2,847</p>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-gray-100">
							<p className="text-sm">Posts today</p>
							<p className="font-semibold">127</p>
						</div>
						<div className="flex justify-between items-center py-2">
							<p className="text-sm">Events This Week</p>
							<p className="font-semibold">8</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-4 rounded-lg space-y-4">
					<h2 className="font-semibold">Popular Categories</h2>
					<div className="space-y-3">
						<div className="flex justify-between items-center py-2 border-b border-gray-100">
							<p className="text-sm">Fashion</p>
							<p className="font-semibold text-sm">28</p>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-gray-100">
							<p className="text-sm">Services</p>
							<p className="font-semibold text-sm">34</p>
						</div>
						<div className="flex justify-between items-center py-2 border-b border-gray-100">
							<p className="text-sm">Food</p>
							<p className="font-semibold text-sm">23</p>
						</div>
						<div className="flex justify-between items-center py-2">
							<p className="text-sm">Housing</p>
							<p className="font-semibold text-sm">8</p>
						</div>
					</div>

					<hr className="border-gray-200 my-4" />

					<div className="space-y-3">
						<h2 className="font-semibold">Quick Links</h2>
						<div className="space-y-2">
							<Link
								href="#"
								className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
								<MapPin className="w-4 h-4 text-gray-600" />
								<p className="text-sm">Find Local Events</p>
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
								<UsersRound className="w-4 h-4 text-gray-600" />
								<p className="text-sm">Join Groups</p>
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
								<BriefcaseConveyorBelt className="w-4 h-4 text-gray-600" />
								<p className="text-sm">Browse Jobs</p>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
