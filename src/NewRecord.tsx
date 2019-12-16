import React, { useState } from 'react';
import { Row, Col, DatePicker, Button } from 'antd';
import moment from 'moment';
import { InputNumber } from 'antd';
import locale from 'antd/es/date-picker/locale/cs_CZ';
import styled from '@emotion/styled';
import { Record } from './App';

interface Props {
	onSubmit: (record: Record) => void;
}

const StyledInputNumber = styled(InputNumber)`
	width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
	width: 100%;
`;

const StyledButton = styled(Button)`
	width: 100%;
`;

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
