import React, {Component, Fragment} from "react";
import classes from "./Profile.module.scss";
import Button from "../../components/UI/Button/Button";
import ProfileService from "../../service/profileService";
import AuthService from "../../service/authService";
import Input from "../../components/UI/Input/Input";
import {getProfileControls, onChangeHandler} from "../../form/formService";
import {NavLink} from "react-router-dom";
import Avatar from "../../components/UI/Avatar/Avatar";
import ImagesService from "../../service/imagesService";

class Profile extends Component {
    state = {
        login: "",
        name: "",
        surname: "",
        avatar: "",
        rating: 0,
        isAdmin: AuthService.isAdmin(),

        isEditing: false,
        isFormValid: false,
        formControls: {...getProfileControls()},
    };

    componentDidMount() {
        // if (!ProfileService.profileIsExists()) {
            ProfileService.setProfileDataFromServer().then(() => this.setProfileData());
        // } else {
        //     this.setProfileData();
        // }
    }

    setProfileData() {
        let login = ProfileService.getUserLogin();
        let name = ProfileService.getUserName();
        let surname = ProfileService.getUserSurname();
        let avatar = ProfileService.getUserAvatar();
        let rating = ProfileService.getUserRating();
        this.setState({
            login,
            name,
            surname,
            avatar,
            rating
        });
    };

    onEditClicked = () => {
        const formControls = {...this.state.formControls};
        formControls.login.value = this.state.login;
        formControls.name.value = this.state.name;
        formControls.surname.value = this.state.surname;

        this.setState({formControls, isEditing: true});
    };

    onRejectEditClicked = () => {
        this.setState({isEditing: false, isFormValid: false});
    };

    onAcceptEditClicked = () => {
        const login = this.state.formControls.login.value;
        const name = this.state.formControls.name.value;
        const surname = this.state.formControls.surname.value;
        ProfileService.executeEditProfileService({login, name, surname})
            .then(() => {
                this.setState({login, name, surname, isFormValid: false, isEditing: false})
            })
            .catch(error => console.log("error in Profile", error.message));
    };

    onChangeHandler = (event, controlName) => {
        let {formControls, isFormValid} = onChangeHandler(event, {...this.state.formControls}, controlName);
        isFormValid = isFormValid && !this.isHaveChanged(formControls);
        this.setState({
            formControls,
            isFormValid
        });
    };

    isHaveChanged = (formControls) => {
        return this.state.login === formControls.login.value &&
            this.state.name === formControls.name.value &&
            this.state.surname === formControls.surname.value;
    };

    onChangeAvatar = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        let login = ProfileService.getUserLogin();
        reader.readAsDataURL(file);
        ImagesService.uploadAvatar(file, login, file.name)
            .then(data => {
                console.log("fileRes", data);
                const avatar = ProfileService.getUserAvatar();
                this.setState({avatar});
            })
            .catch(error => console.log("err", error))
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    view={"profile"}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    label={control.label + ":\u00A0"}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            );
        })
    }

    render() {
        return (
            <div className="container">
                <div className={classes.Profile}>
                    <div className={classes.ProfileInner}>
                        <Avatar onChange={this.onChangeAvatar} src={this.state.avatar} edited={this.state.isEditing}/>
                        <div className={classes.infoInner}>
                            {this.state.isEditing ? this.renderInputs() :
                                <Fragment>
                                    <div>Логин: <span>{this.state.login}</span></div>
                                    <div>Имя: <span>{this.state.name}</span></div>
                                    <div>Фамилия: <span>{this.state.surname}</span></div>
                                </Fragment>
                            }

                        </div>
                        <div className={classes.rating}>
                            <span className={classes.counter}>{this.state.rating}</span>
                            <span className={classes.label}>Мой рейтинг</span>
                        </div>
                    </div>
                    <div className={classes.profileButtons}>
                        <Button to={"/recipe-list/my-recipes"}
                                type={"dark"}
                                disabled={this.state.isEditing}
                                tag={NavLink}>
                            Мои рецепты
                        </Button>
                        {this.state.isEditing ?
                            <div className={classes.profileEditButtons}>
                                <Button type={"error"} onClick={this.onRejectEditClicked}>Отмена</Button>
                                <Button type={"success"} onClick={this.onAcceptEditClicked}
                                        disabled={!this.state.isFormValid}>Сохранить</Button>
                            </div>
                            :
                            <Button type={"dark"} onClick={this.onEditClicked}>Редактировать профиль</Button>
                        }
                        <Button to={"/recipeCreator"} tag={NavLink} type={"dark"} disabled={this.state.isEditing}>
                            Добавить рецепт
                        </Button>
                        {this.state.isAdmin ?
                            <Button to={"/recipe-list/not-approved"}
                                    type={"dark"}
                                    disabled={this.state.isEditing}
                                    tag={NavLink}>
                                Панель администратора
                            </Button> :
                            null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
