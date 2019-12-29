import { AppState } from './utils/reducer';
import moment from 'moment';

const JSON_STORAGE_API_URL = 'https://jsonstorage.net/api/items/';

const createState = async (data: AppState) => {
    const res = await fetch(JSON_STORAGE_API_URL, {
        method: 'POST', body: JSON.stringify(data), headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await res.json() as { uri: string; };

    const createdUuid = responseData.uri.split("/").pop();

    if (createdUuid === undefined) {
        throw new Error('Something wrong happened while saving the state');
    }

    return createdUuid;
}

const updateState = async (data: AppState, stateUuid: string) => {
    await fetch(`${JSON_STORAGE_API_URL}${stateUuid}`, {
        method: 'PUT', body: JSON.stringify(data), headers: {
            'Content-Type': 'application/json'
        }
    });
}

const loadState = async (stateUuid: string) => {
    const res = await fetch(`${JSON_STORAGE_API_URL}${stateUuid}`);

    const responseData = await res.json() as AppState;

    return {
        ...responseData,
        list: responseData.list.map((item) => ({ ...item, date: moment(item.date) }))
    };
}

export const Api = {
    createState,
    updateState,
    loadState
}