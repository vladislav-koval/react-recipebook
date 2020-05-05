import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Profile from "./containers/Profile/Profile"
import {Route, Switch} from "react-router";
import RecipeCreator from "./containers/RecipeCreator/RecipeCreator";

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/recipeCreator" component={RecipeCreator}/>
                </Switch>
            </Layout>
        );
    }
}

export default App;
