import React, { FC, useEffect, useRef } from "react";
import { GrClose as CloseIcon } from "react-icons/gr";

import "./ModalWrapper.scss";

interface ModalWrapperProps {
  onClose: () => void;
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  onClose,
  children,
}): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === wrapperRef.current) {
      onClose();
    }
  };

  return (
    <div ref={wrapperRef} onClick={handleCloseModal} className="modal-wrapper">
      <button onClick={() => onClose()} className="close-button">
        <CloseIcon />
      </button>
      {children}
    </div>
  );
};

export default ModalWrapper;
