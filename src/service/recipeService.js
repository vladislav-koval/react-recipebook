import axios from 'axios';
import {RECIPE_LIST_URL, RECIPE_MARK_URL, RECIPE_PUBLICATION_URL, RECIPE_URL} from "./apiConstants";

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

    getRecipeList(type) {
        return axios.get(RECIPE_LIST_URL, {
            params: {
                type: type
            }
        })
            .then(response => {
                return response.data
            })
            .then(data => data)
            .catch(error => {
                throw new Error(error.response.data.error)
            })
    }

    getRecipe(id) {
        return axios.get(RECIPE_URL, {
            params: {
                id
            }
        })
            .then(response => {
                return response.data
            })
            .then(data => data)
            .catch(error => {
                throw new Error(error.response.data.error)
            })
    }

    markRecipe(id, mark, title, message) {
        return axios.post(RECIPE_MARK_URL, {id, mark, title, message})
            .then(response => {
                return response.data
            })
            .then(data => data)
            .catch(error => {
              throw new Error(error.response.data.error)
            });

    }
}

export default new RecipeService();
