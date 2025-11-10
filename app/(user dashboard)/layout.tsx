import AuthProvider from "../components/provider/authProvider";
import SideNavigation from "./components/navigation";
import TopNavigation from "./components/topnavigation";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<AuthProvider>
				<TopNavigation />
				<SideNavigation>{children}</SideNavigation>
			</AuthProvider>
		</>
	);
}
