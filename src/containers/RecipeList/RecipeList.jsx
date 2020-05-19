import React, {Component} from "react";
import classes from "./RecipeList.module.scss";
import {NavLink} from "react-router-dom";
import RecipeItemList from "../../components/RecipeItemList/RecipeItemList";
import Loader from "../../components/UI/Loader/Loader";
import RecipeService from "../../service/recipeService";
import AuthService from "../../service/authService";

class RecipeList extends Component {
    state = {
        recipes: null,
        loading: true,

        type: this.props.match.params.type,
        isAdmin: AuthService.isAdmin(),
        showConfirmButtons: false
    };

    componentDidMount() {
        RecipeService.getRecipeList(this.state.type)
            .then(data => {
                let recipes;
                if (data) {
                    recipes = data.map(recipe => {
                        return {...recipe, ingredients: JSON.parse(recipe.ingredients)}
                    });
                } else {
                    recipes = [];
                }
                const showConfirmButtons = this.state.type === 'not-approved' && this.state.isAdmin;
                this.setState({recipes, loading: false, showConfirmButtons});
            })
            .catch(error => console.log("errrr", error.message));
    }

    renderRecipes() {
        if (this.state.recipes.length) {
            return this.state.recipes.map((recipe => {
                return (
                    <li key={recipe.id} className={classes.RecipeItem}>
                        <NavLink to={'/recipe/' + recipe.id}>
                            <RecipeItemList showConfirmButtons={this.state.showConfirmButtons} recipe={recipe}/>
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
