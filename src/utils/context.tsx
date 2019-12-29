import React, { useReducer, useContext } from 'react';
import { reducer, AppState, Action } from './reducer';
import moment from 'moment';
import { Record } from '../App';

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
	return (
		<AppContext.Provider value={{ state, dispatch }}>
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
