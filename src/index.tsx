import React, { useEffect, useRef, FunctionComponent } from 'react';

interface Props {
	onClickAway: Function;
}

const ClickAwayListener: FunctionComponent<Props> = ({ onClickAway, children }) => {

	let node = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent): void => {
			if (node.current && node.current.contains(event.target as Node)) {
				return;
			}

			onClickAway();
		}

		document.addEventListener('mousedown', handleMouseDown);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		};
	});

	return (
		<div ref={node}>
			{children}
		</div>
	);
};

export default ClickAwayListener;
