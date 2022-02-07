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

- It's quite **small** in size! Just [![Bundlephobia](https://img.shields.io/bundlephobia/min/react-click-away-listener.svg?style=flat-square&label "Bundle size (minified)")](https://bundlephobia.com/result?p=react-click-away-listener) minified, or [![Bundlephobia](https://img.shields.io/bundlephobia/minzip/react-click-away-listener.svg?style=flat-square&label "Bundle size (minified+gzipped)")](https://bundlephobia.com/result?p=react-click-away-listener) minified & gzipp’d.
- It's built with **TypeScript**.
- It works with [React Portals](https://reactjs.org/docs/portals.html) ([v2.0.0](https://github.com/ooade/react-click-away-listener/releases/tag/v2.0.0) onwards).
- It supports **mouse**, **touch** and **focus** events.

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

### Caveats

[v2.0.0](https://github.com/ooade/react-click-away-listener/releases/tag/v2.0.0) has breaking changes which uses the [`React.Children.only`](https://reactjs.org/docs/react-api.html#reactchildrenonly) API.

Thus, the following caveats apply for the `children` of the `<ClickAwayListener>` component:

1. You may pass **only one child** to the `<ClickAwayListener>` component.
2. You may not pass plain text nodes to the `<ClickAwayListener>` component.

Violating the above caveats will result in the following error:

```js
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

Check the render method of `ClickAwayListener`.
```

If you have multiple child components to pass, you can simply wrap them around a [React Fragment](https://reactjs.org/docs/fragments.html) like so:

```jsx
// Assume the `handleClickAway` function is defined.
<ClickAwayListener onClickAway={handleClickAway}>
  <>
    <p>First paragraph</p>
    <button>Example Button</button>
    <p>Second paragraph</p>
  </>
</ClickAwayListener>
```

Or if you only have text nodes, you can also wrap them in a [React Fragment](https://reactjs.org/docs/fragments.html) like so:

```jsx
// Assume the `handleClickAway` function is defined.
<ClickAwayListener onClickAway={handleClickAway}>
  <>
    First text node
    Second text node
  </>
</ClickAwayListener>
```

## Props

| Name        | Type                              | Default       | Description                                               |
| ----------- | ----------------------------------| ------------- |---------------------------------------------------------- |
| onClickAway | (event) => void                   |               | Fires when a user clicks outside the click away component |
| mouseEvent  | 'click' \|<br/>'mousedown' \|<br/>'mouseup'| 'click'     | The mouse event type that gets fired on ClickAway          |
| touchEvent  | 'touchstart' \|<br/>'touchend'         | 'touchend'  | The touch event type that gets fired on ClickAway          |
| focusEvent  | 'focusin' \|<br/>'focusout'       | 'focusin'        | The focus event type that gets fired on ClickAway      |

## Examples

- [A simple menu built with React Hooks](https://codesandbox.io/s/52384lyo8p)

## LICENSE

MIT
