import Proptypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

/**
 * ClickAwayListener - Watches mouse events outside the clickaway wrapper
 * @param {node} children - React Children
 * @param {onClickAway} function - Function to be called when a click is detected outside the wrapper
 */
const ClickAway = ({ children, onClickAway, forwardedRef }) => {
	let myRef = useRef(null);

	if (!forwardedRef) {
		forwardedRef = myRef;
	}

	useEffect(() => {
		const eventListener = document.addEventListener('mousedown', event => {
			const isRefForwarded = forwardedRef && forwardedRef.current;
			const isMyRefValid = myRef && myRef.current;

			if (isRefForwarded && !forwardedRef.current.contains(event.target)) {
				if (isMyRefValid && !myRef.current.contains(event.target)) {
					onClickAway();
				}
			}
		});

		return () => {
			document.removeEventListener('mousedown', eventListener);
		};
	});

	return <div ref={myRef}>{children}</div>;
};

ClickAway.defaultProps = {
	children: null,
	forwardRef: null,
	onClickAway: () => {}
};

ClickAway.propTypes = {
	children: Proptypes.oneOfType([
		Proptypes.arrayOf(Proptypes.node),
		Proptypes.node
	]),
	forwardedRef: Proptypes.any,
	onClickAway: Proptypes.func
};

const ClickAwayListener = React.forwardRef(function ClickAwayFn(props, ref) {
	return <ClickAway {...props} forwardedRef={ref} />;
});

export default ClickAwayListener;
