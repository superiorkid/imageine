import { createStore } from "zustand/vanilla";

export type SearchState = {
	searchTerm: string;
};

export type SearchActions = {
	setSearchTerm: (searchTermInput: string) => void;
};

export type SearchStore = SearchActions & SearchState;

export const defaultInitState: SearchState = {
	searchTerm: "",
};

export const createSearchStore = (
	initState: SearchState = defaultInitState,
) => {
	return createStore<SearchStore>()((set) => ({
		...initState,
		setSearchTerm: (searchTermInput) =>
			set((state) => ({ searchTerm: searchTermInput })),
	}));
};
