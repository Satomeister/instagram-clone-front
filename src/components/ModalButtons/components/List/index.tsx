import React, { FC } from "react";

import "../../ButtonList.scss";

const ButtonList: FC = ({ children }): JSX.Element => {
  return <ul className="button-list">{children}</ul>;
};

export default ButtonList;
