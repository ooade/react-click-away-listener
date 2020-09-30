<p align="center">
  <img src="https://raw.githubusercontent.com/ooade/react-click-away-listener/master/logo.png" height="150" />
  <h3 align="center">~700B React Click Away Listener</h3>
  <p align="center">
  <a href="https://www.npmjs.org/package/react-click-away-listener"><img src="https://img.shields.io/npm/v/react-click-away-listener.svg?style=flat-square" alt="npm"></a>
  <a href="https://travis-ci.org/ooade/react-click-away-listener"><img src="https://img.shields.io/travis/ooade/react-click-away-listener.svg?style=flat-square" alt="travis"></a>
  <a href='https://coveralls.io/github/ooade/react-click-away-listener?branch=master'><img src='https://coveralls.io/repos/github/ooade/react-click-away-listener/badge.svg?branch=master' alt='Coverage Status' /></a>
  <a href="https://www.npmjs.org/package/react-click-away-listener"><img src="https://img.shields.io/npm/dm/react-click-away-listener.svg?style=flat-square" alt="downloads/month"></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat-square" alt="pullrequest"></a>
  <a href="http://www.firsttimersonly.com"><img src="https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square" alt="firsttimersonly"></a>
  </p>
</p>

## Installation

```sh
yarn add react-click-away-listener
```

- It's quite small in size.
- It's built with TypeScript.
- It supports both Mouse and Touch Events.
- It allows you to pass html element attributes as props.
- It allows you to render clickaway listener as a specified element, defaults to div if no element type is passed

## Usage

```jsx
import ClickAwayListener from 'react-click-away-listener';

const App = () => {
	const handleClickAway = () => {
		console.log('Hey, you can close the Popup now');
	};

	return (
		<div id="app">
			<ClickAwayListener onClickAway={handleClickAway}>
				<div> Some Popup, Nav or anything </div>
			</ClickAwayListener>
			<div id="rest-of-the-app">Don't name a div like that :(</div>
		</div>
	);
};
```

## Props and propsType

| Props       | PropsTypes                    | Description                                   |
| ----------- | ----------------------------- | --------------------------------------------- |
| onClickAway | (event) => void               | fires when listener is clicked away           |
| as          | React.ElementType             | element type to render as listener e.g button |
| mouseEvent  | 'click' 'mousedown' 'mouseup' | mouse event that fires onClickAway            |
| touchEvent  | 'touchstart' 'touchend'       | touch event that fires onClickAway            |

## Examples

- [A simple menu built with React Hooks](https://codesandbox.io/s/52384lyo8p)

## LICENSE

MIT
