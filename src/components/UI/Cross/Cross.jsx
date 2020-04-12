import React from "react";
import img from '../../../assets/img/close.png';
import classes from './Cross.module.scss';

const Cross = props => {
    return (
        <img className={classes.Cross} src={img} alt="close" onClick={props.onClick}/>
    );
};

export default Cross;
