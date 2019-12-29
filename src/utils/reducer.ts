import { Record } from '../App'

export type AppState = {
    list: Record[];
    unitPrice: number | null;
}

export enum ActionTypes {
    ADD_RECORD = 'ADD_RECORD',
    SET_UNIT_PRICE = 'SET_UNIT_PRICE'
}

type AddRecordAction = {
    type: ActionTypes.ADD_RECORD;
    record: Record;
}

type SetUnitPriceAction = {
    type: ActionTypes.SET_UNIT_PRICE;
    unitPrice: number;
}

export type Action = AddRecordAction | SetUnitPriceAction;

export const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionTypes.ADD_RECORD: {
            return {
                ...state,
                list: [...state.list, action.record]
            }
        }
        case ActionTypes.SET_UNIT_PRICE: {
            return {
                ...state,
                unitPrice: action.unitPrice
            }
        }
        default:
            return state;
    }

}