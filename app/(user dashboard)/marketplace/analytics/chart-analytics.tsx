"use client"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";

const lineData = [
	{ date: "Oct 8", value: 5 },
	{ date: "Oct 22", value: 10 },
	{ date: "Nov 12", value: 17 },
];

const pieData = [
	{ name: "Fashion", value: 40, color: "#6366F1" },
	{ name: "Services", value: 25, color: "#F97316" },
	{ name: "Food", value: 20, color: "#10B981" },
	{ name: "Education", value: 10, color: "#F59E0B" },
	{ name: "Others", value: 5, color: "#6B7280" },
];
export default function ChartAnalytics() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div className="bg-white rounded-2xl shadow p-4">
				<h3 className="font-semibold text-gray-700 mb-2">Listing Growth</h3>
				<ResponsiveContainer width="100%" height={200}>
					<LineChart data={lineData}>
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="value"
							stroke="#6366F1"
							strokeWidth={3}
							dot={{ r: 5 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center">
				<h3 className="font-semibold text-gray-700 mb-4">
					Category Distribution
				</h3>
				<ResponsiveContainer width="100%" height={220}>
					<PieChart>
						<Pie data={pieData} dataKey="value" outerRadius={80} label>
							{pieData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
