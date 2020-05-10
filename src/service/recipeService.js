import axios from 'axios';
import {RECIPE_PUBLICATION_URL} from "./apiConstants";

class RecipeService {

    postRecipe(title, ingredients, category, description) {
        axios.post(RECIPE_PUBLICATION_URL, {title, ingredients, category, description})
    };

};

export default new RecipeService();
