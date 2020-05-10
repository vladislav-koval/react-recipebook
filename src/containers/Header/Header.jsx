import React, {Component, Fragment} from "react";
import logo from "../../assets/img/logo.png"
import {NavLink} from "react-router-dom";

class Header extends Component {

    userList() {
        return this.props.isAuth ?
            <Fragment>
                <li className="user-list__item">
                    <NavLink className="site-navigation__link" to={"/profile"}>
                        Привет {this.props.userName}
                    </NavLink>
                </li>
                <li className="user-list__item">
                    <NavLink onClick={this.props.onLogoutClick} className="site-navigation__link" to={"/"}>
                        Выход
                    </NavLink>
                </li>
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
                            <NavLink to={"/"}>
                                <img src={logo} alt=""/>
                            </NavLink>
                        </div>
                        <nav className="main-nav">
                            <ul className="site-navigation">
                                <li className="site-navigation__item">
                                    <NavLink to={"/search"} className="site-navigation__link">Поиск рецепта</NavLink>
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
