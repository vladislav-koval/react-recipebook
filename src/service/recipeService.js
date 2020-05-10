import axios from 'axios';
import {RECIPE_PUBLICATION_URL} from "./apiConstants";

class RecipeService {

    postRecipe(title, ingredients, category, description) {
        return axios.post(RECIPE_PUBLICATION_URL, {title, ingredients, category, description})
            .then(response => {
                return response.data
            })
            .then(data => data)
            .catch(error => {
                throw new Error(error.response.data.error)
            })
    };

}

export default new RecipeService();
