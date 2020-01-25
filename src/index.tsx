import React, { useEffect, useRef, FunctionComponent } from 'react';

type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type TouchEvents = 'touchstart' | 'touchend';

interface Props {
	onClickAway: Function;
	mouseEvent?: MouseEvents;
	touchEvent?: TouchEvents;
}

const ClickAwayListener: FunctionComponent<Props> = ({
	onClickAway,
	mouseEvent = 'click',
	touchEvent = 'touchend',
	children
}) => {
	let node = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEvents = (event: MouseEvent | TouchEvent): void => {
			if (node.current && node.current.contains(event.target as Node)) {
				return;
			}

			onClickAway();
		};

		document.addEventListener(mouseEvent, handleEvents);
		document.addEventListener(touchEvent, handleEvents);

		return () => {
			document.removeEventListener(mouseEvent, handleEvents);
			document.removeEventListener(touchEvent, handleEvents);
		};
	});

	return <div ref={node}>{children}</div>;
};

export default ClickAwayListener;
