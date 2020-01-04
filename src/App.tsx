import React from 'react';
import styled from '@emotion/styled';
import { Divider, Row, Col } from 'antd';
import { Moment } from 'moment';

import { NewRecord } from './components/NewRecord/NewRecord';
import { HistoryList } from './components/HistoryList/HistoryList';
import { AppContextProvider } from './store/context';
import { UnitPrice } from './components/UnitPrice/UnitPrice';
import { EditableTitle } from './components/EditableTitle/EditableTitle';
import { Statistics } from './components/Statistics/Statistics';

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
						<EditableTitle />
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
				<Statistics />
			</AppContextProvider>
		</MainWrapper>
	);
};

export default App;
