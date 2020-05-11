import React from "react";
import classes from './Image.module.scss';

const Image = ({src, alt, classNames}) => {
    src = src ? src : "http://via.placeholder.com/200x200";
    const cls = [classes.Img];

    if (classNames)
        classNames.split(' ').forEach(className => {
            cls.push(className);
        });

    return (
        <img src={src} alt={alt} className={cls.join(' ')}/>
    )
};

export default Image;
