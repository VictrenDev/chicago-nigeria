import { Toaster } from "sonner";
import "../globals.css";
import SideNavigation from "./components/navigation";
import TopNavigation from "./components/topnavigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Chicago Nigeria",
	description: "Chicago Nigeria is a web platform to connect Nigerians who reside in Chicago together",
	icons: {
		icon: "/favicon_io/favicon.ico",
		shortcut: "/favicon_io/favicon-32x32.png",
		apple: "/favicon_io/favicon-32x32.png",
	},
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
                <TopNavigation/>
				<Toaster richColors={true} position="top-center"/>
				<SideNavigation>{children}</SideNavigation>
			</body>
		</html>
	);
}
