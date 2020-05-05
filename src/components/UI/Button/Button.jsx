import React from "react";
import classes from './Button.module.scss';

const Button = props => {
    const cls = [
        classes.Button,
        classes[props.type],
    ];
    const TagName = props.tag ? props.tag : "button";
    return (
        <TagName
            to={props.to}
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </TagName>
    )
};

export default Button;
