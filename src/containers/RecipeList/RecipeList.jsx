import React, {Component} from "react";
import classes from "./RecipeList.module.scss";
import {NavLink} from "react-router-dom";
import RecipeItemList from "../../components/RecipeItemList/RecipeItemList";
import Loader from "../../components/UI/Loader/Loader";
import RecipeService from "../../service/recipeService";
import AuthService from "../../service/authService";
import Button from "../../components/UI/Button/Button";

class RecipeList extends Component {
    state = {
        recipes: null,
        loading: true,
        isAdmin: AuthService.isAdmin(),
        listCriterion: {
            type: this.props.match.params.type,
            category: this.props.match.params.category,
            search: this.props.match.params.search
        },
        filteredBy: "id",
    };

    componentDidMount() {
        RecipeService.getRecipeList(this.state.listCriterion)
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
            return this.state.recipes.reverse().map((recipe => {
                return (
                    <li key={recipe.id} className={classes.RecipeItem}>
                        <NavLink to={'/recipe/' + recipe.id}>
                            <RecipeItemList type={this.state.listCriterion.type} recipe={recipe}/>
                        </NavLink>
                    </li>
                );
            }))
        } else {
            return <div className={classes.empty}>Список пуст</div>
        }
    }

    onFilterHandler = (type) => {
        if (type === this.state.filteredBy)
            return;
        this.setState({filteredBy: type});
        this.filterRecipes(type);
    };

    filterRecipes = (filteredBy) => {
        const {recipes} = this.state;
        if (Array.isArray(recipes)) {
            if (filteredBy === "title") {
                recipes.sort((a, b) => {
                    if(a[filteredBy].toLowerCase() > b[filteredBy].toLowerCase()) { return -1; }
                    if(a[filteredBy].toLowerCase() < b[filteredBy].toLowerCase()) { return 1; }
                    return 0;
                });
            } else {
                recipes.sort((a, b) => {
                    return a[filteredBy] - b[filteredBy]
                });
            }
        }

        this.setState({recipes})
    };

    render() {
        return (
            <div className="container">
                <div className={classes.RecipeList}>
                    <div className={classes.RecipeFilter}>
                        <Button onClick={() => this.onFilterHandler("id")} active={this.state.filteredBy === "id"}
                                type={"nav"}>По Новизне</Button>
                        <Button onClick={() => this.onFilterHandler("rating")}
                                active={this.state.filteredBy === "rating"} type={"nav"}>По рейтингу</Button>
                        <Button onClick={() => this.onFilterHandler("title")} active={this.state.filteredBy === "title"}
                                type={"nav"}>По алфавиту</Button>
                    </div>
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
