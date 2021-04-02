import React, {
	useRef,
	useEffect,
	RefCallback,
	cloneElement,
	ReactElement,
	HTMLAttributes,
	MutableRefObject,
	FunctionComponent
} from 'react';

type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type TouchEvents = 'touchstart' | 'touchend';
type Events = MouseEvent | TouchEvent;
interface Props extends HTMLAttributes<HTMLElement> {
	onClickAway: (event: Events) => void;
	mouseEvent?: MouseEvents;
	touchEvent?: TouchEvents;
	children: ReactElement<any>;
}

const handlerMap = {
	click: 'onClick',
	mousedown: 'onMouseDown',
	mouseup: 'onMouseUp',
	touchstart: 'onTouchStart',
	touchend: 'onTouchEnd'
};

const ClickAwayListener: FunctionComponent<Props> = ({
	children,
	onClickAway,
	mouseEvent = 'click',
	touchEvent = 'touchend'
}) => {
	const node = useRef<HTMLElement | null>(null);
	const bubbledEventTarget = useRef<EventTarget | null>(null);
	const mountedRef = useRef(false);

	/**
	 * Prevents the bubbled event from getting triggered immediately
	 * https://github.com/facebook/react/issues/20074
	 */
	useEffect(() => {
		setTimeout(() => {
			mountedRef.current = true;
		}, 0);

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const handleBubbledEvents = (type: string) => (event: Events): void => {
		bubbledEventTarget.current = event.target;

		const handler = children?.props[type];

		if (handler) {
			handler(event);
		}
	};

	const handleChildRef = (childRef: HTMLElement) => {
		node.current = childRef;

		let { ref } = children as typeof children & {
			ref: RefCallback<HTMLElement> | MutableRefObject<HTMLElement>;
		};

		if (typeof ref === 'function') {
			ref(childRef);
		} else if (ref) {
			ref.current = childRef;
		}
	};

	useEffect(() => {
		const handleEvents = (event: Events): void => {
			if (!mountedRef.current) return;

			if (
				(node.current && node.current.contains(event.target as Node)) ||
				bubbledEventTarget.current === event.target
			) {
				return;
			}

			onClickAway(event);
		};

		document.addEventListener(mouseEvent, handleEvents);
		document.addEventListener(touchEvent, handleEvents);

		return () => {
			document.removeEventListener(mouseEvent, handleEvents);
			document.removeEventListener(touchEvent, handleEvents);
		};
	}, [mouseEvent, onClickAway, touchEvent]);

	const mappedMouseEvent = handlerMap[mouseEvent];
	const mappedTouchEvent = handlerMap[touchEvent];

	return React.Children.only(
		cloneElement(children as ReactElement<any>, {
			ref: handleChildRef,
			[mappedMouseEvent]: handleBubbledEvents(mappedMouseEvent),
			[mappedTouchEvent]: handleBubbledEvents(mappedTouchEvent)
		})
	);
};

export default ClickAwayListener;
