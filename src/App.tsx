import React from 'react';
import styled from '@emotion/styled';
import { NewRecord } from './components/NewRecord/NewRecord';
import { Divider, Row, Col } from 'antd';
import { HistoryList } from './components/HistoryList/HistoryList';
import { Moment } from 'moment';
import { AppContextProvider } from './utils/context';
import { UnitPrice } from './components/UnitPrice/UnitPrice';

const MainWrapper = styled.div`
	max-width: 960px;
	padding: 30px 25px;
	margin: 0 auto;
`;

const HeaderRow = styled(Row)`
	margin-bottom: 25px;
`;

export type Record = {
	date: Moment;
	value: number;
};

const App: React.FC = () => {
	return (
		<MainWrapper>
			<AppContextProvider>
				<HeaderRow>
					<Col xs={24} sm={18}>
						<h1>Kalkulačka spotřeby plynu</h1>
					</Col>
					<Col xs={24} sm={6}>
						<UnitPrice />
					</Col>
				</HeaderRow>
				<h3>Přidat nový záznam</h3>
				<NewRecord />
				<Divider />
				<h3>Historie záznamů</h3>
				<HistoryList />
			</AppContextProvider>
		</MainWrapper>
	);
};

export default App;
