"use client";

import queryClient from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ReactQueryClientProviderProps {
	children: Readonly<React.ReactNode>;
}

export const ReactQueryClientProvider = ({
	children,
}: ReactQueryClientProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
