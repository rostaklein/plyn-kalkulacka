import { CalculatedRecord } from './getCalculations';

export type Statistics = {
	totalDaysDiff: number;
	totalAmount: number;
	totalPrice: number;
	averageDailyPrice: number;
};

export const getStatistics = (records: CalculatedRecord[]): Statistics => {
	const totalDaysDiff = records.reduce((acc, { difference }) => {
		return (acc += difference.days);
	}, 0);

	const totalAmount = records.reduce((acc, { difference }) => {
		return (acc += difference.amount);
	}, 0);

	const totalPrice = records.reduce((acc, { difference }) => {
		return (acc += difference.price);
	}, 0);

	return {
		totalDaysDiff,
		totalAmount,
		totalPrice,
		averageDailyPrice: totalPrice / totalDaysDiff,
	};
};
