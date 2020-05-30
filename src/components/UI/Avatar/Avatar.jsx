import React, {Component, Fragment} from "react";
import classes from "./Avatar.module.scss";
import avatar from "../../../assets/img/photo.png";

class Avatar extends Component {

    render() {
        const editedCode =
            <Fragment>
                <label htmlFor={"fileUploader"}>Загрузить фото</label>
                <input className={classes.inputFile} type="file" id={"fileUploader"} onChange={this.props.onChange}/>
            </Fragment>;
        return (
            <div className={classes.avatarInner}>
                <img src={this.props.src} onError={e => e.target.src=avatar} alt="avatar"/>
                {this.props.edited ? editedCode : null}
            </div>
        )
    }
}

export default Avatar;
