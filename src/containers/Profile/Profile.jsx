import React, {Component, Fragment} from "react";
import classes from "./Profile.module.scss";
import avatar from "../../assets/img/photo.png"
import Button from "../../components/UI/Button/Button";
import ProfileService from "../../service/profileService";
import Input from "../../components/UI/Input/Input";
import {getProfileControls, onChangeHandler} from "../../form/formService";

class Profile extends Component {
    state = {
        login: "",
        name: "",
        surname: "",
        rating: 100,


        isEditing: false,
        isFormValid: true,
        formControls: {...getProfileControls()},
    };

    componentDidMount() {
        if (!ProfileService.profileIsExists()) {
            ProfileService.setProfileDataFromServer().then(() => this.setProfileData());
        } else {
            this.setProfileData();
        }
        console.log("componentDidMount", this.state.formControls);
    }

    setProfileData() {
        let login = ProfileService.getUserLogin();
        let name = ProfileService.getUserName();
        let surname = ProfileService.getUserSurname();
        this.setState({
            login,
            name,
            surname
        });
    };

    onEditClicked = () => {
        const formControls = {...this.state.formControls};
        formControls.login.value = this.state.login;
        formControls.name.value = this.state.name;
        formControls.surname.value = this.state.surname;

        this.setState({formControls, isEditing: true});
        console.log(this.state.formControls);
    };

    onRejectClicked = () => {
      this.setState({isEditing: false, isFormValid: true});
    };

    onChangeHandler = (event, controlName) => {
        const {formControls, isFormValid} = onChangeHandler(event, {...this.state.formControls}, controlName);
        this.setState({
            formControls,
            isFormValid
        });
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
                        <div className={classes.avatarInner}>
                            <img src={avatar} alt="avatar"/>
                            <span>Загрузить фото</span>
                        </div>
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
                        <Button type={"dark"} disabled={this.state.isEditing}>Мои рецепты</Button>
                        {this.state.isEditing ?
                            <div className={classes.profileEditButtons}>
                                <Button type={"error"} onClick={this.onRejectClicked}>Отмена</Button>
                                <Button type={"success"} disabled={!this.state.isFormValid}>Сохранить</Button>
                            </div>
                            :
                            <Button type={"dark"} onClick={this.onEditClicked}>Редактировать профиль</Button>
                        }
                        <Button type={"dark"} disabled={this.state.isEditing}>Добавить рецепт</Button>
                        <Button type={"dark"} disabled={this.state.isEditing}>Выход</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
