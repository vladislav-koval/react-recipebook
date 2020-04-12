import React, {Component} from "react";
import Header from "../../containers/Header/Header";
import "./Layout.scss";
import Home from "../../containers/Home/Home";
import Auth from "../../containers/Auth/Auth";
import Registry from "../../containers/Registry/Registry";

class Layout extends Component {
    state = {
        isRegister: false,
        isLogin: false,
    };

    onAuthHandler = () => {
        this.setState({isLogin: !this.state.isLogin});
    };

    onRegisterHandler = () => {
        this.setState({isRegister: !this.state.isRegister})
    };

    renderAuth() {
        if (this.state.isLogin)
            return <Auth onClick={this.onAuthHandler}/>;
        else if (this.state.isRegister)
            return <Registry onClick={this.onRegisterHandler}/>;
        return null;
    };

    render() {
        return (
            <div>
                <Header onAuthClick={this.onAuthHandler} onRegisterClick={this.onRegisterHandler}/>
                {this.renderAuth()}
                <main>
                    <Home/>
                </main>
            </div>
        );
    }
}

export default Layout;
