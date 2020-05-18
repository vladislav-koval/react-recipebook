import React from "react";
import classes from "./Avatar.module.scss";
import avatar from "../../../assets/img/photo.png";

const Avatar = props => {
  return (
      <div className={classes.avatarInner}>
          <img src={avatar} alt="avatar"/>
          {props.edited ? <span>Загрузить фото</span> : null}
      </div>
  );
};

export default Avatar;
