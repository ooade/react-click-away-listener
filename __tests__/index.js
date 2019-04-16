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

	it('should exclude onClickAway on same ids', () => {
		const id = 'my-cool-menu';
		const fakeHandleClick = jest.fn();
		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={fakeHandleClick} clickAwayId={id}>
					Hello World
				</ClickAwayListener>
				<button data-prevent-clickaway={id}>A button</button>
				<p>A text element</p>
			</React.Fragment>
		);

		fireEvent.mouseDown(getByText(/A button/i));
		fireEvent.mouseDown(getByText(/A text element/i));
		fireEvent.mouseDown(getByText(/Hello World/i));
		expect(fakeHandleClick).toBeCalledTimes(1);
	});

	it('should exclude onClickAway on same ids in multiple cases', () => {
		const id = 'my-awesome-menu';
		const id2 = 'my-foobar-menu';
		const fakeHandleClick = jest.fn();
		const fakeHandleClick2 = jest.fn();
		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={fakeHandleClick} clickAwayId={id}>
					Hello World
				</ClickAwayListener>
				<button data-prevent-clickaway={id}>A button</button>
				<button data-prevent-clickaway={id}>Some other button</button>
				<p>A text element</p>

				<ClickAwayListener onClickAway={fakeHandleClick2} clickAwayId={id2}>
					Foo bar
				</ClickAwayListener>
				<button data-prevent-clickaway={id2}>Foo bar button</button>
				<button data-prevent-clickaway={id2}>Foo bar other button</button>
				<p>Foo bar text element</p>
			</React.Fragment>
		);

		fireEvent.mouseDown(getByText(/A button/i));
		fireEvent.mouseDown(getByText(/A text element/i));
		fireEvent.mouseDown(getByText(/Hello World/i));
		fireEvent.mouseDown(getByText(/Some other button/i));
		fireEvent.mouseDown(getByText(/Foo bar button/i));
		fireEvent.mouseDown(getByText(/Foo bar text element/i));
		fireEvent.mouseDown(getByText(/Foo bar/i));
		fireEvent.mouseDown(getByText(/Foo bar other button/i));
		expect(fakeHandleClick).toBeCalledTimes(5);
		expect(fakeHandleClick2).toBeCalledTimes(5);
	});
});
