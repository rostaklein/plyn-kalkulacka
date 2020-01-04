import React, { useReducer, useContext, useEffect, useState } from 'react';

import { reducer, AppState, Action, ActionTypes } from './reducer';
import { persistCurrentState, tryLoadingPersistedState } from './persistState';

type Context = {
	state: AppState;
	dispatch: React.Dispatch<Action>;
};
const AppContext = React.createContext<Context | undefined>(undefined);

export const defaultState: AppState = {
	list: [],
	unitPrice: null,
	title: 'Kalkulačka spotřeby plynu',
	isInitialized: false,
};

export const AppContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, defaultState);
	const [isInitialized, setIsInitialized] = useState(defaultState.isInitialized);

	useEffect(() => {
		if (state !== defaultState) {
			persistCurrentState(state);
		}
	}, [state]);

	useEffect(() => {
		tryLoadingPersistedState().then((appState) => {
			if (appState) {
				dispatch({ type: ActionTypes.INIT_STATE, state: appState });
			}
			setIsInitialized(true);
		});
	}, []);

	return (
		<AppContext.Provider value={{ state: { ...state, isInitialized }, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error('App context not defined while accessing it');
	}

	return context;
};

export const useAppState = () => useAppContext().state;
export const useAppDispatch = () => useAppContext().dispatch;
