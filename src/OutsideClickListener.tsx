import React, { FunctionComponent } from 'react';
import useOutsideClickListener, {
  MouseEvents,
  TouchEvents,
} from './useOutsideClickListener';

interface Props {
  onClickAway: (event: MouseEvent | TouchEvent) => void;
  mouseEvent?: MouseEvents;
  touchEvent?: TouchEvents;
}

const OutsideClickListener: FunctionComponent<Props> = ({
  onClickAway,
  mouseEvent = 'click',
  touchEvent = 'touchend',
  children,
}) => {
  const node = useOutsideClickListener(onClickAway, { mouseEvent, touchEvent });

  return <div ref={node}>{children}</div>;
};

export default OutsideClickListener;
