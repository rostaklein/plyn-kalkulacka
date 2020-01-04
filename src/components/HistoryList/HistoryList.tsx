import React from 'react';
import { Table, Skeleton } from 'antd';
import { Moment } from 'moment';
import { ColumnProps } from 'antd/lib/table';

import { getCalculations, CalculatedRecord } from '../../utils/getCalculations';
import { useAppState } from '../../utils/context';
import { UnitPrice } from '../UnitPrice/UnitPrice';

import { StyledTable, UnitPriceContainer } from './HistoryList.styles';
import { ListActions } from './components/ListActions';

const columnsDefinition: ColumnProps<CalculatedRecord>[] = [
	{
		title: 'Datum záznamu',
		dataIndex: 'date',
		render: (date: Moment) => date.format('D. M. YYYY'),
	},
	{
		title: 'Spotřeba',
		dataIndex: 'value',
		render: (value: number) => (
			<span>
				{value} m<sup>3</sup>
			</span>
		),
	},
	{
		title: () => (
			<span>
				Rozdíl v m<sup>3</sup>
			</span>
		),
		dataIndex: 'difference.amount',
	},
	{
		title: 'Cena rozdílu',
		dataIndex: 'difference.price',
		render: (_, record) => <span>{record.difference.price} Kč</span>,
	},
	{
		title: 'Spotřeba na den',
		dataIndex: 'dailyCost',
		render: (_, record) => <span>{record.averageDailyPrice} Kč</span>,
	},
	{
		key: 'action',
		render: (_, __, i) => <ListActions recordIndex={i} />,
	},
];

export const HistoryList: React.FC = () => {
	const { list, unitPrice } = useAppState();
	if (list.length === 0) {
		return null;
	}

	if (unitPrice === null) {
		return (
			<>
				<Skeleton paragraph={{ rows: 2 }} />
				<div style={{ margin: '15px auto', textAlign: 'center' }}>
					K zobrazení výpočtů musíte vyplnit cenu plynu
					<UnitPriceContainer>
						<UnitPrice />
					</UnitPriceContainer>
				</div>
				<Skeleton title={false} />
			</>
		);
	}

	const calculatedResults = getCalculations(list, unitPrice);
	return (
		<StyledTable>
			<Table<CalculatedRecord>
				columns={columnsDefinition}
				dataSource={calculatedResults}
				rowKey={({ date, value }, i) => `${date.toISOString()}${value}${i}`}
				size="small"
				pagination={{ hideOnSinglePage: true }}
			/>
		</StyledTable>
	);
};
