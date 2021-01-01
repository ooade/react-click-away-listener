<p align="center">
  <img src="https://raw.githubusercontent.com/ooade/react-click-away-listener/main/logo.png" height="150" />
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
- It works with Portals.

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

## Props

| Prop        | Default value | Description                                               |
| ----------- | ------------- |---------------------------------------------------------- |
| onClickAway | undefined     | Fires when a user clicks outside the click away component |
| as          | div           | The rendered element type                                 |
| mouseEvent  | click         | The mouse event type that gets fired on ClickAway         |
| touchEvent  | touchend      | The touch event type that gets fired on ClickAway         |

## Examples

- [A simple menu built with React Hooks](https://codesandbox.io/s/52384lyo8p)

## LICENSE

MIT
