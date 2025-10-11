"use client";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Image as ImageIcon, Upload } from "lucide-react";

type CustomPhotoInputProps = {
	name: string;
	label?: string;
};

export function CustomPhotoInput({ name, label }: CustomPhotoInputProps) {
	const { register } = useFormContext();
	const [fileName, setFileName] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) setFileName(file.name);
	};

	return (
		<div className="w-full ">
			{label && <p className="mb-2text-sm md:text-base font-semibold mb-1">{label}</p>}

			<label
				htmlFor={name}
				className="group cursor-pointer flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 transition-all duration-200 py-10">
				{/* Top icon */}
				<div className="text-gray-500 group-hover:text-[var(--primary-color)] transition-colors">
					<ImageIcon size={36} />
				</div>

				{/* Center text */}
				<p className="text-gray-600 text-center">
					{fileName ? (
						<span className="font-medium text-[var(--primary-color)]">{fileName}</span>
					) : (
						<>
							<span className="block font-medium">Click to upload</span>
							<span className="text-sm text-gray-400">or drag and drop</span>
						</>
					)}
				</p>

				{/* Button */}
				<button
					type="button"
					className="mt-3 inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-color)]/90 transition">
					<Upload size={16} />
					Choose File
				</button>

				{/* Hidden input */}
				<input
					type="file"
					id={name}
					{...register(name, { required: `${name} is required` })}
					onChange={handleChange}
					className="hidden"
					accept="image/*"
				/>
			</label>
		</div>
	);
}
