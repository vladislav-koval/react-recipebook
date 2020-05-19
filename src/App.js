import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Profile from "./containers/Profile/Profile"
import {Route, Switch} from "react-router";
import RecipeCreator from "./containers/RecipeCreator/RecipeCreator";
import RecipeList from "./containers/RecipeList/RecipeList";
import RecipeItem from "./containers/RecipeItem/RecipeItem";

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/recipeCreator" component={RecipeCreator}/>
                    <Route path="/recipe-list/:type" component={RecipeList}/>
                    <Route path="/category/:category" component={RecipeList}/>
                    <Route path="/recipe/:id" component={RecipeItem}/>
                </Switch>
            </Layout>
        );
    }
}

export default App;
