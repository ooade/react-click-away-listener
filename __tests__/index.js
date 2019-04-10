import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import ClickAwayListener from '../src';

describe('ClickAway Listener', () => {
	afterEach(cleanup);

	it('should render properly', () => {
		const { getByText } = render(
			<ClickAwayListener>Hello World</ClickAwayListener>
		);
		expect(getByText(/Hello World/i)).toBeTruthy();
	});

	it('should trigger onClickAway only when an element is clicked outside', () => {
		const fakeHandleClick = jest.fn();
		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={fakeHandleClick}>
					Hello World
				</ClickAwayListener>
				<button>A button</button>
				<p>A text element</p>
			</React.Fragment>
		);

		fireEvent.mouseDown(getByText(/A button/i));
		fireEvent.mouseDown(getByText(/A text element/i));
		fireEvent.mouseDown(getByText(/Hello World/i));
		expect(fakeHandleClick).toBeCalledTimes(2);
	});
});
