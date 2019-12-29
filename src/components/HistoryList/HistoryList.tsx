import React from 'react';
import { Table } from 'antd';
import { Moment } from 'moment';
import { ColumnProps } from 'antd/lib/table';
import { StyledTable } from './HistoryList.styles';
import { getCalculations, CalculatedRecord } from '../../utils/getCalculations';
import { useAppState } from '../../utils/context';

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
];

export const HistoryList: React.FC = () => {
	const { list } = useAppState();
	const calculatedResults = getCalculations(list, 20);
	return (
		<>
			<h3>Historie záznamů</h3>
			<StyledTable>
				<Table<CalculatedRecord>
					columns={columnsDefinition}
					dataSource={calculatedResults}
					rowKey={({ date, value }, i) => `${date.toISOString()}${value}${i}`}
					size="small"
					pagination={{ hideOnSinglePage: true }}
				/>
			</StyledTable>
		</>
	);
};
