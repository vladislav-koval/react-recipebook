import React from "react";
import classes from "./RecipeItemList.module.scss";
import Image from "../UI/Image/Image";
import Button from "../UI/Button/Button";

function renderIngredients(ingredients) {
    return ingredients.slice(0, 3).map((ingredient, index) => {
        return (
            <li className={classes.IngredientItem} key={index}>
                {ingredient}
            </li>
        );
    })
}

const onSuccessClick = (event) => {
    event.preventDefault();
};
const onRejectClick = (event) => {
    event.preventDefault();
};
const RecipeItemList = props => {

    return (
        <div className={classes.Recipe}>
            <Image/>
            <div>
                <h2>{props.recipe.title}</h2>
                <ul>
                    <li className={classes.IngredientItem}>Состав:</li>
                    {renderIngredients(props.recipe.ingredients)}
                    {
                        props.recipe.ingredients.length > 3 ?
                            <li className={classes.IngredientItem + ' ' + classes.dots}>...</li> :
                            null
                    }
                </ul>
            </div>
            {
                props.showConfirmButtons ?
                    <div className={classes.ButtonsContainer}>
                        <Button type={"success"} onClick={onSuccessClick}>Принять</Button>
                        <Button type={"error"} onClick={onRejectClick}>Отклонить</Button>
                    </div>
                    : null
            }

        </div>
    );
};

export default RecipeItemList;
