// components/loader.tsx
"use client";

export default function FormFieldErrorMessage({
	error,
}: {
	error?: { message?: string };
}) {
	if (!error || !error.message) return null;
	return <p className="text-red-500 text-xs my-1">{error.message}</p>;
}
