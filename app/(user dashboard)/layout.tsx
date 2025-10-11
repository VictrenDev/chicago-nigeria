import "../globals.css";
import SideNavigation from "./components/navigation";
import TopNavigation from "./components/topnavigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
                <TopNavigation/>
				<SideNavigation>{children}</SideNavigation>
			</body>
		</html>
	);
}
