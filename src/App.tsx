import React, { useState } from 'react';

import styled from '@emotion/styled';

import { NewRecord } from './components/NewRecord/NewRecord';
import { Divider } from 'antd';
import { HistoryList } from './components/HistoryList/HistoryList';
import moment, { Moment } from 'moment';

const MainWrapper = styled.div`
	max-width: 960px;
	padding: 20px 25px;
	margin: 0 auto;
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
			<h1>Kalkulačka spotřeby plynu</h1>
			<NewRecord onSubmit={addRecord} />
			<Divider />
			<HistoryList records={revertedRecords} />
		</MainWrapper>
	);
};

export default App;
