"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, Suspense } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "../store/useSession";
import { Loader } from "./loader";
import { innaccessibleByAuthUsers, restrictedRoutes } from "../constants";

const ProtectInner = ({ children }: { children: ReactNode }) => {
	const path = usePathname();
	const router = useRouter();
	const queryParams = useSearchParams();
	const { user, loading } = useSession((state) => state);

	if (loading && !path) return <Loader />;

	console.log(" <====  Protect checking auth  ===> ");

	const redirect = (route: string, message?: string) => {
		if (message) {
			console.log(message);
			toast.error(message);
		}

		setTimeout(() => {
			router.push(route);
		}, 500);
	};

	const isNotAccessibleByAuthUsers = innaccessibleByAuthUsers.includes(path);

	if (isNotAccessibleByAuthUsers && user) {
		redirect("/marketplace", "You cannot access this page!");
		return <Loader />;
	}

	if (!isNotAccessibleByAuthUsers && !user) {
		console.log(
			"🛡️ Redirecting: Unauthenticated user trying to access protected page",
		);

		redirect("/signin", "Please sign in to access this page");

		return <Loader />;
	}

	if (restrictedRoutes.includes(path)) {
		const isAuthenticated = queryParams.get("authenticated");

		if (!isAuthenticated) {
			console.log(
				"🛡️ Redirecting: Restricted route without authentication",
			);

			redirect("/signin", "Please sign in to access this page");

			return <Loader />;
		}
	}

	console.log("🛡️ Access granted to:", path);

	console.log(" <====  🛡️ Access granted  ===> ");
	return children;
};

export const Protect = ({ children }: { children: ReactNode }) => {
	return (
		<Suspense fallback={<Loader/>}>
			<ProtectInner>{children}</ProtectInner>
		</Suspense>
	);
};
