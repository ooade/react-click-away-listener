import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClickAwayListener from '../build';

describe('ClickAway Listener', () => {
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

	it('should handle multiple cases', () => {
		const fakeHandleClick = jest.fn();
		const fakeHandleClick2 = jest.fn();
		const { getByTestId } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={fakeHandleClick} data-testid="hello-world">
					Hello World
				</ClickAwayListener>
				<button data-testid="button-one">A button</button>
				<button data-testid="some-other-button-one">Some other button</button>
				<p data-testid="text-one">A text element</p>

				<ClickAwayListener onClickAway={fakeHandleClick2} data-testid="foo-bar">
					Foo bar
				</ClickAwayListener>
				<button data-testid="button-two">Foo bar button</button>
				<button data-testid="some-other-button-two">Foo bar other button</button>
				<p data-testid="text-two">Foo bar text element</p>
			</React.Fragment>
		);

		fireEvent.mouseDown(getByTestId('button-one'));
		fireEvent.mouseDown(getByTestId('text-one'));
		fireEvent.mouseDown(getByTestId('hello-world'));
		fireEvent.mouseDown(getByTestId('some-other-button-one'));
		expect(fakeHandleClick).toBeCalledTimes(3);

		// 4 from the previous ones, and the 3 new ones
		fireEvent.mouseDown(getByTestId('button-two'));
		fireEvent.mouseDown(getByTestId('text-two'));
		fireEvent.mouseDown(getByTestId('foo-bar'));
		fireEvent.mouseDown(getByTestId('some-other-button-two'));
		expect(fakeHandleClick2).toBeCalledTimes(7);
	});
});
