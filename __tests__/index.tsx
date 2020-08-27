import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClickAwayListener from '../src';

describe('ClickAway Listener', () => {
	it('should render properly as "div" if no element is specified', () => {
		const { container } = render(
			<ClickAwayListener onClickAway={() => null}>
				Hello Default Div
			</ClickAwayListener>
		);
		expect(container.firstElementChild.tagName).toBe('DIV');
	});
	
	it('should be able to get rendered as a specified element', () => {
		const { container } = render(
			<ClickAwayListener as="article" onClickAway={() => null}>
				Hello Article
			</ClickAwayListener>
		);
		expect(container.firstElementChild.tagName).toBe('ARTICLE');
	});

	it('should take in props to be used like every other elements', () => {
		const { getByText } = render(
			<ClickAwayListener style={{ padding: '10px' }} onClickAway={() => null}>
				Hello World
			</ClickAwayListener>
		);
		expect(getByText(/Hello World/i)).toBeTruthy();
		expect(getByText(/Hello World/i)).toHaveProperty('style');
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

		fireEvent.click(getByText(/A button/i));
		fireEvent.click(getByText(/A text element/i));
		fireEvent.click(getByText(/Hello World/i));
		expect(fakeHandleClick).toBeCalledTimes(2);
	});

	it('works with different mouse events', () => {
		const fakeHandleClick = jest.fn();
		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={fakeHandleClick} mouseEvent="mousedown">
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

	it('returns the event object', () => {
		const handleClick = (event: MouseEvent | TouchEvent) => {
			expect(event.type).toBe('click');
		};

		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClick}>
					Hello World
				</ClickAwayListener>
				<button>A button</button>
			</React.Fragment>
		);

		fireEvent.click(getByText(/A button/i));
	});

	it('works with different touch events', () => {
		const fakeHandleClick = jest.fn();
		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={fakeHandleClick} touchEvent="touchend">
					Hello World
				</ClickAwayListener>
				<button>A button</button>
				<p>A text element</p>
			</React.Fragment>
		);

		fireEvent.touchEnd(getByText(/A button/i));
		fireEvent.touchEnd(getByText(/A text element/i));
		fireEvent.touchEnd(getByText(/Hello World/i));
		expect(fakeHandleClick).toBeCalledTimes(2);
	});

	it('should handle multiple cases', () => {
		const fakeHandleClick = jest.fn();
		const fakeHandleClick2 = jest.fn();
		const { getByTestId } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={fakeHandleClick}>
					<div data-testid="hello-world">Hello World</div>
				</ClickAwayListener>
				<button data-testid="button-one">A button</button>
				<button data-testid="some-other-button-one">Some other button</button>
				<p data-testid="text-one">A text element</p>

				<ClickAwayListener onClickAway={fakeHandleClick2}>
					<div data-testid="foo-bar">Foo bar</div>
				</ClickAwayListener>
				<button data-testid="button-two">Foo bar button</button>
				<button data-testid="some-other-button-two">
					Foo bar other button
				</button>
				<p data-testid="text-two">Foo bar text element</p>
			</React.Fragment>
		);

		fireEvent.click(getByTestId('button-one'));
		fireEvent.click(getByTestId('text-one'));
		fireEvent.click(getByTestId('hello-world'));
		fireEvent.click(getByTestId('some-other-button-one'));
		expect(fakeHandleClick).toBeCalledTimes(3);

		// 4 from the previous ones, and the 3 new ones
		fireEvent.click(getByTestId('button-two'));
		fireEvent.click(getByTestId('text-two'));
		fireEvent.click(getByTestId('foo-bar'));
		fireEvent.click(getByTestId('some-other-button-two'));
		expect(fakeHandleClick2).toBeCalledTimes(7);
	});
});
