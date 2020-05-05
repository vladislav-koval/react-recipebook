import React from "react";
import classes from "./Textarea.module.scss";

const Textarea = props => {
    const cls = [classes.Textarea];
    const htmlFor = `${props.label}-${Math.random()}`;

    return (
        <div className={cls.join(' ')}>
            <label htmlFor="">{props.label}</label>
            <textarea onChange={props.onChange} id={htmlFor}>
                {props.value}
            </textarea>
        </div>
    );
};

export default Textarea;
