import React, {Component} from "react";
import Header from "../../containers/Header/Header";
import "./Layout.scss";
import Auth from "../../containers/Auth/Auth";
import AuthService from "../../service/authService"
import Registry from "../../containers/Registry/Registry";

class Layout extends Component {
    state = {
        isRegister: false,
        isLogin: false,
        isAuth: AuthService.isAuthorized(),
        userName: AuthService.getUserName(),
    };

    componentDidMount() {
        let userName = "";
        // eslint-disable-next-line no-unused-expressions
        this.state.isAuth ? userName = AuthService.getUserName() : "";
        this.setState({userName});
    }

    onAuthHandler = () => {
        this.setState({isLogin: !this.state.isLogin});
    };

    onRegisterHandler = () => {
        this.setState({isRegister: !this.state.isRegister})
    };

    successfulAuthentication = () => {
        this.setState({
            isAuth: AuthService.isAuthorized(),
            userName: AuthService.getUserName(),
            isLogin: false,
            isRegister: false
        });
    };

    onLogoutHandler = () => {
        AuthService.logout();
        this.setState({isAuth: AuthService.isAuthorized(), userName: AuthService.getUserName()});
    };

    renderAuth() {
        if (this.state.isLogin)
            return <Auth onClick={this.onAuthHandler}
                         successfulAuthentication={this.successfulAuthentication}/>;
        else if (this.state.isRegister)
            return <Registry onClick={this.onRegisterHandler}
                             successfulAuthentication={this.successfulAuthentication}/>;
        return null;
    };

    render() {
        return (
            <div>
                <Header onAuthClick={this.onAuthHandler}
                        onRegisterClick={this.onRegisterHandler}
                        onLogoutClick={this.onLogoutHandler}
                        isAuth={this.state.isAuth}
                        userName={this.state.userName}
                />
                {this.renderAuth()}
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;
