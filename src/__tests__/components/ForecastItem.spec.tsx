import { render, screen } from '@testing-library/react-native';
import React from 'react';

import ForecastItem from '../../components/ForecastItem';
import { ForecastItemProps } from '../../components/ForecastItem/types';

const data: ForecastItemProps['data'] = {
	dt: 1661299200,
	dt_txt: '2022-08-24 00:00:00',
	main: {
		temp: 20.73,
	},
	weather: [
		{
			icon: '02n',
		},
	],
};

describe('ForecastItem card', () => {
	it('check if show correctly day of week information on cards', () => {
		render(<ForecastItem data={data} />);
		const localDayOfWeek = screen.getByText('quarta');

		expect(localDayOfWeek).toBeTruthy();
	});

	it('check if show correctly day of month information on cards', () => {
		render(<ForecastItem data={data} />);
		const dayOfMonth = screen.getByText('24');
		expect(dayOfMonth).toBeTruthy();
	});
	it('check if show correctly hours information on cards', () => {
		render(<ForecastItem data={data} />);
		const hourAM = screen.getByText('12 AM');
		expect(hourAM).toBeTruthy();
	});
	it('check if show correctly temp information on cards', () => {
		render(<ForecastItem data={data} />);
		const temp = screen.getByText('21°');
		expect(temp).toBeTruthy();
	});
	it('should it render icon image', () => {
		render(<ForecastItem data={data} />);
		const image = screen.getByTestId('icon');

		expect(image.props.source).toMatchObject({
			uri: 'https://openweathermap.org/img/wn/02n.png',
		});
	});
});
