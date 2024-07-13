import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ReactQueryClientProvider } from "@/providers/react-query-client-provider";
import { SearchStoreProvider } from "@/providers/search-store-provider";
import type { Metadata } from "next";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { ArrowLeftRightIcon } from "lucide-react";
import SwitchNav from "./_components/switch-nav";

export const metadata: Metadata = {
	title: "Imageine",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn("bg-background antialiased min-h-screen relative")}>
				<ReactQueryClientProvider>
					<SearchStoreProvider>
						{children}
						<SwitchNav />
						<Toaster />
					</SearchStoreProvider>
				</ReactQueryClientProvider>
			</body>
		</html>
	);
}
