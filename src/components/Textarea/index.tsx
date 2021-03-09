import React, { ChangeEvent, FC } from "react";

import "./Textarea.scss";

interface TextareaProps {
  name: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  value: string;
  error?: string;
}

const Textarea: FC<TextareaProps> = ({
  name,
  onChange,
  value,
  error,
}): JSX.Element => {
  return (
    <div>
      <textarea
        className="textarea"
        onChange={onChange}
        onBlur={onChange}
        value={value || ""}
        id={name}
        name={name}
      />
      {error && <div className="helper__text">{error}</div>}
    </div>
  );
};

export default Textarea;
