import React, { useReducer, useContext, useEffect } from 'react';
import moment from 'moment';

import { Record } from '../App';

import { reducer, AppState, Action, ActionTypes } from './reducer';
import { persistCurrentState, tryLoadingPersistedState } from './persistState';

type Context = {
	state: AppState;
	dispatch: React.Dispatch<Action>;
};
const AppContext = React.createContext<Context | undefined>(undefined);

const dummyRecords: Record[] = [
	{
		date: moment().add(-10, 'days'),
		value: 4484,
	},
	{
		date: moment().add(-5, 'days'),
		value: 4552,
	},
	{
		date: moment().add(-1, 'days'),
		value: 4584,
	},
];

const defaultState: AppState = { list: dummyRecords, unitPrice: null };

export const AppContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, defaultState);

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
		});
	}, []);

	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
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
