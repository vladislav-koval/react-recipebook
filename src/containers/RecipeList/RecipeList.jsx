import React, {Component} from "react";
import classes from "./RecipeList.module.scss";
import {NavLink} from "react-router-dom";
import RecipeItemList from "../../components/RecipeItemList/RecipeItemList";
import Loader from "../../components/UI/Loader/Loader";
import RecipeService from "../../service/recipeService";

class RecipeList extends Component {
    state = {
        recipes: null,
        loading: true
    };

    componentDidMount() {
        RecipeService.getRecipeList()
            .then(data => {
                let recipes;
                if (data) {
                    recipes = data.map(recipe => {
                        return {...recipe, ingredients: JSON.parse(recipe.ingredients)}
                    });
                } else {
                    recipes = [];
                }
                this.setState({recipes, loading: false});
            })
            .catch(error => console.log("errrr", error.message));
    }

    renderRecipes() {
        if (this.state.recipes.length) {
            return this.state.recipes.map((recipe => {
                return (
                    <li key={recipe.id} className={classes.RecipeItem}>
                        <NavLink to={'/recipe/' + recipe.id}>
                            <RecipeItemList recipe={recipe}/>
                        </NavLink>
                    </li>
                );
            }))
        } else {
            return <div className={classes.empty}>Список пуст</div>
        }
    }

    render() {
        return (
            <div className="container">
                <div className={classes.RecipeList}>
                    {this.state.loading && this.state.recipes === null ?
                        <Loader/> :
                        this.renderRecipes()
                    }
                </div>
            </div>
        );
    }
}

export default RecipeList;
