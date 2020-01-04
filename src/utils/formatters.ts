export const moneyFormatter = (value: React.ReactText) => {
	const number = Number(value);
	return number.toLocaleString('cs-CZ', {
		currency: 'CZK',
		style: 'currency',
		maximumFractionDigits: 2,
		currencyDisplay: 'symbol',
	});
};

export const fractionFormatter = (value: React.ReactText) => {
	const number = Number(value);
	return number.toLocaleString('cs-CZ', {
		maximumFractionDigits: 2,
	});
};
