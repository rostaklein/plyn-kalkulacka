import React, { useState } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/cs_CZ';
import { Record } from '../App';
import {
	StyledDatePicker,
	StyledInputNumber,
	StyledButton,
} from './NewRecord.styles';

interface Props {
	onSubmit: (record: Record) => void;
}

export const NewRecord: React.FC<Props> = ({ onSubmit }) => {
	const [date, setDate] = useState(moment());
	const [value, setCurrentValue] = useState();

	const onDateChange = (date: moment.Moment | null) => {
		if (date !== null) {
			setDate(date);
		}
	};

	const submitHandler = () => {
		if (value && date) {
			onSubmit({ date, value });
		}
	};

	return (
		<>
			<h3>Přidat nový záznam</h3>
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
						value={value}
						onPressEnter={submitHandler}
					></StyledInputNumber>
				</Col>
				<Col xs={24} sm={4}>
					<StyledButton type="primary" onClick={submitHandler}>
						Přidat
					</StyledButton>
				</Col>
			</Row>
		</>
	);
};
