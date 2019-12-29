import React from 'react';
import styled from '@emotion/styled';
import { NewRecord } from './components/NewRecord/NewRecord';
import { Divider } from 'antd';
import { HistoryList } from './components/HistoryList/HistoryList';
import { Moment } from 'moment';
import { AppContextProvider } from './utils/context';

const MainWrapper = styled.div`
	max-width: 960px;
	padding: 20px 25px;
	margin: 0 auto;
`;

export type Record = {
	date: Moment;
	value: number;
};

const App: React.FC = () => {
	return (
		<MainWrapper>
			<AppContextProvider>
				<h1>Kalkulačka spotřeby plynu</h1>
				<NewRecord />
				<Divider />
				<HistoryList />
			</AppContextProvider>
		</MainWrapper>
	);
};

export default App;
