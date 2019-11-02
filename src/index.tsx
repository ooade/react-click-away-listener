import React, { useEffect, useRef, ReactNode } from 'react';

interface Props {
	children: JSX.Element[] | JSX.Element;
	onClickAway: Function;
	childrenProps: { [key: string]: any }[];
}

const ClickAwayListener = (props: Props) => {
	const {
		children,
		onClickAway,
		...childrenProps
	} = props;

	let node = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseDown = (event:any) => {
			if (node.current && node.current.contains(event.target)) {
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
		<div ref={node} {...childrenProps}>
			{children}
		</div>
	);
};

export default ClickAwayListener;
