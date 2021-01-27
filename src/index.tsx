import React, {
	useRef,
	useEffect,
	ReactElement,
	MutableRefObject,
	FunctionComponent
} from 'react';

type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type TouchEvents = 'touchstart' | 'touchend';
type Events = MouseEvent | TouchEvent;

interface Props extends React.HTMLAttributes<HTMLElement> {
	onClickAway: (event: Events) => void;
	mouseEvent?: MouseEvents;
	touchEvent?: TouchEvents;
}

const ClickAwayListener: FunctionComponent<Props> = ({
	children,
	onClickAway,
	mouseEvent = 'click',
	touchEvent = 'touchend'
}) => {
	const node = useRef<HTMLElement>(null);
	const bubbledEvent: MutableRefObject<Events | null> = useRef(null);

	const handleBubbledEvents = (event: Events | null) => {
		bubbledEvent.current = event;
	};

	useEffect(() => {
		const handleEvents = (event: Events): void => {
			if (
				(node.current && node.current.contains(event.target as Node)) ||
				(bubbledEvent.current && bubbledEvent.current.target === event.target)
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

	return React.cloneElement(children as ReactElement, {
		ref: node,
		onClick: handleBubbledEvents,
		onTouchEnd: handleBubbledEvents
	});
};

export default ClickAwayListener;
