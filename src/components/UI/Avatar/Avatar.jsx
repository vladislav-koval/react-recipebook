import React, {Component, Fragment} from "react";
import classes from "./Avatar.module.scss";
import avatar from "../../../assets/img/photo.png";
import ImagesService from "../../../service/imagesService";

class Avatar extends Component {
    state = {
        file: '',
        imagePreviewUrl: ''
    };

    handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
        console.log("file", reader);
        ImagesService.uploadAvatar(file, "lall", file.name).then(data => console.log(data)).catch(error => console.log(error))
    };

    render() {
        let {imagePreviewUrl} = this.state;
        const editedCode =
            <Fragment>
                <label htmlFor={"fileUploader"}>Загрузить фото</label>
                <input className={classes.inputFile} type="file" id={"fileUploader"} onChange={this.handleImageChange}/>
            </Fragment>;
        return (
            <div className={classes.avatarInner}>
                <img src={imagePreviewUrl || avatar} alt="avatar"/>
                {this.props.edited ? editedCode : null}
            </div>
        )
    }
}


// const Avatar = props => {
//     const editedCode =
//         <React.Fragment>
//             <label htmlFor={"fileUploader"}>Загрузить фото</label>
//             <input className={classes.inputFile} type="file" id={"fileUploader"}/>
//         </React.Fragment>;
//     return (
//         <div className={classes.avatarInner}>
//             <img src={avatar} alt="avatar"/>
//             {props.edited ? editedCode : null}
//         </div>
//     );
// };

export default Avatar;
