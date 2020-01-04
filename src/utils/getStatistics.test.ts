import moment from 'moment';

import { getStatistics } from './getStatistics';
import { CalculatedRecord } from './getCalculations';

describe(getStatistics.name, () => {
	it('should sum all the diffs and return correct statistics', () => {
		const records: CalculatedRecord[] = [
			{
				date: moment(),
				value: 0,
				difference: {
					amount: 10,
					days: 2,
					price: 150,
				},
				averageDailyPrice: 0,
			},
			{
				date: moment(),
				value: 0,
				difference: {
					amount: 30,
					days: 8,
					price: 20,
				},
				averageDailyPrice: 0,
			},
			{
				date: moment(),
				value: 0,
				difference: {
					amount: 40,
					days: 4,
					price: 100,
				},
				averageDailyPrice: 0,
			},
		];
		const result = getStatistics(records);

		expect(result).toEqual({
			totalDaysDiff: 14,
			totalAmount: 80,
			totalPrice: 270,
			averageDailyPrice: 270 / 14,
		});
	});
});
