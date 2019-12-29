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
		date: moment().add(-10, 'days'),
		value: 4484,
	},
	{
		date: moment().add(-5, 'days'),
		value: 4552,
	},
	{
		date: moment().add(-1, 'days'),
		value: 4584,
	},
];

const App: React.FC = () => {
	const [records, setRecords] = useState(dummyRecords);

	const addRecord = (record: Record) => {
		setRecords([...records, record]);
	};

	const lastRecord = records[records.length - 1];

	return (
		<MainWrapper>
			<h1>Kalkulačka spotřeby plynu</h1>
			<NewRecord onSubmit={addRecord} defaultValue={lastRecord.value} />
			<Divider />
			<HistoryList records={records} />
		</MainWrapper>
	);
};

export default App;
