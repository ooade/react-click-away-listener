import Proptypes from 'prop-types';
import React, { useEffect } from 'react';

/**
 * ClickAwayListener - Watches mouse events outside the clickaway wrapper
 * @param {node} children - React Children
 * @param {onClickAway} function - Function to be called when a click is detected outside the wrapper
 */
const ClickAwayListener = ({ children, onClickAway }) => {
	const myRef = React.createRef(null);

	useEffect(() => {
		const eventListener = document.addEventListener('mousedown', event => {
			if (myRef && myRef.current && !myRef.current.contains(event.target)) {
				onClickAway();
			}
		});

		return () => {
			document.removeEventListener('mousedown', eventListener);
		};
	});

	return <div ref={myRef}>{children}</div>;
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
	onClickAway: Proptypes.func
};

export default ClickAwayListener;
