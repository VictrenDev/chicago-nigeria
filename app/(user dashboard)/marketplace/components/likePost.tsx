"use client";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function LikePost() {
	const [likeStatus, setLikeStatus] = useState<boolean>(false);
	return (
		<button
			onClick={() => setLikeStatus((currentStatus) => !currentStatus)}
			className="absolute cursor-pointer right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white">
			<Heart
				className={`${
					likeStatus ? "fill-red-500 text-red-500" : ""
				} transition-colors duration-100`}
			/>
		</button>
	);
}
