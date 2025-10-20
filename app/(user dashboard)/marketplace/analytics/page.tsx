import Link from "next/link";
import {
	BriefcaseConveyorBelt,
	ChartNoAxesColumnIncreasing,
	MapPin,
	UsersRound,
} from "lucide-react";
import ChartAnalytics from "./chart-analytics";

export default function DashboardPage() {
	return (
		<main className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 md:gap-12">
			<div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-6">
				{/* Top Stats */}
				<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
					<StatCard title="Total Listings" value="12" sub="2 Active Listings" />
					<StatCard
						title="Total Views"
						value="3,247"
						sub="+15.3% Last 30 Days"
						highlight
					/>
					<StatCard title="Inquiries" value="89" sub="+2.2% Message Received" />
					<StatCard
						title="Conversion Rate"
						value="2.7%"
						sub="-0.3% Views to Inquiries"
					/>
				</div>

				{/* Chart and Category Breakdown */}
				<ChartAnalytics />

				{/* Boost Section */}
				<div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-center space-y-3">
					<h3 className="text-lg font-semibold text-gray-700">
						Boost Your Performance
					</h3>
					<p className="text-gray-500 text-sm">
						Get more visibility and inquiries with premium features
					</p>
					<div className="flex justify-center gap-4 flex-wrap">
						<button className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-5 py-2">
							Boost Listing
						</button>
						<button className="rounded-xl px-5 py-2">Create New Listing</button>
					</div>
				</div>
			</div>
			{/* Right Sidebar - Hidden on Mobile */}
			<section className="space-y-8 sticky top-0 h-screen pt-4 hidden md:block">
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
								className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<MapPin className="w-4 h-4 text-gray-600" />
								<p className="text-sm">Find Local Events</p>
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<UsersRound className="w-4 h-4 text-gray-600" />
								<p className="text-sm">Join Groups</p>
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
							>
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

function StatCard({
	title,
	value,
	sub,
	highlight,
}: {
	title: string;
	value: string;
	sub: string;
	highlight?: boolean;
}) {
	return (
		<div
			className={`bg-white rounded-2xl shadow p-4 flex flex-col ${highlight ? "border-l-4 border-indigo-500" : ""}`}
		>
			<h4 className="text-gray-500 text-sm">{title}</h4>
			<p className="text-2xl font-semibold text-gray-800">{value}</p>
			<span className="text-xs text-gray-400">{sub}</span>
		</div>
	);
}

function PerformanceCard({
	title,
	value,
	sub,
	highlight,
}: {
	title: string;
	value: string;
	sub: string;
	highlight?: boolean;
}) {
	return (
		<div
			className={`p-4 rounded-xl border ${highlight ? "bg-indigo-50 border-indigo-200" : "bg-gray-50 border-gray-100"}`}
		>
			<h4 className="text-sm text-gray-500">{title}</h4>
			<p className="text-xl font-semibold text-gray-800">{value}</p>
			<span className="text-xs text-gray-400">{sub}</span>
		</div>
	);
}

function TipCard({
	color,
	text,
	sub,
}: {
	color: "green" | "blue" | "yellow";
	text: string;
	sub: string;
}) {
	const colors = {
		green: "bg-green-50 border-green-100",
		blue: "bg-blue-50 border-blue-100",
		yellow: "bg-yellow-50 border-yellow-100",
	};

	return (
		<div className={`p-4 rounded-xl border ${colors[color]} text-sm`}>
			<p className="font-semibold text-gray-700">{text}</p>
			<p className="text-gray-500 text-xs">{sub}</p>
		</div>
	);
}
