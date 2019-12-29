import React, { useState } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/cs_CZ';
import {
	StyledDatePicker,
	StyledInputNumber,
	StyledButton,
} from './NewRecord.styles';
import { useAppDispatch, useAppState } from '../../utils/context';
import { ActionTypes } from '../../utils/reducer';

export const NewRecord: React.FC = () => {
	const [date, setDate] = useState(moment());
	const [value, setCurrentValue] = useState();
	const dispatch = useAppDispatch();
	const { list } = useAppState();

	const lastRecord = list[list.length - 1];

	const onDateChange = (date: moment.Moment | null) => {
		if (date !== null) {
			setDate(date);
		}
	};

	const submitHandler = () => {
		if (value && date) {
			dispatch({ type: ActionTypes.ADD_RECORD, record: { date, value } });
		}
	};

	return (
		<Row gutter={[32, 12]} align="bottom" type="flex">
			<Col xs={24} sm={10}>
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
			<Col xs={24} sm={10}>
				<label>
					Aktuální spotřeba v m<sup>3</sup>
				</label>
				<StyledInputNumber
					onChange={setCurrentValue}
					onPressEnter={submitHandler}
					defaultValue={lastRecord?.value}
				></StyledInputNumber>
			</Col>
			<Col xs={24} sm={4}>
				<StyledButton type="primary" onClick={submitHandler}>
					Přidat
				</StyledButton>
			</Col>
		</Row>
	);
};
