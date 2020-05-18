import React, {Component, Fragment} from "react";
import classes from "./RecipeItem.module.scss"
import Avatar from "../../components/UI/Avatar/Avatar";
import Loader from "../../components/UI/Loader/Loader";
import Button from "../../components/UI/Button/Button";
import AuthService from "../../service/authService";
import Confirmation from "../../components/Popups/Confirmation/Confirmation";
import RecipeService from "../../service/recipeService";


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

        showConfirmation: false,
        confirmationTitle: "Укажите причину"
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

    onSuccessClick = () => {
        // const message = "Ваш рецепт прошел нашу строгую проверку! Поздравляем!";
        const message = "Your recipe has passed our rigorous test! Congratulations!";
        RecipeService.markRecipe(this.state.id, 1, message)
            .then(data => {
                this.props.history.push('/recipe-list');
            })
            .catch(error => console.log("errr", error.message));
    };

    onRejectClick = (reason) => {
        RecipeService.markRecipe(this.state.id, -1, reason)
            .then(data => {
                this.setState({
                    showConfirmation: true
                });
                this.props.history.push('/recipe-list');
            })
            .catch(error => console.log("errr", error.message));
    };

    onClickNotification = () => {
        this.setState({
            showConfirmation: !this.state.showConfirmation
        })
    };

    renderIngredients() {
        return this.state.recipe.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>
        });
    }

    render() {
        return (
            <Fragment>
                {this.state.showConfirmation ?
                    <Confirmation
                        onOkClick={this.onRejectClick}
                        onCancelClick={this.onClickNotification}
                        title={this.state.confirmationTitle}
                    />
                    : null
                }
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
                                            <Button type={"error"} onClick={this.onClickNotification}>Отклонить</Button>
                                        </div>
                                        : null
                                }
                            </Fragment>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default RecipeItem;
