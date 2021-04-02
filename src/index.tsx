import React, {
	useRef,
	useEffect,
	ReactElement,
	MutableRefObject,
	FunctionComponent,
	HTMLAttributes,
	RefCallback
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

type BubbledEvent = {
	event: Events;
	type: string;
};

const ClickAwayListener: FunctionComponent<Props> = ({
	children,
	onClickAway,
	mouseEvent = 'click',
	touchEvent = 'touchend'
}) => {
	const node: MutableRefObject<HTMLElement | null> = useRef(null);
	const bubbledEventTarget: MutableRefObject<EventTarget | null> = useRef(null);

	const handleBubbledEvents = ({ event, type }: BubbledEvent): void => {
		bubbledEventTarget.current = event.target;

		const handler = children?.props[type];

		if (handler) {
			handler(event);
		}
	};

	useEffect(() => {
		const handleEvents = (event: Events): void => {
			if (
				(node.current && node.current.contains(event.target as Node)) ||
				bubbledEventTarget.current === event.target
			) {
				return;
			}

			onClickAway(event);
		};

		document.addEventListener(mouseEvent, handleEvents, { capture: true });
		document.addEventListener(touchEvent, handleEvents, { capture: true });

		return () => {
			document.removeEventListener(mouseEvent, handleEvents, { capture: true });
			document.removeEventListener(touchEvent, handleEvents, { capture: true });
		};
	}, [mouseEvent, onClickAway, touchEvent]);

	return React.Children.only(
		React.cloneElement(children as ReactElement<any>, {
			ref: (childRef: HTMLElement) => {
				node.current = childRef;

				let { ref } = children as typeof children & {
					ref: RefCallback<HTMLElement> | MutableRefObject<HTMLElement>;
				};

				if (typeof ref === 'function') {
					ref(childRef);
				} else if (ref) {
					ref.current = childRef;
				}
			},
			onClick: (event: Events) =>
				handleBubbledEvents({ type: 'onClick', event }),
			onTouchEnd: (event: Events) =>
				handleBubbledEvents({ type: 'onTouchEnd', event })
		})
	);
};

export default ClickAwayListener;
