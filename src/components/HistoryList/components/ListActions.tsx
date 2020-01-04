import React from 'react';
import { Icon } from 'antd';

import { useAppDispatch } from '../../../utils/context';
import { ActionTypes } from '../../../utils/reducer';

interface Props {
	recordIndex: number;
}

export const ListActions: React.FC<Props> = ({ recordIndex }) => {
	const dispatch = useAppDispatch();
	const onClickDelete = () => {
		dispatch({
			type: ActionTypes.DELETE_RECORD,
			recordIndex,
		});
	};
	return <Icon type="delete" onClick={onClickDelete} />;
};
