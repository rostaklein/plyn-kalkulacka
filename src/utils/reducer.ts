import { Record } from '../App';

export type AppState = {
	list: Record[];
	unitPrice: number | null;
};

export enum ActionTypes {
	ADD_RECORD = 'ADD_RECORD',
	DELETE_RECORD = 'DELETE_RECORD',
	SET_UNIT_PRICE = 'SET_UNIT_PRICE',
	INIT_STATE = 'INIT_STATE',
}

type AddRecordAction = {
	type: ActionTypes.ADD_RECORD;
	record: Record;
};

type DeleteRecordAction = {
	type: ActionTypes.DELETE_RECORD;
	recordIndex: number;
};

type SetUnitPriceAction = {
	type: ActionTypes.SET_UNIT_PRICE;
	unitPrice: number;
};

type InitStateAction = {
	type: ActionTypes.INIT_STATE;
	state: AppState;
};

export type Action = AddRecordAction | SetUnitPriceAction | InitStateAction | DeleteRecordAction;

export const reducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case ActionTypes.ADD_RECORD: {
			return {
				...state,
				list: [...state.list, action.record],
			};
		}
		case ActionTypes.DELETE_RECORD: {
			return {
				...state,
				list: state.list.filter((_, currentIndex) => currentIndex !== action.recordIndex),
			};
		}
		case ActionTypes.SET_UNIT_PRICE: {
			return {
				...state,
				unitPrice: action.unitPrice,
			};
		}
		case ActionTypes.INIT_STATE: {
			return action.state;
		}
		default:
			return state;
	}
};
