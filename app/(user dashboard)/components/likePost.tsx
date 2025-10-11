"use client";
import { Heart } from "lucide-react";
import { HTMLAttributes, useState } from "react";
export default function LikePost({ className }: { className?: HTMLAttributes<HTMLButtonElement> }) {
	const [likeStatus, setLikeStatus] = useState<boolean>(false);
	const likePost = (e: React.MouseEvent) => {
		e.preventDefault()
		setLikeStatus((currentStatus) => !currentStatus);
		e.stopPropagation();
	};
	return (
		<button
			onClick={likePost}
			className="absolute cursor-pointer right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white">
			<Heart
				aria-label="like post"
				className={`${
					likeStatus ? "fill-red-500 text-red-500" : ""
				} text-light text-gray-600 stroke-1 transition-colors duration-100 ${className ?? ""}`}
			/>
		</button>
	);
}
