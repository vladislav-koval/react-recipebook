import React from "react";
import classes from "./Select.module.scss";
function printOptions(options) {
    return options.map((option) => {
        return (
            <option key={option.key} value={option.key}>{option.value}</option>
        );
    })
}

const Select = props => {

    return (
        <div className={classes.Select}>
            <div>{props.label}</div>
            <select onChange={props.onChange}>
                {printOptions(props.options)}
            </select>
        </div>
    );
};

export default Select;
