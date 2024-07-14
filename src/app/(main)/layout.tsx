import type React from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

interface MainLayoutProps {
	children: Readonly<React.ReactNode>;
	modal: Readonly<React.ReactNode>;
}

const MainLayout = ({ children, modal }: MainLayoutProps) => {
	return (
		<div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
			<header className="py-5 sticky top-0 bg-background z-10">
				<Navbar />
			</header>
			<main className="">{children}</main>
			{modal}
			<footer className="border-t mt-8 py-6">
				<Footer />
			</footer>
		</div>
	);
};

export default MainLayout;
