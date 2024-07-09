import type React from "react";

interface AuthLayoutProps {
	children: Readonly<React.ReactNode>;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return <div>{children}</div>;
};

export default AuthLayout;
