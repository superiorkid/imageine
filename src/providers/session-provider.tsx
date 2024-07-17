"use client";

import type { Session, User } from "lucia";
import type React from "react";
import { createContext, useContext } from "react";

interface SessionProps {
	user: User | null;
	session: Session | null;
}

interface SessionProviderProps {
	children: React.ReactNode;
	value: SessionProps;
}

const SessionContext = createContext<SessionProps>({} as SessionProps);

const SessionProvider = ({ children, value }: SessionProviderProps) => {
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
};

export const useSession = () => {
	const sessionContext = useContext(SessionContext);

	if (!sessionContext) {
		throw new Error("useSession must be used within a SessionProvider");
	}

	return sessionContext;
};

export default SessionProvider;
