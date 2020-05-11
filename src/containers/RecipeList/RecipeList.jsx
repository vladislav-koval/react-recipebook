import React, {Component} from "react";
import classes from "./RecipeList.module.scss";
import {NavLink} from "react-router-dom";
import RecipeItemList from "../../components/RecipeItemList/RecipeItemList";
import Loader from "../../components/UI/Loader/Loader";

class RecipeList extends Component {
    state = {
        recipes: [],
        loading: true
    };

    componentDidMount() {
        // const recipes = RecipeService.getRecipeList()
        //     .then(data => console.log(data))
        //     .catch(error => console.log("errrr", error.message));
        //
        // this.setState({
        //     recipes
        // })

        const recipes = [
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
        ];
        this.setState({
            recipes,
            loading: false
        })
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
