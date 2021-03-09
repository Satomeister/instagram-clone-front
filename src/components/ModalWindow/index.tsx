import React, { FC } from "react";

import "./ModalWindow.scss";

interface ModalWindowProps {
  width?: number;
  height?: number;
}

const ModalWindow: FC<ModalWindowProps> = ({
  children,
  width,
  height,
}): JSX.Element => {
  return (
    <div
      style={{ width: width || undefined, height: height || undefined }}
      className="modal-window"
    >
      {children}
    </div>
  );
};

export default ModalWindow;
