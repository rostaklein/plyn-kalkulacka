import { getCalculations } from './getCalculations';
import { Record } from '../App';
import moment from 'moment';


describe(getCalculations.name, () => {
    it('should return zeros for the first record', () => {
        const records: Record[] = [{
            date: moment(new Date('2019-01-01')),
            value: 120
        }, {
            date: moment(new Date('2019-01-03')),
            value: 140
        }]
        const result = getCalculations(records, 10);

        expect(result[0].difference).toEqual({ amount: 0, price: 0, days: 0 })
        expect(result[0].averageDailyPrice).toBe(0)
    })

    it('should return correct differences for the second and other records', () => {
        const records: Record[] = [{
            date: moment(new Date('2019-01-01')),
            value: 120
        }, {
            date: moment(new Date('2019-01-03')),
            value: 140
        }, {
            date: moment(new Date('2019-01-11')),
            value: 220
        }]
        const result = getCalculations(records, 10);

        expect(result[1].difference).toEqual({ amount: 20, price: 200, days: 2 })
        expect(result[1].averageDailyPrice).toBe(100)

        expect(result[2].difference).toEqual({ amount: 80, price: 800, days: 8 })
        expect(result[2].averageDailyPrice).toBe(100)
    })

    it('should round the values properly', () => {
        const records: Record[] = [{
            date: moment(new Date('2019-01-01')),
            value: 120
        }, {
            date: moment(new Date('2019-01-04')),
            value: 140
        }]
        const result = getCalculations(records, 10.156);

        expect(result[1].difference).toEqual({ amount: 20, price: 203.12, days: 3 })
        expect(result[1].averageDailyPrice).toBe(67.7)
    })
})