import React, {Component, Fragment} from "react";
import logo from "../../assets/img/logo.png"
import AuthService from "../../service/authService"

class Header extends Component {

    state = {
        isAuth: AuthService.isAuthorized(),
        userName: "Вася",
    };

    userList() {
        return this.state.isAuth ?
            <Fragment>
                <li className="user-list__item"><span>Привет {this.state.userName}</span></li>
            </Fragment> :
            <Fragment>
                <li className="user-list__item">
                    <span onClick={this.props.onAuthClick} className="user-list__link">Авторизация</span>
                </li>
                <li className="user-list__item">
                    <span onClick={this.props.onRegisterClick} className="user-list__link">Регистрация</span>
                </li>
            </Fragment>
    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <div className="logo">
                            <img src={logo} alt=""/>
                        </div>
                        <nav className="main-nav">
                            <ul className="site-navigation">
                                <li className="site-navigation__item">
                                    <a className="site-navigation__home" aria-label="Домашняя страница" href="#"></a>
                                </li>
                                <li className="site-navigation__item">
                                    <a className="site-navigation__link" href="#">Поиск рецепта</a>
                                </li>
                            </ul>
                            <ul className="user-list">
                                {this.userList()}
                            </ul>

                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
