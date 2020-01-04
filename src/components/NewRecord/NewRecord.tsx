import React, { useState } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/cs_CZ';

import { useAppDispatch, useAppState } from '../../utils/context';
import { ActionTypes } from '../../utils/reducer';

import { StyledDatePicker, StyledInputNumber, StyledButton } from './NewRecord.styles';

export const NewRecord: React.FC = () => {
	const [date, setDate] = useState(moment());
	const [value, setCurrentValue] = useState();
	const dispatch = useAppDispatch();
	const { list } = useAppState();

	const todaysRecordIndex = list.findIndex((record) => record.date.isSame(date, 'day'));
	const alreadyHasTodaysRecord = todaysRecordIndex >= 0;

	const lastRecord = list[list.length - 1];

	const onDateChange = (date: moment.Moment | null) => {
		if (date !== null) {
			setDate(date);
		}
	};

	const submitHandler = () => {
		if (value && date) {
			if (alreadyHasTodaysRecord) {
				dispatch({ type: ActionTypes.DELETE_RECORD, recordIndex: todaysRecordIndex });
			}
			dispatch({ type: ActionTypes.ADD_RECORD, record: { date, value } });
		}
	};

	return (
		<Row gutter={[32, 12]} align="bottom" type="flex">
			<Col xs={24} sm={9}>
				<label>Datum záznamu</label>
				<StyledDatePicker
					onChange={onDateChange}
					placeholder={'Datum záznamu'}
					defaultValue={date}
					value={date}
					locale={locale}
					format={'D. M. YYYY'}
				/>
			</Col>
			<Col xs={24} sm={9}>
				<label>
					Aktuální spotřeba v m<sup>3</sup>
				</label>
				<StyledInputNumber
					onChange={setCurrentValue}
					onPressEnter={submitHandler}
					defaultValue={lastRecord?.value}
				></StyledInputNumber>
			</Col>
			<Col xs={24} sm={6}>
				<StyledButton type="primary" onClick={submitHandler} disabled={!value}>
					{alreadyHasTodaysRecord ? 'Změnit dnešní záznam' : 'Přidat'}
				</StyledButton>
			</Col>
		</Row>
	);
};
