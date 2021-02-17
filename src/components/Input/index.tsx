import React, { ChangeEvent, FC } from "react";
import classNames from "classnames";

import "./Input.scss";

interface InputProps {
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
}

const Input: FC<InputProps> = ({
  name,
  type,
  placeholder,
  onChange,
  value,
  error,
}): JSX.Element => {
  return (
    <div>
      <div className={classNames("input__wrapper", { error: !!error })}>
        <input
          onChange={onChange}
          onBlur={onChange}
          value={value || ""}
          id={name}
          name={name}
          type={type}
          required
        />
        <label htmlFor={name}>{placeholder}</label>
      </div>
      {error && <div className="helper__text">{error}</div>}
    </div>
  );
};

export default Input;
