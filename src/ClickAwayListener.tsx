import React, { FunctionComponent } from "react";
import useClickAwayListener, {
  MouseEvents,
  TouchEvents,
} from "./useClickAwayListener";

interface Props {
  onClickAway: (event: MouseEvent | TouchEvent) => void;
  mouseEvent?: MouseEvents;
  touchEvent?: TouchEvents;
}

const ClickAwayListener: FunctionComponent<Props> = ({
  onClickAway,
  mouseEvent = "click",
  touchEvent = "touchend",
  children,
}) => {
  const node = useClickAwayListener(onClickAway, { mouseEvent, touchEvent });

  return <div ref={node}>{children}</div>;
};

export default ClickAwayListener;
