import React, {Component, Fragment} from "react";
import classes from "./RecipeCreator.module.scss";
import Avatar from "../../components/UI/Avatar/Avatar";
import {
    getRecipeCategories,
    getRecipeControls,
    getRecipeIngredientControl,
    onChangeHandler
} from "../../form/formService";
import Input from "../../components/UI/Input/Input";
import CircledPlus from "../../components/UI/CircledPlus/CircledPlus";
import CircledMinus from "../../components/UI/CircledMinus/CircledMinus";
import Textarea from "../../components/UI/TextArea/Textarea";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import Notification from "../../components/Popups/Notification/Notification";
import RecipeService from "../../service/recipeService"

class RecipeCreator extends Component {
    state = {
        isFormValid: false,
        formControls: {...getRecipeControls()},
        ingredientFields: [],
        recipeCategories: getRecipeCategories(),
        category: "firstCourse",

        notificationTitle: '',
        notificationText: '',
        notificationType: '',
        showNotification: false
    };

    onClickNotification = () => {
        this.setState({
            notificationTitle: '',
            notificationText: '',
            notificationType: '',
            showNotification: false
        })
    };

    onChangeControl = (event, controlName) => {
        let {formControls, isFormValid} = onChangeHandler(event, {...this.state.formControls}, controlName);
        this.setState({
            formControls,
            isFormValid
        });
    };

    onChangeCategory = (event) => {
        const category = event.target.value;
        this.setState({category});
    };

    onChangeIngredient = (event, index) => {
        let control = {...this.state.ingredientFields[index]};
        let ingredients = [...this.state.ingredientFields];
        control.value = event.target.value;
        ingredients[index] = control;
        this.setState({ingredientFields: ingredients});
    };

    addIngredientHandler = () => {
        let ingredients = [...this.state.ingredientFields];
        ingredients.push(getRecipeIngredientControl());
        this.setState({ingredientFields: ingredients});
    };

    removeIngredientHandler = (index) => {
        let fields = [...this.state.ingredientFields];
        fields.splice(index, 1);
        this.setState({
            ingredientFields: fields
        });
    };

    addRecipeHandler = () => {
        const title = this.state.formControls.name.value;
        const ingredients = this.state.ingredientFields.map(ingredient => ingredient.value);
        const category = this.state.category;
        const description = this.state.formControls.description.value;

        RecipeService.postRecipe(title, ingredients, category, description)
            .then(() => {
                this.setState({showNotification: true});
                this.resetControls();
            })
            .catch((error) => {
                this.setState({
                    showNotification: true,
                    notificationTitle: "Ошибка",
                    notificationText: error.message,
                    notificationType: 'errorNotification'
                });
            });
    };

    resetControls() {
        this.setState({
            isFormValid: false,
            formControls: {...getRecipeControls()},
            ingredientFields: [],
            recipeCategories: getRecipeCategories(),
            category: "other",
        });
    }

    renderControl(controlName) {
        const control = this.state.formControls[controlName];
        return (
            control ?
                <Input
                    view={"Recipe"}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    label={control.label + ":\u00A0"}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event) => this.onChangeControl(event, controlName)}
                /> :
                null
        )
    }

    renderIngredients() {
        return this.state.ingredientFields.map((control, index) => {
            return (
                <div key={index} className={classes.IngredientAddButton}>
                    <Input
                        view={"Ingredient"}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        label={control.label}
                        onChange={(event) => this.onChangeIngredient(event, index)}
                    />
                    <CircledMinus onClick={() => this.removeIngredientHandler(index)}/>
                </div>
            );
        });
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.showNotification &&
                    <Notification onClick={this.onClickNotification}
                                  title={this.state.notificationTitle}
                                  text={this.state.notificationText}
                                  type={this.state.notificationType}
                    />
                }
                <div className="container">
                    <div className={classes.RecipeCreator}>
                        <div className={classes.RecipeCreatorInner}>
                            <Avatar edited={true}/>
                            <div className={classes.RecipeNameInner}>
                                {this.renderControl("name")}
                                <div className={classes.RecipeIngredientsInner}>
                                    <div>
                                        <div className={classes.IngredientAddButton}>Ингредиенты:
                                            <CircledPlus onClick={this.addIngredientHandler}/>
                                        </div>
                                        {this.renderIngredients()}
                                    </div>
                                    <div>
                                        <Select onChange={(event) => this.onChangeCategory(event)} label={"Категория: "}
                                                options={this.state.recipeCategories}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.RecipeCreatorInnerBottom}>
                            <Textarea
                                value={this.state.formControls.description.value}
                                label={this.state.formControls.description.label}
                                valid={this.state.formControls.description.valid}
                                onChange={(event) => this.onChangeControl(event, 'description')}
                            />

                            <Button type='dark-min'
                                    onClick={this.addRecipeHandler}
                                    disabled={!this.state.isFormValid}>Добавить</Button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default RecipeCreator;
