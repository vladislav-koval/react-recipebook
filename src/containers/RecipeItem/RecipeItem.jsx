import React, {Component, Fragment} from "react";
import classes from "./RecipeItem.module.scss"
import Avatar from "../../components/UI/Avatar/Avatar";
import Loader from "../../components/UI/Loader/Loader";
import AuthService from "../../service/authService";
import Button from "../../components/UI/Button/Button";

// import RecipeService from "../../service/recipeService";

class RecipeItem extends Component {

    state = {
        id: this.props.match.params.id,
        loading: true,
        recipe: {
            title: "Kartoha gharenaya",
            category: "secondCourse",
            ingredients: ["kartoha", "sol'", "maslo"],
            description: "Hharish kartohu & vse",
            author: "admin",
            is_approved: 0,
            rating: 100,
            picture: null
        },
        isAdmin: AuthService.isAdmin(),
    };


    /*TODO: После того как появится запрос у бэка, раскоментить закоменченое и установить recipe = null в state*/
    // componentDidMount() {
    //     RecipeService.getRecipe(this.state.id)
    //         .then(data => {
    //             const recipe = {...data, ingredients: JSON.parse(data.ingredients)};
    //             this.setState({
    //                 recipe,
    //                 loading: false
    //             });
    //         })
    //         .catch(error => console.log("errrr", error.message));
    // }

    onSuccessClick = (event) => {
        event.preventDefault();
    };
    onRejectClick = (event) => {
        event.preventDefault();
    };

    renderIngredients() {
        return this.state.recipe.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>
        });
    }

    render() {
        console.log("asdf", this.state.id);
        return (
            <div className="container">
                <div className={classes.RecipeItem}>
                    {this.state.loading && !this.state.recipe ?
                        <Loader/> :
                        <Fragment>
                            <div className={classes.RecipeItemInner}>

                                <Avatar edited={false}/>
                                <div className={classes.recipeTopLeftBlock}>
                                    <h2>
                                        {this.state.recipe.title}
                                    </h2>
                                    <p>Состав:</p>
                                    <ul className={classes.IngredientsInner}>
                                        {this.renderIngredients()}
                                    </ul>
                                </div>
                                <div className={classes.recipeTopRightBlock}>
                                    <div>Автор: {this.state.recipe.author}</div>
                                    <div className={classes.rating}>
                                        <span className={classes.counter}>{this.state.recipe.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className={classes.recipeHeading}>Рецепт:</h2>
                                <p>
                                    {this.state.recipe.description}
                                </p>
                            </div>
                            {
                                this.state.isAdmin ?
                                    <div className={classes.buttonsContainer}>
                                        <Button type={"success"} onClick={this.onSuccessClick}>Принять</Button>
                                        <Button type={"error"} onClick={this.onRejectClick}>Отклонить</Button>
                                    </div>
                                    : null
                            }
                        </Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default RecipeItem;