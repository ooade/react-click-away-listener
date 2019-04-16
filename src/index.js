import Proptypes from 'prop-types';
import React, { useEffect, createRef } from 'react';

/**
 * ClickAwayListener - Watches mouse events outside the clickaway wrapper
 * @param {node} children - React Children
 * @param {onClickAway} function - Callback to be called when a click is detected outside the wrapper
 * @param {clickAwayId} string - an Id to map clickaway handlers to
 * @param {props} object - @any props passed by the user
 */
const ClickAwayListener = ({
	children,
	onClickAway,
	clickAwayId,
	...props
}) => {
	let myRef = createRef(null);

	useEffect(() => {
		const eventListener = document.addEventListener('mousedown', event => {
			const preventClickaway =
				event.target.dataset && event.target.dataset.preventClickaway;
			const isValidRef = myRef && myRef.current;

			if (!!preventClickaway && preventClickaway === clickAwayId) {
				return;
			}

			if (isValidRef && !isValidRef.contains(event.target)) {
				onClickAway();
			}
		});

		return () => {
			document.removeEventListener('mousedown', eventListener);
		};
	});

	return (
		<div ref={myRef} {...props}>
			{children}
		</div>
	);
};

ClickAwayListener.defaultProps = {
	children: null,
	onClickAway: () => {}
};

ClickAwayListener.propTypes = {
	children: Proptypes.oneOfType([
		Proptypes.arrayOf(Proptypes.node),
		Proptypes.node
	]),
	refs: Proptypes.array,
	clickAwayId: Proptypes.string,
	forwardedRef: Proptypes.any,
	onClickAway: Proptypes.func
};

export default ClickAwayListener;
