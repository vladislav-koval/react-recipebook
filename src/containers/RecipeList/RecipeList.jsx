import React, {Component} from "react";
import classes from "./RecipeList.module.scss";
import {NavLink} from "react-router-dom";
import RecipeItemList from "../../components/RecipeItemList/RecipeItemList";
import Loader from "../../components/UI/Loader/Loader";
import RecipeService from "../../service/recipeService";

class RecipeList extends Component {
    state = {
        recipes: [],
        loading: true
    };

    componentDidMount() {
        RecipeService.getRecipeList()
            .then(data => {
               const recipes = data.map(recipe => {
                    return {...recipe, ingredients: JSON.parse(recipe.ingredients)}
                });
                this.setState({recipes, loading: false});
            })
            .catch(error => console.log("errrr", error.message));
    }

    renderRecipes() {
        return this.state.recipes.map((recipe => {
            return (
                <li key={recipe.id} className={classes.RecipeItem}>
                    <NavLink to={'/recipe/' + recipe.id}>
                        <RecipeItemList recipe={recipe}/>
                    </NavLink>
                </li>
            );
        }))
    }

    render() {
        return (
            <div className="container">
                <div className={classes.RecipeList}>
                    {this.state.loading && this.state.recipes !== 0 ?
                        <Loader/> :
                        this.renderRecipes()
                    }
                </div>
            </div>
        );
    }
}

export default RecipeList;
