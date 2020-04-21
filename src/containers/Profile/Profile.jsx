import React, {Component} from "react";
import classes from "./Profile.module.scss";
import avatar from "../../assets/img/photo.png"
import Button from "../../components/UI/Button/Button";
import ProfileService from "../../service/profileService";

class Profile extends Component{
    state = {
        login: "",
        name: "",
        surname: "",
        rating: 100,
    };

    componentDidMount() {
        if(!ProfileService.profileIsExists()) {
            ProfileService.setProfileData();
        }
        this.setProfileData();
    }

    setProfileData = () => {
        this.setState({
            login: ProfileService.getUserLogin(),
            name: ProfileService.getUserName(),
            surname: ProfileService.getUserSurname()
        });
    };

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
                            <div>Логин: <span>{this.state.login}</span></div>
                            <div>Имя: <span>{this.state.name}</span></div>
                            <div>Фамилия: <span>{this.state.surname}</span></div>
                        </div>
                        <div className={classes.rating}>
                            <span className={classes.counter}>{this.state.rating}</span>
                            <span className={classes.label}>Мой рейтинг</span>
                        </div>
                    </div>
                    <div className={classes.profileButtons}>
                        <Button type={"dark"}>Мои рецепты</Button>
                        <Button type={"dark"}>Редактировать профиль</Button>
                        <Button type={"dark"}>Добавить рецепт</Button>
                        <Button type={"dark"}>Выход</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
