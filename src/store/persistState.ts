import { Api } from '../api';

import { AppState } from './reducer';

const getUuidFromLocation = () => {
	const { pathname } = window.location;
	const uuid = pathname.replace('/', '');

	return uuid;
};

export const persistCurrentState = async (state: AppState) => {
	const uuid = getUuidFromLocation();

	if (!uuid) {
		const uuid = await Api.createState(state);

		window.history.pushState({}, '', `/${uuid}`);
	} else {
		await Api.updateState(state, uuid);
	}
};

export const tryLoadingPersistedState = async () => {
	const uuid = getUuidFromLocation();
	if (uuid) {
		return await Api.loadState(uuid);
	}
};
