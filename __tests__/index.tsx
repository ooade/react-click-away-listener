import React, { act } from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, renderHook } from '@testing-library/react';
import ClickAwayListener from '../src';

/**
 * runOnlyPendingTimers to help flush our effect manually because of the bug in React portal.
 * https://github.com/facebook/react/issues/20074
 */

describe('ClickAway Listener', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	it('should render properly', () => {
		const { container } = render(
			<ClickAwayListener onClickAway={() => null}>
				<div>Hello World</div>
			</ClickAwayListener>
		);
		expect(container?.firstElementChild?.tagName).toBe('DIV');
	});

	it.each`
		fireEventFn   | expectedEventType
		${'focusIn'}  | ${'focusin'}
		${'click'}    | ${'click'}
		${'touchEnd'} | ${'touchend'}
	`(
		'should return the "$expectedEventType" event object, when the "$fireEventFn" event is fired on the outside element',
		({ fireEventFn, expectedEventType }) => {
			const handleClick = (event) => {
				expect(event.type).toBe(expectedEventType);
			};

			const { getByText } = render(
				<React.Fragment>
					<ClickAwayListener onClickAway={handleClick}>
						<div>An inside Hello World element</div>
					</ClickAwayListener>
					<button>An outside button</button>
				</React.Fragment>
			);

			fireEvent[fireEventFn](getByText(/outside button/i));
		}
	);

	it.each`
		mouseEvent     | fireEventFn
		${'click'}     | ${'click'}
		${'mousedown'} | ${'mouseDown'}
		${'mouseup'}   | ${'mouseUp'}
	`(
		'should invoke the provided onClickAway listener, only when the "$fireEventFn" mouse event is fired on the outside elements',
		({ mouseEvent, fireEventFn }) => {
			const handleClickAway = jest.fn();
			const { getByText } = render(
				<React.Fragment>
					<ClickAwayListener
						onClickAway={handleClickAway}
						mouseEvent={mouseEvent}
					>
						<div>Hello World</div>
					</ClickAwayListener>
					<button>A button</button>
					<p>A text element</p>
				</React.Fragment>
			);
			jest.runOnlyPendingTimers();

			fireEvent[fireEventFn](getByText(/A button/i));
			fireEvent[fireEventFn](getByText(/A text element/i));
			fireEvent[fireEventFn](getByText(/Hello World/i));
			expect(handleClickAway).toHaveBeenCalledTimes(2);
		}
	);

	it.each`
		touchEvent      | fireEventFn
		${'touchstart'} | ${'touchStart'}
		${'touchend'}   | ${'touchEnd'}
	`(
		'should invoke the provided onClickAway listener, only when the "$fireEventFn" touch event is fired on the outside elements',
		({ touchEvent, fireEventFn }) => {
			const handleClickAway = jest.fn();
			const { getByText } = render(
				<React.Fragment>
					<ClickAwayListener
						onClickAway={handleClickAway}
						touchEvent={touchEvent}
					>
						<div>Hello World</div>
					</ClickAwayListener>
					<button>A button</button>
					<p>A text element</p>
				</React.Fragment>
			);
			jest.runOnlyPendingTimers();

			fireEvent[fireEventFn](getByText(/A button/i));
			fireEvent[fireEventFn](getByText(/A text element/i));
			fireEvent[fireEventFn](getByText(/Hello World/i));
			expect(handleClickAway).toHaveBeenCalledTimes(2);
		}
	);

	it.each`
		focusEvent    | fireEventFn
		${'focusin'}  | ${'focusIn'}
		${'focusout'} | ${'focusOut'}
	`(
		'should invoke the provided onClickAway listener, only when the "$fireEventFn" focus event is fired on the outside elements',
		({ focusEvent, fireEventFn }) => {
			const handleClickAway = jest.fn();
			const { getByText } = render(
				<React.Fragment>
					<ClickAwayListener
						onClickAway={handleClickAway}
						focusEvent={focusEvent}
					>
						<div>Hello World</div>
					</ClickAwayListener>
					<button>A button</button>
					<p>A text element</p>
				</React.Fragment>
			);
			jest.runOnlyPendingTimers();

			fireEvent[fireEventFn](getByText(/A button/i));
			fireEvent[fireEventFn](getByText(/A text element/i));
			fireEvent[fireEventFn](getByText(/Hello World/i));
			expect(handleClickAway).toHaveBeenCalledTimes(2);
		}
	);

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
		jest.runOnlyPendingTimers();

		fireEvent.click(getByTestId('button-one'));
		fireEvent.click(getByTestId('text-one'));
		fireEvent.click(getByTestId('hello-world'));
		fireEvent.click(getByTestId('some-other-button-one'));
		expect(handleClickAway).toHaveBeenCalledTimes(3);

		// 4 from the previous ones, and the 3 new ones
		fireEvent.click(getByTestId('button-two'));
		fireEvent.click(getByTestId('text-two'));
		fireEvent.click(getByTestId('foo-bar'));
		fireEvent.click(getByTestId('some-other-button-two'));
		expect(handleClickAway2).toHaveBeenCalledTimes(7);
	});

	const Input = React.forwardRef<HTMLInputElement>((props, ref) => {
		return <input type="text" {...props} ref={ref} />;
	});
	Input.displayName = 'Input';

	it('shouldn’t replace previously added refs', () => {
		const { result } = renderHook(() => {
			const ref = React.useRef();

			const setRef = (v) => {
				ref.current = v;
			};

			return { ref, setRef };
		});

		const inputRef = React.createRef<HTMLInputElement>();
		const handleClickAway = jest.fn();

		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={handleClickAway}>
					<Input ref={inputRef} />
				</ClickAwayListener>
				<button>A button</button>
				<p>A text element</p>
			</React.Fragment>
		);
		jest.runOnlyPendingTimers();

		act(() => {
			result.current.setRef(inputRef.current);
		});

		fireEvent.click(getByText(/A button/i));
		fireEvent.click(getByText(/A text element/i));
		expect(handleClickAway).toHaveBeenCalledTimes(2);
		expect(result.current.ref).toStrictEqual(inputRef);
	});

	it('shouldn’t hijack the onClick listener', () => {
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
		jest.runOnlyPendingTimers();

		fireEvent.click(getByText('Hello World'));
		fireEvent.click(getByText('The new boston'));
		expect(handleClickAway).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should work with other body events', () => {
		const handleClick = jest.fn();
		const handleClickAway = jest.fn();

		const { getByTestId } = render(
			<React.Fragment>
				<ClickAwayListener
					onClickAway={(event) => {
						if ((event as KeyboardEvent).key === 'Escape') {
							handleClickAway(event);
						}
					}}
					bodyEventsToCapture={['keydown']}
				>
					<button onClick={handleClick}>Hello World</button>
				</ClickAwayListener>
				<input type="text" data-testid="input" />
			</React.Fragment>
		);
		jest.runOnlyPendingTimers();

		fireEvent.keyDown(getByTestId('input'), { key: 'Enter' });
		expect(handleClickAway).toHaveBeenCalledTimes(0);
		fireEvent.keyDown(getByTestId('input'), { key: 'Escape' });
		expect(handleClickAway).toHaveBeenCalledTimes(1);
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
		jest.runOnlyPendingTimers();

		buttonRef.click();
		divRef.click();
		expect(buttonRef).toHaveProperty('type', 'submit');
		expect(handleClickAway).toHaveBeenCalledTimes(1);
	});

	it('should work with Portals', () => {
		const handleClickAway = jest.fn();

		const Portal = ({ children }) => {
			return ReactDOM.createPortal(children, document.body);
		};

		const App = () => {
			const [open, setOpen] = React.useState(false);

			let modalRoot = document.getElementById('modal-root');
			if (!modalRoot) {
				modalRoot = document.createElement('div');
				modalRoot.setAttribute('id', 'modal-root');
				document.body.appendChild(modalRoot);
			}

			return (
				<React.Fragment>
					<button onClick={() => setOpen(true)}>A button</button>
					{open && (
						<ClickAwayListener onClickAway={handleClickAway}>
							<div>
								<Portal>
									<div>Hello World</div>
								</Portal>
							</div>
						</ClickAwayListener>
					)}
				</React.Fragment>
			);
		};

		const { getByText } = render(<App />);

		fireEvent.click(getByText(/A button/i));
		jest.advanceTimersByTime(0);
		fireEvent.click(getByText(/Hello World/i));
		fireEvent.click(getByText(/A button/i));
		expect(handleClickAway).toHaveBeenCalledTimes(1);
	});

	it('should fire the latest onClickAway when the callback changes mid-lifecycle', () => {
		const firstHandler = jest.fn();
		const secondHandler = jest.fn();

		const App = () => {
			const [handler, setHandler] = React.useState(() => firstHandler);

			return (
				<React.Fragment>
					<ClickAwayListener onClickAway={handler}>
						<div>Inside</div>
					</ClickAwayListener>
					<button onClick={() => setHandler(() => secondHandler)}>
						Change handler
					</button>
					<p>Outside text</p>
				</React.Fragment>
			);
		};

		const { getByText } = render(<App />);
		jest.runOnlyPendingTimers();

		fireEvent.click(getByText(/Outside text/i));
		expect(firstHandler).toHaveBeenCalledTimes(1);
		expect(secondHandler).toHaveBeenCalledTimes(0);

		fireEvent.click(getByText(/Change handler/i));
		fireEvent.click(getByText(/Outside text/i));
		// firstHandler was called twice total: once for "Outside text" and once for "Change handler" (also outside)
		expect(firstHandler).toHaveBeenCalledTimes(2);
		expect(secondHandler).toHaveBeenCalledTimes(1);
	});

	it('should only fire the correct handler with nested ClickAwayListeners', () => {
		const outerHandler = jest.fn();
		const innerHandler = jest.fn();

		const { getByText } = render(
			<React.Fragment>
				<ClickAwayListener onClickAway={outerHandler}>
					<div>
						Outer
						<ClickAwayListener onClickAway={innerHandler}>
							<div>Inner</div>
						</ClickAwayListener>
					</div>
				</ClickAwayListener>
				<button>Fully outside</button>
			</React.Fragment>
		);
		jest.runOnlyPendingTimers();

		// Clicking inside inner should not fire inner's handler
		fireEvent.click(getByText(/Inner/i));
		expect(innerHandler).toHaveBeenCalledTimes(0);
		expect(outerHandler).toHaveBeenCalledTimes(0);

		// Clicking fully outside should fire both handlers
		fireEvent.click(getByText(/Fully outside/i));
		expect(outerHandler).toHaveBeenCalledTimes(1);
		expect(innerHandler).toHaveBeenCalledTimes(1);
	});

	it('should not throw when the component unmounts during an event', () => {
		const handleClickAway = jest.fn();

		const App = () => {
			const [show, setShow] = React.useState(true);

			return (
				<React.Fragment>
					{show && (
						<ClickAwayListener onClickAway={handleClickAway}>
							<div>Inside</div>
						</ClickAwayListener>
					)}
					<button onClick={() => setShow(false)}>Unmount</button>
				</React.Fragment>
			);
		};

		const { getByText } = render(<App />);
		jest.runOnlyPendingTimers();

		// Unmount the ClickAwayListener
		fireEvent.click(getByText(/Unmount/i));

		// Clicking after unmount should not throw
		expect(() => {
			fireEvent.click(document.body);
		}).not.toThrow();

		// The handler should not have been called after unmount
		// It was called once when pressing "Unmount" (which is outside)
		expect(handleClickAway).toHaveBeenCalledTimes(1);
	});
});
