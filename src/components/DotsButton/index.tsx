import React, { FC } from "react";

import "./DotsButton.scss";

interface DotsButtonProps {
  onButtonClick: () => void;
}

const DotsButton: FC<DotsButtonProps> = ({ onButtonClick }): JSX.Element => {
  return (
    <button onClick={onButtonClick} className="dots-menu">
      <div />
    </button>
  );
};

export default DotsButton;
