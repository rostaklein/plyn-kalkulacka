import React, { useState } from 'react';
import { Popover, Input, Icon, Col, Button, Skeleton } from 'antd';
import Helmet from 'react-helmet';

import { useAppDispatch, useAppState, defaultState } from '../../store/context';
import { ActionTypes } from '../../store/reducer';

import { H1, EditIconWrapper, ButtonRow } from './EditableTitle.styles';

export const EditableTitle: React.FC = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState();
	const dispatch = useAppDispatch();
	const state = useAppState();

	const submitHandler = () => {
		dispatch({
			type: ActionTypes.EDIT_TITLE,
			title,
		});
		setIsEditing(false);
	};

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setTitle(value);
	};

	const getPopoverContent = () => {
		return (
			<>
				<Input
					placeholder="Nový název"
					onChange={onChangeHandler}
					onPressEnter={submitHandler}
					value={title}
					autoFocus
				/>
				<ButtonRow gutter={12}>
					<Col span={12}>
						<Button type="primary" onClick={submitHandler}>
							Uložit
						</Button>
					</Col>
					<Col span={12}>
						<Button onClick={() => setIsEditing(false)}>Zavřít</Button>
					</Col>
				</ButtonRow>
			</>
		);
	};

	const currentTitle = state.title || defaultState.title;
	const pageTitle =
		currentTitle === defaultState.title
			? defaultState.title
			: `${state.title} - ${defaultState.title}`;

	if (!state.isInitialized) {
		return <Skeleton paragraph={{ rows: 1 }} title={false} />;
	}

	return (
		<>
			<Helmet title={pageTitle} />
			<H1>
				{currentTitle}
				<Popover
					placement="rightTop"
					title={'Změna názvu'}
					content={getPopoverContent()}
					trigger="click"
					visible={isEditing}
				>
					<EditIconWrapper isActive={isEditing} onClick={() => setIsEditing(!isEditing)}>
						<Icon type="edit" />
					</EditIconWrapper>
				</Popover>
			</H1>
		</>
	);
};
