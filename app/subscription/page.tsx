"use client";

import Image from "next/image";
import { useState } from "react";

export default function SocialSubscriptionPage() {
	const [hasAccounts, setHasAccounts] = useState<"yes" | "no" | "">("");

	return (
		<main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
			<div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
				<a
					href="/"
					className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
				>
					← Back to Homepage
				</a>

				<div className="text-center mb-8">
					<Image
						src="/chicago-nigeria-logo-1.png"
						alt="Company Logo"
						className="w-20 mx-auto mb-3 h-12"
						width={159}
						height={82}
					/>
					<h1 className="text-2xl font-semibold">
						Social Media Management Subscription
					</h1>
					<p className="text-gray-500 mt-1">
						Let’s Help Your Business Grow Online — Our plan:{" "}
						<span className="font-semibold text-green-600">
							$65/month
						</span>
					</p>
				</div>

				{/* Business Information */}
				<section className="mb-8">
					<h2 className="text-lg font-semibold mb-3">
						Business Information
					</h2>
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Business Name*
							</label>
							<input
								type="text"
								placeholder="Enter your business name"
								className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Business Type/Category*
							</label>
							<select className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500">
								<option>Select a category</option>
								<option>Retail</option>
								<option>Restaurant</option>
								<option>Tech</option>
								<option>Other</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Do you have existing social media accounts?*
							</label>
							<div className="flex gap-6">
								<label className="flex items-center gap-2">
									<input
										type="radio"
										name="hasAccounts"
										value="yes"
										checked={hasAccounts === "yes"}
										onChange={() => setHasAccounts("yes")}
									/>
									<span>
										Yes, I have existing social media
										accounts
									</span>
								</label>
								<label className="flex items-center gap-2">
									<input
										type="radio"
										name="hasAccounts"
										value="no"
										checked={hasAccounts === "no"}
										onChange={() => setHasAccounts("no")}
									/>
									<span>
										No, please create and manage accounts
										for me
									</span>
								</label>
							</div>
						</div>

						{hasAccounts === "yes" && (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
								<input
									type="text"
									placeholder="Instagram handle"
									className="border rounded-lg p-2"
								/>
								<input
									type="text"
									placeholder="Facebook page"
									className="border rounded-lg p-2"
								/>
								<input
									type="text"
									placeholder="TikTok handle"
									className="border rounded-lg p-2"
								/>
								<input
									type="text"
									placeholder="LinkedIn profile"
									className="border rounded-lg p-2"
								/>
							</div>
						)}
					</div>
				</section>

				{/* Contact Information */}
				<section className="mb-8">
					<h2 className="text-lg font-semibold mb-3">
						Contact Information
					</h2>
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Business Email*
							</label>
							<input
								type="email"
								placeholder="example@email.com"
								className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Business Phone Number*
							</label>
							<input
								type="tel"
								placeholder="+1 (555) 000-0000"
								className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Brief Description of Business*
							</label>
							<textarea
								placeholder="Tell us about your business, products, and audience..."
								rows={3}
								className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 resize-none"
							></textarea>
						</div>
					</div>
				</section>

				{/* Subscription Summary */}
				<div className="bg-green-600 text-white rounded-xl p-5 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
					<div>
						<h3 className="text-xl font-semibold">
							Monthly Service Fee
						</h3>
						<p className="text-2xl font-bold">
							$65
							<span className="text-base font-normal">
								/month
							</span>
						</p>
						<p className="text-sm opacity-90">
							Includes social media account management
						</p>
					</div>
					<ul className="text-sm mt-4 sm:mt-0 space-y-1">
						<li>✓ Daily content posting</li>
						<li>✓ Community engagement</li>
						<li>✓ Monthly analytics report</li>
						<li>✓ Strategy consultation</li>
					</ul>
				</div>

				<button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
					Subscribe Now
				</button>

				<p className="text-center text-sm text-gray-500 mt-6">
					Questions? Contact us at{" "}
					<a
						href="mailto:support@chicagonaijangardens.com"
						className="text-green-600 underline"
					>
						support@chicagonaijangardens.com
					</a>
				</p>

				<p className="text-center text-xs text-gray-400 mt-2">
					© 2025 Chicago Naija Gardens. All rights reserved.
				</p>
			</div>
		</main>
	);
}
