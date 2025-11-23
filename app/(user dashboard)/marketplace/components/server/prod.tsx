"use client";

import { Eye, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LikePost from "../../../components/likePost";
import { IListing } from "@/app/types";

import { useListing } from "@/hooks/useListing";

const PostCard = ({ post }: { post: IListing }) => (
	<div className="rounded-xl overflow-hidden border bg-white border-gray-200 hover:shadow-md transition-shadow">
		<div className="h-48 bg-gray-200 relative">
			<Image
				className="object-cover object-center w-full h-full"
				src={
					post.photos.length === 0
						? "/image-placeholder.webp"
						: post.photos[0]
				}
				height={400}
				width={300}
				alt={post.photos.length === 0 ? "Product Photo" : post.title}

				// priority={post._id <= 2}
			/>
			<div className="absolute top-2 right-2">
				<LikePost />
			</div>
		</div>

		<div className="p-3 space-y-2">
			<div className="flex justify-between items-start gap-2">
				<span className="text-xs py-1 px-2 border border-gray-200 rounded-md bg-gray-50">
					{!post.tags.length === 0 ? "" : post.tags.join()}
				</span>
				<p className="text-[var(--primary-color)] font-semibold text-sm">
					${post.price}
				</p>
			</div>

			<Link
				href={`/marketplace/${post.title.replace(/ /g, "-")}-${post._id}`}
				className="text-sm font-medium line-clamp-2 leading-tight hover:text-[var(--primary-color)] transition-colors"
			>
				{post.title}
			</Link>

			<div className="flex items-center gap-2 pt-1">
				<div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
					<Image
						className="object-cover w-full h-full"
						src={
							post.photos.length === 0
								? "/user-placeholder.webp"
								: post.photos[0]
						}
						height={32}
						width={32}
						alt={
							post.photos.length === 0
								? "User Image"
								: post.photos[0]
						}
					/>
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-xs font-medium truncate">john okafor</p>
					<div className="flex items-center gap-1 text-xs text-gray-500">
						<MapPin className="w-3 h-3" />
						<span className="truncate">{post.location}</span>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between pt-1">
				<div className="flex items-center gap-1">
					<div className="flex gap-0.5">
						{[...Array(5)].map((_, index) => (
							<Star
								key={index}
								className={`w-3 h-3 ${
									index < post.ratings
										? "fill-amber-400 text-amber-400"
										: "fill-gray-300 text-gray-300"
								}`}
							/>
						))}
					</div>
					<span className="text-xs text-gray-500 ml-1">
						({post.ratings})
					</span>
				</div>

				<div className="flex items-center gap-3 text-gray-500">
					<div className="flex items-center gap-1">
						<Eye className="w-3 h-3" />
						<span className="text-xs">{post.ratings}</span>
					</div>
					<div className="flex items-center gap-1">
						<Heart className="w-3 h-3" />
						<span className="text-xs">{post.totalLikes}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const PostCardSkeleton = () => (
	<div className="rounded-xl overflow-hidden border bg-white border-gray-200 animate-pulse">
		<div className="h-48 bg-gray-300" />
		<div className="p-3 space-y-3">
			<div className="flex justify-between">
				<div className="h-4 bg-gray-300 rounded w-16" />
				<div className="h-4 bg-gray-300 rounded w-12" />
			</div>
			<div className="h-4 bg-gray-300 rounded w-full" />
			<div className="h-4 bg-gray-300 rounded w-3/4" />
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-gray-300 rounded-full" />
				<div className="space-y-1 flex-1">
					<div className="h-3 bg-gray-300 rounded w-20" />
					<div className="h-3 bg-gray-300 rounded w-16" />
				</div>
			</div>
		</div>
	</div>
);

const ErrorMessage = ({ error }: { error: Error }) => (
	<div className="text-center py-8 text-red-600">
		<p>Error loading posts: {error.message}</p>
		<button
			onClick={() => window.location.reload()}
			className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
		>
			Retry
		</button>
	</div>
);

const EmptyState = () => (
	<div className="text-center py-12">
		<div className="text-gray-400 mb-4">
			<Heart className="w-16 h-16 mx-auto" />
		</div>
		<h3 className="text-lg font-medium text-gray-900 mb-2">
			No posts found
		</h3>
		<p className="text-gray-500">
			Check back later for new marketplace items.
		</p>
	</div>
);

export default function MarketplaceProducts() {
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: "100px",
	});

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		error,
	} = useListing();

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const allPosts = data?.pages.flatMap((page) => page?.data?.data.data) || [];

	if (status === "pending") {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
				{Array.from({ length: 4 }).map((_, index) => (
					<PostCardSkeleton key={index} />
				))}
			</div>
		);
	}

	// Render error state
	if (status === "error" && error) {
		return <ErrorMessage error={error} />;
	}

	// Render empty state
	if (allPosts.length === 0) {
		return <EmptyState />;
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
				{allPosts.map((post, index) => {
					if (!post) return null;
					return <PostCard key={post?._id} post={post!} />;
				})}
			</div>

			{/* Loading indicator and intersection observer target */}
			<div ref={ref} className="mt-8">
				{isFetchingNextPage && (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
						{Array.from({ length: 2 }).map((_, index) => (
							<PostCardSkeleton key={index} />
						))}
					</div>
				)}

				{!hasNextPage && allPosts.length > 0 && (
					<div className="text-center py-8 text-gray-500">
						You&apos;ve reached the end of the list
					</div>
				)}
			</div>
		</>
	);
}
