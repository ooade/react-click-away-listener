import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import ClickAwayListener from '../src';

describe('ClickAway Listener', () => {
	it('should render properly', () => {
		const { container } = render(
			<ClickAwayListener onClickAway={() => null}>
				<div>Hello World</div>
			</ClickAwayListener>
		);
		expect(container.firstElementChild.tagName).toBe('DIV');
	});

	it('should trigger onClickAway only when an element is clicked outside', () => {
		const handleClickAway = jest.fn();
		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway}>
					<div>Hello World</div>
				</ClickAwayListener>
				<button>A button</button>
				<p>A text element</p>
			</React.Fragment>
		);

		fireEvent.click(getByText(/A button/i));
		fireEvent.click(getByText(/A text element/i));
		fireEvent.click(getByText(/Hello World/i));
		expect(handleClickAway).toBeCalledTimes(2);
	});

	it('works with different mouse events', () => {
		const handleClickAway = jest.fn();
		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway} mouseEvent="mousedown">
					<div>Hello World</div>
				</ClickAwayListener>
				<button>A button</button>
				<p>A text element</p>
			</React.Fragment>
		);

		fireEvent.mouseDown(getByText(/A button/i));
		fireEvent.mouseDown(getByText(/A text element/i));
		fireEvent.mouseDown(getByText(/Hello World/i));
		expect(handleClickAway).toBeCalledTimes(2);
	});

	it('returns the event object', () => {
		const handleClick = (event: MouseEvent | TouchEvent) => {
			expect(event.type).toBe('click');
		};

		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClick}>
					<div>Hello World</div>
				</ClickAwayListener>
				<button>A button</button>
			</React.Fragment>
		);

		fireEvent.click(getByText(/A button/i));
	});

	it('works with different touch events', () => {
		const handleClickAway = jest.fn();
		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway} touchEvent="touchend">
					<div>Hello World</div>
				</ClickAwayListener>
				<button>A button</button>
				<p>A text element</p>
			</React.Fragment>
		);

		fireEvent.touchEnd(getByText(/A button/i));
		fireEvent.touchEnd(getByText(/A text element/i));
		fireEvent.touchEnd(getByText(/Hello World/i));
		expect(handleClickAway).toBeCalledTimes(2);
	});

	it('should handle multiple cases', () => {
		const handleClickAway = jest.fn();
		const handleClickAway2 = jest.fn();
		const { getByTestId } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway}>
					<div data-testid="hello-world">Hello World</div>
				</ClickAwayListener>
				<button data-testid="button-one">A button</button>
				<button data-testid="some-other-button-one">Some other button</button>
				<p data-testid="text-one">A text element</p>

				<ClickAwayListener onClickAway={handleClickAway2}>
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
		expect(handleClickAway).toBeCalledTimes(3);

		// 4 from the previous ones, and the 3 new ones
		fireEvent.click(getByTestId('button-two'));
		fireEvent.click(getByTestId('text-two'));
		fireEvent.click(getByTestId('foo-bar'));
		fireEvent.click(getByTestId('some-other-button-two'));
		expect(handleClickAway2).toBeCalledTimes(7);
	});

	const Input = React.forwardRef<HTMLInputElement>((props, ref) => {
		return <input type="text" {...props} ref={ref} />;
	});
	Input.displayName = 'Input';

	const useCustomRef = () => {
		const [ref, setRef] = React.useState(null);
		return { setRef, ref };
	};

	it('should not replace previously added refs', () => {
		const inputRef = React.createRef<HTMLInputElement>();
		const handleClickAway = jest.fn();
		const { result } = renderHook(() => useCustomRef());

		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway}>
					<Input ref={inputRef} />
				</ClickAwayListener>
				<button>A button</button>
				<p>A text element</p>
			</React.Fragment>
		);

		act(() => {
			result.current.setRef(inputRef);
		});

		fireEvent.click(getByText(/A button/i));
		fireEvent.click(getByText(/A text element/i));
		expect(handleClickAway).toBeCalledTimes(2);
		expect(result.current.ref).toBe(inputRef);
	});

	it("shouldn't hijack the onClick listener", () => {
		const handleClick = jest.fn();
		const handleClickAway = jest.fn();

		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway}>
					<button onClick={handleClick}>Hello World</button>
				</ClickAwayListener>
				<div>The new boston</div>
			</React.Fragment>
		);

		fireEvent.click(getByText('Hello World'));
		fireEvent.click(getByText('The new boston'));
		expect(handleClickAway).toBeCalledTimes(1);
		expect(handleClick).toBeCalledTimes(1);
	});

	it('should work with function refs', () => {
		const handleClickAway = jest.fn();
		let buttonRef;
		let divRef;

		render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway}>
					<button
						type="submit"
						ref={(element) => {
							buttonRef = element;
						}}
					>
						Hello World
					</button>
				</ClickAwayListener>
				<div
					ref={(element) => {
						divRef = element;
					}}
				>
					The new boston
				</div>
			</React.Fragment>
		);

		buttonRef.click();
		divRef.click();
		expect(buttonRef).toHaveProperty('type', 'submit');
		expect(handleClickAway).toBeCalledTimes(1);
	});

	it('should work with Portals', () => {
		const handleClickAway = jest.fn();
		let modalRoot = document.getElementById('modal-root');
		if (!modalRoot) {
			modalRoot = document.createElement('div');
			modalRoot.setAttribute('id', 'modal-root');
			document.body.appendChild(modalRoot);
		}

		const Portal = ({ children }) => {
			const modalRoot = document.getElementById('modal-root');
			const element = document.createElement('div');

			useEffect(() => {
				modalRoot.appendChild(element);

				return () => {
					modalRoot.removeChild(element);
				};
			});

			return ReactDOM.createPortal(children, element);
		};

		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway}>
					<div>
						<Portal>
							<div>Hello World</div>
						</Portal>
					</div>
				</ClickAwayListener>
				<button>A button</button>
			</React.Fragment>
		);

		fireEvent.click(getByText(/A button/i));
		fireEvent.click(getByText(/Hello World/i));
		expect(handleClickAway).toBeCalledTimes(1);
	});
});
