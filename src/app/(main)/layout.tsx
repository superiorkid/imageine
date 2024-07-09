import type React from "react";
import Navbar from "./_components/navbar";

interface MainLayoutProps {
	children: Readonly<React.ReactNode>;
}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default MainLayout;
