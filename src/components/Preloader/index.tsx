import React, {FC} from "react";

import './Preloader.scss'

import preloader from '../../assets/preloader.png'

interface PreloaderProps {
  size?: number,
  className?: string
}

const Preloader:FC<PreloaderProps> = ({size,className}):JSX.Element => {
  return (
    <div className={`preloader ${className}`}>
      <img width={size || 20} height={size || 20} src={preloader} alt="loading..."/>
    </div>
  )
}

export default Preloader