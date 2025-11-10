"use client";

import { BookOpen, Briefcase, Check, Globe2, Heart, Landmark, Music, PartyPopper, Users, Utensils } from "lucide-react";
import { useState } from "react";

const interestsList = [
	{ id: 1, label: "Professional Networking", icon: <Briefcase size={18} /> },
	{ id: 2, label: "Business & Entrepreneurship", icon: <Users size={18} /> },
	{
		id: 3,
		label: "Nigerian culture & Heritage",
		icon: <Landmark size={18} />,
	},
	{ id: 4, label: "Education & Learning", icon: <BookOpen size={18} /> },
	{
		id: 5,
		label: "Social Events & Parties",
		icon: <PartyPopper size={18} />,
	},
	{ id: 6, label: "Music & Entertainment", icon: <Music size={18} /> },
	{ id: 7, label: "Travel & Tourism", icon: <Globe2 size={18} /> },
	{ id: 8, label: "Food and Dining", icon: <Utensils size={18} /> },
];

export default function Prefrences() {
	const [selected, setSelected] = useState<number[]>([]);
	const toggleSelect = (id: number) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);
	};
	return (
		<main className="flex items-center justify-center min-h-screen">
			<div className="max-w-xl mx-auto bg-white py-8 px-6 w-full text-center">
				{/* Header */}
				<div className="flex justify-center mb-3">
					<div className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center">
						<Heart className="stroke-[var(--primary-color)]" />
					</div>
				</div>

				<h1 className="text-lg font-semibold mb-1">
					What Interests you?
				</h1>
				<p className="text-gray-500 text-sm mb-8">
					Select interests to personalize your experience
				</p>

				{/* Interests grid */}
				<div className="grid md:grid-cols-2 gap-3 text-left">
					{interestsList.map((interest) => {
						const isActive = selected.includes(interest.id);
						return (
							<button
								key={interest.id}
								type="button"
								onClick={() => toggleSelect(interest.id)}
								className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition-all ${
									isActive
										? "border-green-600 bg-green-50 ring-1 ring-green-500"
										: "border-gray-200 hover:bg-gray-50"
								}`}
							>
								<div className="text-green-600">
									{interest.icon}
								</div>
								<span className="flex-1 text-left text-gray-700">
									{interest.label}
								</span>
								{isActive && (
									<Check
										size={16}
										className="text-green-600 shrink-0"
									/>
								)}
							</button>
						);
					})}
				</div>

				{/* Footer text */}
				<p className="text-gray-500 text-xs mt-6">
					Selected {selected.length} interest
					{selected.length !== 1 && "s"}. You can change these later.
				</p>
				{/*<button
					type="button"
					onClick={next}
					disabled={isAnimating}
					className="bg-[var(--primary-color)] text-white py-3 rounded-lg flex justify-center items-center gap-2 w-full mt-8 mb-4 hover:bg-[var(--primary-color)]/90 disabled:opacity-50 transition-all duration-200"
				>
					<span>Complete Registration</span>
					<ArrowRight className="w-4 h-4" />
				</button>*/}
			</div>
		</main>
	);
}
