import React, { useState, useEffect } from 'react';
import { Input, Button, Row, Col } from 'antd';

import { useAppDispatch, useAppState } from '../../store/context';
import { ActionTypes } from '../../store/reducer';

export const UnitPrice: React.FC = () => {
	const dispatch = useAppDispatch();
	const { unitPrice } = useAppState();

	const [value, setCurrentValue] = useState(unitPrice || '');

	const submitHandler = () => {
		const parsedValue = Number(value);
		if (parsedValue > 0) {
			dispatch({ type: ActionTypes.SET_UNIT_PRICE, unitPrice: parsedValue });
		}
	};

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setCurrentValue(value);
	};

	useEffect(() => {
		if (unitPrice !== null) {
			setCurrentValue(unitPrice);
		}
	}, [unitPrice]);

	return (
		<>
			<label>
				Cena za m<sup>3</sup>
			</label>
			<Row type="flex" gutter={15} justify="space-between">
				<Col style={{ flex: 1 }}>
					<Input
						suffix={'Kč'}
						onChange={onChangeHandler}
						onPressEnter={submitHandler}
						value={value}
					/>
				</Col>
				<Col>
					<Button icon="save" onClick={submitHandler} disabled={!value} />
				</Col>
			</Row>
		</>
	);
};
