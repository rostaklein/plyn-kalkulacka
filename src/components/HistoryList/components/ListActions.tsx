import React from 'react';
import { Icon } from 'antd';

import { useAppDispatch } from '../../../store/context';
import { ActionTypes } from '../../../store/reducer';

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
