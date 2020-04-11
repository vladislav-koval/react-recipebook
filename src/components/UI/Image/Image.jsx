import React from "react";


const Image = ({src, alt, classNames}) => {
    src = src ? src : "http://via.placeholder.com/126x139";
  return (
      <img src={src} alt={alt} className={classNames}/>
  )
};

export default Image;
