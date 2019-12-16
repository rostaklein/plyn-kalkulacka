import React, { useState } from 'react';

import styled from '@emotion/styled';

import { NewRecord } from './NewRecord';
import { Divider } from 'antd';
import { HistoryList } from './HistoryList';
import moment, { Moment } from 'moment';

const MainWrapper = styled.div`
	max-width: 960px;
	padding: 20px 25px;
	margin: 0 auto;
`;

const Title = styled.h1`
	line-height: 1em;
	margin-bottom: 35px;
`;

export type Record = {
	date: Moment;
	value: number;
};

const dummyRecords: Record[] = [
	{
		date: moment(new Date(2019, 12, 1)),
		value: 4484,
	},
	{
		date: moment(new Date(2019, 12, 10)),
		value: 4552,
	},
	{
		date: moment(),
		value: 4584,
	},
];

const App: React.FC = () => {
	const [records, setRecords] = useState(dummyRecords);

	const addRecord = (record: Record) => {
		setRecords([...records, record]);
	};

	const revertedRecords = records.slice().reverse();

	return (
		<MainWrapper>
			<Title>Kalkulačka spotřeby plynu</Title>
			<NewRecord onSubmit={addRecord} />
			<Divider />
			<HistoryList records={revertedRecords} />
		</MainWrapper>
	);
};

export default App;
