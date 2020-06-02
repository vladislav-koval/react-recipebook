import axios from 'axios';
import {TO_DISLIKE_RECIPE_URL, TO_LIKE_RECIPE_URL} from "./apiConstants";

class RatingService {
    toLikeRecipe(login, idRecipe) {
        axios.post(TO_LIKE_RECIPE_URL, {login, idRecipe})
            .then(response => {
                return response.data;
            })
            .then(data => data)
            .catch(error => {
                throw new Error(error.response.data.error);
            })
    }

    toDislikeRecipe(login, idRecipe) {
        axios.post(TO_DISLIKE_RECIPE_URL, {login, idRecipe})
            .then(response => {
                return response.data;
            })
            .then(data => data)
            .catch(error => {
                throw new Error(error.response.data.error);
            })
    }
}

export default new RatingService();
