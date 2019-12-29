import { Record } from '../App'

export type AppState = {
    list: Record[];
}

export enum ActionTypes {
    ADD_RECORD = 'ADD_RECORD'
}

type AddRecordAction = {
    type: ActionTypes.ADD_RECORD;
    record: Record;
}

export type Action = AddRecordAction;

export const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionTypes.ADD_RECORD: {
            return {
                list: [...state.list, action.record]
            }
        }
        default:
            throw new Error(`Unknown action of type: ${action.type} dispatched`)
    }

}