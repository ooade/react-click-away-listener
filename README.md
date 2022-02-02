<p align="center">
  <img src="https://raw.githubusercontent.com/ooade/react-click-away-listener/main/logo.png" height="150" />
  <h3 align="center">~700B React Click Away Listener</h3>
  <p align="center">
  <a href="https://www.npmjs.org/package/react-click-away-listener"><img src="https://img.shields.io/npm/v/react-click-away-listener.svg?style=flat-square" alt="npm"></a>
  <a href="https://coveralls.io/github/ooade/react-click-away-listener?branch=master"><img src="https://coveralls.io/repos/github/ooade/react-click-away-listener/badge.svg?branch=master" alt="Coverage Status" /></a>
  <a href="https://github.com/ooade/react-click-away-listener/blob/main/.github/workflows/build-test-code.yml"><img src="https://github.com/ooade/react-click-away-listener/workflows/Test/badge.svg" alt="Test"/></a>
  <a href="https://www.npmjs.org/package/react-click-away-listener"><img src="https://img.shields.io/npm/dm/react-click-away-listener.svg?style=flat-square" alt="downloads/month"></a>
  <a href="https://bundlephobia.com/package/react-click-away-listener
"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/react-click-away-listener?style=flat-square"></a>
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
- It works with Portals (>= v2).

## Usage

```jsx
import ClickAwayListener from 'react-click-away-listener';

const App = () => {
	const handleClickAway = () => {
		console.log('Maybe close the popup');
	};

	return (
		<div id="app">
			<ClickAwayListener onClickAway={handleClickAway}>
				<div> Triggers whenever a click event is registered outside this div element </div>
			</ClickAwayListener>
		</div>
	);
};
```

Caveats:
 - Ensure the ClickAway component has just one child else `React.only` will throw an error.
 - It doesn't work with Text nodes.

## Props

| Name        | Type                              | Default       | Description                                               |
| ----------- | ----------------------------------| ------------- |---------------------------------------------------------- |
| onClickAway | (event) => void                   |               | Fires when a user clicks outside the click away component |
| mouseEvent  | 'click' \|<br/>'mousedown' \|<br/>'mouseup'| 'click'     | The mouse event type that gets fired on ClickAway          |
| touchEvent  | 'touchstart' \|<br/>'touchend'         | 'touchend'  | The touch event type that gets fired on ClickAway          |

## Examples

- [A simple menu built with React Hooks](https://codesandbox.io/s/52384lyo8p)

## LICENSE

MIT
