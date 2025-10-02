"use client";

export default function Badge({ value }: { value: number }) {
    return <span className={`${value === 0 ? "hidden" : ""} flex items-center justify-center text-xs h-5 px-1 rounded-md ml-auto text-white bg-red-500`}>{value}</span>;
}
