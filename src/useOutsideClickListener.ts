import { useEffect, useRef } from 'react';

export type MouseEvents = 'click' | 'mousedown' | 'mouseup';
export type TouchEvents = 'touchstart' | 'touchend';

interface Props {
  onClickAway: (event: MouseEvent | TouchEvent) => void;
}

interface Events {
  mouseEvent?: MouseEvents;
  touchEvent?: TouchEvents;
}

export default function useOutsideClickListener<
  RefElement extends HTMLElement = HTMLDivElement
>(
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  { mouseEvent = 'click', touchEvent = 'touchend' }: Events = {},
): React.RefObject<RefElement> {
  let node = useRef<RefElement>(null);

  useEffect(() => {
    const handleEvents = (event: MouseEvent | TouchEvent): void => {
      if (node.current && node.current.contains(event.target as Node)) {
        return;
      }

      onClickAway(event);
    };

    document.addEventListener(mouseEvent, handleEvents);
    document.addEventListener(touchEvent, handleEvents);

    return () => {
      document.removeEventListener(mouseEvent, handleEvents);
      document.removeEventListener(touchEvent, handleEvents);
    };
  }, [onClickAway, mouseEvent, touchEvent]);

  return node;
}
