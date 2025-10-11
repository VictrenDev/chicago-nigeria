import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Product({ params }: { params: { productId: string } }) {
	const { productId } = await params;
	return (
		<main className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 md:gap-12">
			<section className="space-y-4 pt-4">
				{/* Header Section - Mobile Optimized */}
				<Link href={"/marketplace"} className="flex items-center gap-4">
					<ArrowLeft />
					<div>
						<p>Back to marketplace</p>
						<p className="text-xl font-semibold">Product Details</p>
					</div>
				</Link>

				{/* Product image section */}
				<section className="bg-white rounded-xl overflow-clip space-y-4">
					{/* Main image */}
					<div className="md:h-100 bg-gray">
						<Image
							className="object-cover object-top w-full h-full"
							src={"/post-img-1.webp"}
							height={400}
							width={300}
							alt={"post image"}
							priority={true}
						/>
					</div>
					{/* Other images */}
					<div className="flex justify-around">
						<div className="h-30 w-40 rounded-xl bg-gray-400 overflow-clip">
							<Image
								className="object-cover object-center w-full h-full"
								src={"/post-img-1.webp"}
								height={400}
								width={300}
								alt={"post image"}
								priority={true}
							/>
						</div>
						<div className="h-30 w-40 rounded-xl bg-gray-400 overflow-clip">
							<Image
								className="object-cover object-center w-full h-full"
								src={"/post-img-1.webp"}
								height={400}
								width={300}
								alt={"post image"}
								priority={true}
							/>
						</div>
						<div className="h-30 w-40 rounded-xl bg-gray-400 overflow-clip">
							<Image
								className="object-cover object-center w-full h-full"
								src={"/post-img-1.webp"}
								height={400}
								width={300}
								alt={"post image"}
								priority={true}
							/>
						</div>
					</div>
				</section>
			</section>

			{/* Right Sidebar - Hidden on Mobile */}
			<section className="space-y-8 sticky top-0 h-screen pt-4 hidden md:block"></section>
		</main>
	);
}
