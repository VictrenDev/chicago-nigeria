import { Toaster } from "sonner";
import "../globals.css";
import SideNavigation from "./components/navigation";
import TopNavigation from "./components/topnavigation";

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
