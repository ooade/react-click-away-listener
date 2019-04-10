import Proptypes from 'prop-types';
import React, { useEffect } from 'react';

const ClickAwayListener = ({ children, onClickAway }) => {
	const myRef = React.createRef(null);

	useEffect(() => {
		document.addEventListener("mousedown", event => {
			if (myRef && !myRef.current.contains(event.target)) {
				onClickAway();
			}
		});

		return () => {
			document.removeEventListener("mousedown");
		};
	});

	return <div ref={myRef}>{children}</div>;
}

ClickAwayListener.defaultProps = {
	children: null,
	onClickAway: () => {}
};

ClickAwayListener.propTypes = {
	children: Proptypes.oneOfType([Proptypes.arrayOf(Proptypes.node), Proptypes.node]),
	onClickAway: Proptypes.func
};

export default ClickAwayListener;
