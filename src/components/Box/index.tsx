import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

import "./Box.scss";

interface BoxProps {
  width?: number;
  height?: number;
  setBoxOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const Box: FC<BoxProps> = ({
  width,
  height,
  children,
  setBoxOpen,
  className,
}): JSX.Element => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = () => {
      setBoxOpen && setBoxOpen(false);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [setBoxOpen]);

  return (
    <div
      ref={boxRef}
      style={{ width, height }}
      className={`box ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Box;
