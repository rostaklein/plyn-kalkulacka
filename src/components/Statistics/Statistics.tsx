import React from 'react';
import { Statistic, Row, Col } from 'antd';

import { moneyFormatter, fractionFormatter } from '../../utils/formatters';
import { getStatistics } from '../../utils/getStatistics';
import { useAppState } from '../../store/context';
import { getCalculations } from '../../utils/getCalculations';

export const Statistics: React.FC = () => {
	const { list, unitPrice } = useAppState();
	if (list.length <= 1 || unitPrice === null) {
		return null;
	}

	const calculatedRecords = getCalculations(list, unitPrice);
	const stats = getStatistics(calculatedRecords);
	return (
		<Row gutter={[16, 8]} style={{ marginTop: 35 }}>
			<Col xs={24} sm={6}>
				<Statistic
					title="Počet dní od prvního záznamu"
					value={stats.totalDaysDiff}
					formatter={fractionFormatter}
				/>
			</Col>
			<Col xs={24} sm={6}>
				<Statistic
					title="Celková spotřeba"
					value={stats.totalAmount}
					formatter={fractionFormatter}
					suffix={
						<span>
							m<sup>3</sup>
						</span>
					}
				/>
			</Col>
			<Col xs={24} sm={6}>
				<Statistic
					title="Cena spotřeby celkem"
					value={stats.totalPrice}
					formatter={moneyFormatter}
				/>
			</Col>
			<Col xs={24} sm={6}>
				<Statistic
					title="Průměrná denní spotřeba"
					value={stats.averageDailyPrice}
					formatter={moneyFormatter}
				/>
			</Col>
		</Row>
	);
};
