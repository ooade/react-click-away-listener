import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OutsideClickListener from '../src';

describe('ClickAway Listener', () => {
  it('should render properly', () => {
    const { getByText } = render(
      <OutsideClickListener onClickAway={() => null}>
        Hello World
      </OutsideClickListener>,
    );
    expect(getByText(/Hello World/i)).toBeTruthy();
  });

  it('should trigger onClickAway only when an element is clicked outside', () => {
    const fakeHandleClick = jest.fn();
    const { getByText } = render(
      <React.Fragment>
        <OutsideClickListener onClickAway={fakeHandleClick}>
          Hello World
        </OutsideClickListener>
        <button>A button</button>
        <p>A text element</p>
      </React.Fragment>,
    );

    fireEvent.click(getByText(/A button/i));
    fireEvent.click(getByText(/A text element/i));
    fireEvent.click(getByText(/Hello World/i));
    expect(fakeHandleClick).toBeCalledTimes(2);
  });

  it('works with different mouse events', () => {
    const fakeHandleClick = jest.fn();
    const { getByText } = render(
      <React.Fragment>
        <OutsideClickListener
          onClickAway={fakeHandleClick}
          mouseEvent="mousedown"
        >
          Hello World
        </OutsideClickListener>
        <button>A button</button>
        <p>A text element</p>
      </React.Fragment>,
    );

    fireEvent.mouseDown(getByText(/A button/i));
    fireEvent.mouseDown(getByText(/A text element/i));
    fireEvent.mouseDown(getByText(/Hello World/i));
    expect(fakeHandleClick).toBeCalledTimes(2);
  });

  it('returns the event object', () => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      expect(event.type).toBe('click');
    };

    const { getByText } = render(
      <React.Fragment>
        <OutsideClickListener onClickAway={handleClick}>
          Hello World
        </OutsideClickListener>
        <button>A button</button>
      </React.Fragment>,
    );

    fireEvent.click(getByText(/A button/i));
  });

  it('works with different touch events', () => {
    const fakeHandleClick = jest.fn();
    const { getByText } = render(
      <React.Fragment>
        <OutsideClickListener
          onClickAway={fakeHandleClick}
          touchEvent="touchend"
        >
          Hello World
        </OutsideClickListener>
        <button>A button</button>
        <p>A text element</p>
      </React.Fragment>,
    );

    fireEvent.touchEnd(getByText(/A button/i));
    fireEvent.touchEnd(getByText(/A text element/i));
    fireEvent.touchEnd(getByText(/Hello World/i));
    expect(fakeHandleClick).toBeCalledTimes(2);
  });

  it('should handle multiple cases', () => {
    const fakeHandleClick = jest.fn();
    const fakeHandleClick2 = jest.fn();
    const { getByTestId } = render(
      <React.Fragment>
        <OutsideClickListener onClickAway={fakeHandleClick}>
          <div data-testid="hello-world">Hello World</div>
        </OutsideClickListener>
        <button data-testid="button-one">A button</button>
        <button data-testid="some-other-button-one">Some other button</button>
        <p data-testid="text-one">A text element</p>

        <OutsideClickListener onClickAway={fakeHandleClick2}>
          <div data-testid="foo-bar">Foo bar</div>
        </OutsideClickListener>
        <button data-testid="button-two">Foo bar button</button>
        <button data-testid="some-other-button-two">
          Foo bar other button
        </button>
        <p data-testid="text-two">Foo bar text element</p>
      </React.Fragment>,
    );

    fireEvent.click(getByTestId('button-one'));
    fireEvent.click(getByTestId('text-one'));
    fireEvent.click(getByTestId('hello-world'));
    fireEvent.click(getByTestId('some-other-button-one'));
    expect(fakeHandleClick).toBeCalledTimes(3);

    // 4 from the previous ones, and the 3 new ones
    fireEvent.click(getByTestId('button-two'));
    fireEvent.click(getByTestId('text-two'));
    fireEvent.click(getByTestId('foo-bar'));
    fireEvent.click(getByTestId('some-other-button-two'));
    expect(fakeHandleClick2).toBeCalledTimes(7);
  });

  it('should only fire the most recent handler passed', () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();
    const { getByText, rerender } = render(
      <>
        <OutsideClickListener onClickAway={firstHandler}>
          Hello World
        </OutsideClickListener>
        <button>A button</button>
      </>,
    );
    rerender(
      <>
        <OutsideClickListener onClickAway={secondHandler}>
          Hello World
        </OutsideClickListener>
        <button>A button</button>
      </>,
    );
    fireEvent.touchEnd(getByText(/A button/i));

    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalled();
  });

  it('should not remove and add listeners unless dependencies change', () => {
    const handler = jest.fn();
    const { rerender } = render(
      <>
        <OutsideClickListener onClickAway={handler}>
          Hello World
        </OutsideClickListener>
      </>,
    );
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
    rerender(
      <>
        <OutsideClickListener onClickAway={handler}>
          Hello World
        </OutsideClickListener>
      </>,
    );

    expect(document.addEventListener).not.toHaveBeenCalled();
    expect(document.removeEventListener).not.toHaveBeenCalled();
  });

  it('should resetup event handlers if event names change', () => {
    const handler = jest.fn();
    const { rerender } = render(
      <>
        <OutsideClickListener onClickAway={handler} mouseEvent="click">
          Hello World
        </OutsideClickListener>
      </>,
    );
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
    rerender(
      <>
        <OutsideClickListener onClickAway={handler} mouseEvent="mouseup">
          Hello World
        </OutsideClickListener>
      </>,
    );

    expect(document.addEventListener).toHaveBeenCalled();
    expect(document.removeEventListener).toHaveBeenCalled();
    (document.addEventListener as ReturnType<typeof jest.fn>).mockReset();
    (document.removeEventListener as ReturnType<typeof jest.fn>).mockReset();
  });
});
