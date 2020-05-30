import React from "react";
import classes from "./RecipeItemList.module.scss";
import Image from "../UI/Image/Image";
import {getRecipeCategories} from "../../form/formService"

function renderIngredients(ingredients) {
    return ingredients.slice(0, 2).map((ingredient, index) => {
        return (
            <li className={classes.IngredientItem} key={index}>
                {ingredient}
            </li>
        );
    })
}

const RecipeItemList = props => {
    const categories = getRecipeCategories();
    const recipeCategory = categories.find(item => item.key === props.recipe.category);
    return (
        <div className={classes.Recipe}>
            <div className={classes.leftBlock}>
                <Image/>
                <div>
                    <h2>{props.recipe.title}</h2>
                    <div className={classes.category}>
                        {"Категория: " + recipeCategory.value}
                    </div>
                    <ul>
                        <li className={classes.IngredientItem}>Состав:</li>
                        {renderIngredients(props.recipe.ingredients)}
                        {
                            props.recipe.ingredients.length > 2 ?
                                <li className={classes.IngredientItem + ' ' + classes.dots}>...</li> :
                                null
                        }
                    </ul>

                </div>

            </div>

            {props.type === "my-recipes" && props.recipe.is_approved === 0 ?
                <div className={classes.status}>
                    Ожидает одобрения
                </div>
                : null
            }

        </div>
    );
};

export default RecipeItemList;
