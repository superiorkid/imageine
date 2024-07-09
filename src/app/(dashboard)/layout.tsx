import type React from "react";

interface DashboardLayoutProps {
	children: Readonly<React.ReactNode>;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return <div>{children}</div>;
};

export default DashboardLayout;
