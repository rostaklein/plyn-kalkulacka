
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
    return records.map((currentRecord, i) => {
        const previousRecord = records[i - 1];

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
            averageDailyPrice
        }
    });
}