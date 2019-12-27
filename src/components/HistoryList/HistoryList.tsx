import React from 'react';
import { Table } from 'antd';
import { Moment } from 'moment';
import { Record } from '../../App';
import { ColumnProps } from 'antd/lib/table';
import { StyledTable } from './HistoryList.styles';

interface Props {
	records: Record[];
}

const columnsDefinition: ColumnProps<Record>[] = [
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
		dataIndex: 'difference',
	},
	{
		title: 'Cena rozdílu',
		dataIndex: 'diffPrice',
	},

	{
		title: 'Spotřeba na den',
		dataIndex: 'dailyCost',
	},
];

export const HistoryList: React.FC<Props> = ({ records }) => {
	return (
		<>
			<h3>Historie záznamů</h3>
			<StyledTable>
				<Table<Record>
					columns={columnsDefinition}
					dataSource={records}
					rowKey={({ date, value }, i) => `${date.toISOString()}${value}${i}`}
					size="small"
					pagination={{ hideOnSinglePage: true }}
				/>
			</StyledTable>
		</>
	);
};
