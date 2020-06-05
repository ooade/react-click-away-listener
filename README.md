## Installation

```sh
yarn add react-click-away-listener
```

- It's quite small in size.
- It's built with TypeScript.
- It supports both Mouse and Touch Events.
- Bring your own element!

## Usage

### Bring your own div

```tsx
import { useClickAwayListener } from "react-click-away-listener";

const App = () => {
  const ref = useClickAwayListener(() => {
    console.log("Hey, you can close the Popup now");
  });

  return (
    <div id="app">
      <div ref={ref}> Some Popup, Nav or anything </div>
      <div id="rest-of-the-app">Don't name a div like that :(</div>
    </div>
  );
};
```

### Bring your own span!

```tsx
import { useClickAwayListener } from "react-click-away-listener";

const App = () => {
  const ref = useClickAwayListener<HTMLSpanElement>(() => {
    console.log("Hey, you can close the Popup now");
  });

  return (
    <div id="app">
      <span ref={ref}> Some Popup, Nav or anything </span>
      <div id="rest-of-the-app">Don't name a div like that :(</div>
    </div>
  );
};
```

### Use it's div

```tsx
import ClickAwayListener from "react-click-away-listener";

const App = () => {
  const handleClickAway = () => {
    console.log("Hey, you can close the Popup now");
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

## Examples

- [A simple menu built with React Hooks](https://codesandbox.io/s/52384lyo8p)

## LICENSE

MIT

## Thanks to: ooade

Forked from https://github.com/ooade/react-click-away-listener as the author did not want the hook abstraction
