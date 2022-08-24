import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Header, { HeaderProps } from '../../components/Header';

const data: HeaderProps['data'] = {
	main: {
		temp: 20.73,
		temp_max: 26.23,
		temp_min: 19.74,
	},
	name: 'Brasilia',
	weather: [
		{
			description: 'céu limpo',
			icon: '012n',
			id: 1231321,
		},
	],
};
describe('Header', () => {
	it('should it render name', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={false}
				timestamp={1661367017738}
			/>
		);
		const name = screen.getByText('Brasilia');

		expect(name).toBeTruthy();
	});

	it('should it render temp', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={false}
				timestamp={1661367017738}
			/>
		);
		const temp = screen.getByText('21°');

		expect(temp).toBeTruthy();
	});

	it('should it render description', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={false}
				timestamp={1661367017738}
			/>
		);
		const description = screen.getByText('céu limpo');

		expect(description).toBeTruthy();
	});

	it('should it render max temp', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={false}
				timestamp={1661367017738}
			/>
		);
		const max = screen.getByText('Max: 26°');

		expect(max).toBeTruthy();
	});

	it('should it render min temp', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={false}
				timestamp={1661367017738}
			/>
		);
		const min = screen.getByText('Min: 20°');

		expect(min).toBeTruthy();
	});

	it('should it render timestamp', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={false}
				timestamp={1661367017738}
			/>
		);
		const timestamp = screen.getByText('3:50 PM');

		expect(timestamp).toBeTruthy();
	});

	it('should it render icon image', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={false}
				timestamp={1661367017738}
			/>
		);
		const image = screen.getByTestId('icon');

		expect(image.props.source).toMatchObject({
			uri: 'https://openweathermap.org/img/wn/012n.png',
		});
	});

	it('should it render icon image', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={false}
				timestamp={1661367017738}
			/>
		);
		const image = screen.getByTestId('icon');

		expect(image.props.source).toMatchObject({
			uri: 'https://openweathermap.org/img/wn/012n.png',
		});
	});

	it('should button disabled when Loading', () => {
		const updateData = jest.fn();
		render(
			<Header
				data={data}
				updateData={updateData}
				Loading={true}
				timestamp={1661367017738}
			/>
		);
		const button = screen.getByTestId('button');

		expect(button.props.accessibilityState).toHaveProperty('disabled', true);
	});
});
