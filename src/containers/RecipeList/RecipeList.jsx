import React, {Component} from "react";
import classes from "./RecipeList.module.scss";
import {NavLink} from "react-router-dom";
import RecipeItemList from "../../components/RecipeItemList/RecipeItemList";

class RecipeList extends Component {
    state = {
        recipes: [
            {
                id: 1,
                title: "Название 1",
                ingredients: ["Ингредиент 1", "Ингредиент 2", "Ингредиент 3", "Ингредиент 4"]
            },
            {
                id: 2,
                title: "Название 2",
                ingredients: ["Ингредиент 3", "Ингредиент 4"]
            },
            {
                id: 3,
                title: "Название 3",
                ingredients: ["Ингредиент 2", "Ингредиент 3", "Ингредиент 4"]
            }
        ]
    };

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
                    {this.renderRecipes()}
                </div>
            </div>
        );
    }
}

export default RecipeList;
