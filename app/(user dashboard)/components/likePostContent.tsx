"use client";
import { Heart } from "lucide-react";
import { useState } from "react";
export default function LikePost({ className }: { className: string }) {
	const [likeStatus, setLikeStatus] = useState<boolean>(false);
	return (
		<button
			onClick={() => setLikeStatus((currentStatus) => !currentStatus)}
			className="cursor-pointer flex items-center justify-center rounded-full bg-white">
			<Heart
				aria-label="like post"
				className={`${
					likeStatus ? "fill-red-500 text-red-500" : ""
				} text-light text-gray-600 stroke-1 transition-colors duration-100 ${className ?? ""}`}
			/>
		</button>
	);
}
