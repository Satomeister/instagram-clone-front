import React, { ChangeEvent, FC, useRef, useState } from "react";

import "./SendCommentInput.scss";
import {AiOutlineMessage as MessageIcon} from "react-icons/all";

const SendCommentInput: FC = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  };

  const handleInputClick = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }

  const handleInputBlur = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 18 + 'px'
      textareaRef.current.scroll(0, textareaRef.current.scrollHeight)
    }
  }

  return (
    <div className="send-comment-input">
      <MessageIcon />
      <textarea
        ref={textareaRef}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        value={value}
        placeholder="Add a comment..."
      />
      <button disabled={value.trim().length === 0}>Post</button>
    </div>
  );
};

export default SendCommentInput;