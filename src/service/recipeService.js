import axios from 'axios';
import {
    RECIPE_LIST_BY_CATEGORY_URL,
    RECIPE_LIST_BY_SEARCH_URL,
    RECIPE_LIST_BY_TYPE_URL,
    RECIPE_MARK_URL,
    RECIPE_PUBLICATION_URL,
    RECIPE_URL
} from "./apiConstants";

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

    getRecipeList(listCriterion) {
        if (listCriterion.type) {
            return this.getListByType(listCriterion.type);
        } else if (listCriterion.category) {
            return this.getListByCategory(listCriterion.category);
        } else if (listCriterion.search) {
            return this.getListBySearch(listCriterion.search)
        }
    }

    getListByType(type) {
        return axios.get(RECIPE_LIST_BY_TYPE_URL, {
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

    getListByCategory(category) {
        return axios.get(RECIPE_LIST_BY_CATEGORY_URL, {
            params: {
                category: category
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

    getListBySearch(search) {
        return axios.get(RECIPE_LIST_BY_SEARCH_URL, {
            params: {
                search: search
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

    markRecipe(id, mark, title_notif, title_recipe, message) {
        return axios.post(RECIPE_MARK_URL, {id, mark, title_notif, title_recipe, message})
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
