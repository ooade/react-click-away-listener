import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import ClickAwayListener from '../src';

describe('ClickAway Listener', () => {
	afterEach(cleanup);

	it('should render properly', () => {
		const { getByText } = render(<ClickAwayListener>Hello World</ClickAwayListener>);
		expect(getByText(/Hello World/i)).toBeTruthy();
	});

	it('should button should be clickable when passed an onClick handler', () => {
		const fakeHandleClick = jest.fn();
		const { getByText } = render(
			<CustomButton onClick={fakeHandleClick}>Hello World</CustomButton>
		);

		fireEvent.click(getByText(/Hello World/i));
		expect(fakeHandleClick).toBeCalledTimes(1);
	});
});
