import React, {Component} from "react";
import classes from "./RecipeCreator.module.scss";
import Avatar from "../../components/UI/Avatar/Avatar";
import {getRecipeControls, getRecipeIngredientControl, onChangeHandler} from "../../form/formService";
import Input from "../../components/UI/Input/Input";
import CircledPlus from "../../components/UI/CircledPlus/CircledPlus";
import CircledMinus from "../../components/UI/CircledMinus/CircledMinus";
import Textarea from "../../components/UI/TextArea/Textarea";
import Button from "../../components/UI/Button/Button";

class RecipeCreator extends Component {
    state = {
        isFormValid: false,
        formControls: {...getRecipeControls()},
        ingredientsFields: []
    };

    onChangeControl = (event, controlName) => {
        let {formControls, isFormValid} = onChangeHandler(event, {...this.state.formControls}, controlName);
        this.setState({
            formControls,
            isFormValid
        });
    };

    onChangeIngredient = (event, index) => {
        let control = {...this.state.ingredientsFields[index]};
        control.value = event.target.value;
        this.setState({ingredientFields: [...this.state.ingredientsFields] + [this.state.ingredientsFields[index] = control]})
        console.log(this.state.ingredientsFields)
    };

    addIngredientHandler = () => {
        let ingredients = [...this.state.ingredientsFields];
        ingredients.push(getRecipeIngredientControl());
        this.setState({ingredientsFields: ingredients});
    };

    removeIngredientHandler = (index) => {
        let fields = [...this.state.ingredientsFields];
        fields.splice(index, 1);
        this.setState({
            ingredientsFields: fields
        });
    };

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
        return this.state.ingredientsFields.map((control, index) => {
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
            <div className="container">
                <div className={classes.RecipeCreator}>
                    <div className={classes.RecipeCreatorInner}>
                        <Avatar/>
                        <div className={classes.RecipeNameInner}>
                            {this.renderControl("name")}
                            <div className={classes.RecipeIngredientsInner}>
                                <div className={classes.IngredientAddButton}>Ингредиенты:
                                    <CircledPlus onClick={this.addIngredientHandler}/>
                                </div>
                                {this.renderIngredients()}
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
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}>Добавить</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeCreator;
