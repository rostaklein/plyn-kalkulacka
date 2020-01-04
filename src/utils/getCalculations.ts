import { Record } from '../App';

export type CalculatedRecord = Record & {
	difference: {
		amount: number;
		price: number;
		days: number;
	};
	averageDailyPrice: number;
};

export const getCalculations = (records: Record[], unitPrice: number): CalculatedRecord[] => {
	const sortedByDate = records.sort((a, b) => (a.date < b.date ? -1 : 1));

	const calculatedRecords = sortedByDate.map((currentRecord, i) => {
		const previousRecord = sortedByDate[i - 1];

		const amount = previousRecord ? currentRecord.value - previousRecord.value : 0;
		const price = amount * unitPrice;
		const days = previousRecord ? currentRecord.date.diff(previousRecord.date, 'days') : 0;

		const averageDailyPrice = previousRecord ? price / days : 0;

		return {
			date: currentRecord.date,
			value: currentRecord.value,
			difference: {
				amount,
				price,
				days,
			},
			averageDailyPrice,
		};
	});

	return calculatedRecords;
};
