import React, { useEffect, useRef, FunctionComponent } from 'react';

type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type TouchEvents = 'touchstart' | 'touchend';

interface Props extends React.HTMLAttributes<HTMLElement> {
	onClickAway: (event: MouseEvent | TouchEvent) => void;
	mouseEvent?: MouseEvents;
	touchEvent?: TouchEvents;
	as?: React.ElementType;
}

const ClickAwayListener: FunctionComponent<Props> = ({
	as = 'div',
	onClickAway,
	mouseEvent = 'click',
	touchEvent = 'touchend',
	...props
}) => {
	let node = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleEvents = (event: MouseEvent | TouchEvent): void => {
			if (node.current && node.current.contains(event.target as Node)) {
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

	return React.createElement(as, { ref: node, ...props });
};

export default ClickAwayListener;
