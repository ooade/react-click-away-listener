## Installation

```sh
yarn add react-clicks-without-borders
```

- It's quite small in size.
- It's built with TypeScript.
- It supports both Mouse and Touch Events.
- Bring your own element!

## Usage

### Bring your own div

```tsx
import { useOutsideClickListener } from 'react-clicks-without-borders';

const App = () => {
  const ref = useOutsideClickListener(() => {
    console.log('Hey, you can close the Popup now');
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
import { useOutsideClickListener } from 'react-clicks-without-borders';

const App = () => {
  const ref = useOutsideClickListener<HTMLSpanElement>(() => {
    console.log('Hey, you can close the Popup now');
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
import OutsideClickListener from 'react-clicks-without-borders';

const App = () => {
  const handleClickAway = () => {
    console.log('Hey, you can close the Popup now');
  };

  return (
    <div id="app">
      <OutsideClickListener onClickAway={handleClickAway}>
        <div> Some Popup, Nav or anything </div>
      </OutsideClickListener>
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

Forked from https://github.com/ooade/react-clicks-without-borders as the author did not want the hook abstraction
