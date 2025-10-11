"use client";
import { BookmarkIcon } from "lucide-react";
import { useState } from "react";
export default function SavePost({ className }: { className?: string }) {
	const [likeStatus, setLikeStatus] = useState<boolean>(false);
	return (
		<button
			onClick={() => setLikeStatus((currentStatus) => !currentStatus)}
			className={`${className ?? ""} cursor-pointer rounded-full bg-white`}>
			<BookmarkIcon
				aria-label="like post"
				className={`${
					likeStatus ? "fill-gray-500" : ""
				} text-light text-gray-600 stroke-1 w-6 h-6 transition-colors duration-100 $`}
			/>
		</button>
	);
}
