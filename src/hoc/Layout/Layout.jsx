import React, {Component} from "react";
import Header from "../../containers/Header/Header";
import "./Layout.scss";
import Home from "../../containers/Home/Home";
import Auth from "../../containers/Auth/Auth";

class Layout extends Component {
    state = {
        renderPopup: false,
        isLogin: false,
    };

    onAuthHandler = () => {
        this.setState({renderPopup: !this.state.renderPopup});
    };

    onRegisterHandler = () => {
        this.setState({renderPopup: !this.state.renderPopup})
    };

    renderAuth() {
        if (this.state.renderPopup)
            return <Auth onClick={this.onAuthHandler} isLogin={this.state.isLogin}/>;
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
