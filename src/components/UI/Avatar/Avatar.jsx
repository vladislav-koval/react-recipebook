import React, {Fragment} from "react";
import classes from "./Avatar.module.scss";
import avatar from "../../../assets/img/photo.png";

const Avatar = props => {
    const editedCode =
        <Fragment>
            <label htmlFor={"fileUploader"}>Загрузить фото</label>
            <input className={classes.inputFile} type="file" id={"fileUploader"} onChange={props.onChange}/>
        </Fragment>;
    return (
        <div className={classes.avatarInner}>
            <img src={props.src} onError={e => e.target.src = avatar} alt="avatar"/>
            {props.edited ? editedCode : null}
        </div>
    );
};

export default Avatar;
