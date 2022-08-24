import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Footer from '../../components/Footer';

const data = {
	list: [],
};
describe('Footer', () => {
	it('should it render Title', () => {
		render(<Footer data={data} />);
		const title = screen.getByText('Previsões');

		expect(title).toBeTruthy();
	});
	it('should it render sign', () => {
		render(<Footer data={data} />);
		const sign = screen.getByText('created by: Luiz Claudio');

		expect(sign).toBeTruthy();
	});
});
