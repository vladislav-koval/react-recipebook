import React from "react";
import classes from './Loader.module.scss';

const Loader = props => {
    return (
        <div className={classes.WrapperLoader}>
            <div className={classes.Loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
